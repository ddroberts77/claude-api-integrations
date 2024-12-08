/**
 * Performance testing script for Claude API integration
 */
const ClaudeClient = require('../src/claude-client');

async function runPerformanceTests() {
  console.log('Running performance tests...');
  
  const metrics = {
    timestamp: new Date().toISOString(),
    tests: []
  };

  // Basic latency test
  const start = Date.now();
  try {
    const client = new ClaudeClient(process.env.CLAUDE_API_KEY);
    await client.sendMessage('Hello');
    metrics.tests.push({
      name: 'API Latency',
      duration: Date.now() - start,
      status: 'success'
    });
  } catch (error) {
    metrics.tests.push({
      name: 'API Latency',
      status: 'failed',
      error: error.message
    });
  }

  console.log('Performance test results:', JSON.stringify(metrics, null, 2));
  return metrics;
}

if (require.main === module) {
  runPerformanceTests().catch(console.error);
}

module.exports = runPerformanceTests;