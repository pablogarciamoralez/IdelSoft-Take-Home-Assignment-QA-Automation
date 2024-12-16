IdelSoft Take-Home Assignment - Cypress E2E Tests

Project Overview
    This project is an end-to-end (E2E) test automation framework built using Cypress to test the Magento eCommerce website. The framework includes UI and API tests, reusable custom commands, external test data, multi-environment support, automatic test reporting, and containerized execution.

Features Implemented
    *Page Object Model (POM) for UI elements and actions.
    *Custom Cypress commands for reusable steps.
    *External test data management using JSON files.
    *Multi-browser and multi-environment support.
    *Automatic screenshots and video recordings on test failures.
    *Test reporting using Mochawesome (HTML and JSON).
    *Retry mechanism for flaky tests.
    *Containerized execution using Docker.
    *GitHub Actions CI/CD integration with manual execution support using tags.

Test Scenarios Covered
    *User Registration and Login
        -New user registration
        -Failed login validations

    *Product Search and Sorting
        -Search functionality
        -Sorting by price and name in ascending and descending order

    *Shopping Cart Management
        -Add products to the cart
        -Validate cart details

    *Checkout Process
        -Complete checkout flow with frontend and backend validations

    *User Profile Operations
        -Change password


Setup Instructions

    *Prerequisites
        Node.js (v18 or later)
        Docker (optional for containerized execution)
        Git

    *Local Execution
        1.Clone the repository:
            git clone https://github.com/<your-username>/<repo-name>.git
            cd <repo-name>

        2.Install dependencies:
            npm install

        3.Run tests locally:
            *All tests:
                npx cypress run
            *Specific group (e.g., shopping):
                npx cypress run --env grep=shopping
            *Open Cypress Test Runner:
                npx cypress open

Containerized Execution with Docker
    1.Build the Docker image:
        docker build -t cypress-tests .
    2.Run the tests inside the container:
        docker run cypress-tests

CI/CD with GitHub Actions
    1.Automatic Execution:
        Tests run automatically on every push to the main branch.
    2.Manual Execution:
        *Go to the Actions tab in your GitHub repository.
        *Select Run Workflow and input a tag (e.g., shopping or sorting) to run specific tests.
    3.Reports and Artifacts:
        *Test results and artifacts are uploaded to the Actions tab.

Key Commands
    *Install dependencies:
        npm install
    *Run tests locally in headless mode:
        npx cypress run
    *Open Cypress Test Runner:
        npx cypress open
    *Build Docker image:
        docker build -t cypress-tests .
    *Run tests in Docker:
        docker run cypress-tests

Dockerfile Used

    FROM cypress/included:13.16.0

    WORKDIR /app
    COPY . .

    RUN npm install
    CMD ["npx", "cypress", "run"]

Conclusion
    This framework is robust, scalable, and includes all required features such as POM, custom commands, test reporting, Docker support, and CI/CD integration. It ensures efficient and reliable end-to-end test automation for the Magento eCommerce platform.
