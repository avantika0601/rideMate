package com.ridemate.ridemate.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ridemate.ridemate.model.Ride;
import com.ridemate.ridemate.model.RideRequest;
import com.ridemate.ridemate.service.RideService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/rides")
public class RideController {

    @Autowired
    private RideService rideService;

    @PostMapping("/book")
    public Ride bookRide(@RequestBody @Valid RideRequest rideRequest) {
        return rideService.bookRide(rideRequest);
    }

    @PostMapping("/cancel")
    public String cancelRide() {
        return rideService.cancelRide();
    }

    @GetMapping("/estimate")
    public Map<String, Double> estimateFare(
            @RequestParam double distance,
            @RequestParam String fareType) {
        double estimatedFare = rideService.estimateFare(distance, fareType);
        return Map.of("estimatedFare", estimatedFare);
    }

}
