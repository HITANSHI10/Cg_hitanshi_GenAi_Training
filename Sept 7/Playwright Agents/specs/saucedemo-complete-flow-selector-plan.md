# SauceDemo Complete Flow Selector Plan

## Application Overview

Selector-focused Playwright test plan for SauceDemo's login, inventory, cart, checkout information, checkout overview, and confirmation screens. The exploratory run must stop before clicking Finish; the confirmation page is inspected directly by route only.

## Test Scenarios

### 1. SauceDemo complete flow

**Seed:** `tests/seed.spec.ts`

#### 1.1. Identify stable selectors across the complete shopping flow without purchasing

**File:** `tests/saucedemo-selector-flow.spec.ts`

**Steps:**
  1. Open https://www.saucedemo.com/ in a fresh browser state.
    - expect: The login page is displayed.
    - expect: The username field can be located with `[data-test="username"]` or `#user-name`.
    - expect: The password field can be located with `[data-test="password"]` or `#password`.
    - expect: The Login control can be located with `[data-test="login-button"]` or `#login-button`.
  2. Enter a valid test username and password, then click Login.
    - expect: The Inventory page opens.
    - expect: Each product container can be located with `[data-test="inventory-item"]`.
    - expect: A product name can be located within its container with `[data-test="inventory-item-name"]`.
    - expect: A product-specific Add to Cart control can be located with a selector such as `[data-test="add-to-cart-sauce-labs-backpack"]`.
  3. Add one product to the cart.
    - expect: The cart link can be located with `[data-test="shopping-cart-link"]`.
    - expect: The cart badge can be located with `[data-test="shopping-cart-badge"]` and displays the item count.
  4. Open the cart.
    - expect: Cart products use `[data-test="inventory-item"]` containers and `[data-test="inventory-item-name"]` names.
    - expect: The Checkout control can be located with `[data-test="checkout"]` or `#checkout`.
  5. Open Checkout and inspect the information form.
    - expect: The first name field can be located with `[data-test="firstName"]` or `#first-name`.
    - expect: The last name field can be located with `[data-test="lastName"]` or `#last-name`.
    - expect: The postal code field can be located with `[data-test="postalCode"]` or `#postal-code`.
    - expect: The Continue control can be located with `[data-test="continue"]` or `#continue`.
  6. Complete the checkout information fields and click Continue.
    - expect: The Checkout Overview page opens.
    - expect: The Finish control can be located with `[data-test="finish"]` or `#finish`.
    - expect: The Finish control is not clicked during this inspection.
  7. Navigate directly to https://www.saucedemo.com/checkout-complete.html for selector inspection only.
    - expect: The confirmation message can be located with `[data-test="complete-header"]`.
    - expect: Its expected text is `Thank you for your order!`.
    - expect: The completion details can be located with `[data-test="complete-text"]`.
