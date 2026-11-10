import { expect, test } from '@playwright/test'

test('search finds Oil Change and opens maintenance', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('searchbox', { name: 'Search services and projects' }).fill('Oil Change')
  await page.getByRole('button', { name: /Oil Change/ }).first().click()
  await expect(page.getByRole('tab', { name: 'General Mechanic' })).toHaveAttribute('aria-selected', 'true')
})

test('contact shows the scheduler and the footer lists the phone', async ({ page }) => {
  await page.goto('/#contact')
  await expect(page.locator('.scheduler-host')).toBeVisible()
  await expect(page.getByRole('contentinfo')).toContainText('(702) 826-0225')
})

test('spanish navigation is available', async ({ page }, testInfo) => {
  await page.goto('/es')
  if (testInfo.project.name === 'mobile') {
    await page.getByRole('button', { name: 'Abrir menú' }).click()
  }
  await expect(page.getByRole('link', { name: 'Inicio' }).first()).toBeVisible()
})

test('mobile menu opens the sections', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'The menu button is for the narrow layout')
  await page.goto('/')
  await page.getByRole('button', { name: 'Open menu' }).click()
  await expect(page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'About' })).toBeVisible()
})

test('admin phone edit shows on the home page', async ({ page }) => {
  await page.goto('/admin/login')
  await page.getByLabel('Password').fill('heritage')
  await page.getByRole('button', { name: 'Enter' }).click()
  await page.getByLabel('Phone', { exact: true }).fill('(702) 111-2222')
  await page.getByRole('button', { name: 'Save' }).click()
  await page.goto('/')
  await expect(page.getByRole('contentinfo')).toContainText('(702) 111-2222')
})
