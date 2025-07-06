package com.ridemate.ridemate.strategy;

public class PoolFareStrategy implements FareStrategy{
    public double calculateFare(double distance){
        return distance*7;
    }

}
