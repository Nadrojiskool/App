import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script'
import { useEffect, useRef, useState } from 'react';
import { Box, Divider } from '@mui/material';
import { useZxing } from "react-zxing";

export const BarcodeScanner = () => {
  const [code, setCode] = useState('');
  const { ref } = useZxing({
    onResult(result) {
      const text = result.getText();
      console.log('result', text);
      if (!result || text !== code) {
        setCode(text);
        alert(text);
      }
    },
  });

  return <video ref={ref} />;
};

const Page = () => {

  return (
    <>
      <Head>
        <title>
          NFT Sample App | Asset Layer
        </title>
      </Head>
      <main>
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100vw', height: '100vh' }}>
          <BarcodeScanner />
        </Box>
      </main>
    </>
  );
};

export default Page;
