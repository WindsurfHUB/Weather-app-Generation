# 🌤️ Advanced Weather App (Open-Meteo)

A robust, modular weather application built with Node.js, utilizing the **Open-Meteo API** for high-accuracy geocoding and forecasting. This project follows the **TRACI Framework** for high-quality software output.

## 🚀 Features

- **Geocoding Bridge Protocol**: Automatically converts city names to precise coordinates.
- **TRACI Standard Implementation**: Modular, documented, and error-resilient code.
- **Human-Readable Weather**: Maps WMO codes (e.g., `0`, `51`) to friendly descriptions (e.g., "Clear sky", "Light drizzle").
- **Zero Hardcoding**: Environment-ready configuration.
- **Built-in Testing**: Comprehensive suite for positive, negative, and edge cases.

## 📁 Project Structure

```text
/src        # Core logic and API handlers (Geocoding Bridge)
/assets     # CSS and Icons (UI expansion)
/tests      # Unit and Edge case tests
.env        # Security: API Key storage (Excluded from VCS)
index.js    # Main entry point
package.json # Project dependencies and scripts
```

## 🛠️ Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd weather-app
   ```

2. **Install dependencies**:
   *(Note: This project uses native `fetch` and Node's built-in test runner, so no heavy dependencies are required for the core logic.)*
   ```bash
   npm install
   ```

3. **Environment Configuration**:
   Create a `.env` file (already initialized in the structure) for any future private API keys or configuration.

## 📖 Usage

To fetch the current weather for the default city (Bangkok):
```bash
node index.js
```

### Integration Example
```javascript
import { getWeather } from './src/weather.js';

const data = await getWeather("London");
console.log(data); 
// Output: { city: 'London', temp_c: 12.5, description: 'Partly cloudy', humidity: 65, wind_speed: 10.2 }
```

## 🧪 Testing

The project uses the native Node.js test runner. To run the full suite:
```bash
npm test
```

**Tested Scenarios:**
- ✅ **Positive**: Valid city retrieval (Bangkok).
- ❌ **Negative**: Non-existent city handling.
- ⚠️ **Edge Case**: Empty string and invalid input validation.

## 🛡️ Compliance & Standards

- **Geocoding Bridge**: Implements the required two-step fetch (Search -> Extract -> Forecast).
- **Security**: `.env` and `node_modules` are excluded via `.gitignore`.
- **Documentation**: Functions follow JSDoc standards for clarity and maintainability.

## 📝 License
This project is licensed under the MIT License.
