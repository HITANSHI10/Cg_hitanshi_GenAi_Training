import { Page, Locator, expect } from "@playwright/test"
import data from "../test-data/loginCredentials.json"

class HistoryPage {
    DashboardButton: Locator
    LatestTransaction: Locator

    constructor(private page: Page) {
        this.DashboardButton = page.locator('#tab-dashboard')
        this.LatestTransaction = page.locator('tbody tr').first().locator('td').nth(3)
    }

    async validateTransactionAmount(transfer_amount:string) {
        await this.DashboardButton.click();
        const lastTransactionAmount =await this.LatestTransaction.innerText();
        const amountFromUI = parseInt(lastTransactionAmount.replace(/[^0-9.]/g, ""))
        expect(amountFromUI).toBe(Number(data.transfer_amount));
    }
}

export default HistoryPage