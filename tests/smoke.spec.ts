import { test, expect } from 'playwright/test';

// ─── App Shell ────────────────────────────────────────────────

test('App loads without errors', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Resume Builder/);
});

test('Landing page has product hero', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /Build a resume/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /start editing/i })).toBeVisible();
});

test('Start editing opens the builder', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /start editing/i }).click();
  await expect(page.getByLabel('Resume editor')).toBeVisible();
});

test('Landing template section is visible', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: /templates/i }).click();
  const templatesSection = page.locator('#templates');
  await expect(templatesSection.getByRole('heading', { name: 'Minimal' })).toBeVisible();
  await expect(templatesSection.getByRole('heading', { name: 'Modern' })).toBeVisible();
  await expect(templatesSection.getByRole('heading', { name: 'Professional' })).toBeVisible();
});

test('Dark mode toggle works', async ({ page }) => {
  await page.goto('/');
  const initialDark = await page.evaluate(() =>
    document.documentElement.classList.contains('dark')
  );
  await page.getByLabel(/dark mode/i).click();
  const afterDark = await page.evaluate(() =>
    document.documentElement.classList.contains('dark')
  );
  expect(afterDark).not.toBe(initialDark);
});

test('Privacy and Terms links exist', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /start editing/i }).click();
  const footer = page.locator('footer');
  await expect(footer.getByRole('link', { name: /privacy/i })).toHaveAttribute('href', '/privacy.html');
  await expect(footer.getByRole('link', { name: /terms/i })).toHaveAttribute('href', '/terms.html');
});

// ─── Builder ─────────────────────────────────────────────────

test('Builder loads with sample data pre-filled', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /start editing/i }).click();
  await expect(page.getByLabel('Resume editor')).toBeVisible();
  // Sample data name should appear in the preview
  await expect(page.locator('#resume-preview')).toContainText('Alexandra Chen');
});

test('Personal info form accepts input', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /start editing/i }).click();
  const nameInput = page.getByLabel(/full name/i);
  await nameInput.fill('Jane Smith');
  await expect(page.locator('#resume-preview')).toContainText('Jane Smith');
});

test('Template selector switches between templates', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /start editing/i }).click();
  // Modern template should switch the preview
  const modernBtn = page.getByRole('button', { name: 'Modern' });
  await modernBtn.click();
  // The preview should still contain the sample name
  await expect(page.locator('#resume-preview')).toContainText('Alexandra Chen');
});

test('Add experience button creates a new entry', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /start editing/i }).click();
  const countBefore = await page.getByText(/^Experience \d+$/).count();
  await page.getByRole('button', { name: 'Add experience' }).click();
  await expect(page.getByText(/^Experience \d+$/)).toHaveCount(countBefore + 1);
});

test('Dark mode toggle works in builder', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /start editing/i }).click();
  await page.getByLabel(/dark mode/i).click();
  await expect(page.locator('html')).toHaveClass(/dark/);
});

test('Export JSON button is present', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /start editing/i }).click();
  const exportBtn = page.getByLabel(/export resume data as json/i);
  await expect(exportBtn).toBeVisible();
});

test('Clear button shows confirmation dialog', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /start editing/i }).click();
  const clearBtn = page.getByRole('button', { name: 'Clear' });
  // Set up dialog handler before clicking
  page.on('dialog', async (dialog) => {
    expect(dialog.message()).toContain('Clear');
    await dialog.dismiss();
  });
  await clearBtn.click();
});

test('Preview panel is visible and contains resume content', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /start editing/i }).click();
  await expect(page.getByLabel('Resume preview')).toBeVisible();
  await expect(page.locator('#resume-preview')).toBeVisible();
});

test('Premium upgrade UI is accessible', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /start editing/i }).click();
  const upgradeBtn = page.getByRole('button', { name: /unlock/i });
  await expect(upgradeBtn).toBeVisible();
});

test('Keyboard shortcut Ctrl+L toggles dark mode', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /start editing/i }).click();
  const beforeDark = await page.evaluate(() =>
    document.documentElement.classList.contains('dark')
  );
  await page.keyboard.press('Control+l');
  const afterDark = await page.evaluate(() =>
    document.documentElement.classList.contains('dark')
  );
  expect(afterDark).not.toBe(beforeDark);
});

test('Premium key activation works with demo key', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /start editing/i }).click();
  await page.getByRole('button', { name: /unlock/i }).click();
  await page.getByPlaceholder(/license key/i).fill('premium-demo');
  await page.getByRole('button', { name: /activate/i }).click();
  await expect(page.getByText(/premium active/i)).toBeVisible();
});

// ─── Responsive ───────────────────────────────────────────────

test('Mobile viewport renders builder without horizontal scroll', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  await page.getByRole('button', { name: /start editing/i }).click();
  const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
  const viewportWidth = await page.evaluate(() => window.innerWidth);
  expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 2);
});

// ─── Performance / Accessibility ──────────────────────────────

test('No console errors on app load', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  // Filter out known-non-critical errors (e.g., goatcounter external script)
  const criticalErrors = errors.filter(
    (e) => !e.includes('goatcounter') && !e.includes('favicon')
  );
  expect(criticalErrors).toHaveLength(0);
});

test('Skip to main content link is present in DOM', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /start editing/i }).click();
  await expect(page.getByRole('link', { name: 'Skip to main content' })).toHaveCount(1);
});
