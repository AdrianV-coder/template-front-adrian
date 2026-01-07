import { test, expect } from '@playwright/test';

test.describe('LoginPage', () => {
  test('Iniciar sesión en la página', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    await page.getByRole('textbox', { name: 'Username' }).click();
    await page.getByRole('textbox', { name: 'Username' }).fill('adrian');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123456');
    await page.getByRole('button', { name: 'Sign In' }).click();

    await expect(page.getByTestId('log-out-button')).toBeVisible();
  });

  test('Iniciar sesión erroneo en la página', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    await page.getByRole('textbox', { name: 'Username' }).click();
    await page.getByRole('textbox', { name: 'Username' }).fill('adrian123');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123456');
    await page.getByRole('button', { name: 'Sign In' }).click();

    await expect(page.getByTestId('error-login-text')).toBeVisible();
  });
});