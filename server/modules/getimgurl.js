const puppeteer = require('puppeteer');

const getimgurl = async (id) => {
    const browser = await puppeteer.launch({
        headless: true
    });

    let imgUrl = '';

    const page = await browser.newPage();
    await page.goto(`https://www.food.com/recipe/${id}`, { waitUntil: 'networkidle2' })
      .then(async (value) => {
        console.log('success');
        const imgs = await page.$$eval('.inner-wrapper img[src]', imgs => imgs.map(img => img.getAttribute('src')));
        imgUrl = imgs.find(img=>img.includes('https'));
      })
      .catch((reason) => {
        console.log('error');
      })
    await browser.close();
    return imgUrl;

};

module.exports = {getimgurl}