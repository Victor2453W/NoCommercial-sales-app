'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface OzonAPIContextType {
  clientId: string;
  apiKey: string;
  setOzonAPIData: (clientId: string, apiKey: string) => void;
  clearOzonAPIData: () => void; 
}

const OzonAPIContext = createContext<OzonAPIContextType | undefined>(undefined);

const STORAGE_KEY = 'ozon_api_key';

export function OzonAPIProvider({ children }: { children: ReactNode }) {
  const [OzonAPIData, setOzonAPIData] = useState<{ 
    clientId: string; 
    apiKey: string 
  }>(() => {
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem(STORAGE_KEY);
      try {
        return savedData ? JSON.parse(savedData) : { clientId: '', apiKey: '' };
      } catch (e) {
        console.error("Ошибка парсинга данных из localStorage", e);
        return { clientId: '', apiKey: '' };
      }
    }
    return { clientId: '', apiKey: '' };
  });

  const updateOzonAPIData = (newClientId: string, newApiKey: string) => {
    const newData = { clientId: newClientId, apiKey: newApiKey };
    setOzonAPIData(newData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  };

  const clearOzonAPIData = () => {
    setOzonAPIData({ clientId: '', apiKey: '' });
    localStorage.removeItem(STORAGE_KEY);
  };

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        try {
          const savedData = localStorage.getItem(STORAGE_KEY);
          if (savedData) {
            setOzonAPIData(JSON.parse(savedData));
          }
        } catch (e) {
          console.error("Ошибка при синхронизации localStorage", e);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <OzonAPIContext.Provider value={{
      clientId: OzonAPIData.clientId,
      apiKey: OzonAPIData.apiKey,
      setOzonAPIData: updateOzonAPIData,
      clearOzonAPIData
    }}>
      {children}
    </OzonAPIContext.Provider>
  );
}

export function useOzonAPIContext() {
  const context = useContext(OzonAPIContext);
  if (!context) throw new Error('useOzonAPI must be used within OzonAPIProvider');
  return context;
}