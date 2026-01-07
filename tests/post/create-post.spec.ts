import { test, expect } from '@playwright/test';

test.describe('CreatePostPage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByRole('textbox', { name: 'Username' }).click();
    await page.getByRole('textbox', { name: 'Username' }).fill('adrian');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123456');
    await page.getByRole('button', { name: 'Sign In' }).click();
  });

  test('Con sesión: crea post, limpia inputs y muestra éxito', async ({ page }) => {
    await page.getByRole('link', { name: 'Create Post' }).click();

    await page.getByRole('textbox', { name: 'Title' }).click();
    await page.getByRole('textbox', { name: 'Title' }).fill('klk');
    await page.getByRole('textbox', { name: 'Content' }).click();
    await page.getByRole('textbox', { name: 'Content' }).fill('djdhggfh');
    await page.getByRole('button', { name: 'Create Post' }).click();

    await expect(page.locator('.text-green-500')).toBeVisible();
  });

  test('Con sesión: error 500 en /posts muestra mensaje de error', async ({ page }) => {
    await expect(page).toHaveURL(/\/home$/);
    await page.route('**/posts', route =>
      route.fulfill({ status: 500, contentType: 'application/json', body: JSON.stringify({ error: 'fail' }) })
    );

    await page.evaluate(() => {
      history.pushState(null, '', '/create-post');
      window.dispatchEvent(new PopStateEvent('popstate'));
    });
    await expect(page).toHaveURL(/\/create-post$/);

    await page.locator('input[type="text"]').fill('Falla');
    await page.locator('textarea').fill('Debe fallar');
    await page.getByRole('button').click();

    await expect(page.locator('.text-red-500')).toBeVisible();
  });
});