import { expect } from '@open-wc/testing';
import puppeteer from 'puppeteer/lib/esm/puppeteer';

describe('Login View', () => {
  let browser;
  let page;

  before(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 250
    });
    page = await browser.newPage();
  });

  it('Login button visible', async () => {
    await page.goto('http://localhost:8080/dist/', {
      waitUntil: 'networkidle0'
    });
    const title = await page.title();
    expect(title).equal('Google');
  }).timeout(10000);
});
