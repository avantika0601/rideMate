// src/context/RideStatusContext.jsx
import { createContext, useContext, useState } from 'react';

const RideStatusContext = createContext();

export function RideStatusProvider({ children }) {
  const [status, setStatus] = useState('IDLE'); // Possible: IDLE, BOOKED, IN_PROGRESS, COMPLETED, CANCELLED

  return (
    <RideStatusContext.Provider value={{ status, setStatus }}>
      {children}
    </RideStatusContext.Provider>
  );
}

export const useRideStatus = () => useContext(RideStatusContext);
