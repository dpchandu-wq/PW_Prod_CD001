import { test, expect } from '@playwright/test';

// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });


test('Browser context options', async ({ browser, browserName }) => {


    const context = await browser.newContext({
        // Browser Permissions
        permissions: browserName === 'firefox'
            ? ['notifications', 'geolocation']
            : ['notifications', 'geolocation', 'microphone'],
        // Time Zone
        timezoneId: 'Asia/Kolkata',

        // Viewport Size
        viewport: {
            width: 1280,
            height: 720
        },
        
        // Ignore HTTPS certificate errors
         ignoreHTTPSErrors: true,

           // Language
            locale: 'en-IN',
    })



    const page = await context.newPage();
    //await page.goto('https://www.google.com/');

    await page.goto('https://expired.badssl.com/');

    await page.waitForTimeout(5000);
    await context.close();
});
