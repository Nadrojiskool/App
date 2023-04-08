import { CustomError } from "src/types/error";
import { parseBasicError } from "./validate";
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';



export default function getPuppeteerEndpoint(req:any, res:any) {
    return new Promise((resolve, reject)=>{
		const errorHandling = (error:any)=>{
			const e = parseBasicError(error);
			console.log(e.message);
			return resolve(res.status(e.status).json({ error: e.message }));
		}

        try {
            getEndpoint()
                .then((endpoint)=>{
                    resolve(res.status(200).json(endpoint));
                });
        } catch(e:any) {
            errorHandling(e);
        }
    })
    
}

export async function getEndpoint() {
    const browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
    });
    const page = await browser.newPage();
    const url = 'https://www.cgccards.com/certlookup/3991441013/'
    const selector = 'dl';

    await page.goto(url);
    await page.waitForSelector(selector);
    const elements = await page.$$(selector);

    const details = {};
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        const text = await page.evaluate(el => el.textContent, element);
        const formatted = text.replaceAll('\n', '_').replaceAll('\t', '');
        const final = formatted.substring(1, formatted.length - 1);
        const [key, value] = final.split('_');
        details[key] = value;
    }
    
    return details;
}