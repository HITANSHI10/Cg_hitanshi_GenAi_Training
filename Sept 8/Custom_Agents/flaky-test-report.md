# Flaky Test Report

Generated: 2026-09-08
Project: PHPTRAVELS Playwright suite

## Test

### `phptravels-booking-auth.spec.ts`

Test: `provides the customer login entry point and validates empty credentials`

## Flakiness Probability

**High**

## Possible Cause

The login link is available, but the `demoWarningModal` overlay intercepts pointer events. Playwright retries the click until the 30-second test timeout, so the result depends on whether the modal appears and whether it can be dismissed.

## Evidence

- Recorded failure: `test-results/results.json`.
- Playwright resolved `getByRole('link', { name: /customer login|login/i }).first()` successfully.
- The click failed because `div#demoWarningModal` intercepted pointer events.
- The same test was reported as `timedOut`, not as a missing-element failure.

## Recommended Fix

Create a shared `dismissDemoWarning(page)` fixture/helper and call it immediately after navigation. Assert that the overlay is hidden before clicking page content.

```ts
const demoModal = page.locator('#demoWarningModal');
const continueButton = demoModal.getByRole('button', { name: /understand|continue/i });

if (await demoModal.isVisible()) {
  await continueButton.click();
  await expect(demoModal).toBeHidden();
}

await page.getByRole('link', { name: /^login$/i }).click();
```

## Locator Improvement

Replace `/customer login|login/i` with a scoped, exact locator such as `getByRole('link', { name: /^login$/i })`. Broad regex locators can select a different navigation item when the site changes its labels.

## Synchronization Improvement

Wait on the modal's state (`toBeHidden`) rather than using a fixed delay or relying on click retries. Use `domcontentloaded` only for initial navigation; wait for the specific control needed by the next action.

## Test Isolation Improvement

Use a fresh browser context per test, keep the modal dismissal in a `beforeEach` helper, and avoid sharing authenticated state or mutable booking data between tests.

## Additional Risk Findings

### `phptravels-homepage.spec.ts`

**Flakiness Probability: Medium**

The test asserts live page body text against fixture keywords including `simulated prices`. A recorded run failed because the current page did not contain that exact phrase even though the site loaded. This is primarily external-content drift, but it can appear intermittent when the demo notice changes by session or deployment.

Recommendation: scope the assertion to `#demoWarningModal`, use the stable notice heading/role, and treat the notice as a required product state only when the modal is present. Do not assert volatile marketing copy against the entire `body`.

### `phptravels-search.spec.ts`

**Flakiness Probability: High**

The flight test calls `getByText('Flights').first().click()`, but the captured snapshot still showed the Stays tab and `Search Hotels` afterward. The test then searched for flight controls and timed out; teardown also exceeded the test timeout. The click is either selecting non-tab text or the tab transition is not being awaited.

Recommendation: target `getByRole('tab', { name: /Flights/i })`, assert `toHaveAttribute('aria-selected', 'true')` or the flight tabpanel state, then locate flight fields within that panel.

### `phptravels-support-responsive.spec.ts`

**Flakiness Probability: Medium**

The mobile test treats the menu button as optional. If the button is missing, the test can pass without checking mobile navigation. The external homepage and responsive layout also vary with viewport timing.

Recommendation: require the menu button for the mobile scenario, use a role/name locator, and assert the menu's visible state after clicking. Keep the viewport fixed and wait for the navigation container rather than a timeout.

## Stabilization Order

1. Dismiss and verify the demo modal before every content click.
2. Fix the flight tab locator and wait for the selected tab/panel state.
3. Replace body-wide and volatile-text assertions with scoped semantic locators.
4. Remove optional assertions where the behavior is required by the test case.
5. Add a repeat run, for example `--repeat-each=5`, after the fixes to verify stability against the live site.

## Current Assessment

The strongest confirmed flake is modal interception in the booking/auth test. The flight test has a confirmed synchronization/locator defect rather than a pure random failure. Homepage copy assertions and optional responsive checks should be hardened before being used as reliability signals.