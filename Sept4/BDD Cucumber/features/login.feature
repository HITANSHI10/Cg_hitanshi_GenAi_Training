Feature: Login Feature

  Scenario: Successful login with valid credentials
    Given the user is on the login page
    When the user enters valid credentials
    And clicks the login button
    Then the user should be redirected to the dashboard

  Scenario: Unsuccessful login with invalid credentials
    Given the user is on the login page
    When the user enters invalid credentials
    And clicks the login button
    Then an error message should be displayed

Scenario Outline: Verify login with multiple users 

Given User opens the application
When User enters "<username>" and "<password>"
Then an error message should be displayed

Examples:

    | username                 | password      |
    | standard                  | secret  |
    | problem_user              | secret  |
    | performance_glitch_user   | secret  |
    | error_user                | secret  |
    | visual_user               | secret |