import { Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class AdminPage extends BasePage {

    //Locators
    get adminDashboardHeading(): Locator {
        return this.page.getByRole('heading', { name: 'Admin Dashboard' });
    }

    get invoicesLink(): Locator {
        return this.page.getByRole('button', { name: 'Invoices' });
}

     // Methods
    async verifyAdminPageIsDisplayed() {
        await this.basePageVerifyElementIsVisible(this.adminDashboardHeading);
    }

    async navigateToInvoices() {
    await this.basePageClickElement(this.invoicesLink);
}

}