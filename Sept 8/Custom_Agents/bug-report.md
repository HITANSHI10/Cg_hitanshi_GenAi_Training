# Bug Title

PHPTRAVELS test suite fails due to modal interception and unstable selectors across core user flows

## Module

Web UI / Playwright regression checks for PHPTRAVELS homepage, login, stay search, flight search, and responsive navigation

## Environment

- Application under test: PHPTRAVELS demo site
- Browser: Chromium
- Test framework: Playwright
- Date: 2026-09-08
- Environment type: Live demo site / UI validation

## Preconditions

- Test suite is executed against the current PHPTRAVELS site.
- Demo warning modal may appear on page load.
- The browser is launched in a clean context for the test run.

## Steps to Reproduce

1. Launch the PHPTRAVELS homepage.
2. Observe the demo warning modal overlay.
3. Attempt to click a login or navigation link before dismissing the modal.
4. Navigate to the stay and flight search flows.
5. Try valid and invalid stay/flight inputs using the current selectors.
6. Resize the page to mobile width and validate the responsive menu state.

## Expected Result

- The demo warning modal should not prevent access to login or navigation links.
- The app should allow the user to proceed with the login flow and search forms using stable, accessible selectors.
- The page should render valid search controls and handle both valid and invalid data correctly.
- Mobile responsive layout should maintain usable navigation and form access.

## Actual Result

- The login click times out because the demo warning modal intercepts pointer events.
- Multiple tests fail due to unstable or mismatched selectors and live text drift.
- Stay search validation tests fail for both valid and invalid inputs.
- Flight search entry point and recoverable search flow fail due to incorrect tab selection or missing state waits.
- Mobile viewport validation fails because layout expectations are not reliably matched.

## Severity

High

## Priority

P1

## Reproducibility

Always

## Evidence

- Playwright JSON report: [test-results/results.json](test-results/results.json)
- Flakiness analysis: [flaky-test-report.md](flaky-test-report.md)
- Execution summary: [test-report-analysis.md](test-report-analysis.md)
- Failure categories observed:
  - modal interception blocking login click
  - invalid selection of page elements by broad text/regex selectors
  - missing wait conditions for tab and panel state changes
  - responsive layout assumptions that break under viewport changes

## Automation Test

Associated Playwright tests:
- [tests/phptravels-booking-auth.spec.ts](tests/phptravels-booking-auth.spec.ts)
- [tests/phptravels-homepage.spec.ts](tests/phptravels-homepage.spec.ts)
- [tests/phptravels-search.spec.ts](tests/phptravels-search.spec.ts)
- [tests/phptravels-support-responsive.spec.ts](tests/phptravels-support-responsive.spec.ts)
