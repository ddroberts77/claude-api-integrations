import pytest
from integrations.weather.openweather import OpenWeatherClient

def test_weather_client():
    client = OpenWeatherClient()
    response = client.get_current_weather("London")
    assert not response.get("error")