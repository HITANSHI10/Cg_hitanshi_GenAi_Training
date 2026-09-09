# Playwright Code Review

Scope: `tests/*.spec.ts` and `playwright.config.ts`

| Severity | File | Problem | Recommendation |
|---|---|---|---|
| High | [tests/phptravels-search.spec.ts](tests/phptravels-search.spec.ts#L38) | `getByText('Flights').first()` is not scoped to the tab control. The recorded snapshot remained on the Stays panel and the test later timed out looking for flight fields. | Use `getByRole('tab', { name: /Flights/i })`, click it, then assert the selected tab or flight tabpanel before locating its fields. |
| High | [tests/phptravels-booking-auth.spec.ts](tests/phptravels-booking-auth.spec.ts#L7) | The demo warning modal can intercept the login click. The recorded run timed out after Playwright repeatedly retried the click. | Dismiss `#demoWarningModal` immediately after navigation and assert it is hidden before clicking the login link. |
| High | [tests/phptravels-booking-auth.spec.ts](tests/phptravels-booking-auth.spec.ts#L15) | `if (await loginButton.isVisible())` makes the empty-credential validation optional. The test can pass without validating the required behavior. | Make the login button required with `await expect(loginButton).toBeVisible()` and assert the expected validation message after clicking. |
| Medium | [tests/phptravels-support-responsive.spec.ts](tests/phptravels-support-responsive.spec.ts#L8) | Support email, phone, and mobile menu checks are conditional on `count()`. Missing controls produce a passing test. | Treat controls required by the test case as mandatory and fail with a semantic locator when they are absent. |
| Medium | [tests/phptravels-homepage.spec.ts](tests/phptravels-homepage.spec.ts#L15) | `locator('body').toContainText()` couples the test to the entire live page and volatile marketing copy. A recorded run failed on the `simulated prices` phrase despite the page loading. | Scope the assertion to the demo modal and assert a stable heading, role, or data-testid instead of body-wide text. |
| Medium | [tests/phptravels-search.spec.ts](tests/phptravels-search.spec.ts#L6) | `formField()` uses broad alternative-name regexes and `.first()`, so a different matching field can silently be selected after a UI change. | Prefer exact accessible names or page-object locators scoped to the active tabpanel. Avoid `.first()` unless the duplicate is intentional and documented by the locator structure. |
| Medium | [playwright.config.ts](playwright.config.ts#L42) | Tests depend directly on the public `https://phptravels.net` service and there is no configured `baseURL` or network isolation. Availability, content, and latency can create non-product failures. | Configure `use.baseURL` from `PHPTRAVELS_BASE_URL`, document the external dependency, and mock stable API responses for deterministic validation where possible. |
| Low | [playwright.config.ts](playwright.config.ts#L16) | Retries are enabled only in CI, so local runs do not expose flaky behavior through retry metadata. | Keep CI retries for resilience, but use a separate repeat command or a dedicated stability job such as `--repeat-each=5`; do not use retries to mask deterministic locator defects. |
| Low | [tests/phptravels-homepage.spec.ts](tests/phptravels-homepage.spec.ts#L22) | Navigation destinations are opened in new pages sequentially, increasing runtime and external request exposure. The assertion only checks that the URL is not `about:blank`. | Assert the expected URL path or response status and use a focused navigation smoke test rather than a weak non-blank check. |

## Code Quality Score

**5/10**

The suite uses Playwright role-based locators in several places, isolates tests with the `page` fixture, and keeps synthetic data separate. Reliability is reduced by broad `.first()` locators, optional assertions, live-site content dependence, and an unhandled modal state.

## Top Improvements

1. Add a shared modal-dismissal helper or fixture and verify the overlay is hidden before page interactions.
2. Scope all search controls to explicit tabs or tabpanels and assert the state transition after switching modes.
3. Remove conditional assertions for behaviors the test case requires.
4. Replace body-wide assertions with stable, scoped semantic locators.
5. Add a repeat-based stability check after these fixes and review failures separately from product defects.