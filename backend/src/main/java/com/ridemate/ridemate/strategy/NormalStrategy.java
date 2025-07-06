package com.ridemate.ridemate.strategy;

public class NormalStrategy implements FareStrategy {
    public double calculateFare(double distance) {
        return distance * 10;
    }
}
