import {Page,Locator,expect} from "@playwright/test"
import data from "../test-data/loginCredentials.json"

class Signout{
    logout:Locator

    constructor(private page:Page){
        this.logout=page.locator("button[class='btn-unique']")
    }

    async Logoutt(){
        await this.logout.click()
    }
}

export default Signout