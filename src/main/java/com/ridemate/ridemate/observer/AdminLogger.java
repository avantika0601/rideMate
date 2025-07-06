package com.ridemate.ridemate.observer;

public class AdminLogger implements RideEventObserver {

    @Override
    public void update(String event) {
        System.out.println("[ADMIN LOG] " + event);
    }

}
