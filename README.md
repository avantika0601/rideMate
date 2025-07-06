# RideMate – Fullstack App (React + Spring Boot)

![Build](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![Made With](https://img.shields.io/badge/made%20with-Java%20%7C%20React-blueviolet)
![Status](https://img.shields.io/badge/status-active-success)

This project provides a clean and scalable fullstack setup using **React + Vite** for the frontend and **Spring Boot (Java)** for the backend. It showcases real-world application of design patterns like **Strategy** and **Observer**.

Features include:

- 🚗 Book and cancel rides
- 💸 Dynamic fare estimation based on ride type
- 🧠 Strategy Pattern for fare calculation
- 👀 Observer Pattern for live log updates
- 🎨 Fully responsive, animated UI with TailwindCSS

---

## Technologies Used

- Frontend: React, Vite, Tailwind CSS, Framer Motion
- Backend: Java, Spring Boot, REST API
- Patterns: Strategy (fare logic), Observer (log updates)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/avantika0601/rideMate.git
cd rideMate
```

---

### 2. Start the Backend

```bash
cd backend
./mvnw spring-boot:run
```

The backend server will start at:  
📍 `http://localhost:8080`

#### Available APIs

- `POST /api/rides/book` → Book a ride  
- `POST /api/rides/cancel` → Cancel a ride

#### Sample Request

```json
{
  "distanceInKm": 10,
  "fareType": "SURGE"
}
```

#### Sample Response

```json
{
  "fare": 200.0,
  "fareType": "SURGE",
  "timestamp": "2025-07-06T15:30:00"
}
```

---

### 3. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will run at:  
🌐 `http://localhost:5173`

#### UI Features

- 🚀 Smooth ride booking and cancellation interface
- 📊 Fare preview before booking
- 🔁 Animated logs using React Context API (Observer)
- 📱 Responsive layout with TailwindCSS and Framer Motion

---

## Project Structure

```
rideMate/
├── frontend/                 # React + Vite App
│   ├── src/
│   │   ├── components/       # RideForm, RideLog
│   │   ├── context/          # RideContext (Observer)
│   │   ├── App.jsx
│   │   └── main.jsx
├── backend/                  # Spring Boot App
│   ├── controller/           # RideController.java
│   ├── model/                # RideRequest.java, Ride.java
│   ├── service/              # RideService.java
│   ├── strategy/             # Strategy Pattern for fare
│   ├── observer/             # LoggerSubject + LogObserver
│   └── RideMateApplication.java
```

---

## Design Patterns

### 🧠 Strategy Pattern (Backend)

Fare logic is encapsulated in interchangeable classes:

- `NormalFareStrategy`: ₹10/km  
- `SurgeFareStrategy`: ₹15/km  
- `PoolFareStrategy`: ₹7/km

The appropriate strategy is selected at runtime using a factory.

```java
FareStrategy strategy = strategyFactory.getStrategy(fareType);
return strategy.calculateFare(distanceInKm);
```

---

### 👁️ Observer Pattern (Frontend)

Used to manage and update ride activity logs dynamically.

- Implemented using React’s Context API
- Components subscribe to ride state and log updates
- Mimics real-time ride status tracking in the UI

---

## Validation

Handled using `jakarta.validation` in the backend:

```java
public class RideRequest {
    @Min(1)
    private double distanceInKm;

    @NotBlank
    private String fareType;
}
```

Errors are centrally handled using `@ControllerAdvice`.

---

## .gitignore Highlights

```gitignore
# Frontend
/node_modules
/package-lock.json

# Backend
/target
*.log
.idea
*.iml
```

---

## Future Enhancements

- 🌍 Google Maps integration for pickup location
- 🔐 User login and ride history
- 🔔 WebSocket for live ride status
- 💳 Online payment integration

---
