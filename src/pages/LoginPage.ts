import {Locator, expect} from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {

    //Opens the home/landing page of your app
    async openNdosiPage() {
        await this.basePageGoToUrl('/');

    }

    //Clicks the Login button on the landing page to open the login form/verifies form loaded
    async navigateToLoginPage() {
        await this.basePageClickElement(this.page.getByRole('button', { name: 'Login' }));
        await expect(this.page.locator('#login-email')).toBeVisible();
    }

    //Populates the login form with the provided username and password, then clicks the login button
    async userLogin(username: string, password: string) {
        await this.basePageEnterText(this.page.locator('#login-email'), username);
        await this.basePageEnterText(this.page.locator('#login-password'), password);
        await this.basePageClickElement(this.page.locator('xpath=//button[contains(.,"Login")]'));
    }

    //Combines the above three methods to perform a full login in one step
    async performFullLogin(username: string, password: string) {
        await this.basePageGoToUrl('/');
        await this.navigateToLoginPage();
        await this. userLogin(username, password);
    }


}