import { expect, type Locator, type Page } from '@playwright/test';

export class SuccessStoriesPage {
  constructor(private readonly page: Page) {}

  // Finds the main heading used to confirm the Success Stories page loaded.
  get pageHeading(): Locator {
    return this.page.getByRole('heading', {
      name: /Success stories of CCA learners/i,
    });
  }

  // Confirms navigation using the URL, page title, and main heading.
  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/success-stories/i);
    await expect(this.page).toHaveTitle(/Success Stories/i);
    await expect(this.pageHeading).toBeVisible();
  }
}
