from typing import Dict, Any
import requests
import os
from datetime import datetime

class OpenWeatherAPI:
    def __init__(self):
        self.api_key = os.getenv('OPENWEATHER_API_KEY', 'fc2fa6a317f55f7055185a1bad6e355e')
        self.base_url = 'http://api.openweathermap.org/data/2.5'

    def get_current_weather(self, city: str, units: str = 'metric') -> Dict[str, Any]:
        endpoint = f'{self.base_url}/weather'
        params = {
            'q': city,
            'appid': self.api_key,
            'units': units
        }
        return self._make_request(endpoint, params)

    def get_forecast(self, city: str, days: int = 5, units: str = 'metric') -> Dict[str, Any]:
        endpoint = f'{self.base_url}/forecast'
        params = {
            'q': city,
            'appid': self.api_key,
            'units': units,
            'cnt': days * 8
        }
        return self._make_request(endpoint, params)

    def get_air_quality(self, lat: float, lon: float) -> Dict[str, Any]:
        endpoint = f'{self.base_url}/air_pollution'
        params = {
            'lat': lat,
            'lon': lon,
            'appid': self.api_key
        }
        return self._make_request(endpoint, params)

    def _make_request(self, endpoint: str, params: Dict[str, Any]) -> Dict[str, Any]:
        try:
            response = requests.get(endpoint, params=params, timeout=10)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            return {'error': str(e)}