import { expect, test } from '@playwright/test';

test('CCA login pages open in separate browser contexts', async ({ browser }) => {
  const firstContext = await browser.newContext();
  const secondContext = await browser.newContext();

  try {
    const ccaPage = await firstContext.newPage();
    const edioLoginPage = await firstContext.newPage();
    const googlePage = await secondContext.newPage();
    const secondEdioLoginPage = await secondContext.newPage();

    await ccaPage.goto('https://ccaeducate.me/edio/');
    await edioLoginPage.goto('https://www.myedio.com/login/');
    await googlePage.goto('https://www.google.com/');
    await secondEdioLoginPage.goto('https://www.myedio.com/login/');

    await expect(ccaPage).toHaveURL(/ccaeducate\.me\/edio/);
    await expect(edioLoginPage).toHaveURL(/myedio\.com\/login/);
    await expect(googlePage).toHaveURL(/google\.com/);
    await expect(secondEdioLoginPage).toHaveURL(/myedio\.com\/login/);
  } finally {
    await Promise.all([firstContext.close(), secondContext.close()]);
  }
});
