interface WeatherCity {
  City: string;
}

interface WeatherCondition {
  day_weather: string;
  day_weather_short: string;
}

export interface WeatherResponse {
  result: {
    city: WeatherCity;
    condition: WeatherCondition;
  };
}
