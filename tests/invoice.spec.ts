import { test, expect } from '../src/fixtures/CustomFixtures';
import { invoiceData } from '../src/data/TestData';

test('Create and validate invoice', async ({ 
    loginPage, 
    homePage, 
    adminPage, 
    invoicePage 
}) => {
    await loginPage.performFullLogin('admin@gmail.com', '@12345678');
    await homePage.verifyHomePageHeadingIsDisplayed();
    await homePage.navigateToAdminPage();
    await adminPage.verifyAdminPageIsDisplayed();
    await adminPage.navigateToInvoices();
    await invoicePage.verifyInvoicesPageIsDisplayed();
    await invoicePage.clickNewInvoice();
    await invoicePage.fillClientName(invoiceData.clientName);
    await invoicePage.fillClientAddress(invoiceData.clientAddress);
    await invoicePage.addCoursesAndSelect(4);
    await invoicePage.fillNotes(invoiceData.notes);
    await invoicePage.validateTotal(invoiceData.expectedTotal);
    await invoicePage.setDueDate(invoiceData.dueDate);
    await invoicePage.setPaymentStatus(invoiceData.status);
    await invoicePage.clickCreateInvoice();
    await invoicePage.validateInvoiceCreated(invoiceData.clientName);
});