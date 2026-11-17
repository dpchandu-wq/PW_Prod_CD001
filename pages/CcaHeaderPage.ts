import { expect, type Locator, type Page } from '@playwright/test';

export class CcaHeaderPage {
  private readonly header: Locator;

  constructor(page: Page) {
    this.header = page.getByRole('banner');
  }

  // Reads the enrollment message at the top of the page.
  get enrollmentAnnouncement(): Locator {
    return this.header.getByRole('alert');
  }

  // Finds the CCA logo link in the header.
  get ccaHomeLogo(): Locator {
    return this.header.getByRole('link', {
      name: 'Commonwealth Charter Academy - Home',
    });
  }

  // Finds the Purple Star badge beside the CCA logo.
  get purpleStarSchoolBadge(): Locator {
    // The badge link has no accessible name, so use its destination to locate it.
    return this.header.locator('a[href*="purple-star-school"] img');
  }

  // Finds the Request Info action in the header.
  get requestInfoButton(): Locator {
    return this.header.getByRole('link', { name: /Request Info/ });
  }

  // Finds the Enroll action in the header.
  get enrollButton(): Locator {
    return this.header.getByRole('link', { name: /Enroll/ });
  }

  // Finds the control that opens the main navigation menu.
  get mainMenuButton(): Locator {
    return this.header.getByRole('button', { name: 'Toggle menu' });
  }

  // Finds a header menu link by its accessible name.
  getMenuLink(name: string | RegExp): Locator {
    return this.header.getByRole('link', {
      name,
      exact: typeof name === 'string',
    });
  }

  // Opens the main menu and waits for its expanded state.
  async openMainMenu(): Promise<void> {
    await this.mainMenuButton.click();
    await expect(this.mainMenuButton).toHaveAttribute('aria-expanded', 'true');
  }

  // Expands a top-level menu section to reveal its child links.
  async expandMenuSection(sectionName: string): Promise<void> {
    const sectionLink = this.getMenuLink(sectionName);
    const sectionItem = sectionLink.locator('xpath=..');

    // The site renders this submenu control as an icon, not a button.
    await sectionItem.locator(':scope > i.ubermenu-sub-indicator').click();
  }
}
