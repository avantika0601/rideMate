package com.ridemate.ridemate.strategy;

public class SurgeFareStrategy implements FareStrategy{
    public double calculateFare(double distance){
        return distance*15;
    }

}
