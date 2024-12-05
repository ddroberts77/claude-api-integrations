import requests
from typing import Dict, Any

class OpenWeatherClient:
    def __init__(self):
        self.api_key = "fc2fa6a317f55f7055185a1bad6e355e"
        self.base_url = "http://api.openweathermap.org/data/2.5"
    
    def get_current_weather(self, city: str) -> Dict[str, Any]:
        url = f"{self.base_url}/weather"
        params = {
            "q": city,
            "appid": self.api_key,
            "units": "metric"
        }
        return self._make_request(url, params)
    
    def get_forecast(self, city: str, days: int = 5) -> Dict[str, Any]:
        url = f"{self.base_url}/forecast"
        params = {
            "q": city,
            "appid": self.api_key,
            "units": "metric",
            "cnt": days * 8
        }
        return self._make_request(url, params)
    
    def _make_request(self, url: str, params: Dict[str, Any]) -> Dict[str, Any]:
        try:
            response = requests.get(url, params=params)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            return {"error": str(e)}