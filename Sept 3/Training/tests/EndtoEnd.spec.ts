import TransferFundspage from "../PageObjectModel/fundTransfer.page"
import loginPage from "../PageObjectModel/loginn.page"
import Beneficiary from "../PageObjectModel/beneficiary.page"
import HistoryPage from "../PageObjectModel/history.page"
import BalancePage from "../PageObjectModel/balances.page"
import Signout from "../PageObjectModel/logout.page"
import data from "../test-data/loginCredentials.json"
import {test,expect} from "@playwright/test"


test('end to end',async({page})=>{
    const LoginPage2=new loginPage(page)
    const BeneficiaryPage=new Beneficiary(page)
    const TransferFundspage1=new TransferFundspage(page)
    const HistoryPage1=new HistoryPage(page)
    const BalancePage1=new BalancePage(page)
    const SignoutPage=new Signout(page)

    await LoginPage2.openWebsite()
    await LoginPage2.Login(data.username,data.password)
    const previousBalance = await BalancePage1.balance()
    await BeneficiaryPage.AddBeneficiary(data.beneficiary,data.bank,data.bank)
    await TransferFundspage1.transfer(data.TransferType,data.tranferto,data.transfer_amount)
    await HistoryPage1.validateTransactionAmount(data.transfer_amount)
    const currentBalance = await BalancePage1.balance()
    expect(currentBalance).toBe(previousBalance - Number(data.transfer_amount))
    await SignoutPage.Logoutt()
})