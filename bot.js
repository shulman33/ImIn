const puppeteer = require('puppeteer');
let insideTrack = 'https://insidetrack.oci.yu.edu/';
// const username = process.argv[2];
// const password = process.argv[3];
(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768});
  await page.goto(insideTrack);
  await page.type('#username', "sshulma5");
  await page.type('#password', "s7094");
  const  [response] = await Promise.all([
    page.waitForNavigation(),
    page.click('[type="submit"]')
  ]);
  await page.click('#layout_34');
  await page.goto('https://insidetrack.oci.yu.edu/web/home-community/undergraduate');
  await page.goto('https://banner.oci.yu.edu/ssomanager/c/SSB?pkg=twbkwbis.P_GenMenu?name=bmenu.P_MainMnu');
  //await page.goto('/ssb/twbkwbis.P_GenMenu?name=bmenu.P_StuMainMnu');
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
  //await page.click('[value="Submit"]');
  const  [nresponse] = await Promise.all([
    page.waitForNavigation(),
    page.type('#crn_id1', "78360"),
    page.waitForNavigation(),
    page.click('[value = "Submit Changes"]')

  ]);
  //await page.type('#crn_id1', "78360");
  //await page.click('[value = "Submit Changes"]');
  return page;
})();