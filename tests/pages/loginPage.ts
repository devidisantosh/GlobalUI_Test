import {Page} from "@playwright/test";


export default class loginPage{
    private page: Page

    constructor(page: Page) {
        this.page = page;
    }

    async loginToSauceDemo(page: Page){
        await page.goto("https://www.saucedemo.com/")
        await page.fill('#user-name','standard_user');
        await page.fill('#password','secret_sauce');
        await page.click('#login-button');
    }
}