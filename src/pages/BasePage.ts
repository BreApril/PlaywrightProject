import { Page, Locator, expect} from '@playwright/test';

export class BasePage {
    //Receives the Playwright page object and stores it
    constructor(public page: Page) {
        this.page = page;
    }

    //Navigates the browser to any URL you pass in
    async basePageGoToUrl(url: string) {
        await this.page.goto(url);
    }

    //Clicks any element you pass in as a locator
    async basePageClickElement(locator: Locator) {
        await locator.click();
    }

    //Clears any existing text first, then types new text
    async basePageEnterText(locator: Locator, text: string) {
        await locator.clear();
        await locator.fill(text);
    }
    
    //Reads and returns the current value of an input field
    async basePageGetTextValue(locator: Locator): Promise<string> {
        return await locator.inputValue();
    }
    
    //Asserts that an element is visible on the page
    async basePageVerifyElementIsVisible(locator: Locator) {
        await expect(locator).toBeVisible();
    }




}