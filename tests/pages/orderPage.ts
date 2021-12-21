import {Page} from "@playwright/test";

const fs = require('fs');
var prettier = require("prettier");
export default class OrderPage{
private page: Page

    constructor(page: Page) {
        this.page = page;
    }

    async addOrderAndCheckout(page: Page){
        await page.selectOption('.product_sort_container','hilo');
        const prices = await page.$$('.inventory_item_price');

        const totalPrices = new Array();
        for await (const price of prices){
            const priceSort = await price.innerText();
            totalPrices.push(priceSort.split('$').toString().split(','))
        }
        let secondHighestPrice = totalPrices[1];
        let leastPrice = totalPrices[totalPrices.length-1];

        const writePrices: JSON = <JSON><unknown>{
            "secondHighestPrice": secondHighestPrice.toString(),
            "leastPrice": leastPrice.toString()
        }

        await fs.writeFileSync('./tests/data/prices.json', prettier.format(JSON.stringify(writePrices), {
            semi: false,
            parser: "json"
        }));

        //add items to basket
        await page.click('(//button[contains(text(),"Add to cart")])['+totalPrices.length+']');
        await page.click('(//button[contains(text(),"Add to cart")])[2]');
        await page.click('.shopping_cart_link');

    }
}