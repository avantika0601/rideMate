import { useState, useContext, useEffect } from 'react';
import { RideContext } from '../context/RideContext';
import { useRideStatus } from '../context/RideStatusContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function RideForm() {
  const [action, setAction] = useState('book');
  const [rideRequest, setRideRequest] = useState({
    distanceInKm: '',
    fareType: 'NORMAL',
  });
  const [estimatedFare, setEstimatedFare] = useState(null);
  const { addLog } = useContext(RideContext);
  const { setStatus } = useRideStatus();

  useEffect(() => {
    const fetchEstimate = async () => {
      const { distanceInKm, fareType } = rideRequest;
      if (!distanceInKm || parseFloat(distanceInKm) < 1) {
        setEstimatedFare(null);
        return;
      }

      try {
        const res = await fetch(
          `http://localhost:8080/api/rides/estimate?distance=${distanceInKm}&fareType=${fareType}`
        );
        const data = await res.json();
        setEstimatedFare(data.estimatedFare);
      } catch (err) {
        console.error('Error fetching fare estimate:', err);
        setEstimatedFare(null);
      }
    };

    fetchEstimate();
  }, [rideRequest.distanceInKm, rideRequest.fareType]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res, data;

      if (action === 'book') {
        res = await fetch('http://localhost:8080/api/rides/book', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            distanceInKm: parseFloat(rideRequest.distanceInKm),
            fareType: rideRequest.fareType,
          }),
        });

        data = await res.json();
        addLog(`✅ Ride Booked: ${data.fareType} | ₹${data.fare}`);
        setStatus('BOOKED');

        // Simulate ride lifecycle
        setTimeout(() => setStatus('IN_PROGRESS'), 2000);
        setTimeout(() => setStatus('COMPLETED'), 5000);
      } else {
        res = await fetch('http://localhost:8080/api/rides/cancel', {
          method: 'POST',
        });

        const result = await res.text();
        addLog(`⚠️ Ride Cancelled: ${result}`);
        setStatus('CANCELLED');
      }
    } catch (err) {
      addLog(`❌ ${action.toUpperCase()} FAILED: ${err.message}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-gradient-to-br from-blue-100 to-white p-8 rounded-xl shadow-2xl max-w-xl mx-auto mt-10"
    >
      <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">🚗 RideMate</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Action Select */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Action</label>
          <select
            value={action}
            onChange={(e) => setAction(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="book">Book Ride</option>
            <option value="cancel">Cancel Ride</option>
          </select>
        </div>

        {/* Booking Fields */}
        <AnimatePresence>
          {action === 'book' && (
            <motion.div
              key="bookingFields"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Distance (in Km)</label>
                <input
                  type="number"
                  min="1"
                  placeholder="Enter distance"
                  value={rideRequest.distanceInKm}
                  onChange={(e) =>
                    setRideRequest({ ...rideRequest, distanceInKm: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Fare Type</label>
                <select
                  value={rideRequest.fareType}
                  onChange={(e) =>
                    setRideRequest({ ...rideRequest, fareType: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="NORMAL">Normal</option>
                  <option value="SURGE">Surge</option>
                  <option value="POOL">Pool</option>
                </select>
              </div>

              {/* Animated Fare Estimate */}
              <AnimatePresence>
                {estimatedFare !== null && (
                  <motion.div
                    key="fareEstimate"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-green-700 font-semibold mt-2 text-left"
                  >
                    💰 Estimated Fare: ₹{estimatedFare}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
        >
          {action === 'book' ? 'Book Ride' : 'Cancel Ride'}
        </motion.button>
      </form>
    </motion.div>
  );
}
