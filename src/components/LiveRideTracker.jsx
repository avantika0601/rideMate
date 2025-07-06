// src/components/LiveRideTracker.jsx
import { useRideStatus } from '../context/RideStatusContext';
import { motion, AnimatePresence } from 'framer-motion';

const statusMap = {
  IDLE: { color: 'text-gray-500', label: 'No Ride Active' },
  BOOKED: { color: 'text-yellow-500', label: 'Ride Booked 🛺' },
  IN_PROGRESS: { color: 'text-blue-500', label: 'Ride In Progress 🚕' },
  COMPLETED: { color: 'text-green-600', label: 'Ride Completed 🎉' },
  CANCELLED: { color: 'text-red-500', label: 'Ride Cancelled ❌' },
};

export default function LiveRideTracker() {
  const { status } = useRideStatus();
  const display = statusMap[status];

  return (
    <div className="mt-8 text-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={status}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.4 }}
          className={`text-xl font-semibold ${display.color}`}
        >
          {display.label}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
