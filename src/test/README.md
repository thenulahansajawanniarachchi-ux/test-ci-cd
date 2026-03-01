# Test Structure

This directory contains all test cases for the React application, organized by type:

## Directory Structure

```
src/test/
├── setup.js                    # Global test setup file
├── unit_tests/                 # Unit tests for individual components
│   ├── Login.test.jsx         # Tests for Login component
│   └── Home.test.jsx          # Tests for Home component
├── integration_tests/         # Integration tests for component interactions
│   └── App.test.jsx           # Tests for App component and routing
└── ui_tests/                   # End-to-end UI tests for user journeys
    └── user-journey.test.jsx  # Complete user flow tests
```

## Test Types

### Unit Tests (`unit_tests/`)
- Test individual components in isolation
- Focus on component logic, rendering, and user interactions
- Mock external dependencies
- Fast and focused tests

### Integration Tests (`integration_tests/`)
- Test how multiple components work together
- Test routing and navigation
- Test state management between components
- Medium complexity tests

### UI Tests (`ui_tests/`)
- End-to-end user journey tests
- Test complete user workflows
- Test application behavior from user perspective
- Higher-level tests that cover multiple features

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in watch mode
```bash
npm run test:watch
```

### Run specific test types
```bash
# Run only unit tests
npm run test:unit

# Run only integration tests
npm run test:integration

# Run only UI tests
npm run test:ui
```

### Run tests with coverage
```bash
npm run test:coverage
```

## Test Dependencies

- **Vitest**: Test runner
- **@testing-library/react**: React testing utilities
- **@testing-library/jest-dom**: Custom matchers for DOM assertions
- **@testing-library/user-event**: Simulate user interactions
- **jsdom**: DOM environment for testing

## Writing New Tests

1. **Unit Tests**: Place in `unit_tests/` for individual component testing
2. **Integration Tests**: Place in `integration_tests/` for component interaction testing
3. **UI Tests**: Place in `ui_tests/` for end-to-end user journey testing

Follow the existing test patterns and naming conventions:
- Use `*.test.jsx` or `*.spec.jsx` naming
- Group related tests in `describe` blocks
- Use descriptive test names
- Clean up after each test with `afterEach(cleanup)`
