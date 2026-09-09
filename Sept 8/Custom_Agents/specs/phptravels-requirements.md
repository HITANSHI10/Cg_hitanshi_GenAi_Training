# PHPTRAVELS Website Requirements

**Source:** https://phptravels.net/  
**Observed on:** 2026-09-08  
**Document type:** Public-site functional requirements for QA and test planning

## Requirement Summary

PHPTRAVELS is a travel-booking website that lets visitors search and review travel services, begin bookings, create or access accounts, and find support and policy information. The public environment is explicitly a demo/testing environment: displayed prices may be simulated, data may reset, and payment gateways are sandbox-only.

## Scope and Assumptions

- The public website is the system under test.
- Requirements below describe behavior observable without administrator access.
- Hotel/stay booking is the primary flow visible from the home page; flight booking instructions describe the complete search-to-confirmation pattern.
- Tours, transfers, packages, and live supplier integrations are mentioned by policy content but are not sufficiently exposed on the public home page to define detailed UI requirements.
- No real payment credentials or production customer data may be used during testing.

## Functional Requirements

### FR-001: Home page and navigation

The system shall:

- Display the PHPTARVELS brand, primary booking options, featured properties, support information, and footer navigation.
- Provide navigation to stays, flights, visa booking, contact, about, legal/policy, support, deals, travel documents, travel insurance, and supplier/affiliate information where links are available.
- Provide currency and language controls, login, customer signup, agent signup, and a responsive menu.
- Provide a visible demo-environment notice explaining simulated prices, sandbox payments, possible data resets, and the need for supplier credentials for live rates.

**Acceptance criteria:** Every visible primary navigation item opens the intended destination; the demo notice is readable and does not imply that displayed prices are live or that real payments are accepted.

### FR-002: Stay search

The system shall allow a visitor to search stays using:

- Destination or hotel name
- Check-in date
- Check-out date
- Guest and room count
- Nationality

The system shall validate required values and reject an invalid date range, such as check-out on or before check-in.

**Acceptance criteria:** A valid search submits and displays matching or empty results; incomplete or invalid searches provide actionable validation feedback and do not submit silently.

### FR-003: Stay results and property details

The system shall display stay results with available property information such as name, location, rating, price, discount, images, and booking/details access.

The system shall allow visitors to open a property detail page and continue toward booking when availability exists.

**Acceptance criteria:** Search results preserve the selected dates and occupancy; unavailable or empty searches show a clear no-results state; property links open the corresponding property.

### FR-004: Flight search and comparison

The system shall support flight search using departure/arrival cities, travel dates, and passenger count.

The system shall present available fares for comparison and support, where available:

- Sorting by price or departure time
- Searching adjacent dates
- Filtering results
- Opening additional flight information
- Selecting a fare to continue

**Acceptance criteria:** A selected fare carries its itinerary into review; changing filters or sort order updates the displayed results without losing the core search criteria.

### FR-005: Booking review and optional extras

Before checkout, the system shall show a booking summary and allow the visitor to review entered details.

For supported booking types, the system shall offer optional extras such as hotels, cars, or travel insurance without silently adding them.

The system shall require an email address before proceeding from review when the booking flow requires one.

### FR-006: Traveller checkout

The system shall collect required passenger/traveller details for every traveller included in the booking.

The system shall validate required fields and prevent progression when details are missing or invalid.

**Boundary cases:** one traveller, multiple travellers, maximum supported travellers, long names, special characters, invalid email addresses, and incomplete traveller records.

### FR-007: Sandbox payment and confirmation

The system shall display available sandbox payment methods, require acceptance of applicable terms, and allow the visitor to submit a test payment.

The system shall not request or process real payment credentials in the demo environment.

After successful test booking, the system shall display a confirmation page containing booking details and shall indicate that confirmation email delivery may follow.

**Acceptance criteria:** A successful sandbox transaction produces a confirmation state; a declined, cancelled, or invalid payment remains recoverable and does not create a false success confirmation.

### FR-008: Authentication and registration

The system shall provide separate entry points for:

- Customer login
- Customer signup
- Agent signup

The system shall validate required credentials and registration fields, show authentication errors without exposing sensitive information, and provide a usable recovery path when supported.

### FR-009: Visa booking

The system shall provide a visa-booking entry point. The flow shall collect the information required for the selected visa service, validate required inputs, and provide a review/submit state or a clear explanation when the service is unavailable.

### FR-010: Support and contact

The system shall provide contact details and support channels, including email and WhatsApp links where displayed.

The system shall provide access to booking instructions, file-a-claim information, refund policy, privacy policy, cookies policy, terms of use, and travel-document information.

**Acceptance criteria:** Email, phone, WhatsApp, and social links use valid destinations; policy pages are reachable from both relevant content and footer navigation.

### FR-011: Refund and cancellation information

The system shall communicate that refund eligibility depends on the supplier and service type.

The system shall distinguish, where applicable, refundable, partially refundable, and non-refundable bookings; communicate no-show and incorrect-detail exclusions; identify that refunds are normally returned to the original payment method; and show expected processing-time guidance.

A refund request shall require a booking reference, service details, and a cancellation reason, with support verification before processing.

### FR-012: Responsive and accessible presentation

The system shall remain usable on desktop and mobile viewport sizes.

Interactive controls shall have accessible names, keyboard-operable behavior, readable validation messages, and sufficient distinction between informational content and actionable controls.

Images shall provide meaningful alternative text or be marked decorative when appropriate.

## Positive Scenarios

- Visitor opens the home page and navigates to stays.
- Visitor searches a valid destination for one room and two guests.
- Visitor opens a featured property and continues to booking.
- Visitor searches flights, filters results, selects a fare, reviews details, and reaches sandbox checkout.
- Visitor registers as a customer or agent with valid information.
- Visitor opens refund policy and finds service-specific cancellation guidance.
- Visitor uses email or WhatsApp support links.
- Visitor changes the viewport from desktop to mobile and can still access the menu and search controls.

## Negative Scenarios

- Submit a search with a blank destination, dates, nationality, or occupancy.
- Use check-out before or equal to check-in.
- Enter zero, negative, non-numeric, or unsupported guest/room values.
- Search for a destination with no availability.
- Continue checkout with missing or invalid traveller details.
- Submit malformed, duplicate, or already-used registration data.
- Attempt payment with invalid, declined, or cancelled sandbox data.
- Follow an unavailable service or expired result and verify a clear error/recovery state.
- Confirm that real card data is neither required nor encouraged in the demo environment.

## Boundary Scenarios

- Same-day and minimum-advance-date searches.
- Leap day, month-end, year-end, and date ranges spanning a year.
- One room versus multiple rooms and the maximum supported occupancy.
- Long destination, hotel, traveller, and email values.
- Multiple travellers with one incomplete record.
- Zero-result flight and stay searches.
- Currency or language changes before and after a search.
- Mobile widths around the responsive breakpoint and keyboard-only navigation.
- Demo data reset between a search, booking, and confirmation.

## Integration and Security Scenarios

- Search results retain criteria across navigation and refresh where supported.
- Booking summary, payment result, confirmation page, and email notification represent the same booking reference.
- External supplier/API failure produces a controlled error and does not show stale or fabricated availability as confirmed.
- Payment data is handled only by the sandbox gateway and is not logged or exposed in page content.
- Authentication errors do not reveal whether an account exists.
- User-entered names, destinations, and booking references are rendered safely without script execution.
- Policies, consent/cookie behavior, HTTPS, and external links are consistent with the displayed security and compliance claims.

## Missing or Ambiguous Requirements

The public site does not define the following and they must be confirmed before full automation or production implementation:

- Exact required fields, validation rules, and maximum values for each booking type.
- Supported destinations, suppliers, currencies, languages, payment methods, and maximum occupancy.
- Flight search model: one-way, round-trip, multi-city, cabin class, baggage, and passenger-type rules.
- Hotel cancellation display, timezone rules, taxes/fees, price expiry, and availability refresh behavior.
- Visa service countries, document requirements, fees, status tracking, and submission workflow.
- Account password policy, MFA, password reset, session timeout, and account deletion behavior.
- Booking modification, cancellation, claim submission, and refund-request UI/API contracts.
- Email templates, delivery SLA, resend behavior, and notification failure handling.
- Accessibility conformance target and supported browser/device matrix.
- Demo-environment reset schedule and whether test bookings are persistent.

## Risks

- Simulated prices and periodically reset data can make automated assertions unstable.
- Supplier availability and third-party payment behavior may vary by run.
- External links and email/WhatsApp delivery are integration dependencies.
- The visible content contains inconsistent sample contact addresses; tests should assert link targets and approved environment configuration rather than one displayed value until ownership confirms the source of truth.
- Booking flows may require credentials or supplier APIs that are not available in this public demo.

## Automation Candidates

1. Home page loads and exposes the demo notice, service tabs, login/signup links, and featured properties.
2. Navigation smoke tests for stays, flights, visa, contact, policies, and how-to-book pages.
3. Stay search validation for required fields and invalid date ranges.
4. Stay results structure and property-detail navigation using resilient role/text locators.
5. Flight search, filtering/sorting controls, fare selection, and review progression when test data is available.
6. Customer and agent signup validation with synthetic data only.
7. Refund-policy content and footer-link availability.
8. Responsive menu and keyboard accessibility checks at representative desktop/mobile sizes.
9. Demo-payment negative paths, without using real card data.
10. Failure-state checks for empty results, unavailable inventory, and supplier/API errors.

## Out of Scope

- Admin portal configuration and supplier API credential management.
- Live production booking, real payment processing, and real customer data.
- Performance/load targets, unless separately specified.
- Legal verification of privacy, refund, IATA, or PCI claims.
