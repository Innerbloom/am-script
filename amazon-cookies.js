const puppeteer = require('puppeteer')


const URL = "https://www.amazon.com/";
const selectors = {
    searchBox : '#twotabsearchtextbox',
    productLinks : '[class="a-size-medium a-color-base a-text-normal"]',
    back: '[id="breadcrumb-back-link"]',
    helpful: '[class="cr-helpful-text"]'
};

const productSearch = ['GoPro'];
const random = Math.floor(Math.random() * productSearch.length);
const randomValue = productSearch[random];




async function search () {
    try {
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        await page.setViewport({width: 1280, height: 1300})
        await page.goto(URL, {timeout: 10000});
        await page.type(selectors.searchBox, randomValue);
        await page.keyboard.press('Enter', {delay: 2000}); // ждет 5 секунд

        for (let i = 0; i < 4; i++) {
            const next = await page.$$(selectors.productLinks, {
                timeout: 3000 // 8 секунд таймаут
            });
            await next[i].click({delay: 1000}); // клик по элементу первом


            const helpful = await page.waitForSelector(selectors.helpful)
            await helpful.click();

            const back = await page.waitForSelector(selectors.back)
            await back.click({delay: 5000}); // 5 сек возврат назад
            await new Promise(r => setTimeout(r, 3000))
        }

    }catch (error) {
        console.log(error)
    }
}setInterval( () => {
    search()
}, 5000);