import {Page} from "@playwright/test";

var assert = require('assert');
let pricesFromJson = require('../data/prices.json');
export default class ConfirmOrderPage{

    private page: Page

    constructor(page: Page) {
        this.page = page;
    }

    async checkPriceBeforeFinish(page: Page){
        const totalPricesBeforeConfirmation = new Array();
        const prices = await page.$$('.inventory_item_price');
        for await (const price of prices){
            const priceSort = await price.innerText();
            totalPricesBeforeConfirmation.push(priceSort.split('$'))
        }
        assert(totalPricesBeforeConfirmation[1] == pricesFromJson.secondHighestPrice)
        assert(totalPricesBeforeConfirmation[0] == pricesFromJson.leastPrice)
        await page.click('#checkout');
    }
}