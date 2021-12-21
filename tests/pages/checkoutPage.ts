import {Page} from "@playwright/test";

var assert = require('assert');
let pricesFromJson = require('../data/prices.json');
const faker = require('faker');
export default class checkoutPage{
    private page: Page

    constructor(page: Page) {
        this.page = page;
    }

    async checkPriceBeforeCheckout(page: Page){
        const totalPrices = new Array();
        const prices = await page.$$('.inventory_item_price');
        for await (const price of prices){
            const priceSort = await price.innerText();
            totalPrices.push(priceSort.split('$'))
        }
        assert(totalPrices[1] == pricesFromJson.secondHighestPrice)
        assert(totalPrices[0] == pricesFromJson.leastPrice)
        await page.click('#checkout');
    }

    async checkout(page: Page){
        //add checkout details
        await page.fill('#first-name',faker.name.firstName())
        await page.fill('#last-name',faker.name.lastName())
        await page.fill('#postal-code','RM20 2EN')

        await page.click('#continue');
        await page.click('#finish')
        await page.locator('//h2[normalize-space()="THANK YOU FOR YOUR ORDER"]').isVisible()
    }



}