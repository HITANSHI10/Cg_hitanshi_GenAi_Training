import { Given, When, Then } from '@cucumber/cucumber';
import {LoginPage} from '../../pages/loginPage';
import {CustomWorld} from '../../support/world';


let login:LoginPage;
Given('the user is on the login page', async function (this:CustomWorld) {
  
  login=new LoginPage(this.page);
  await login.openWebsite();
});

When('the user enters valid credentials',async function (this:CustomWorld) {
    await login.Login('standard_user','secret_sauce');
});

When('clicks the login button',async function (this:CustomWorld) {
    await login.Click();
});

Then('the user should be redirected to the dashboard',async function (this:CustomWorld) {
    await login.Validation();
});

When('the user enters invalid credentials', async function (this:CustomWorld) {
    await login.invalidLogin('user', 'pass');
    await login.Click();
});

Then('an error message should be displayed',async function (this:CustomWorld) {
    await login.ErrorMessage();
});

Given('User opens the application', async function (this:CustomWorld) {
  login = new LoginPage(this.page);
  await login.openWebsite();
});

When('User enters {string} and {string}',async function (this:CustomWorld, username: string, password: string) {
    await login.invalidLogin(username, password);
    await login.Click();
});

Then('User should view the error message',async function (this:CustomWorld) {
    await login.ErrorMessage();
});