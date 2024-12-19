import { logger } from '../monitoring/logger';

interface Version {
  id: string;
  entityId: string;
  entityType: string;
  changes: {
    before: Record<string, any>;
    after: Record<string, any>;
  };
  userId: string;
  timestamp: Date;
  comment?: string;
}

class VersionManager {
  private static instance: VersionManager;
  private versions: Map<string, Version[]> = new Map();
  private readonly MAX_VERSIONS = 100;

  private constructor() {}

  static getInstance(): VersionManager {
    if (!VersionManager.instance) {
      VersionManager.instance = new VersionManager();
    }
    return VersionManager.instance;
  }

  async createVersion(
    entityId: string,
    entityType: string,
    changes: Version['changes'],
    userId: string,
    comment?: string
  ): Promise<Version> {
    const version: Version = {
      id: crypto.randomUUID(),
      entityId,
      entityType,
      changes,
      userId,
      timestamp: new Date(),
      comment
    };

    const entityVersions = this.versions.get(entityId) || [];
    entityVersions.unshift(version);

    // Maintain version limit
    if (entityVersions.length > this.MAX_VERSIONS) {
      entityVersions.pop();
    }

    this.versions.set(entityId, entityVersions);
    logger.info('Version created', { entityId, entityType, versionId: version.id });

    return version;
  }

  getVersions(entityId: string): Version[] {
    return this.versions.get(entityId) || [];
  }

  async revertToVersion(entityId: string, versionId: string): Promise<void> {
    const versions = this.versions.get(entityId);
    if (!versions) {
      throw new Error('No versions found for entity');
    }

    const targetVersion = versions.find(v => v.id === versionId);
    if (!targetVersion) {
      throw new Error('Version not found');
    }

    // Create new version for the revert
    await this.createVersion(
      entityId,
      targetVersion.entityType,
      {
        before: targetVersion.changes.after,
        after: targetVersion.changes.before
      },
      'system',
      `Reverted to version ${versionId}`
    );

    logger.info('Reverted to version', { entityId, versionId });
  }

  async compareVersions(
    entityId: string,
    version1Id: string,
    version2Id: string
  ): Promise<Record<string, any>> {
    const versions = this.versions.get(entityId);
    if (!versions) {
      throw new Error('No versions found for entity');
    }

    const v1 = versions.find(v => v.id === version1Id);
    const v2 = versions.find(v => v.id === version2Id);

    if (!v1 || !v2) {
      throw new Error('One or both versions not found');
    }

    return {
      v1: v1.changes.after,
      v2: v2.changes.after,
      differences: this.findDifferences(v1.changes.after, v2.changes.after)
    };
  }

  private findDifferences(obj1: any, obj2: any): Record<string, any> {
    const differences: Record<string, any> = {};

    for (const key in obj1) {
      if (JSON.stringify(obj1[key]) !== JSON.stringify(obj2[key])) {
        differences[key] = {
          v1: obj1[key],
          v2: obj2[key]
        };
      }
    }

    return differences;
  }
}

export const versionManager = VersionManager.getInstance();