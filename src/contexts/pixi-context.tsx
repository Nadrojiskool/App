import createBasicContext from "src/components/basic-context";
import { iPixiApp } from "src/components/pixi-canvas";
import * as PIXI from 'pixi.js';

interface Position {
  x?: number;
  y?: number;
}

export const { BasicProvider:OverworldProvider, useBasicStore:useOverworldStore } = createBasicContext({});

const cursorPosition:any = { x: 0, y: 0, ox: 0, oy: 0 };
const overworldPosition = { x: 0, y: 0 };
let overworldLoaded = false;
let overworldLoading = false;
let overworldTerrain:any = null;
let selection:any = null;

async function updateSelection() {
  const { x:oox, y:ooy } = overworldPosition;
  const { x, y, ox, oy } = cursorPosition;
  const [oxx, oyy] = [Math.floor(x/32), Math.floor(y/32)];
  cursorPosition.ox = oxx;
  cursorPosition.oy = oyy;
  selection.x = oxx * 32 + (oox%32);
  selection.y = oyy * 32 + (ooy%32);
}

export async function handleMouseMove(e:any) {
  if (!selection) return;

  const { clientX:x, clientY:y } = e;
  cursorPosition.x = x;
  cursorPosition.y = y;
  updateSelection();
}

export async function moveOverworldPosition({ x, y }:Position) {
  if (x) overworldPosition.x += x;
  if (y) overworldPosition.y += y;
  updateOverworld();
}

export async function loadOverworld() {
  if (overworldLoaded || overworldLoading) return;
  overworldLoading = true;

  const grassTexture = await PIXI.Texture.from('static/grass04.png', { width: 32, height: 32 });
  const terrain = [] as any;
  for (let y = 0; y < 100; y++) {
    terrain.push([] as any);
    for (let x = 0; x < 100; x++) {
      const sprite = new PIXI.Sprite(grassTexture);
      sprite.x = (x * 32);
      sprite.y = (y * 32);
      sprite.zIndex = 1;
      // sprite.anchor.set(0.5);
      iPixiApp.stage.addChild(sprite);
      terrain[y][x] = sprite;
    }
  }
  overworldTerrain = terrain;
  const rect = selection = new PIXI.Graphics();
  rect.beginFill(0, 0.001);
  rect.lineStyle(1, 0xFF0000);
  rect.drawRect(0, 0, 32, 32);
  iPixiApp.stage.addChild(rect);

  overworldLoaded = true;
  overworldLoading = false;
}
  
export async function updateOverworld() {
  for (let y = 0; y < 100; y++) {
    for (let x = 0; x < 100; x++) {
      const sprite = overworldTerrain[y][x] as any;
      const { x:ox, y:oy } = overworldPosition;
      sprite.x = (ox + (x * 32));
      sprite.y = (oy + (y * 32));
    }
  }
  updateSelection();
}

