package com.ridemate.ridemate.service;

import org.springframework.stereotype.Service;

import com.ridemate.ridemate.model.Ride;
import com.ridemate.ridemate.model.RideRequest;
import com.ridemate.ridemate.observer.AdminLogger;
import com.ridemate.ridemate.observer.RideEventObservable;
import com.ridemate.ridemate.observer.UserNotifier;
import com.ridemate.ridemate.strategy.FareStrategy;
import com.ridemate.ridemate.strategy.NormalStrategy;
import com.ridemate.ridemate.strategy.PoolFareStrategy;
import com.ridemate.ridemate.strategy.SurgeFareStrategy;

@Service
public class RideService {
    private final RideEventObservable observable = new RideEventObservable();

    public RideService() {
        observable.addObserver(new AdminLogger());
        observable.addObserver(new UserNotifier());

    }

    public Ride bookRide(RideRequest rideRequest) {
        FareStrategy fareStrategy = getStrategy(rideRequest.getFareType());
        double fare = fareStrategy.calculateFare(rideRequest.getDistanceInKm());

        Ride ride = new Ride(rideRequest.getDistanceInKm(), fare, rideRequest.getFareType());
        observable.notifyObservers("ride booked - distance: " + ride.getDistanceInKm() + " km, Fare: ₹" + fare);
        return ride;

    }

    public String cancelRide() {
        observable.notifyObservers("Ride has been cancelled.");
        return "Ride cancelled successfully.";
    }

    public FareStrategy getStrategy(String fareType) {
        return switch (fareType.toUpperCase()) {
            case "SURGE" -> new SurgeFareStrategy();
            case "POOL" -> new PoolFareStrategy();
            default -> new NormalStrategy();

        };
    }
    public double estimateFare(double distance, String fareType) {
        FareStrategy strategy = getStrategy(fareType); // your strategy logic
        return strategy.calculateFare(distance);
    }
    
}
