import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script'
import { useEffect, useRef, useState } from 'react';
import { Box, Divider } from '@mui/material';
import { useZxing } from "react-zxing";
import axios from 'axios';

let loaded = false;
const isBrowser = (typeof window !== "undefined");

/*
const getQuotes = async () => {
  // Start a Puppeteer session with:
  // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
  // - no default viewport (`defaultViewport: null` - website page will in full width and height)
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  // Open a new page
  const page = await browser.newPage();

  // On this new page:
  // - open the "http://quotes.toscrape.com/" website
  // - wait until the dom content is loaded (HTML is ready)
  await page.goto("http://quotes.toscrape.com/", {
    waitUntil: "domcontentloaded",
  });
};
*/

// Start the scraping
// getQuotes();


export const BarcodeScanner = ({ getDetails }) => {
  const [code, setCode] = useState('');
  
  const { ref } = useZxing({
    onResult(result) {
      const text = result.getText();
      console.log('result', text);
      if (result && !code) {
        setCode(text);
        alert(text);
        getDetails('https://www.cgccards.com/certlookup/3991441013/');
      }
    },
  });

  return <video ref={ref} />;
};

const Page = () => {
  const [details, setDetails] = useState(undefined);

  async function getDetails(url:string) {
    loaded = true;
    try {
      const { data: details } = await axios.get('/api/pt');

      console.log('got details', details);
      setDetails(details);
    }
    catch (e) {
      console.warn('puppeteer error', e);
    }
  }

  return (
    <>
      <Head>
        <title>
          NFT Sample App | Asset Layer
        </title>
      </Head>
      <main>
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100vw', height: '100vh' }}>
          { !details && <BarcodeScanner getDetails={getDetails}/> }
          { details && JSON.stringify(details) }
        </Box>
      </main>
    </>
  );
};

export default Page;
