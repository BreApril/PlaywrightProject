import { Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {

    //Locators for the elements on the home page
    get verifyHomePageHeading(): Locator {
        return this.page.getByRole('heading', { name: /Welcome\s*back/i });
    }

    async verifyHomePageHeadingIsDisplayed() {
        await this.basePageVerifyElementIsVisible(this.verifyHomePageHeading);
    }

    async navigateToAdminPage() {
    await this.basePageClickElement(
        this.page.locator('xpath=//button/span[text() = "Menu"]'));
    await this.basePageClickElement(
        this.page.locator('xpath=//span[contains(.,"Admin Panel")]').first());
}
        
}