import { test, expect } from '@playwright/test';

test.describe('AccountPage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByRole('textbox', { name: 'Username' }).click();
    await page.getByRole('textbox', { name: 'Username' }).fill('adrian');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123456');
    await page.getByRole('button', { name: 'Sign In' }).click();
  });

  test('Con sesión: Se carga la página', async ({ page }) => {
    await page.getByRole('link', { name: 'Account' }).click();

    await expect(page.getByTestId('personal-statistics-button')).toBeVisible();
  });
});