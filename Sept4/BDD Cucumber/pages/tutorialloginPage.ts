import {expect, Locator, Page} from "@playwright/test";

export class TutorialPointLoginPage{
    page:Page
    firstName: Locator
    email: Locator
    male: Locator
    female: Locator
    other: Locator
    mobile: Locator
    dob: Locator
    subject: Locator
    sportsbox: Locator
    readingbox: Locator
    musicbox: Locator
    address: Locator
    state: Locator
    city: Locator
    submitButton: Locator

    constructor(page: Page) {
        this.page = page;
        this.firstName = page.locator('#name')
        this.email = page.locator('#email')
        this.male = page.locator("(//input[@id='gender'])[1]")
        this.female = page.locator("(//input[@type='radio'])[2]")
        this.other = page.locator("(//input[@type='radio'])[3]")
        this.mobile = page.locator('#mobile')
        this.dob = page.locator('#dob')
        this.subject = page.locator('#subjects')
        this.address = page.locator("//textarea[@id='picture']")
        this.sportsbox = page.locator("//input[@id='hobbies']")
        this.readingbox = page.locator("(//input[@type='checkbox'])[2]")
        this.musicbox = page.locator("(//input[@type='checkbox'])[3]")
        this.state = page.locator('#state')
        this.city = page.locator('#city')
        this.submitButton = page.locator("input[value='Login']")
    }

    async Open(){
        await this.page.goto("https://www.tutorialspoint.com/selenium/practice/selenium_automation_practice.php")
    }

    async enterName(name:string) {
        await this.firstName.fill(name);
    }

    async enterEmail(email: string) {
        await this.email.fill(email);
    }

    async selectGender(gender: string) {
         if (gender.toLowerCase() === 'male') {
            await this.male.check();
        }
 
        else if (gender.toLowerCase() === 'female') {
            await this.female.check();
        }
 
        else {
            await this.other.check();
        }
    }

    async enterMobile(mobile: string) {
        await this.mobile.fill(mobile);
    }

    async enterDOB(dob: string) {
        await this.dob.fill(dob);
    }

    async enterSubject(subject: string) {
        await this.subject.fill(subject);
    }

    async selectHobby(hobby: string) {
         
        if (hobby.toLowerCase() === 'sports') {
            await this.sportsbox.check();
        }
 
        else if (hobby.toLowerCase() === 'reading') {
            await this.readingbox.check();
        }
 
        else {
            await this.musicbox.check();
        }
    }


    async enterAddress(address: string) {
        await this.address.fill(address);
    }

    async selectState(state: string) {
        await this.state.selectOption(state)
    }

    async selectCity(city: string) {
        await this.city.selectOption(city)
    }

    async clickSubmit() {
        await expect(this.submitButton).toBeEnabled()
    }

}

