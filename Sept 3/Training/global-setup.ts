import { log } from "node:console"
import loginPage from "./PageObjectModel/loginn.page"
import {chromium } from "@playwright/test"

async function globalSetup(){
    console.log("Global setup started");
    let browser=await chromium.launch()
    let page=await browser.newPage()
    const loginPage1=new loginPage(page)
    await loginPage1.openWebsite()
    await loginPage1.Login()

    
    // save authentication

    await page.context().storageState({

        path:
        'auth.json'

});
console.log('Global Setup Completed');

}

export default globalSetup;
