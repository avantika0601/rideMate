package com.ridemate.ridemate.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Ride {
private double distanceInKm;
private double fare;
private String fareType;

}
