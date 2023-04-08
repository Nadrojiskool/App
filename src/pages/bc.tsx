import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script'
import { useEffect, useRef, useState } from 'react';
import { Box, Divider } from '@mui/material';
import { useAuthContext } from '../contexts/auth-context';
import { MainLayout } from '../components/main-layout';
import { HomeHero } from '../components/home/home-hero';
import { HomeHandcash } from '../components/home/home-handcash';
import { HomeDurodogs } from '../components/home/home-durodogs';
import { Stage } from '@pixi/react';
import { sleep } from 'src/utils/wait';
import jsQR from 'jsqr';

let loaded = false;
var video;
var snap;
const snapInterval = 200;
var snapIntervalId;

const Page = () => {
  const [found, setFound] = useState(false);
  const videoRef = useRef(null);
  const photoRef = useRef(null);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then(stream => {
        video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch(err => {
        console.error("error:", err);
      });
  };

  const stopSteam = (e) => {
    const stream = video.srcObject;
    const tracks = stream.getTracks();
  
    for (let i = 0; i < tracks.length; i++) {
      let track = tracks[i];
      track.stop();
    }
  
    video.srcObject = null;
  }

  const paintToCanvas = () => {
    let video = videoRef.current;
    let photo = photoRef.current;
    let ctx = photo.getContext("2d");
    const found1 = new Set();
    const found2 = new Set();

    const width = 320;
    const height = 240;
    photo.width = width;
    photo.height = height;

    return setInterval(() => {
      ctx.drawImage(video, 0, 0, width, height);
      const imageData = ctx.getImageData(0, 0, width, height);
      
      javascriptBarcodeReader({
        // Image file Path || {data: Uint8ClampedArray, width, height} || HTML5 Canvas ImageData
        image: imageData,
        barcode: 'ean-13',
        // barcodeType: 'industrial',
        options: {    
          // useAdaptiveThreshold: true // for images with sahded portions
          // singlePass: true
        }
      })
        .then(code => { 
          if (code && code.length === 12) { 
            if (!found1.has(code)) {
              found1.add(code)
              console.log("Found barcode 1", code);
            }
            else if (!found2.has(code)) {
              found2.add(code)
              console.log("Found barcode 2", code);
            }
            else {
              console.log("Found barcode 3", code);
              setFound(true);
            }
          }
        })
        .catch(err => { console.log(err) })
    }, snapInterval);
  };

  useEffect(() => {
    if (!loaded && !video) {
      loaded = true;
      getVideo();
      paintToCanvas();
    }
  }, []);

  return (
    <>
      <Script src="https://www.unpkg.com/javascript-barcode-reader" />
      <Head>
        <title>
          NFT Sample App | Asset Layer
        </title>
      </Head>
      <main>
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100vw', height: '100vh', border: (found) ? '3px solid red' : 'none' }}>
          <video ref={videoRef} autoPlay muted/>
          <canvas ref={photoRef} style={{ position: 'absolute', display: 'none' }}/>
        </Box>
      </main>
    </>
  );
};

export default Page;
