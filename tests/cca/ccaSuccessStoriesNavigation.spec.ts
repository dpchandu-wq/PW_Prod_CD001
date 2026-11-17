import { expect, test } from '@playwright/test';
import { CcaHeaderPage } from '../../pages/CcaHeaderPage';
import { SuccessStoriesPage } from '../../pages/SuccessStoriesPage';

test('navigate to Success Stories from the CCA main menu', async ({ page }) => {
  // Block location access so the browser does not show a permission prompt.
  await page.context().grantPermissions([], { origin: 'https://ccaeducate.me' });

  // Open the page that contains the CCA main menu.
  await page.goto('/how-to-enroll/');

  const header = new CcaHeaderPage(page);

  // Open the main menu and reveal the About CCA submenu.
  await header.openMainMenu();
  await header.expandMenuSection('About CCA');

  // Select Success Stories and verify that its page loaded.
  const successStoriesLink = header.getMenuLink(/Success Stories/i);
  await expect(successStoriesLink).toBeVisible();
  await successStoriesLink.click();

  await new SuccessStoriesPage(page).expectLoaded();
});
