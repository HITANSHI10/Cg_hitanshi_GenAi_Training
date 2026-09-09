# Sauce Demo QA Test Plan

## Application Overview

## Document Information

- Document: Sauce Demo QA Test Plan
- Application: Sauce Demo / Swag Labs
- Version: 1.0
- Date: 2026-09-07
- Author: QA Engineering
- Status: Draft for review
- Source repository: Playwright Agents

## Introduction

This document defines the quality approach for the Sauce Demo e-commerce sample application and records the boundary between automation that exists today and coverage that is planned. It is based on the live application and repository inspection. Existing automation code is not modified by this document.

## Application Overview

Sauce Demo is a browser-based shopping application. The observed flow includes login, product inventory, product detail, sorting, cart management, checkout, menu navigation, logout, and reset-app-state behavior. The live login page documents standard_user, locked_out_user, problem_user, performance_glitch_user, error_user, and visual_user, all using secret_sauce.

## Test Objectives

1. Confirm that supported users can authenticate or receive the correct validation response.
2. Verify product catalog presentation, sorting, product details, cart behavior, and checkout.
3. Verify session navigation, logout, direct-access protection, and state reset.
4. Establish traceable coverage without claiming planned scenarios are implemented.
5. Provide a maintainable Playwright-oriented baseline for future expansion.

## Scope

The scope covers the user-visible Sauce Demo web application and the Playwright Test project in this repository.

## In Scope

Authentication, login validation, documented user accounts, six-product inventory, sorting, product detail navigation, add/remove cart behavior, reset app state, valid checkout, required checkout-field validation, menu navigation, logout, direct navigation after logout, Chromium, Firefox, WebKit, HTML reporting, CI retry behavior, and trace capture on first retry.

## Out of Scope

Payment gateway integration, real order fulfillment, backend/database validation, performance benchmarking, security penetration testing, accessibility certification, visual-regression baselines, mobile projects currently commented out in configuration, Microsoft Edge and branded Google Chrome projects currently commented out, and Cucumber/POM implementation because none exists in the repository.

## Test Approach

Use risk-based functional testing with independent fresh browser contexts. Use the existing seed login smoke test as the current baseline. Add planned coverage only as clearly marked future automation. Prefer semantic roles, labels, and stable data-test attributes where available. Keep each scenario deterministic and reset application state between tests.

## Test Strategy

Prioritize authentication and checkout as critical paths, then inventory and cart workflows, then navigation/session behavior. Run smoke coverage on every change, regression coverage on pull requests or release candidates, and cross-browser checks against all configured Playwright projects.

## Testing Types

Functional, positive, negative, validation, workflow/integration, regression, smoke, cross-browser compatibility, and exploratory testing. Non-functional testing is limited to basic browser compatibility observations; performance, load, and security testing are outside this plan.

## Functional Areas

1. Authentication and account-state handling.
2. Inventory and product details.
3. Cart and checkout.
4. Navigation and session state.
5. Test infrastructure, reporting, and execution configuration.

## Test Data

- Valid standard account: standard_user / secret_sauce.
- Locked account: locked_out_user / secret_sauce.
- Additional documented accounts: problem_user, performance_glitch_user, error_user, visual_user / secret_sauce.
- Product data: the six products displayed by the live inventory page.
- Checkout data: non-sensitive valid first name, last name, and postal code values; blank values for negative validation.
- Tests must not use production customer or payment data.

## Test Environment

- Base URL: https://www.saucedemo.com/
- Operating system observed: Windows.
- Runtime: Node.js with TypeScript.
- Framework: @playwright/test 1.63.0 range.
- Test directory: tests/.
- Reporter: Playwright HTML reporter.
- CI behavior: two retries when CI is set and one worker on CI.
- Tracing: on-first-retry.

## Browser Coverage

Configured and in scope: Chromium/Desktop Chrome, Firefox/Desktop Firefox, and WebKit/Desktop Safari. Mobile Chrome, Mobile Safari, Microsoft Edge, and branded Google Chrome are configured as commented examples and are not current execution coverage.

## Automation Strategy

The repository currently contains only tests/seed.spec.ts for Sauce Demo and tests/example.spec.ts for the Playwright website example. Planned files named in specs/saucedemo-automation-plan.md are future targets, not present implementation. Automation should remain independent, use fresh contexts, avoid order dependence, and capture useful traces and HTML reports on failures.

## Playwright Strategy

Use Playwright Test fixtures, expect assertions, project configuration, and semantic locators. Use page.goto against the configured application URL until a baseURL is introduced. Use explicit state assertions after navigation and form submission. Use test isolation and avoid fixed sleeps. Preserve the configured HTML report and first-retry traces.

## Cucumber BDD Strategy

No Cucumber dependency, .feature files, step definitions, or Cucumber configuration was found. Therefore no Cucumber scenario is automated or claimed. If BDD is introduced later, feature scenarios should map to the requirement IDs and delegate browser interactions to page objects or domain helpers rather than duplicating selectors in steps.

## Page Object Model Strategy

No page-object classes were found. Existing tests use direct locators. A future POM implementation should separate LoginPage, InventoryPage, ProductPage, CartPage, CheckoutPage, and navigation/menu behavior, while keeping assertions in tests where practical and centralizing only stable interaction mechanics.

## Test Execution Strategy

Run the existing smoke test with the Chromium project first. Run the full configured browser matrix after the planned scenarios are implemented. Use the HTML report for results and the trace on first retry for diagnosis. Keep test data isolated and reset application state after stateful workflows.

## Regression Strategy

Regression is planned across authentication, inventory, cart, checkout, and session flows. The current executable regression baseline is limited to the standard_user login smoke in tests/seed.spec.ts. Planned regression cases must not be reported as passing until corresponding test files exist and execute successfully.

## Smoke Testing Strategy

Current smoke: execute tests/seed.spec.ts and confirm standard_user reaches inventory and Swag Labs is present. Planned smoke expansion: valid login, inventory rendering, add-to-cart, checkout completion, and logout after those flows are implemented.

## Defect Management

Record defects with title, environment, browser project, account, preconditions, exact steps, expected result, actual result, evidence, reproducibility, severity, and priority. Link each defect to a requirement or test case ID. Retest fixes in the originating browser and include the case in regression when risk warrants.

## Severity and Priority

- Sev 1 / P1: authentication unavailable for valid users, checkout cannot complete for valid data, or data integrity/security impact.
- Sev 2 / P1-P2: critical workflow partially blocked, incorrect cart totals, or logout/session protection failure.
- Sev 3 / P2-P3: functional issue with workaround, incorrect sorting, navigation, or validation message.
- Sev 4 / P3-P4: cosmetic, copy, or low-impact compatibility issue.

## Entry Criteria

The target URL is reachable; test accounts are available; Node dependencies are installed; Playwright browsers are installed; the test environment is stable; and the build contains the intended test version.

## Exit Criteria

All committed smoke tests pass; planned tests that are implemented pass or have approved defects; no open Sev 1 defects remain; Sev 2 defects have explicit release disposition; reports and evidence are retained; and coverage status is accurately recorded.

## Roles and Responsibilities

QA owns this plan, test design, execution, evidence, and defect reporting. Developers own fixes and unit/component support. Automation engineers own Playwright implementation, locator quality, and framework maintenance. Release stakeholders approve risk and sign-off.

## Risks and Mitigation

- Demo-account behavior may intentionally expose defects: record account-specific behavior separately.
- External site availability may fluctuate: capture environment evidence and rerun before triage.
- Direct locators can be brittle: prefer roles, labels, and stable test attributes.
- Planned coverage may be mistaken for current coverage: retain EXISTING AUTOMATED and PLANNED labels.
- Browser differences can hide defects: execute all configured projects for release regression.

## Assumptions

The public Sauce Demo URL remains available; documented credentials remain valid; the six-item catalog is the expected baseline; each test starts from a fresh context; and the repository configuration is authoritative for current browser coverage.

## Dependencies

Node.js, npm dependencies in package-lock.json, Playwright browser binaries, network access to saucedemo.com, the configured test runner, and the documented Sauce Demo accounts.

## Test Deliverables

This TEST_PLAN.md, existing tests/seed.spec.ts smoke automation, planned scenario specifications in specs/saucedemo-automation-plan.md, Playwright HTML reports, retry traces where generated, execution evidence, defect records, and future automated test files when implemented.

## RTM

| Req ID | Req Description | Test Case ID | Test Status |
|--------|-----------------|--------------|-------------|
| AUTH-001 | Standard user can log in and reach inventory | TC-AUTH-001 / tests/seed.spec.ts | Existing automated |
| AUTH-002 | Blank, invalid, and locked-out logins are rejected correctly | TC-AUTH-002 / tests/authentication.spec.ts | Planned |
| AUTH-003 | Documented non-standard users can authenticate | TC-AUTH-003 / tests/authentication.spec.ts | Planned |
| INV-001 | Inventory displays the complete six-item catalog | TC-INV-001 / tests/inventory.spec.ts | Planned |
| INV-002 | Inventory sorts by name and price | TC-INV-002 / tests/inventory.spec.ts | Planned |
| INV-003 | Product detail opens and returns to inventory | TC-INV-003 / tests/inventory.spec.ts | Planned |
| CART-001 | Cart supports add, remove, persistence, and reset | TC-CART-001 / tests/cart.spec.ts | Planned |
| CHK-001 | Valid customer can complete checkout | TC-CHK-001 / tests/checkout.spec.ts | Planned |
| CHK-002 | Checkout rejects missing required information | TC-CHK-002 / tests/checkout.spec.ts | Planned |
| NAV-001 | Menu navigation, logout, and direct-access protection work | TC-NAV-001 / tests/navigation.spec.ts | Planned |

## Test Metrics

Track total cases, executed cases, passed, failed, blocked, not run, pass rate, automation percentage, defects by severity, flaky retries, browser coverage, and requirements covered. Current automation percentage for Sauce Demo functional coverage is one executable smoke test out of the listed nine test cases; planned cases remain not implemented.

## Reporting

Use the configured Playwright HTML reporter as the primary execution report. Include browser project, commit or test version, timestamp, pass/fail summary, skipped or planned cases, defect links, and trace paths for retry failures. Do not report the scenario catalog as executed evidence.

## Sign-off

QA Lead: Pending
Development Lead: Pending
Product/Release Owner: Pending

Sign-off is conditional on execution against the release candidate, review of open defects, and confirmation that planned coverage has either been implemented or explicitly accepted as a gap.

The repository is a Playwright Test TypeScript project with Chromium, Firefox, and WebKit projects configured, HTML reporting, retries on CI, and trace capture on first retry. Existing Sauce Demo automation is limited to tests/seed.spec.ts, which logs in as standard_user and verifies the Swag Labs logo. tests/example.spec.ts targets playwright.dev and is excluded from Sauce Demo coverage. No Cucumber feature files, step definitions, page-object classes, or separate test-data modules exist. The live application at https://www.saucedemo.com/ was inspected and exposes login validation, documented users, a six-item inventory, sorting, product details, menu navigation, cart, and checkout workflows.

## Test Scenarios

### 1. Authentication and Smoke

**Seed:** `tests/seed.spec.ts`

#### 1.1. EXISTING AUTOMATED: standard_user login smoke test

**File:** `tests/seed.spec.ts`

**Steps:**
  1. Open https://www.saucedemo.com/.
    - expect: The Sauce Demo login page is displayed.
  2. Fill username standard_user and password secret_sauce, then select Login.
    - expect: The inventory page opens.
    - expect: The Swag Labs application logo is present.

#### 1.2. PLANNED: reject blank, invalid, and locked-out login attempts

**File:** `tests/authentication.spec.ts`

**Steps:**
  1. Open the login page in a fresh browser context and submit with both fields blank.
    - expect: The user remains on the login page.
    - expect: A required-username validation message is visible.
  2. Submit an invalid username and password.
    - expect: The user remains on the login page.
    - expect: A username/password mismatch message is visible.
  3. Submit locked_out_user with secret_sauce.
    - expect: The user remains on the login page.
    - expect: A locked-out-user message is visible.

#### 1.3. PLANNED: authenticate documented non-standard users

**File:** `tests/authentication.spec.ts`

**Steps:**
  1. In separate fresh contexts, log in as problem_user, performance_glitch_user, error_user, and visual_user using secret_sauce.
    - expect: Each account reaches the inventory page.
    - expect: The Swag Labs logo is visible for each successful login.
    - expect: Known intentional account-specific defects are recorded rather than misclassified as authentication failures.

### 2. Inventory and Product Details

**Seed:** `tests/seed.spec.ts`

#### 2.1. PLANNED: display the complete six-item catalog

**File:** `tests/inventory.spec.ts`

**Steps:**
  1. Log in as standard_user and open the inventory page.
    - expect: The Products heading is visible.
    - expect: Exactly six inventory items are displayed.
    - expect: Each item has a name, description, price, and Add to cart control.

#### 2.2. PLANNED: sort inventory by name and price

**File:** `tests/inventory.spec.ts`

**Steps:**
  1. Select Name (Z to A) from the product sort combobox.
    - expect: Product names are in descending alphabetical order.
  2. Select Price (low to high).
    - expect: Product prices are in ascending numeric order.
  3. Select Price (high to low).
    - expect: Product prices are in descending numeric order.

#### 2.3. PLANNED: open product detail and return to inventory

**File:** `tests/inventory.spec.ts`

**Steps:**
  1. Open Sauce Labs Backpack from the inventory.
    - expect: The product detail page is displayed.
    - expect: The product name, description, price, and Add to cart control are visible.
  2. Select Back to products.
    - expect: The inventory page opens.
    - expect: The Products heading is visible.

### 3. Cart and Checkout

**Seed:** `tests/seed.spec.ts`

#### 3.1. PLANNED: add, remove, preserve, and reset cart state

**File:** `tests/cart.spec.ts`

**Steps:**
  1. Log in as standard_user and add Sauce Labs Backpack and Sauce Labs Bike Light.
    - expect: The cart badge shows 2.
  2. Open the cart.
    - expect: Both selected products and their displayed prices are visible.
  3. Remove Sauce Labs Bike Light, navigate to inventory, and return to the cart.
    - expect: The cart badge shows 1.
    - expect: Only Sauce Labs Backpack remains.
  4. Open the menu and select Reset App State.
    - expect: The cart badge is absent.
    - expect: The backpack control is restored to Add to cart.

#### 3.2. PLANNED: complete checkout with valid customer information

**File:** `tests/checkout.spec.ts`

**Steps:**
  1. Log in, add Sauce Labs Backpack, open the cart, and select Checkout.
    - expect: Checkout: Your Information is displayed with first name, last name, and postal code fields.
  2. Enter valid first name, last name, and postal code, then select Continue.
    - expect: Checkout: Overview is displayed.
    - expect: The selected product, price, subtotal, tax, and total are visible.
  3. Select Finish.
    - expect: Checkout: Complete! is displayed.
    - expect: The Thank you for your order confirmation is visible.
  4. Select Back Home.
    - expect: The Products inventory page opens.

#### 3.3. PLANNED: block checkout when required data is absent

**File:** `tests/checkout.spec.ts`

**Steps:**
  1. Reach Checkout: Your Information with a product in the cart and select Continue without entering any data.
    - expect: The user remains on the information page.
    - expect: A first-name-required error is visible.
    - expect: No order confirmation is displayed.
  2. Enter only a first name and select Continue.
    - expect: The user remains on the information page.
    - expect: A last-name-required error is visible.
  3. Enter first name and last name but leave postal code blank, then select Continue.
    - expect: The user remains on the information page.
    - expect: A postal-code-required error is visible.

### 4. Navigation and Session

**Seed:** `tests/seed.spec.ts`

#### 4.1. PLANNED: use All Items and log out from the menu

**File:** `tests/navigation.spec.ts`

**Steps:**
  1. Log in as standard_user, open a product detail page, open the menu, and select All Items.
    - expect: The inventory page opens.
    - expect: The Products heading is visible.
  2. Open the menu and select Logout.
    - expect: The login page opens.
    - expect: Username, password, and Login controls are visible.
  3. Navigate directly to https://www.saucedemo.com/inventory.html after logout.
    - expect: The application redirects to or displays the unauthenticated login experience.
    - expect: The inventory product list is not available.
