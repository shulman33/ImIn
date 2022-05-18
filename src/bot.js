const puppeteer = require('puppeteer');
const schedule = require('node-schedule');

let insideTrack = 'https://insidetrack.oci.yu.edu/';
const username = process.argv[2];
const password = process.argv[3];
let time = process.argv[4];
let date = process.argv[5];
const crn1 = process.argv[6];
const crn2 = process.argv[7];
const crn3 = process.argv[8];
const crn4 = process.argv[9];
const crn5 = process.argv[10];
const crn6 = process.argv[11];
const crn7 = process.argv[12];
const crn8 = process.argv[13];
const crn9 = process.argv[14];
const crn10 = process.argv[15];


let newTime = "1 ";
let newDate = "";

if (time[3] === '0'){
  newTime += time[4] + " ";
}else{
  newTime += time[3] + time[4] + " ";
}
if (time[0] !== '0'){
  newTime += time[0] + time[1] + " ";
}else{
  newTime += time[1] + " ";
}

if (date[3] === '0'){
  newDate += date[4] + " ";
}else{
  newDate += date[3] + date[4] + " ";
}
if (date[0] !== '0'){
  newDate += date[0] + date[1] + " *";
}else{
  newDate += date[1] + " *";
}

let newDateAndTime = newTime + newDate;

const intArray = []
for (let i = 0; i < time.length; i++){
      if (!isNaN(time.charAt(i))){
        intArray[i] = parseInt(time.charAt(i));
      }
}

if (intArray[4] === 0){
  intArray[3] -= 1;
  intArray[4] = 9;
}else {
  intArray[4] -= 1;
}

let newestTime = intArray[3].toString() + intArray[4].toString() + " " + intArray[0].toString() + intArray[1].toString() + " " + "1 ";
let startBrowser = newestTime + newDate;
console.log('old time ' + newDateAndTime);
console.log('newest time ' + newestTime);
console.log('start browser at ' + startBrowser);

  (async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
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

    schedule.scheduleJob(newDateAndTime, async() =>{
      console.time("You registered in");

      await page.goto('https://banner.oci.yu.edu/ssb/bwskfreg.P_AltPin');
      await page.click('#term_id');

      await page.select("select#term_id","202209");
      await page.click('#term_id');

      const  [aresponse] = await Promise.all([
        page.waitForNavigation(),
        page.click('[value="Submit"]')
      ]);

      await page.type('#crn_id1', crn1);

      try {
        await page.type('#crn_id2', crn2);
        await page.type('#crn_id3', crn3);
        await page.type('#crn_id4', crn4);
        await page.type('#crn_id5', crn5);
        await page.type('#crn_id6', crn6);
        await page.type('#crn_id7', crn7);
        await page.type('#crn_id8', crn8);
        await page.type('#crn_id9', crn9);
        await page.type('#crn_id10', crn10);
      } catch (error) {
        await page.keyboard.press('Enter');
      }
      console.timeEnd("You registered in");
      await page.waitForNavigation();
      await page.screenshot({path: './registration-status.png'});
      await browser.close();
    })

  })();


