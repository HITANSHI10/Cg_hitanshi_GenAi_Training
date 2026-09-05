Feature: Student Registration Form

  Background:
    Given user is on the Student Registration Form page

  # Scenario: Successfully register a student with valid details
  #   When user enters name "John"
  #   And user enters email "john@test.com"
  #   And user selects gender "Male"
  #   And user enters mobile number "9876543210"
  #   And user selects date of birth "15-08-1995"
  #   And user enters subject "Maths"
  #   And user selects hobby "Sports"
  #   And user enters address "Bangalore"
  #   And user selects state "NCR"
  #   And user selects city "Delhi"
  #   Then submit button should be enabled

#   Scenario: Verify invalid email validation
#     When user enters email "invalid-email"
#     And user clicks on submit button
#     Then an email validation error message should be displayed

#   Scenario: Verify mobile number validation
#     When user enters mobile number "12345"
#     And user clicks on submit button
#     Then a mobile number validation error message should be displayed
    
#   Scenario: Verify state and city selection
#     When user selects state "NCR"
#     And user selects city "Delhi"
#     Then the selected state and city should be displayed correctly

Scenario Outline: Submit registration form with complete valid data
  Given user is on the Student Registration Form page
  When user enters name "<name>"
  And user enters email "<email>"
  And user selects gender "<gender>"
  And user enters mobile number "<mobile>"
  And user selects date of birth "<dob>"
  And user enters subject "<subject>"
  And user selects hobby "<hobby>"
  And user enters address "<address>"
  And user selects state "<state>"
  And user selects city "<city>"
  Then submit button should be enabled

  Examples:
    | name     | email         | gender | mobile     | dob        | subject | hobby   | file        | address   | state | city  |
    | John Doe | john@test.com | Male   | 9876543210 | 1995-08-14 | Maths   | Sports  | student.jpg | Bangalore | NCR   | Agra |
    | Jane Roy | jane@test.com | Female | 9876543211 | 1998-10-05 | Physics | Reading | image.png   | Chennai   | NCR   | Agra |