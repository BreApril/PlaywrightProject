import { Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class InvoicePage extends BasePage {

    //Locators
    get invoicesHeading(): Locator {
        return this.page.getByRole('heading', { name: 'Invoices' });
    }

    get newInvoiceButton(): Locator {
        return this.page.getByRole('button', { name: 'New Invoice' });
    }

    get clientNameField(): Locator {
        return this.page.getByPlaceholder('Type client name or email...');
    }

    get clientAddressField(): Locator {
        return this.page.getByPlaceholder('Enter client address...');
    }

    get addCourseButton(): Locator {
        return this.page.getByRole('button', { name: 'Add Course' });
    }

    get courseDropdown(): Locator {
    return this.page.locator('select').filter({ hasText: 'Select course' });
}

    get notesField(): Locator {
        return this.page.getByPlaceholder('Additional notes...');
    }

    get dueDateField(): Locator {
        return this.page.locator('input[type="date"]');
    }

    get paymentStatusDropdown(): Locator {
    return this.page.locator('select').filter({ hasText: 'Pending' });
    }

    get totalAmount(): Locator {
    return this.page.locator('xpath=//*[contains(text(),"Total:")]/following-sibling::*');
    }

    get createInvoiceButton(): Locator {
        return this.page.getByRole('button', { name: 'Create Invoice' });
    }

    // Methods
    async verifyInvoicesPageIsDisplayed() {
        await this.basePageVerifyElementIsVisible(this.invoicesHeading);
    }

    async clickNewInvoice() {
        await this.basePageClickElement(this.newInvoiceButton);
    }

    async fillClientName(name: string) {
        await this.basePageEnterText(this.clientNameField, name);
    }

    async fillClientAddress(address: string) {
        await this.basePageEnterText(this.clientAddressField, address);
    }

    async addCoursesAndSelect(times: number) {
    const courses = ['Testing Course', 'API Testing with Postman – Fundamentals'];
    
    for (let i = 0; i < times; i++) {
        // Use JavaScript click to bypass overlay
        await this.addCourseButton.dispatchEvent('click');
        
        // Wait for a new select to appear
        await this.page.waitForFunction(
            (count) => document.querySelectorAll('select').length > count,
            i
        );
        
        const courseDropdowns = this.page.locator('select');
        await courseDropdowns.nth(i).selectOption({ label: courses[i % courses.length] });
    }
}

    async fillNotes(description: string) {
        await this.basePageEnterText(this.notesField, description);
    }

    async setDueDate(date: string) {
        await this.basePageEnterText(this.dueDateField, date);
    }

    async setPaymentStatus(status: string) {
    await this.paymentStatusDropdown.selectOption({ label: '✅ Paid' });
    }

    async validateTotal(expectedTotal: string) {
        await expect(this.totalAmount).toContainText(expectedTotal);
    }

    async clickCreateInvoice() {
    await this.createInvoiceButton.dispatchEvent('click');
    }

    async validateInvoiceCreated(clientName: string) {
    // Verify we're back on the invoices list
    await this.basePageVerifyElementIsVisible(this.invoicesHeading);
    
    // Verify the client name appears in the invoice table
    await expect(
        this.page.locator('table').getByText(clientName)
    ).toBeVisible();

    // Verify status shows as Paid
    await expect(
        this.page.locator('table').getByText('Paid')
    ).toBeVisible();

    // Verify amount appears in table
    await expect(
        this.page.locator('table').getByText('2 760')
    ).toBeVisible();
}

}