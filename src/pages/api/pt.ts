import { BasicError, CustomError } from "src/types/error";
import { parseBasicError } from "./validate";
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import { NextApiRequest, NextApiResponse } from "next";
import z from 'zod';

const isUrl = z.string().url();

export default function getCodeData(req:NextApiRequest, res:NextApiResponse) {
    return new Promise((resolve, reject)=>{
		const errorHandling = (error:any)=>{
			const e = parseBasicError(error);
			console.log(e.message);
			return resolve(res.status(e.status).json({ error: e.message }));
		}

        try {
            const { code } = req.body;

            if (!code) throw new BasicError('No code provided', 412);

            parseCodeData(code)
                .then(getData)
                .then((data)=>{
                    resolve(res.status(200).json(data));
                })
                .catch(errorHandling);
        } catch(e:any) {
            errorHandling(e);
        }
    })
    
}

export async function parseCodeData(code: string) {
    isUrl.safeParse(code);
    const splitUrl = code.split('/');
    const last = splitUrl.at(-1);
    
    if (last.length !== 10) throw new BasicError('invalid cert', 412);

    return last;
}

export async function getData(code: string) {
    const browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
    });
    const page = await browser.newPage();
    const url = `https://www.cgccards.com/certlookup/${code}`;
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