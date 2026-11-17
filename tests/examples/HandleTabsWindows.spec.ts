import { expect, test } from '@playwright/test';

test('handle new tab', async ({ context }) => {
  const page = await context.newPage();
  await page.goto('https://sdetqa.vercel.app/autoplay');

  const [, newPage] = await Promise.all([
    page.getByRole('button', { name: 'New Tab' }).click(),
    context.waitForEvent('page'),
  ]);

  await expect(newPage).toHaveURL(/playwright.dev/);
});

test('handle new window', async ({ context }) => {
  const page = await context.newPage();
  await page.goto('https://sdetqa.vercel.app/autoplay');

  const [, newPage] = await Promise.all([
    page.getByRole('button', { name: 'New Window' }).click(),
    context.waitForEvent('page'),
  ]);

  await expect(newPage).toHaveURL(/playwright.dev/);
});
