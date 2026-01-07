import { test, expect } from '@playwright/test';

test.describe('PostDetailPage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByRole('textbox', { name: 'Username' }).click();
    await page.getByRole('textbox', { name: 'Username' }).fill('adrian');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123456');
    await page.getByRole('button', { name: 'Sign In' }).click();
  });
  
  test('Renderiza post y comentarios', async ({ page }) => {
    await page.getByRole('link', { name: 'papafrita que buenas estan' }).click();
    await page.getByTestId('post-title').click();
    await expect(page.getByTestId('post-title')).toBeVisible();
  });

  test('Sin post: muestra pantalla de not found', async ({ page }) => {
    await expect(page).toHaveURL(/\/home$/);

    await page.route('**/comments/post/**', route =>
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify([]) })
    );

    await page.evaluate(() => {
      history.pushState(null, '', '/post/999');
      window.dispatchEvent(new PopStateEvent('popstate'));
    });

    await expect(page).toHaveURL(/\/post\/999$/);
    await expect(page.locator('a[href="/home"]')).toBeVisible();

    await expect(page.getByTestId('post-not-found')).toBeVisible();
  });
});