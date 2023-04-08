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

const getCamera = async () => {
 
  if (!navigator.mediaDevices) {
      throw new Error("mediaDevices API unavailable.");
  }

  const devices = await navigator.mediaDevices.enumerateDevices();
  const cameras = devices.filter(d => (d.kind === "videoinput"));
  return cameras[0];

};

// const qrWorker = (typeof window !== 'undefined') ? new Worker("./workers/qr-worker.js") : undefined;
 
/*
qrWorker.addEventListener("message", ({data}) => {
 
    if (data) {
        // Data from QR code available 
        // 
        // Handle a successful scan here.
    }
    else {
        // No QR code detected in this frame
        // 
        // Feed the next frame to the QR worker 
        // now (this code is introduced below).
        //tick();     
    }
 
});
*/

//const tick = () => requestAnimationFrame(updateJsQr);

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

    const width = 320;
    const height = 240;
    photo.width = width;
    photo.height = height;

    return setInterval(() => {
      ctx.drawImage(video, 0, 0, width, height);
      const imageData = ctx.getImageData(0, 0, width, height);
      const code = jsQR(imageData.data, width, height);

      if (code) {
        console.log("Found QR code", code);
        setFound(true);
      }
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
