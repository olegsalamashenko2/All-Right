# QA Automation Project

Automated UI and REST API testing using Playwright and TypeScript.

## Technologies

- Playwright
- TypeScript
- Node.js
- GitHub Actions

## Installation

Clone the repository and install dependencies:

```bash
npm install
npx playwright install
```

## Running Tests

Run all tests:

```bash
npx playwright test
```

Run API tests:

```bash
npx playwright test tests/api.spec.ts
```

Run UI tests:

```bash
npx playwright test tests/example.spec.ts
```

View the HTML test report:

```bash
npx playwright show-report
```

## Test Coverage

### API Testing — Restful Booker

- Authentication with valid and invalid credentials.
- Booking creation.
- Booking updates.
- Booking deletion.
- Verification of booking deletion.
- Booking update without authentication.

### UI Testing — SauceDemo

- Successful user authentication.
- Login with invalid credentials.
- Login attempt with a locked-out user.
- Product catalog verification.
- Product sorting by price.
- Adding and removing products from the shopping cart.
- Successful checkout process.
- Validation of the required First Name field.

## Test Reports

Playwright generates an HTML report after test execution.

The report can be opened locally using:

```bash
npx playwright show-report
```

GitHub Actions also runs automated tests on push and supports manual workflow execution. Test reports are uploaded as workflow artifacts.

## Bugs

No confirmed defects were identified during the execution of the automated test suite.

## Project Structure

The project uses the Page Object Model (POM) pattern to organize UI tests and separates API testing logic from UI automation.