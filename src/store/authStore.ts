// src/App.tsx - Super Simple Test (No Auth Store)
import React from 'react';

const App: React.FC = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <h1 style={{ color: '#333' }}>InsightFusion CRM - Test Page</h1>
      <p style={{ color: '#666' }}>If you can see this, React is working!</p>
      
      <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ccc', backgroundColor: 'white' }}>
        <h2>Environment Variables Test</h2>
        <p>Supabase URL: {import.meta.env.VITE_SUPABASE_URL || 'Missing'}</p>
        <p>Supabase Key Length: {import.meta.env.VITE_SUPABASE_ANON_KEY?.length || 'Missing'}</p>
      </div>
      
      <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ccc', backgroundColor: 'white' }}>
        <h2>Simple Form Test</h2>
        <input 
          type="text" 
          placeholder="Test input" 
          style={{ margin: '10px', padding: '8px', border: '1px solid #ccc' }} 
        />
        <button 
          style={{ margin: '10px', padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}
          onClick={() => alert('Button works!')}
        >
          Test Button
        </button>
      </div>
    </div>
  );
};

export default App;
