import { test, expect } from '@playwright/test';

function randomLetters(length = 3): string {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  return Array.from({ length }, () =>
    letters.charAt(Math.floor(Math.random() * letters.length))
  ).join('');
}

test.describe('RegisterPage', () => {
  test('Registro de un usuario', async ({ page }) => {
    const random = randomLetters();

    const username = `test${random}`;
    const email = `test${random}@gmail.com`;
    const password = `test${random}12`;

    await page.goto('http://localhost:5173/');
    await page.getByRole('link', { name: 'Register' }).click();

    await page.getByRole('textbox', { name: 'Username' }).fill(username);
    await page.getByRole('textbox', { name: 'Email' }).fill(email);
    await page.getByRole('textbox', { name: 'Password' }).fill(password);

    await page.getByRole('button', { name: 'Register' }).click();

    await expect(page.getByTestId('login-text')).toBeVisible();
  });

  test('Registro erroneo de un usuario', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    
    await page.getByRole('link', { name: 'Register' }).click();
    await page.getByRole('textbox', { name: 'Username' }).fill('adrian');
    await page.getByRole('textbox', { name: 'Email' }).fill('adrian@gmail.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123456');
    await page.getByRole('button', { name: 'Register' }).click();

    await expect(page.getByTestId('error-register-text')).toBeVisible();
  });
});
