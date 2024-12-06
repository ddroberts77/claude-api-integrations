# Claude API Integrations

This repository contains various integrations and tools for working with Claude's API, including Firebase integration, job assistance applications, and various extensions.

## Project Structure

- `firebase_integration.py`: Firebase integration module for Claude API
- `job-assist-app/`: Job assistance application using Claude API
- `extensions/`: Various Claude API extensions and utilities

## Getting Started

### Prerequisites

- Node.js and npm installed
- Python 3.x installed
- Firebase account (for Firebase integration)
- Claude API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ddroberts77/claude-api-integrations.git
cd claude-api-integrations
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
- Create a `.env` file with your API keys and configuration
- See `.env.example` for required variables

## Firebase Integration

The Firebase integration module (`firebase_integration.py`) allows you to:
- Store Claude API responses in Firebase
- Manage user authentication
- Handle real-time updates

See the [Firebase Integration Guide](./docs/firebase-integration.md) for detailed setup and usage instructions.

## Job Assist App

The job assistance application helps users with:
- Resume analysis
- Job description matching
- Interview preparation

Documentation for the job assist app can be found in the [job-assist-app directory](./job-assist-app/README.md).

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
