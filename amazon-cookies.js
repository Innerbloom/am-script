const puppeteer = require('puppeteer')
const {describe} = require("mocha");



const URL = "https://www.amazon.com/";
const selectors = {
    searchBox : '#twotabsearchtextbox',
    productLinks : '[class="a-size-medium a-color-base a-text-normal"]',
    nextButton : `//span[@class="a-size-medium a-color-base a-text-normal"]`,
    productTitle : '#productTitle',
    back: '[class="a-link-normal a-color-tertiary"]'
};


const productSearch = ['GoPro'];
const random = Math.floor(Math.random() * productSearch.length)
const randomValue = productSearch[random]


async function search () {
    try {
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        await page.setViewport({width: 1280, height: 1300})
        await page.goto(URL, {timeout: 10000});
        await page.type(selectors.searchBox, randomValue);
        await page.keyboard.press('Enter', {delay: 5000}); // ждет 5 секунд
        const next = await page.$$(selectors.productLinks, {
            timeout: 8000 // 8 секунд таймаут
        });

        await next[0].click();
        await page.$$(selectors.productLinks, {
            timeout: 8000 // 8 секунд таймаут
        })
        await page.goBack({timeout: 5000});
        


    }catch (error) {
        console.log(error)
    }

}

search();




/*

            await page.keyboard.press('Enter');
            const next = await page.waitForSelector(selectors.nextButton);
            await next.click();

            await page.waitForXPath(selectors.productLinks);
            const product = await page.$x(selectors.productLinks);
            await product[2].click();
            await page.waitForSelector(selectors.productTitle);
            const title = await page.$eval(selectors.productTitle, (el) => el.innerHTML);
            console.log (title);
            await browser.close();*/
