// src/context/RideContext.jsx
import { createContext, useState } from 'react';

export const RideContext = createContext();

export function RideProvider({ children }) {
  const [logs, setLogs] = useState([]);

  const addLog = (message) => {
    const time = new Date().toLocaleTimeString();
    setLogs((prev) => [...prev, `[${time}] ${message}`]);
  };

  return (
    <RideContext.Provider value={{ logs, addLog }}>
      {children}
    </RideContext.Provider>
  );
}
