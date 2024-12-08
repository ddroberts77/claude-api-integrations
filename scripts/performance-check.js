const ClaudeClient = require('../src/claude-client');

async function runPerformanceTests() {
  console.log('Starting performance tests...');
  
  const metrics = {
    timestamp: new Date().toISOString(),
    results: [],
    summary: {}
  };

  // Skip actual API calls if no key provided
  const apiKey = process.env.CLAUDE_API_KEY;
  if (!apiKey) {
    console.log('No API key provided - running in mock mode');
    metrics.results.push({
      name: 'API Response Time',
      status: 'skipped',
      reason: 'No API key provided'
    });
    return metrics;
  }

  try {
    const client = new ClaudeClient(apiKey);
    
    // Test 1: Basic Response Time
    console.log('Testing basic response time...');
    const start = Date.now();
    await client.sendMessage('Hello');
    const duration = Date.now() - start;
    
    metrics.results.push({
      name: 'API Response Time',
      duration: duration,
      status: 'success',
      timestamp: new Date().toISOString()
    });

    // Test 2: Streaming Performance
    console.log('Testing streaming performance...');
    const streamStart = Date.now();
    const stream = await client.streamMessage('Hello');
    let chunkCount = 0;
    
    for await (const chunk of stream) {
      chunkCount++;
    }
    
    metrics.results.push({
      name: 'Streaming Performance',
      duration: Date.now() - streamStart,
      chunkCount,
      status: 'success',
      timestamp: new Date().toISOString()
    });

    // Calculate summary statistics
    metrics.summary = {
      totalTests: metrics.results.length,
      successfulTests: metrics.results.filter(r => r.status === 'success').length,
      averageDuration: metrics.results.reduce((acc, r) => acc + (r.duration || 0), 0) / metrics.results.length
    };

  } catch (error) {
    console.error('Performance test error:', error);
    metrics.results.push({
      name: 'API Tests',
      status: 'error',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }

  console.log('Performance test results:', JSON.stringify(metrics, null, 2));
  return metrics;
}

if (require.main === module) {
  runPerformanceTests().catch(console.error);
}

module.exports = runPerformanceTests;