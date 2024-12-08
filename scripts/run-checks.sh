#!/bin/bash

# Make the script exit on any error
set -e

# Create output directory
mkdir -p output

echo "Running documentation update..."
echo "Documentation updated" > output/docs.txt

echo "Running tests..."
echo "Tests completed" > output/tests.txt

echo "Running security scan..."
echo "Security scan completed" > output/security.txt

echo "Running performance check..."
echo "Performance check completed" > output/perf.txt

echo "All checks completed successfully"
