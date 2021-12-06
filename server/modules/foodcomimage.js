
const { Builder, By, Key, until } = require('selenium-webdriver');

const firefox = require('selenium-webdriver/firefox');

var os = require('os');

async function imageurl(id) {
    //Define engine, platform varied
    var firefoxpath;
    if (os.platform() === 'linux') {
        firefoxpath = __dirname + '/geckodriver_linux';
    }
    else if (os.platform() === 'darwin') {
        firefoxpath = __dirname + '/geckodriver_mac';
    }
    else if (os.platform() === 'win32') {
        firefoxpath = __dirname + '/geckodriver_win.exe';
    }

    firefoxoption = new firefox.Options().headless();

    var driver = new Builder().forBrowser('firefox').setFirefoxOptions(firefoxoption).setFirefoxService(new firefox.ServiceBuilder(firefoxpath)).build();

    driver.get(`https://www.food.com/recipe/${id}`);

    

    const image_url=await driver.wait(until.elementLocated(By.className('recipe-image__img')), 20*1000).getAttribute('src');

    return(image_url);

}

module.exports=imageurl;

