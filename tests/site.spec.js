import { test, expect } from '@playwright/test'

test('作品筛选、展开与收起', async ({ page }) => {
  await page.goto('./')
  await expect(page.locator('h1')).toContainText('好玩的游戏')
  await expect(page.locator('.project-card')).toHaveCount(4)
  await page.getByRole('button', { name: '查看其余 18 个作品' }).click()
  await expect(page.locator('.project-card')).toHaveCount(22)
  await page.getByRole('button', { name: '收起作品' }).click()
  await expect(page.locator('.project-card')).toHaveCount(4)
  await page.getByRole('button', { name: /^AI\s*4$/ }).click()
  await expect(page.locator('.project-card')).toHaveCount(4)
  await expect(page.locator('.project-card').first()).toContainText('Takeuchi_Ayaka')
  await page.getByRole('button', { name: /^实验\s*6$/ }).click()
  await page.getByRole('button', { name: '查看其余 2 个作品' }).click()
  await expect(page.locator('.project-card')).toHaveCount(6)
})

test('壁纸搜索、空状态、方向切换和原图下载', async ({ page }) => {
  await page.goto('./file.html')
  await expect(page.locator('.wallpaper-card')).toHaveCount(11)
  const search = page.getByRole('searchbox', { name: '搜索壁纸名称' })
  await search.fill('星野')
  await expect(page.locator('.wallpaper-card')).toHaveCount(2)
  await search.fill('不存在的角色')
  await expect(page.getByText('还没有找到这张壁纸')).toBeVisible()
  await page.getByRole('button', { name: '清空搜索' }).click()
  await expect(page.locator('.wallpaper-card')).toHaveCount(11)
  await page.getByRole('button', { name: '竖版 · 手机' }).click()
  await expect(page.locator('.wallpaper-card').first().locator('img')).toHaveClass('portrait')
  const downloadEvent = page.waitForEvent('download')
  await page.getByRole('link', { name: '下载小鸟游星野竖版原图', exact: true }).click()
  const download = await downloadEvent
  expect(download.suggestedFilename()).toBe('小鸟游星野-phone.jpg')
  expect(await download.failure()).toBeNull()
})

test('服务器复制与复制失败提示', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await page.goto('./mc.html')
  await page.getByRole('button', { name: '复制服务器地址' }).click()
  await expect(page.getByRole('status')).toHaveText('服务器地址已复制。')
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    'mc.u848464.nyat.app:36427',
  )
  await page.evaluate(() => {
    Object.defineProperty(navigator.clipboard, 'writeText', {
      value: () => Promise.reject(new Error('denied')),
      configurable: true,
    })
  })
  await page.getByRole('button', { name: '复制服务器地址' }).click()
  await expect(page.getByRole('status')).toContainText('请选中上方地址手动复制')
})

test('音乐默认关闭，可播放和暂停', async ({ page }) => {
  await page.goto('./')
  expect(await page.locator('audio').evaluate((audio) => audio.paused)).toBe(true)
  await page.getByRole('button', { name: '播放背景音乐' }).click()
  await expect(page.getByRole('button', { name: '暂停背景音乐' })).toHaveAttribute(
    'aria-pressed',
    'true',
  )
  await page.getByRole('button', { name: '暂停背景音乐' }).click()
  await expect(page.getByRole('button', { name: '播放背景音乐' })).toHaveAttribute(
    'aria-pressed',
    'false',
  )
})

test('页面可直达、无资源错误且没有横向溢出', async ({ page }, testInfo) => {
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('response', (response) => {
    if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`)
  })
  for (const path of ['./', './mc.html', './file.html', './sb.html']) {
    await page.goto(path)
    await expect(page.locator('h1')).toBeVisible()
    await page.evaluate(async () => {
      for (const img of document.images) img.loading = 'eager'
      await Promise.all([...document.images].map((img) => img.decode().catch(() => {})))
    })
    expect(
      await page.evaluate(() =>
        [...document.images].every((img) => img.complete && img.naturalWidth > 0),
      ),
    ).toBe(true)
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
      ),
    ).toBe(true)
    await page.screenshot({
      path: testInfo.outputPath(
        `${path.includes('mc') ? 'minecraft' : path.includes('file') ? 'downloads' : path.includes('sb') ? 'secret' : 'home'}.png`,
      ),
      fullPage: true,
    })
  }
  expect(errors).toEqual([])
})

test('导航支持移动菜单、Escape 与跨页锚点', async ({ page, isMobile }) => {
  await page.goto('./mc.html')
  if (isMobile) {
    await page.getByRole('button', { name: '打开导航' }).click()
    await expect(page.getByRole('navigation', { name: '主导航' })).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.getByRole('navigation', { name: '主导航' })).toBeHidden()
    await page.getByRole('button', { name: '打开导航' }).click()
  }
  await page
    .getByRole('navigation', { name: '主导航' })
    .getByRole('link', { name: '作品', exact: true })
    .click()
  await expect(page).toHaveURL(/index\.html#projects$/)
  await expect(page.locator('#projects')).toBeInViewport()
})
