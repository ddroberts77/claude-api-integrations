import requests
from typing import Dict, Any
from datetime import datetime
import logging

class EnhancedAPI:
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.logger = logging.getLogger(__name__)
        
    def handle_request(self, url: str, params: Dict[str, Any]) -> Dict:
        try:
            response = requests.get(url, params=params)
            response.raise_for_status()
            return response.json()
        except Exception as e:
            self.logger.error(f"API error: {str(e)}")
            return {"error": str(e)}