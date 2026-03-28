export async function fetchWeather(lat: number, lon: number) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
  
  try {
    const res = await fetch(url);
    
    if (!res.ok) {
      throw new Error(`Weather API failed with status ${res.status}`);
    }
    
    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error(`Error in fetchWeather: ${error.message}`);
    throw error;
  }
}
