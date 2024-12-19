import React, { useState } from 'react';
import { Upload, FileSpreadsheet, AlertCircle } from 'lucide-react';
import { useDataImport } from './hooks/useDataImport';
import { DataPreview } from './components/DataPreview';
import { FieldMapping } from './components/FieldMapping';
import type { ImportConfig } from './types';

export const DataImportManager: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [config, setConfig] = useState<ImportConfig | null>(null);
  const { importData, validateData, isLoading, error } = useDataImport();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFile(file);
    const config = await validateData(file);
    setConfig(config);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-6">Data Import</h2>

      {!file ? (
        <div className="border-2 border-dashed rounded-lg p-8 text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <label className="cursor-pointer">
            <span className="text-blue-600 hover:text-blue-700">
              Click to upload
            </span>
            <span className="text-gray-600"> or drag and drop</span>
            <input
              type="file"
              className="hidden"
              accept=".csv,.xlsx"
              onChange={handleFileUpload}
            />
          </label>
        </div>
      ) : (
        <>
          <DataPreview file={file} config={config} />
          <FieldMapping config={config} onChange={setConfig} />
          
          <div className="mt-6 flex justify-end gap-4">
            <button
              onClick={() => {
                setFile(null);
                setConfig(null);
              }}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={() => importData(file, config!)}
              disabled={isLoading || !config}
              className="px-4 py-2 text-white bg-blue-600 rounded-lg disabled:opacity-50"
            >
              {isLoading ? 'Importing...' : 'Start Import'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};