import { test } from '@playwright/test';

test.describe('CreateCommentPage', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173/');
        await page.getByRole('textbox', { name: 'Username' }).click();
        await page.getByRole('textbox', { name: 'Username' }).fill('adrian');
        await page.getByRole('textbox', { name: 'Password' }).click();
        await page.getByRole('textbox', { name: 'Password' }).fill('admin123456');
        await page.getByRole('button', { name: 'Sign In' }).click();
    });

    test('Create comment', async ({ page }) => {
        await page.getByRole('button', { name: 'Create Comment' }).nth(1).click();

        await page.getByRole('textbox', { name: 'Write your comment...' }).click();
        await page.getByRole('textbox', { name: 'Write your comment...' }).fill('q guayy');
        
        page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => {});
        });
        await page.getByRole('button', { name: 'Send' }).click();
    });
});