import mongoose from 'mongoose';

const weatherSchema = new mongoose.Schema({
    
  latitude: Number,
  longitude: Number,
  generationtime_ms: Number,
  utc_offset_seconds: Number,
  timezone: String,
  timezone_abbreviation: String,
  elevation: Number,
  current_weather: {
    temperature: Number,
    windspeed: Number,
    winddirection: Number,
    weathercode: Number,
    is_day: Number,
    time: String
  },
  hourly_units: {
    time: String,
    temperature_2m: String,
    relativehumidity_2m: String,
    windspeed_10m: String
  },
  hourly: {
    time: Array,
    temperature_2m: Array,
    relativehumidity_2m: Array,
    windspeed_10m: Array
  }
}
)

const Weather = mongoose.model('weather',weatherSchema)

export default Weather