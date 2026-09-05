import { Page, Locator, expect } from "@playwright/test"
import data from "../test-data/loginCredentials.json"

class BalancePage {
    newBalance: Locator

    constructor(private page: Page) {
        this.newBalance = page.locator("div[data-account='checking'] div[class='balance']")
    }

    async balance() {
        const balanceText = await this.newBalance.innerText()
        return Number(balanceText.replace(/[^0-9.]/g, "") )
    }

}

export default BalancePage