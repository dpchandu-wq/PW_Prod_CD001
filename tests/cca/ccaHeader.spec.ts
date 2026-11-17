import { expect, test } from '@playwright/test';
import { CcaHeaderPage } from '../../pages/CcaHeaderPage';

test('CCA header shows branding and navigation', async ({ page }) => {
  await page.goto('/edio/');

  const header = new CcaHeaderPage(page);

  await expect(header.enrollmentAnnouncement).toContainText('Enrolling Now for');
  await expect(header.ccaHomeLogo).toBeVisible();
  await expect(header.purpleStarSchoolBadge).toBeVisible();
  await expect(header.requestInfoButton).toBeVisible();
  await expect(header.enrollButton).toBeVisible();

  await header.openMainMenu();

  for (const name of [
    'About CCA',
    'Academics',
    'Enrollment',
    'School Life & Community',
    'Contact Us',
    'Blog',
    'Login',
  ]) {
    await expect(header.getMenuLink(name)).toBeVisible();
  }
});
