# PHPTRAVELS Test Plan

## 1. Objective

This test plan verifies the public PHPTRAVELS demo website against the functional requirements defined in `phptravels-requirements.md`. The focus is on user-visible behavior in the public booking flows, without relying on admin access, production payment data, or live supplier integrations.

## 2. Scope

### In scope
- Home page and public navigation
- Stays search, results, and property detail flow
- Flights search, sorting/filtering, and fare selection
- Booking review and sandbox checkout behavior
- Authentication and registration flows
- Visa scheduling entry point
- Policy, support, and refund information pages
- Responsive layout and accessibility basics

### Out of scope
- Admin portal or back-office configuration
- Real payment processing
- Real customer data
- Supplier API credential setup
- Live production booking scenarios

## 3. Test Environment and Assumptions

- Target site: public PHPTRAVELS demo environment
- Testing mode: sandbox / demo only
- Use synthetic data only
- Payment tests must use sandbox-friendly flows only; no real card data
- Data reset and simulated pricing are expected; assertions must avoid brittle assumptions tied to live inventory
- Browser coverage: Chrome desktop + representative mobile viewport

## 4. Test Strategy

The plan uses a layered strategy:
1. Smoke validation of pages, links, and demo notices
2. Functional validation for primary flows
3. Negative-path validation for invalid inputs and unsupported conditions
4. Responsive/accessibility validation for desktop and mobile behavior
5. Data-resilience validation for empty results, errors, and reset conditions

## 5. Requirement Traceability

| Requirement | Coverage |
| --- | --- |
| FR-001 | TP-01, TP-02 |
| FR-002 | TP-03, TP-04 |
| FR-003 | TP-05, TP-06 |
| FR-004 | TP-07, TP-08 |
| FR-005 | TP-09 |
| FR-006 | TP-10 |
| FR-007 | TP-11, TP-12 |
| FR-008 | TP-13 |
| FR-009 | TP-14 |
| FR-010 | TP-15 |
| FR-011 | TP-16 |
| FR-012 | TP-17 |

## 6. Test Cases

### TP-01: Home page loads with required public UI elements
- Priority: P0
- Requirement: FR-001
- Preconditions: Visitor is on public site home page.
- Steps:
  1. Open the home page.
  2. Verify the brand and primary booking options are visible.
  3. Verify the demo notice is readable and clearly states simulated pricing and sandbox processing.
  4. Verify the login/signup controls and responsive menu are visible.
  5. Verify featured properties and support/footer information are present.
- Expected results:
  - Page loads successfully.
  - Demo notice is visible and does not imply real payments or live pricing.
  - Navigation to stay/flight/visa/contact/policy areas is visible.

### TP-02: Navigation links and footer destinations are valid
- Priority: P0
- Requirement: FR-001, FR-010
- Preconditions: Visitor is on the home page.
- Steps:
  1. Click each primary nav item.
  2. Validate the destination loads the intended page or section.
  3. Validate policy/support/legal links from header and footer.
  4. Check language/currency controls from the main header.
- Expected results:
  - Navigation targets are valid and reachable.
  - No broken or empty destinations from visible public navigation.

### TP-03: Stay search accepts valid input and validates invalid values
- Priority: P0
- Requirement: FR-002
- Preconditions: Visitor can access stays search module.
- Steps:
  1. Enter a valid destination, check-in date, check-out date, occupancy, and nationality.
  2. Submit the search.
  3. Submit again with blank destination or missing required fields.
  4. Attempt a check-out date equal to or before the check-in date.
- Expected results:
  - Valid search proceeds and shows either results or an empty state.
  - Missing values block submission with clear validation feedback.
  - Invalid date ranges are rejected before submission.

### TP-04: Stay occupancy and nationality validation
- Priority: P1
- Requirement: FR-002
- Preconditions: Visitor is on the stay search form.
- Steps:
  1. Enter zero, negative, non-numeric, or unsupported guest/room counts.
  2. Leave nationality blank when required.
  3. Submit the form.
- Expected results:
  - Validation messages are displayed.
  - Search does not complete silently.
  - Form remains recoverable for correction.

### TP-05: Stay results display correct property information and selected criteria
- Priority: P0
- Requirement: FR-003
- Preconditions: A valid stay search has been executed.
- Steps:
  1. Observe the results list.
  2. Confirm each result shows name, location, rating, price, image, and detail link.
  3. Confirm dates and occupancy remain in the selected state after results load.
  4. Open a property detail page.
- Expected results:
  - Results show property metadata and call-to-action controls.
  - Selected search criteria persist correctly throughout the flow.
  - Property detail opens the correct listing.

### TP-06: Empty or unavailable stay results show a clear no-results state
- Priority: P1
- Requirement: FR-003
- Preconditions: Search criteria known to produce no availability or empty results.
- Steps:
  1. Search for a destination with no available inventory.
  2. Observe the results page.
  3. Confirm the page indicates no results without showing fake or stale success state.
- Expected results:
  - Clear no-results experience is displayed.
  - Search criteria are retained for correction or retry.

### TP-07: Flight search supports valid criteria and fare comparison
- Priority: P0
- Requirement: FR-004
- Preconditions: Visitor can access the flights module.
- Steps:
  1. Search with departure city, arrival city, travel dates, and passenger count.
  2. If available, apply sorting and filtering controls.
  3. Open fare details or flight information panel.
  4. Select a fare to continue.
- Expected results:
  - Results render with fare comparison data.
  - Sort/filter interactions update results without losing core criteria.
  - Selected fare is carried into review or checkout screens.

### TP-08: Flight negative and empty states
- Priority: P1
- Requirement: FR-004
- Preconditions: Visitor is on flight search.
- Steps:
  1. Submit incomplete flight search details.
  2. Search for an unavailable route or no-result itinerary.
  3. Attempt to switch date ranges or filters while preserving itinerary details.
- Expected results:
  - Incomplete searches are blocked with useful validation.
  - No-result states are explicit and non-deceptive.
  - Core criteria are preserved when filtering and comparing results.

### TP-09: Booking review offers summary and optional extras without silent additions
- Priority: P0
- Requirement: FR-005
- Preconditions: Visitor is on a booking flow with a valid item selected.
- Steps:
  1. Review the summary page.
  2. Confirm booking details are displayed correctly.
  3. Check whether optional extras such as hotel/car/insurance are offered.
  4. Attempt to continue without providing required email when the process requires it.
- Expected results:
  - Summary is displayed before checkout.
  - Optional extras are explicitly offered, not silently added.
  - Required email validation blocks progression when needed.

### TP-10: Traveller details validation for single and multi-traveller flows
- Priority: P0
- Requirement: FR-006
- Preconditions: Visitor has reached traveller information in checkout.
- Steps:
  1. Enter valid details for one traveller and continue.
  2. Enter multiple travellers and leave one record incomplete.
  3. Test invalid email, long names, special characters, and blank required fields.
- Expected results:
  - Valid traveller data progresses successfully.
  - Missing or malformed details are rejected with actionable validation.
  - Maximum supported traveller counts and special characters are handled consistently.

### TP-11: Sandbox payment page shows valid options and rejects invalid payment attempts
- Priority: P0
- Requirement: FR-007
- Preconditions: Visitor reaches payment step in sandbox booking flow.
- Steps:
  1. Verify the payment method list is sandbox-only and includes acceptable options.
  2. Accept applicable terms.
  3. Submit with valid sandbox data.
  4. Submit with declined, cancelled, or invalid test data.
- Expected results:
  - Demo environment does not request real payment credential data.
  - Successful sandbox payment reaches a confirmation page.
  - Invalid or declined sandbox payments remain recoverable and do not falsely depict success.

### TP-12: Confirmation page displays booking result and email notice
- Priority: P0
- Requirement: FR-007
- Preconditions: Booking flow reaches payment confirmation state.
- Steps:
  1. Complete a valid sandbox booking.
  2. Observe the confirmation page.
  3. Verify booking details and notification wording are visible.
- Expected results:
  - Confirmation page clearly indicates success.
  - Booking details are displayed and the email-delivery note is present.
  - No misleading claim of real payment completion is made.

### TP-13: Customer and agent signup and login validation
- Priority: P1
- Requirement: FR-008
- Preconditions: Visitor is on authentication or registration screens.
- Steps:
  1. Open customer login.
  2. Open customer signup.
  3. Open agent signup.
  4. Submit blank or invalid credentials/registration data.
  5. Submit valid synthetic data.
- Expected results:
  - Each flow is accessible from distinct entry points.
  - Validation feedback is shown without disclosing sensitive user existence information.
  - Valid registration or login flow proceeds as supported.

### TP-14: Visa booking entry and validation
- Priority: P1
- Requirement: FR-009
- Preconditions: Visitor accesses visa section.
- Steps:
  1. Open visa booking flow.
  2. Select a visa service if available.
  3. Submit required details.
  4. Test unavailable service or incomplete details.
- Expected results:
  - Required input collection is clear and validated.
  - Unavailable service shows a controlled error or explanation.
  - Review/submit path is presented when service is supported.

### TP-15: Support and policy links are reachable and valid
- Priority: P1
- Requirement: FR-010
- Preconditions: Visitor is on the public site.
- Steps:
  1. Open support/contact pages and verify email, phone, WhatsApp, and social links.
  2. Open booking instructions and policy pages from content and footer navigation.
  3. Check journey to refund policy, terms, privacy, cookies, travel documents, and insurance.
- Expected results:
  - Links resolve to valid destinations.
  - Policy and support content is accessible from multiple entry points.

### TP-16: Refund and cancellation guidance is transparent and explicit
- Priority: P1
- Requirement: FR-011
- Preconditions: Visitor can access refund/cancellation policy content.
- Steps:
  1. Open refund policy and cancellation guidance.
  2. Check if refundable, partially refundable, and non-refundable scenarios are differentiated.
  3. Review no-show, incorrect-detail, and original-payment-method guidance.
  4. Attempt a refund request with missing booking reference, service details, or cancellation reason.
- Expected results:
  - Policy explains supplier-dependent eligibility clearly.
  - Refund request flow requires required details and support verification.

### TP-17: Responsive, keyboard, and accessibility validation
- Priority: P1
- Requirement: FR-012
- Preconditions: Site is available on desktop and mobile viewport sizes.
- Steps:
  1. Resize viewport to desktop and mobile widths around the breakpoint.
  2. Open the menu in mobile view and verify it remains usable.
  3. Navigate main controls via keyboard only.
  4. Check validation messages and button labels are readable and programmatically discernible.
  5. Review images and decorative elements for alt text or appropriate labeling.
- Expected results:
  - Core UI remains usable across desktop and mobile layouts.
  - Keyboard flow works without traps or hidden controls.
  - Accessibility names and validation messages are meaningful.

## 7. Risk-Based Notes

- Search results, pricing, and property availability may vary due to sandbox resets or simulated inventory.
- Flight and hotel availability may be subject to supplier/API readiness and may need conditional checks.
- Payment and booking confirmation tests should focus on valid sandbox flow and negative payment validation, not production-grade payment processing.
- External links and support destinations may be environment-specific and should be validated for destination correctness rather than hard-coded display text alone.

## 8. Exit Criteria

This test plan can be considered complete for the public demo site when:
- all P0 scenarios are executed successfully or intentionally deferred with documented blockers,
- critical validation paths are covered across stays, flights, payment, and auth,
- responsive and accessibility checks are performed on representative desktop/mobile layouts,
- any open issue is clearly classified as environment-dependent, scope-limited, or requirement ambiguity.
