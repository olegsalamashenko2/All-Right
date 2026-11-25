# AI Worklog

## 1. AI Agent Instructions

AI was used as a development assistant throughout the project to help with test implementation, code refactoring, debugging, and CI/CD configuration.

The following instructions were used to guide the agent:

- Follow the existing project structure and coding conventions.
- Use Playwright with TypeScript for UI and API automation.
- Follow the Page Object Model (POM) pattern for UI tests.
- Keep API tests independent from UI fixtures.
- Use reusable components for elements shared across multiple pages.
- Use DTOs to structure API request payloads.
- Do not delete existing tests when modifying or refactoring code.
- Avoid unnecessary variables, duplicated code, and overcomplicated abstractions.
- Explain architectural changes before implementing them.
- Preserve existing test functionality when refactoring.
- Verify generated code by running tests and reviewing the results.

## 2. Key Prompts

The following prompts were used during development:

**Project Architecture**

"Review the existing project structure and help organize UI automation using the Page Object Model pattern. Keep page objects, fixtures, components, and test files properly separated."

**API Test Implementation**

"Implement API tests for the Restful Booker API using Playwright. Cover authentication, booking creation, updating, and deletion. Keep API tests independent from UI fixtures."

**Code Refactoring**

"Review the existing implementation and identify opportunities to improve maintainability. Use DTOs for API request data and avoid unnecessary abstractions. Do not remove existing tests."

**Reusable Components**

"Identify elements shared across multiple pages and extract them into reusable components. Update the corresponding Page Objects and test references without changing test behavior."

**CI/CD Configuration**

"Create a GitHub Actions workflow that runs Playwright tests on every push and supports manual execution. Upload the HTML test report as a workflow artifact."

## 3. AI Agent Mistakes and Human Review

During development, several AI-generated solutions required manual corrections.

### 1. Incorrect Project Directory

**AI mistake:** The agent suggested executing project setup commands from the wrong directory, resulting in files being created outside the repository.

**How I detected it:** I checked the PowerShell working directory and noticed that generated files were located outside the project folder.

**Correction:** Removed the misplaced files and repeated the setup from the correct repository directory.

### 2. Incorrect Fixture Usage

**AI mistake:** The agent suggested importing the custom UI fixture into an API test.

**How I detected it:** I reviewed the imports and noticed that the API test depended on UI-related fixtures unnecessarily.

**Correction:** Used the standard Playwright test import for API tests, keeping API and UI testing independent.

### 3. Existing Test Was Removed During Refactoring

**AI mistake:** While introducing DTOs for API request data, the agent accidentally removed an existing authorization test.

**How I detected it:** I compared the updated test file with the previous implementation and noticed that the authorization test was missing.

**Correction:** Restored the test and verified that both authorization and booking tests remained in the project.

### 4. Unnecessary DTO Abstraction

**AI mistake:** The agent introduced a DTO interface but kept the actual request payload inside the test file. This did not provide a meaningful improvement in code organization.

**How I detected it:** I reviewed the refactoring and questioned the practical purpose of introducing a DTO if the test data was still defined inline.

**Correction:** Reorganized the implementation to separate the DTO definition, test data, and test logic.

### 5. Incorrect GitHub Actions Workflow Location

**AI mistake:** The agent suggested placing the workflow file inside `.git/workflows` instead of `.github/workflows`.

**How I detected it:** I checked the repository structure and verified the required GitHub Actions directory.

**Correction:** Moved the workflow file to `.github/workflows/playwright.yml` and verified that the workflow executed successfully.