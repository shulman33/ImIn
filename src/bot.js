const puppeteer = require('puppeteer');
const schedule = require('node-schedule');

let insideTrack = 'https://insidetrack.oci.yu.edu/';
const username = process.argv[2];
const password = process.argv[3];
const crn1 = process.argv[4];
let time = process.argv[5];
let date = process.argv[6];

let newTime = "1 ";
let newDate = "";

if (time[3] == '0'){
  newTime += time[4] + " ";
}else{
  newTime += time[3] + time[4] + " ";
}
if (time[0] != '0'){
  newTime += time[0] + time[1] + " ";
}else{
  newTime += time[1] + " ";
}

if (date[3] == '0'){
  newDate += date[4] + " ";
}else{
  newDate += date[3] + date[4] + " ";
}
if (date[0] != '0'){
  newDate += date[0] + date[1] + " *";
}else{
  newDate += date[1] + " *";
}

let newDateAndTime = newTime + newDate;
console.log(newDateAndTime);
//"1 30 16 31 3 *"
  schedule.scheduleJob(newDateAndTime, async() => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768});
    await page.goto(insideTrack);
    await page.type('#username', username);
    await page.type('#password', password);

    const  [response] = await Promise.all([
      page.waitForNavigation(),
      page.click('[type="submit"]')
    ]);

    await page.click('#layout_34');
    await page.goto('https://insidetrack.oci.yu.edu/web/home-community/undergraduate');
    await page.goto('https://banner.oci.yu.edu/ssomanager/c/SSB?pkg=twbkwbis.P_GenMenu?name=bmenu.P_MainMnu');
    await page.click('a.submenulinktext2 ');
    await page.goto('https://banner.oci.yu.edu/ssb/twbkwbis.P_GenMenu?name=bmenu.P_StuMainMnu');
    await page.goto('https://banner.oci.yu.edu/ssb/twbkwbis.P_GenMenu?name=bmenu.P_RegMnu');
    await page.goto('https://banner.oci.yu.edu/ssb/bwskfreg.P_AltPin');
    await page.click('#term_id');
    
    await page.select("select#term_id","202206");
    await page.click('#term_id');

    const  [aresponse] = await Promise.all([
      page.waitForNavigation(),
      page.click('[value="Submit"]')
    ]);

    await page.type('#crn_id1', crn1);
    await page.keyboard.press('Enter');
    await page.waitForNavigation();
    await page.screenshot({path: './registration-status.png'});
    await browser.close();
  })
