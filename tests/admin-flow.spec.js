import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5173';

test.describe('Admin Portal - User Features', () => {
  
  test.beforeEach(async ({ page }) => {
    // 1. Mock Mission List API (Regex to catch anything ending in /admin/missions)
    await page.route(/\/admin\/missions$/, async route => {
      await route.fulfill({ 
        status: 200, 
        contentType: 'application/json',
        body: JSON.stringify([{ 
          id: 'M001', 
          clientPhone: '0600112233', 
          agentPhone: '-',
          status: 'pending', 
          category: 'Queue',
          price: '50 DH',
          express: 'No',
          zone: 'Zone A',
          createdDate: '2024-03-12'
        }]) 
      });
    });

    // 2. Mock Mission Details API (Regex to catch specific ID)
    await page.route(/\/admin\/missions\/M001/, async route => {
      await route.fulfill({ 
        status: 200, 
        contentType: 'application/json',
        body: JSON.stringify({ 
          id: 'M001', 
          clientPhone: '0600112233', 
          agentPhone: '',
          status: 'pending',
          address: '123 Boulevard Mohammed V, Casablanca',
          zone: 'Zone A',
          createdDate: '2024-03-12'
        }) 
      });
    });

    // 3. Mock OTP Request
    await page.route(/\/auth\/otp\/request/, async route => {
      await route.fulfill({ status: 200, body: JSON.stringify({ success: true }) });
    });
  });

  test('Login Flow: Navigation and Step Check', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    
    // Give it a second to handle the DEV_MODE redirect if it happens
    await page.waitForTimeout(1000);

    const url = page.url();
    if (url.includes('/login')) {
      const phoneInput = page.locator('input[type="tel"]');
      await expect(phoneInput).toBeVisible();
      await phoneInput.fill('0600000000');
      await page.click('button:has-text("envoyer")');
      
      const otpInput = page.locator('input[placeholder*="Saisir"]');
      await expect(otpInput).toBeVisible();
      await otpInput.fill('123456');
      await page.click('button:has-text("verifier")');
      
      await expect(page.getByText('RiLyQueue', { exact: true }).first()).toBeVisible();
    } else {
      // If redirected to dashboard (DEV_MODE=true)
      await expect(page.getByText('RiLyQueue', { exact: true }).first()).toBeVisible();
    }
  });

  test('Missions Page: Table and Modal functionality', async ({ page }) => {
    await page.goto(`${BASE_URL}/missions`);

    await expect(page.getByText(/Mission Supervision/i)).toBeVisible();
    
    const viewButton = page.locator('button:has-text("View")').first();
    await viewButton.waitFor({ state: 'visible' });
    await viewButton.click();

    // Verify Modal Details with increased timeout for network mock response
    await expect(page.getByText(/Mission Details/i)).toBeVisible();
    await expect(page.getByText(/Client Info/i)).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(/0600112233/i)).toBeVisible();
    
    await page.click('button:has-text("Close")');
    await expect(page.getByText(/Mission Details/i)).not.toBeVisible();
  });

  test('Responsive View: Mobile Layout', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(`${BASE_URL}/missions`);

    await expect(page.getByText(/Mission Supervision/i)).toBeVisible();
    await expect(page.locator('input[placeholder*="Search"]')).toBeVisible();
  });
});
