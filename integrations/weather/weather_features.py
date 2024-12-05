from typing import Dict, Any
import requests
from datetime import datetime, timedelta

class WeatherFeatures:
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.base_url = "http://api.openweathermap.org/data/2.5"
    
    def get_historical(self, lat: float, lon: float, start: datetime) -> Dict:
        unix_time = int(start.timestamp())
        endpoint = f"{self.base_url}/onecall/timemachine"
        params = {
            "lat": lat,
            "lon": lon,
            "dt": unix_time,
            "appid": self.api_key
        }
        return self._make_request(endpoint, params)
    
    def get_alerts(self, lat: float, lon: float) -> Dict:
        endpoint = f"{self.base_url}/onecall"
        params = {
            "lat": lat,
            "lon": lon,
            "exclude": "current,minutely,hourly,daily",
            "appid": self.api_key
        }
        return self._make_request(endpoint, params)

    def search_locations(self, query: str) -> Dict:
        endpoint = "http://api.openweathermap.org/geo/1.0/direct"
        params = {
            "q": query,
            "limit": 5,
            "appid": self.api_key
        }
        return self._make_request(endpoint, params)

    def _make_request(self, endpoint: str, params: Dict) -> Dict:
        try:
            response = requests.get(endpoint, params=params, timeout=10)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            return {"error": str(e), "status": "error"}