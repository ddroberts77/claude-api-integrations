# Claude API Integrations

A comprehensive toolkit for integrating Claude's AI capabilities into your applications. This monorepo contains various integrations and tools for working with Claude's API.

## 🚀 Features

- 🔥 **Firebase Integration**: Store and manage Claude API responses in Firebase
- 💼 **Job Assistant**: AI-powered job application and career tools
- 🧰 **Extensions**: Various utilities and helpers for Claude API

## 📋 Prerequisites

- Node.js 16.x or higher
- npm 7.x or higher
- Firebase account (for Firebase integration)
- Claude API key

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/ddroberts77/claude-api-integrations.git
cd claude-api-integrations
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your credentials
```

4. Build all packages:
```bash
npm run build
```

## 📦 Packages

### Firebase Integration

Integrate Claude API with Firebase for data persistence and real-time updates.

```bash
cd packages/firebase-integration
npm install
npm run build
```

[Read Firebase Integration Documentation](./packages/firebase-integration/README.md)

### Job Assistant

AI-powered tools for job applications and career development.

```bash
cd packages/job-assist-app
npm install
npm run build
```

[Read Job Assistant Documentation](./packages/job-assist-app/README.md)

### Extensions

Utility functions and helpers for Claude API integration.

```bash
cd packages/extensions
npm install
npm run build
```

[Read Extensions Documentation](./packages/extensions/README.md)

## 🧪 Testing

Run tests across all packages:
```bash
npm test
```

Run tests for a specific package:
```bash
cd packages/<package-name>
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

Please read our [Contributing Guide](./CONTRIBUTING.md) for details on our development process and coding standards.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔒 Security

For security concerns, please review our [Security Policy](./SECURITY.md).

## 📚 Documentation

- [API Reference](./docs/api/README.md)
- [Firebase Integration Guide](./docs/firebase-integration/README.md)
- [Job Assistant Guide](./docs/job-assist-app/README.md)
- [Extensions Guide](./docs/extensions/README.md)

## 🆘 Support

If you need help or have questions:
- Open an issue
- Check existing documentation
- Review closed issues for similar problems