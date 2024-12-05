import requests
import json

class OpenWeatherMapAPI:
    def __init__(self, api_key):
        self.api_key = api_key
        self.base_url = "http://api.openweathermap.org/data/2.5"
    
    def get_current_weather(self, city):
        endpoint = f"{self.base_url}/weather"
        params = {
            "q": city,
            "appid": self.api_key,
            "units": "metric"
        }
        response = requests.get(endpoint, params=params)
        return response.json()
    
    def get_forecast(self, city, days=5):
        endpoint = f"{self.base_url}/forecast"
        params = {
            "q": city,
            "appid": self.api_key,
            "units": "metric",
            "cnt": days * 8  # 8 readings per day
        }
        response = requests.get(endpoint, params=params)
        return response.json()