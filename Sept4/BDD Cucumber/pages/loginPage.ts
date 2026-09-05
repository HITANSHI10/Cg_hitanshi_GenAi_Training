import {Page,Locator,expect} from "@playwright/test"
import data from "../test-data/loginCredentials.json"

export class LoginPage{
    username:Locator
    password:Locator
    loginButton:Locator

    constructor(private page:Page){
        this.page=page
        this.username=page.locator("#user-name")
        this.password=page.locator("#password")
        this.loginButton=page.locator("#login-button")
    }

    async openWebsite(){
        await this.page.goto('https://www.saucedemo.com/')
        //await this.page.waitForTimeout(3000);
    }

    async Login(username:string,password:string){
        await this.username.fill(data.username)
        await this.password.fill(data.password)
        //await this.page.waitForTimeout(3000);

    }
    async Click(){
        await this.loginButton.click()
    }

    async Validation(){
        await expect(this.page).toHaveURL(/inventory.html/);
    }

    async invalidLogin(user:string, pass:string){
        await this.username.fill(user)
        await this.password.fill(pass)
    }

    async ErrorMessage(){
        const errorMessage=await this.page.locator("h3[data-test='error']")
        await expect(errorMessage).toBeVisible()
    }
}

// export default LoginPage