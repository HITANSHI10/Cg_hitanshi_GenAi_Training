import {Page,Locator,expect} from "@playwright/test"
import data from "../test-data/loginCredentials.json"

class Beneficiary{
    fundTransferButton:Locator
    AddNewButton:Locator
    benName:Locator
    benAccount:Locator
    benBank:Locator
    saveButton:Locator

    constructor(private page:Page){
        this.fundTransferButton=page.locator("//button[@id='tab-transfers']")
        this.AddNewButton=page.locator("//button[@id='add-beneficiary']")
        this.benName=page.locator("//input[@id='bene-name']")
        this.benAccount=page.locator("//input[@id='bene-account']")
        this.benBank=page.locator("//select[@id='bene-bank']")
        this.saveButton=page.locator('#save-bene')
    }

    async AddBeneficiary(
        beneficiary:string,
        AccountNumber:string,
        bank:string){
        await this.fundTransferButton.click()
        await this.AddNewButton.click()
        await this.benName.fill(data.beneficiary)
        await this.benAccount.fill(data.AccountNumber)
        await this.benBank.selectOption(data.bank)
        await this.saveButton.click()
    }

}

export default Beneficiary