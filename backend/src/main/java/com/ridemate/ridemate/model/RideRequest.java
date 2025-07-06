package com.ridemate.ridemate.model;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RideRequest {

    @Min(value = 1, message = "Distance must be at least 1 km")
    private double distanceInKm;

    @NotBlank(message = "Fare type is required")
    private String fareType;
}
