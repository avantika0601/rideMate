package com.ridemate.ridemate.observer;

public class UserNotifier implements RideEventObserver {

    @Override
    public void update(String event) {
        System.out.println("[USER NOTIFICATION]: " + event);
    }

}
