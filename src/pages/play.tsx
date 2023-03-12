import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { Divider } from '@mui/material';
import { useAuthContext } from '../contexts/auth-context';
import { MainLayout } from '../components/main-layout';
import { HomeHero } from '../components/home/home-hero';
import { HomeHandcash } from '../components/home/home-handcash';
import { HomeDurodogs } from '../components/home/home-durodogs';
import { Stage } from '@pixi/react';
import { PixiCanvas } from 'src/components/pixi-canvas';


const Page = () => {
  return (
    <>
      <Head>
        <title>
          NFT Sample App | Asset Layer
        </title>
      </Head>
      <main style={{ overflow: 'hidden' }}>
        <PixiCanvas/>
      </main>
    </>
  );
};

export default Page;
