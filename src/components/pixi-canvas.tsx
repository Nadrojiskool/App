import Head from 'next/head';
import { FC, useEffect, useRef, useState } from 'react';
import * as PIXI from 'pixi.js';
import { handleMouseMove, loadOverworld, moveOverworldPosition } from 'src/contexts/pixi-context';

export let iPixiApp:any = undefined;
const keys = new Map();

function downListener(e:any) {
  const { keyCode } = e;
  keys.set(keyCode, true);

  switch(keyCode) {
    case 87: case 38: {
      moveOverworldPosition({ y: 10 });
      return;
    }
    case 83: case 34: {
      moveOverworldPosition({ y: -10 });
      return;
    }
    case 65: case 37: {
      moveOverworldPosition({ x: 10 });
      return;
    }
    case 68: case 39: {
      moveOverworldPosition({ x: -10 });
      return;
    }
    default: return;
  }
}

function upListener(e:any) {
  keys.delete(e.keyCode);
}

export function mousemoveListener(e:any) {
  handleMouseMove(e);
}

interface PixiCanvasProps {
  
}

export const PixiCanvas: FC<PixiCanvasProps> = ({  }) => {
  const [pixiApp, setApp] = useState<any>();
  const canvasRef = useRef(null);

  useEffect(() => {
    window.addEventListener('keydown', downListener);
    window.addEventListener('keyup', upListener);
    window.addEventListener("mousemove", mousemoveListener);

    return () => {
      window.removeEventListener('keydown', downListener);
      window.removeEventListener('keyup', upListener);
      window.addEventListener("mousemove", mousemoveListener);
    }
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const app = new PIXI.Application({ view: canvasRef.current, resizeTo: window, backgroundColor: 0, backgroundAlpha: 0 });

    iPixiApp = app;
    setApp(app)
  }, [canvasRef.current]);

  useEffect(() => {
    if (pixiApp) loadOverworld();
  }, [pixiApp]);

  return <canvas ref={canvasRef} style={{ width: '100vw', height: '100vh' }}/>;
};
