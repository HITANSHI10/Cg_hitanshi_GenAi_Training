# Failure Analysis Report

## Failed Test

- Booking/auth flow: "provides the customer login entry point and validates empty credentials"
- Homepage flow: "shows the brand, booking options, auth links, and demo notice"
- Navigation flow: "exposes reachable primary navigation destinations"
- Stay search flow: "renders the stay search controls and accepts a valid data row"
- Stay validation flow: "rejects invalid stay input: Destination is required"
- Stay validation flow: "rejects invalid stay input: Check-out must be after check-in"
- Stay validation flow: "rejects invalid stay input: Invalid occupancy or nationality"
- Flight search flow: "renders the flight search entry point and required controls"
- Flight recoverability flow: "retains the no-results dataset for a recoverable search attempt"
- Mobile responsiveness flow: "keeps the main page usable at mobile width"

## Error

The main failure signature is a Playwright timeout caused by a blocking overlay and a set of unstable UI selectors.

Examples from the execution logs:
- Test timeout of 30000ms exceeded.
- locator.click: Test timeout of 30000ms exceeded.
- The click target is blocked by the demo warning modal: "div#demoWarningModal" intercepts pointer events.
- Multiple tests fail because the application state or text does not match the test expectation.

## Root Cause

This is primarily a combination of:

1. UI overlay interference
   - The demo warning modal appears over the page and captures pointer events, preventing the login link click from completing.

2. Locator fragility
   - The tests use loose or broad text selectors, which can select the wrong element or become invalid when the page text changes.

3. Missing synchronization
   - The tests do not always wait for the modal to close or the tab/panel state to be ready before interacting.

4. Content drift and layout volatility
   - Some assertions depend on live marketing text and layout state that varies with the live site, causing false negatives.

## Failure Classification

- Timing/Synchronization Issue: High
- Locator Issue: High
- Application Defect: Medium (if the demo modal prevents use of key actions on the live site)
- Automation Script Defect: Medium
- Environment Issue: Low to Medium (live site content drift)

## Evidence

- Playwright JSON result file: [test-results/results.json](test-results/results.json)
- Flaky test report: [flaky-test-report.md](flaky-test-report.md)
- Test summary report: [test-report-analysis.md](test-report-analysis.md)
- Failure signature captured in Playwright logs: "div#demoWarningModal intercepts pointer events"
- Total suite result from the latest run: 18 tests, 8 passed, 10 failed, 44.44% pass rate

## Recommended Action

1. Dismiss and verify the demo warning modal before any click on page content.
2. Replace broad text-based locators with role-based and exact-match selectors.
3. Wait for state changes before interacting with tabs, panels, and form controls.
4. Replace volatile marketing-copy assertions with stable semantic selectors.
5. Re-run the suite after the fixes to verify stability and reduce false negatives.

## Retry Recommended

Yes, but only after the modal handling and locator fixes are implemented.

## Bug Should Be Raised

Yes, for the blocking modal and unstable UI behavior. However, the automation script should also be corrected separately where the selectors and waits are too weak.
