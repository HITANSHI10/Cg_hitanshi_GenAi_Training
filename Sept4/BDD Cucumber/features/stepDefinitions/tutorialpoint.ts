import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../../support/world';
import { TutorialPointLoginPage } from '../../pages/tutorialloginPage';

let tutorialLogin: TutorialPointLoginPage;

Given('user is on the Student Registration Form page',async function (this: CustomWorld) {
  tutorialLogin = new TutorialPointLoginPage(this.page);
  await tutorialLogin.Open()
});

When('user enters name {string}', async function (this: CustomWorld, name: string) {
  await tutorialLogin.enterName(name);
});

When('user enters email {string}', async function (this: CustomWorld, email: string) {
  await tutorialLogin.enterEmail(email);
});

When('user selects gender {string}', async function (this: CustomWorld, gender: string) {
  await tutorialLogin.selectGender(gender);
});

When('user enters mobile number {string}', async function (this: CustomWorld, mobile: string) {
  await tutorialLogin.enterMobile(mobile);
});

When('user selects date of birth {string}', async function (this: CustomWorld, dob: string) {
  await tutorialLogin.enterDOB(dob);
});

When('user enters subject {string}', async function (this: CustomWorld, subject: string) {
  await tutorialLogin.enterSubject(subject);
});

When('user selects hobby {string}', async function (this: CustomWorld, hobby: string) {
  await tutorialLogin.selectHobby(hobby);
});


When('user enters address {string}', async function (this: CustomWorld, address: string) {
  await tutorialLogin.enterAddress(address);
});

When('user selects state {string}', async function (this: CustomWorld, state: string) {
  await tutorialLogin.selectState(state);
});

When('user selects city {string}', async function (this: CustomWorld, city: string) {
  await tutorialLogin.selectCity(city);
});


Then('submit button should be enabled',async function (this: CustomWorld) {
  await tutorialLogin.clickSubmit()
});

// Then('validation messages should be displayed', function () {
//   // Write code here that turns the phrase above into concrete actions
//   return 'pending';
// });

// Then('an email validation error message should be displayed', function () {
//   // Write code here that turns the phrase above into concrete actions
//   return 'pending';
// });

// Then('a mobile number validation error message should be displayed', function () {
//   // Write code here that turns the phrase above into concrete actions
//   return 'pending';
// });

// Then('the selected state and city should be displayed correctly', function () {
//   // Write code here that turns the phrase above into concrete actions
//   return 'pending';
// });