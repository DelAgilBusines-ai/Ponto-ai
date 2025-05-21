import React, { createContext, useContext, useState } from 'react';

interface DashboardContextProps {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
}

const DashboardContext = createContext<DashboardContextProps | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <DashboardContext.Provider value={{ selectedDate, setSelectedDate }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboardContext deve ser usado dentro de um DashboardProvider');
  }
  return context;
};
