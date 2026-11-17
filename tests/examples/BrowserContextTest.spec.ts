import { expect, test } from '@playwright/test';

test('Browser context options', async ({ browser, browserName }) => {
  const context = await browser.newContext({
    permissions:
      browserName === 'firefox'
        ? ['notifications', 'geolocation']
        : ['notifications', 'geolocation', 'microphone'],
    timezoneId: 'Asia/Kolkata',
    viewport: {
      width: 1280,
      height: 720,
    },
    ignoreHTTPSErrors: true,
    locale: 'en-IN',
  });

  try {
    const page = await context.newPage();
    await page.goto('https://expired.badssl.com/');
    await expect(page).toHaveURL('https://expired.badssl.com/');
  } finally {
    await context.close();
  }
});
