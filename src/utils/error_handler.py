import time
import logging
from functools import wraps
from typing import Callable, Any, Optional

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class APIError(Exception):
    """Base exception for API errors"""
    def __init__(self, message: str, status_code: Optional[int] = None):
        self.message = message
        self.status_code = status_code
        super().__init__(self.message)

class RateLimitError(APIError):
    """Raised when API rate limit is exceeded"""
    pass

class AuthenticationError(APIError):
    """Raised when API authentication fails"""
    pass

def retry_with_backoff(max_retries: int = 3, base_delay: float = 1.0):
    """Decorator that implements exponential backoff for retrying failed API calls
    
    Args:
        max_retries (int): Maximum number of retry attempts
        base_delay (float): Base delay between retries in seconds
    """
    def decorator(func: Callable) -> Callable:
        @wraps(func)
        def wrapper(*args, **kwargs) -> Any:
            retries = 0
            while retries < max_retries:
                try:
                    return func(*args, **kwargs)
                except RateLimitError as e:
                    delay = base_delay * (2 ** retries)
                    logger.warning(f"Rate limit exceeded. Retrying in {delay} seconds...")
                    time.sleep(delay)
                    retries += 1
                except AuthenticationError:
                    logger.error("Authentication failed")
                    raise
                except APIError as e:
                    if retries == max_retries - 1:
                        logger.error(f"Max retries ({max_retries}) reached. Last error: {str(e)}")
                        raise
                    delay = base_delay * (2 ** retries)
                    logger.warning(f"API call failed. Retrying in {delay} seconds...")
                    time.sleep(delay)
                    retries += 1
            return None
        return wrapper
    return decorator

def log_api_call(func: Callable) -> Callable:
    """Decorator to log API calls and their outcomes"""
    @wraps(func)
    def wrapper(*args, **kwargs) -> Any:
        try:
            logger.info(f"Calling {func.__name__} with args: {args}, kwargs: {kwargs}")
            result = func(*args, **kwargs)
            logger.info(f"{func.__name__} completed successfully")
            return result
        except Exception as e:
            logger.error(f"Error in {func.__name__}: {str(e)}")
            raise
    return wrapper