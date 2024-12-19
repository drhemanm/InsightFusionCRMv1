import { Rocket, Sword, Trophy, Leaf } from 'lucide-react';
import type { ThemeConfig } from '../types/themes';

export const themes: Record<string, ThemeConfig> = {
  space: {
    name: 'Space Explorer',
    description: 'Conquer the galaxy one deal at a time',
    icon: Rocket,
    colors: {
      primary: '#6366F1',
      secondary: '#A855F7',
      accent: '#EC4899',
      background: '#0F172A',
    },
    achievements: {
      icons: {
        deals_closed: '🚀',
        leads_added: '🛸',
        tasks_completed: '🌟',
        revenue_generated: '💫',
      },
      titles: {
        deals_closed: 'Stellar Negotiator',
        leads_added: 'Galaxy Prospector',
        tasks_completed: 'Mission Commander',
        revenue_generated: 'Cosmic Wealth Generator',
      },
      descriptions: {
        deals_closed: 'Successfully landed deals across the galaxy',
        leads_added: 'Discovered new potential clients in unexplored territories',
        tasks_completed: 'Completed crucial missions with precision',
        revenue_generated: 'Generated astronomical revenue for the company',
      },
    },
    terminology: {
      points: 'Stardust',
      level: 'Space Rank',
      achievement: 'Discovery',
      challenge: 'Mission',
      reward: 'Space Loot',
    },
  },
  medieval: {
    name: 'Kingdom Quest',
    description: 'Build your sales empire in a medieval realm',
    icon: Sword,
    colors: {
      primary: '#854D0E',
      secondary: '#B45309',
      accent: '#D97706',
      background: '#292524',
    },
    achievements: {
      icons: {
        deals_closed: '⚔️',
        leads_added: '🏰',
        tasks_completed: '📜',
        revenue_generated: '👑',
      },
      titles: {
        deals_closed: 'Master Negotiator',
        leads_added: 'Royal Scout',
        tasks_completed: 'Quest Champion',
        revenue_generated: 'Treasury Guardian',
      },
      descriptions: {
        deals_closed: 'Forged alliances across the realm',
        leads_added: 'Discovered new allies for the kingdom',
        tasks_completed: 'Completed royal quests with honor',
        revenue_generated: 'Filled the kingdom\'s coffers with gold',
      },
    },
    terminology: {
      points: 'Gold',
      level: 'Rank',
      achievement: 'Quest',
      challenge: 'Crusade',
      reward: 'Treasure',
    },
  },
  sports: {
    name: 'Sales Champions',
    description: 'Compete and win in the sales arena',
    icon: Trophy,
    colors: {
      primary: '#0369A1',
      secondary: '#0284C7',
      accent: '#0EA5E9',
      background: '#F8FAFC',
    },
    achievements: {
      icons: {
        deals_closed: '🏆',
        leads_added: '🎯',
        tasks_completed: '🏅',
        revenue_generated: '🌟',
      },
      titles: {
        deals_closed: 'Deal Champion',
        leads_added: 'Lead Scout',
        tasks_completed: 'Task MVP',
        revenue_generated: 'Revenue All-Star',
      },
      descriptions: {
        deals_closed: 'Scored major wins in deal closing',
        leads_added: 'Recruited new prospects for the team',
        tasks_completed: 'Executed perfect plays',
        revenue_generated: 'Set new revenue records',
      },
    },
    terminology: {
      points: 'Score',
      level: 'Division',
      achievement: 'Trophy',
      challenge: 'Match',
      reward: 'Prize',
    },
  },
  nature: {
    name: 'Growth Journey',
    description: 'Nurture your success in a natural environment',
    icon: Leaf,
    colors: {
      primary: '#166534',
      secondary: '#15803D',
      accent: '#16A34A',
      background: '#F0FDF4',
    },
    achievements: {
      icons: {
        deals_closed: '🌳',
        leads_added: '🌱',
        tasks_completed: '🍃',
        revenue_generated: '🌺',
      },
      titles: {
        deals_closed: 'Master Cultivator',
        leads_added: 'Seed Planter',
        tasks_completed: 'Garden Keeper',
        revenue_generated: 'Harvest Master',
      },
      descriptions: {
        deals_closed: 'Grew relationships into flourishing partnerships',
        leads_added: 'Planted seeds for future growth',
        tasks_completed: 'Tended to the garden of success',
        revenue_generated: 'Reaped abundant rewards',
      },
    },
    terminology: {
      points: 'Growth Points',
      level: 'Growth Stage',
      achievement: 'Milestone',
      challenge: 'Season',
      reward: 'Harvest',
    },
  },
};