#!/bin/bash

# Create test directories
mkdir -p coverage

# Install test dependencies
npm install -D jest @types/jest ts-jest

# Initialize test config if not exists
if [ ! -f jest.config.js ]; then
  npx ts-jest config:init
fi

# Add test scripts to package.json if not present
node -e '
const fs = require("fs");
const package = JSON.parse(fs.readFileSync("package.json"));
package.scripts = package.scripts || {};
package.scripts.test = package.scripts.test || "jest";
package.scripts["test:watch"] = "jest --watch";
package.scripts["test:coverage"] = "jest --coverage";
fs.writeFileSync("package.json", JSON.stringify(package, null, 2));
'

echo "Test setup complete!"