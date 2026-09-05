import {Page,Locator,expect} from "@playwright/test"
import data from "../test-data/loginCredentials.json"

class TransferFundspage{
    type:Locator
    beneSelect:Locator
    Amount:Locator
    initiate:Locator
    otp:Locator
    inputt:Locator
    verifyButton:Locator

    constructor(private page:Page){
        this.type=page.locator("#transfer-type")
        this.beneSelect=page.locator('#bene-select')
        this.Amount=page.locator('#transfer-amount')
        this.initiate=page.locator('#exec-transfer')
        this.otp=page.locator('.otp-display-code')
        this.inputt=page.locator("input[placeholder='Enter 6-digit OTP']")
        this.verifyButton=page.locator('#submit-otp')
    }

    async transfer(
        TransferType:string,
        tranferto:string,
        transfer_amount:string
    ){
        await this.type.selectOption(data.TransferType)
        await this.beneSelect.selectOption(data.tranferto)
        await this.Amount.fill(data.transfer_amount)
        await this.initiate.click()
        const otpText=this.otp.innerText()
        const otpcode=(await otpText).match(/\d{6}/)?.[0]
        await this.inputt.fill(otpcode!)
        await this.verifyButton.click()
    }
}

export default TransferFundspage