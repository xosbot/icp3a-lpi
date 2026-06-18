const { chromium } = require('playwright');
require('dotenv').config();

const EMAIL = process.env.EMAIL || 'xos.owner@gmail.com';
const PASSWORD = process.env.PASSWORD || '';

async function main() {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    console.log('Opening Gmail...');
    await page.goto('https://mail.google.com/mail/u/0/', { timeout: 15000 });
    
    // Wait for login or check if logged in
    await page.waitForSelector('input[type="email"]', { timeout: 5000 }).catch(() => null);
    
    if (await page.locator('input[type="email"]').isVisible()) {
      console.log('Logging into Gmail...');
      await page.fill('input[type="email"]', EMAIL);
      await page.click('button:has-text("Next")');
      await page.waitForTimeout(2000);
      
      if (await page.locator('input[type="password"]').isVisible()) {
        await page.fill('input[type="password"]', PASSWORD);
        await page.click('button:has-text("Next")');
        console.log('Check for 2FA prompt in browser!');
        await page.waitForTimeout(15000);
      }
    }
    
    console.log('✓ Gmail logged in');
  } catch (e) {
    console.log('Gmail check:', e.message);
  }
  
  // Open all service tabs
  const services = [
    { name: 'Twilio', url: 'https://console.twilio.com' },
    { name: 'SendGrid', url: 'https://app.sendgrid.com' },
    { name: 'HubSpot', url: 'https://app.hubspot.com' },
    { name: 'Google Cloud', url: 'https://console.cloud.google.com/apis/credentials' },
    { name: 'Make.com', url: 'https://make.com' },
  ];
  
  for (const svc of services) {
    try {
      console.log(`Opening ${svc.name}...`);
      await page.goto(svc.url, { timeout: 15000 });
      await page.waitForTimeout(2000);
    } catch (e) {
      console.log(`${svc.name} timeout: ${e.message.split('\n')[0]}`);
    }
  }
  
  console.log('\n=== All tabs should be open ===');
  console.log('Please copy the API keys from each tab and paste them here.');
  console.log('I will update the .env file with your values.\n');
  
  // Keep browser open for user to use
  console.log('Browser will stay open. Close it when you\'re done copying keys.');
}

main().catch(console.error);