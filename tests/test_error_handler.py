import pytest
import time
from unittest.mock import patch
from src.utils.error_handler import (
    retry_with_backoff,
    log_api_call,
    APIError,
    RateLimitError,
    AuthenticationError
)

def test_retry_with_backoff_success():
    call_count = 0
    
    @retry_with_backoff(max_retries=3)
    def mock_api_call():
        nonlocal call_count
        call_count += 1
        return "success"
    
    result = mock_api_call()
    assert result == "success"
    assert call_count == 1

def test_retry_with_backoff_rate_limit():
    call_count = 0
    
    @retry_with_backoff(max_retries=3, base_delay=0.1)
    def mock_api_call():
        nonlocal call_count
        call_count += 1
        if call_count < 3:
            raise RateLimitError("Rate limit exceeded")
        return "success"
    
    result = mock_api_call()
    assert result == "success"
    assert call_count == 3

def test_retry_with_backoff_auth_error():
    @retry_with_backoff(max_retries=3)
    def mock_api_call():
        raise AuthenticationError("Invalid API key")
    
    with pytest.raises(AuthenticationError):
        mock_api_call()

def test_log_api_call(caplog):
    @log_api_call
    def mock_api_call(param):
        return f"success: {param}"
    
    result = mock_api_call("test")
    assert result == "success: test"
    assert "Calling mock_api_call" in caplog.text
    assert "completed successfully" in caplog.text