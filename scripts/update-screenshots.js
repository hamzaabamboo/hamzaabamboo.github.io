const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const repos = require('../app/data/repos.json');

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  // Set viewport width to desktop, height doesn't matter much for fullPage but good to set
  await page.setViewport({ width: 1440, height: 1080 });

  console.log(`Processing ${repos.length} repositories...`);

  const updatedRepos = [];

  for (const repo of repos) {
    const targetUrl = repo.homepageUrl; 
    
    if (!targetUrl) {
        console.log(`[${repo.name}] Skipping (No homepage URL)...`);
        updatedRepos.push({
            ...repo,
            screenshotPath: null 
        });
        continue;
    }

    const safeName = repo.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const imageFilename = `${safeName}.png`;
    const imagePath = path.join(__dirname, '../public/screenshots', imageFilename);
    const publicPath = `/screenshots/${imageFilename}`;

    console.log(`[${repo.name}] Navigating to ${targetUrl}...`);

    try {
      await page.goto(targetUrl, { waitUntil: 'networkidle0', timeout: 90000 });
      
      // Wait for animations
      await new Promise(r => setTimeout(r, 2000));

      // Capture FULL HEIGHT screenshot
      await page.screenshot({ path: imagePath, fullPage: true });
      console.log(`  -> Full-height screenshot saved to ${imagePath}`);
      
      updatedRepos.push({
        ...repo,
        screenshotPath: publicPath
      });
    } catch (e) {
      console.error(`  -> Failed to screenshot ${repo.name}: ${e.message}`);
      updatedRepos.push({
        ...repo,
        screenshotPath: null
      });
    }
  }

  await browser.close();

  fs.writeFileSync(
    path.join(__dirname, '../app/data/repos.json'), 
    JSON.stringify(updatedRepos, null, 2)
  );
  console.log('Updated app/data/repos.json with full-height screenshot paths.');
})();
