# Sauce Demo Automation Scenarios

## Application Overview

Sauce Demo is a Swag Labs e-commerce sample application. This plan translates the planned requirements in TEST_PLAN.md into independent Playwright scenarios using a fresh browser context, standard documented credentials, semantic locators, and stable data-test attributes verified on the live application.

## Test Scenarios

### 1. Authentication

**Seed:** `tests/seed.spec.ts`

#### 1.1. Reject blank, invalid, and locked-out login attempts

**File:** `tests/authentication.spec.ts`

**Steps:**
  1. Open https://www.saucedemo.com/ in a fresh unauthenticated context and submit the login form with both fields blank.
    - expect: The user remains on the login page.
    - expect: A visible error reports that the username is required.
  2. Fill an invalid username and password, then submit the form.
    - expect: The user remains on the login page.
    - expect: A visible error reports that the supplied username and password do not match a user.
  3. Fill username locked_out_user and password secret_sauce, then submit the form.
    - expect: The user remains on the login page.
    - expect: A visible error reports that this user has been locked out.

#### 1.2. Allow documented non-standard users to authenticate

**File:** `tests/authentication.spec.ts`

**Steps:**
  1. For each documented non-standard account (problem_user, performance_glitch_user, error_user, and visual_user), open a fresh login page and submit that username with secret_sauce.
    - expect: The inventory page opens for each account.
    - expect: The Swag Labs application logo is visible.
    - expect: The scenario records authenticated access without asserting intentional visual or behavioral defects as failures.

### 2. Inventory and Product Details

**Seed:** `tests/seed.spec.ts`

#### 2.1. Display the complete catalog with product controls

**File:** `tests/inventory.spec.ts`

**Steps:**
  1. Log in as standard_user and open the inventory page.
    - expect: The Products heading is visible.
    - expect: Exactly six inventory items are shown.
    - expect: Each expected product name, description, price, and Add to cart control is visible.

#### 2.2. Sort inventory by name and price

**File:** `tests/inventory.spec.ts`

**Steps:**
  1. Log in as standard_user and select Name (Z to A) in the product sort combobox.
    - expect: The item names appear in descending alphabetical order.
  2. Select Price (low to high).
    - expect: The listed prices appear in ascending numeric order.
  3. Select Price (high to low).
    - expect: The listed prices appear in descending numeric order.

#### 2.3. Open a product and return to inventory

**File:** `tests/inventory.spec.ts`

**Steps:**
  1. Log in as standard_user and open Sauce Labs Backpack from the catalog.
    - expect: The product detail URL is displayed.
    - expect: The Sauce Labs Backpack name, description, price, and Add to cart button are visible.
  2. Select Back to products.
    - expect: The inventory page opens.
    - expect: The Products heading is visible.

### 3. Cart and Checkout

**Seed:** `tests/seed.spec.ts`

#### 3.1. Add, remove, preserve, and reset cart state

**File:** `tests/cart.spec.ts`

**Steps:**
  1. Log in as standard_user and add Sauce Labs Backpack and Sauce Labs Bike Light.
    - expect: The cart badge shows 2.
  2. Open the cart.
    - expect: Both selected products and their displayed prices are visible.
  3. Remove Sauce Labs Bike Light, navigate to inventory, and return to the cart.
    - expect: The cart badge shows 1.
    - expect: Only Sauce Labs Backpack remains in the cart.
  4. Open the menu and select Reset App State.
    - expect: The cart badge is absent.
    - expect: The backpack control is restored to Add to cart.

#### 3.2. Complete checkout with valid customer information

**File:** `tests/checkout.spec.ts`

**Steps:**
  1. Log in as standard_user, add Sauce Labs Backpack, open the cart, and select Checkout.
    - expect: The Checkout: Your Information page and its first name, last name, and postal code fields are visible.
  2. Enter valid first name, last name, and postal code, then select Continue.
    - expect: The Checkout: Overview page opens.
    - expect: The selected backpack, its price, subtotal, tax, and total are visible.
  3. Select Finish.
    - expect: The Checkout: Complete! page opens.
    - expect: The Thank you for your order confirmation is visible.
  4. Select Back Home.
    - expect: The Products inventory page opens.

#### 3.3. Block checkout when required data is absent

**File:** `tests/checkout.spec.ts`

**Steps:**
  1. Log in as standard_user, add a product, proceed to Checkout: Your Information, and select Continue without entering data.
    - expect: The user remains on Checkout: Your Information.
    - expect: A visible error reports that first name is required.
    - expect: No order confirmation is displayed.
  2. Enter only a first name and select Continue.
    - expect: The user remains on Checkout: Your Information.
    - expect: A visible error reports that last name is required.
  3. Enter a first name and last name but leave postal code blank, then select Continue.
    - expect: The user remains on Checkout: Your Information.
    - expect: A visible error reports that postal code is required.

### 4. Navigation and Session

**Seed:** `tests/seed.spec.ts`

#### 4.1. Use All Items and log out from the menu

**File:** `tests/navigation.spec.ts`

**Steps:**
  1. Log in as standard_user, open a product detail page, open the menu, and select All Items.
    - expect: The inventory page opens.
    - expect: The Products heading is visible.
  2. Open the menu and select Logout.
    - expect: The login page opens.
    - expect: The username and password fields and Login button are visible.
  3. Navigate directly to https://www.saucedemo.com/inventory.html after logout.
    - expect: The application redirects to or displays the unauthenticated login experience.
    - expect: The inventory product list is not available.
