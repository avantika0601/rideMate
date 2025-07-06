// src/App.jsx
import RideForm from './components/RideForm';
import LiveRideTracker from './components/LiveRideTracker';
import { RideProvider } from './context/RideContext';
import { RideStatusProvider } from './context/RideStatusContext';

function App() {
  return (
    <RideProvider>
      <RideStatusProvider>
        <div className="min-h-screen bg-gray-100 p-6">
          <RideForm />
          <LiveRideTracker />
        </div>
      </RideStatusProvider>
    </RideProvider>
  );
}

export default App;
