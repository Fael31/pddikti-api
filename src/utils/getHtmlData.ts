import { executablePath } from 'puppeteer';
import puppeteer from 'puppeteer-core';
import { ApplicationError } from '../error';

export async function getHtmlData(url: string) {
    try {
        const browser = await puppeteer.launch({
            executablePath: executablePath()
        });
        const page = await browser.newPage();
        await page.goto(url, {
            waitUntil: 'networkidle0',
        });
        const data = await page.content();
        await browser.close();
        return data;
    } catch(err) {
        throw new ApplicationError('Failed to fetch HTML element')
    }
}