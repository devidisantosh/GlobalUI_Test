// playwright.config.ts
import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
    timeout: 60000,
    use: {
        screenshot: 'only-on-failure',
        video: 'on',
        trace: 'retain-on-failure',
        headless: false
    },
    reporter: 'allure-playwright',
};

export default config;
