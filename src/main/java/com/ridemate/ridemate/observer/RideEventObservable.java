package com.ridemate.ridemate.observer;

import java.util.ArrayList;
import java.util.List;

public class RideEventObservable {
private List<RideEventObserver> observers = new ArrayList<>();

public void addObserver(RideEventObserver observer){
observers.add(observer);
}

public void notifyObservers(String event){
    for(RideEventObserver observer: observers){
        observer.update(event);
    }
}

}
