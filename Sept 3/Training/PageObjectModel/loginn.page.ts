import {Page,Locator,expect} from "@playwright/test"
import data from "../test-data/loginCredentials.json"

class loginPage{
    username:Locator
    password:Locator
    loginButton:Locator

    constructor(private page:Page){
        this.username=page.locator("//input[@placeholder='Enter username']")
        this.password=page.locator("//input[@placeholder='Enter password']")
        this.loginButton=page.locator("//button[@id='login-btn']")
    }

    async openWebsite(){
        await this.page.goto('https://www.playwrightpad.in/sandbox/banking')
    }

    async Login(username:string,password:string){
        await this.username.fill(data.username)
        await this.password.fill(data.password)
        await this.loginButton.click()
    }
}

export default loginPage