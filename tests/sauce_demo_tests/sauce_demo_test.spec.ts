import test from "@playwright/test";
import loginPage from '../pages/loginPage'
import orderPage from '../pages/orderPage'
import checkoutPage from "../pages/checkoutPage";
import confirmOrderPage from '../pages/confirmOrderPage'


// @ts-ignore
const login = new loginPage();
// @ts-ignore
const order = new orderPage();
// @ts-ignore
const checkout = new checkoutPage();
// @ts-ignore
const confirmOrder = new confirmOrderPage();
test.describe('SauceDemo UI Automation',() =>{

    test('sauce demo automation for getting low to high price and select cheapest & the 2nd costliest and checkout'
       ,async({page})=>{
          await login.loginToSauceDemo(page);
          await order.addOrderAndCheckout(page);
          await checkout.checkPriceBeforeCheckout(page);
          await checkout.checkout(page);

    });
});