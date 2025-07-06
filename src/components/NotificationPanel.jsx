// src/components/NotificationPanel.jsx
import { useContext } from 'react';
import { RideContext } from '../context/RideContext';

export default function NotificationPanel() {
  const { logs } = useContext(RideContext);

  return (
    <div className="bg-gray-900 text-white p-4 rounded-xl mt-6 max-w-2xl mx-auto h-60 overflow-y-auto">
      <h3 className="text-xl font-semibold mb-2">📢 Ride Logs</h3>
      <ul className="space-y-1 text-sm font-mono">
        {logs.slice().reverse().map((log, idx) => (
          <li key={idx}>{log}</li>
        ))}
      </ul>
    </div>
  );
}
