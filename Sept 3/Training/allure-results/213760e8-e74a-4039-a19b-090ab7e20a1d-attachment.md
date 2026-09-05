# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: EndtoEnd.spec.ts >> end to end
- Location: tests\EndtoEnd.spec.ts:12:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.goto: Test timeout of 30000ms exceeded.
Call log:
  - navigating to "https://www.playwrightpad.in/sandbox/banking", waiting until "load"

```

# Test source

```ts
  1  | import {Page,Locator,expect} from "@playwright/test"
  2  | import data from "../test-data/loginCredentials.json"
  3  | 
  4  | class loginPage{
  5  |     username:Locator
  6  |     password:Locator
  7  |     loginButton:Locator
  8  | 
  9  |     constructor(private page:Page){
  10 |         this.username=page.locator("//input[@placeholder='Enter username']")
  11 |         this.password=page.locator("//input[@placeholder='Enter password']")
  12 |         this.loginButton=page.locator("//button[@id='login-btn']")
  13 |     }
  14 | 
  15 |     async openWebsite(){
> 16 |         await this.page.goto('https://www.playwrightpad.in/sandbox/banking')
     |                         ^ Error: page.goto: Test timeout of 30000ms exceeded.
  17 |     }
  18 | 
  19 |     async Login(username:string,password:string){
  20 |         await this.username.fill(data.username)
  21 |         await this.password.fill(data.password)
  22 |         await this.loginButton.click()
  23 |     }
  24 | }
  25 | 
  26 | export default loginPage
```