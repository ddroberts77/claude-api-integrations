# Contributing to Claude API Integrations

## Development Process

1. **Fork & Clone**
   ```bash
   git clone https://github.com/yourusername/claude-api-integrations.git
   cd claude-api-integrations
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature
   ```

4. **Development Standards**
   - Write tests for new features
   - Follow TypeScript best practices
   - Use ESLint and Prettier
   - Keep commits atomic and descriptive

5. **Testing**
   ```bash
   npm test
   npm run lint
   ```

6. **Submit PR**
   - Use clear PR titles
   - Reference issues
   - Include comprehensive descriptions

## Code Style

- Use TypeScript
- Follow ESLint rules
- Use meaningful variable names
- Add JSDoc comments for public APIs
- Keep functions small and focused

## Testing Guidelines

- Write unit tests with Jest
- Maintain high coverage
- Test edge cases
- Mock external services

## Documentation

- Update README.md when needed
- Document new features
- Include code examples
- Keep API documentation current

## Review Process

1. Automated checks must pass
2. Code review required
3. Documentation review
4. Security review for sensitive changes

## Questions?

Open an issue for clarification.