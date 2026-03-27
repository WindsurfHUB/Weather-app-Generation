# Weather Report App (TypeScript)

A modern, easy-to-use weather application for Chiang Mai using the Open-Meteo API.

## Project Structure

- `src/api/`: API call handling (Open-Meteo).
- `src/models/`: TypeScript interfaces/types.
- `src/services/`: Business logic and data processing.
- `src/utils/`: Helper functions (formatting, conversion).
- `src/ui/`: Display logic (Console).
- `src/config/`: Application constants (Chiang Mai coordinates).
- `src/index.ts`: Application entry point.

## Features

- Fetches real-time weather data for Chiang Mai.
- Displays temperature in both Celsius and Fahrenheit.
- Includes input validation and edge case handling for temperature conversions.
- Modern console UI.

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

Run the application using:
```bash
npm start
```

## Technologies Used

- TypeScript
- Open-Meteo API
- ts-node
