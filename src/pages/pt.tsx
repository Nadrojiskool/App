import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script'
import { useEffect, useRef, useState } from 'react';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { useZxing } from "react-zxing";
import axios from 'axios';
import { BasicDialog } from 'src/widgets/basic/basic-dialog';

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


export const BarcodeScanner = ({ onResult }) => {
  const { ref } = useZxing({ onResult });

  return <video ref={ref} style={{ maxWidth: '100%', maxHeight: '100%' }}/>;
};

export const ScannerDialog = ({ add, close }) => {
  const [code, setCode] = useState('');

  async function onResult(result) {
    const text = result.getText();
    
    if (result && !code) {
      setCode(text);
      add(text);
      close();
    }
  }

  return <BasicDialog title="Scan QR Code" open={true} close={close}>
    <BarcodeScanner onResult={onResult}/>
  </BasicDialog>
}

export const ScannedItemRow = ({ item }) => {
  const [expanded, setExpanded] = useState(false);
  const [key, value] = item;

  function expand() { if (value) setExpanded(true); }
  function collapse() { setExpanded(false); }

  return <Stack spacing='1rem' onClick={(expanded) ? collapse : expand} sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
    { value && <Typography sx={{ py: '0.25rem' }}>{ value['Card Name'] }</Typography> }
    <Typography sx={{ py: '0.25rem' }}>{ key }</Typography>
    { expanded && <Stack>
      <Stack direction="row">
        <Typography sx={{ py: '0.25rem' }}>{ value['Game'] }</Typography>
        <Typography sx={{ py: '0.25rem' }}>{ value['Card Set'] }</Typography>
        <Typography sx={{ py: '0.25rem' }}>{ value['Card Number'] }</Typography>
      </Stack>
      <Typography variant="h4" sx={{ py: '0.25rem' }}>{ value['Grade'] }</Typography>
    </Stack> }
  </Stack>
};

export const ScannedItemsList = ({ items }) => {
  return <Stack sx={{ width: '100%' }}>
    { Array.from(items).map((item) => <ScannedItemRow key={item[0]} item={item}/>) }
  </Stack>;
}

const Page = () => {
  const [scannerOpen, setScannerOpen] = useState(false);
  const [scannedItems, setScannedItems] = useState(new Map());

  function openScannerDialog() { setScannerOpen(true); }
  function closeScannerDialog() { setScannerOpen(false); }

  async function getDetails(code:string) {
    if (scannedItems.has(code)) return;

    try {
      scannedItems.set(code, undefined);
      setScannedItems(new Map(scannedItems));
      const { data: details } = await axios.post(`/api/pt`, { code });

      console.log('got details', details);
      scannedItems.set(code, details);
      setScannedItems(new Map(scannedItems));
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
        { scannerOpen && <ScannerDialog add={getDetails} close={closeScannerDialog}/> }
        <Stack sx={{ display: 'flex', justifyContent: 'center', width: '100vw', height: '100vh', p: '3rem' }}>
          { scannedItems.size > 0 && <ScannedItemsList items={scannedItems}/>}
          <Box sx={{ flexGrow: 1 }}></Box>
          <Button onClick={openScannerDialog} sx={{ background: 'lightskyblue', color: 'black', mx: '3rem', '&:hover': { background: 'blue' } }}>Scan</Button>
        </Stack>
      </main>
    </>
  );
};

export default Page;

export const config = {
  api: {
    responseLimit: '8mb',
  },
}
