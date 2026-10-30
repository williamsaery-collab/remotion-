import {openBrowser,selectComposition,renderStill} from '@remotion/renderer';
import {mkdir,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const browserExecutable=process.env.REMOTION_BROWSER_EXECUTABLE;
const browser=await openBrowser('chrome',{browserExecutable});
try {
 const composition=await selectComposition({serveUrl:'build',id:'LTOOfficer',puppeteerInstance:browser});
 assert.equal(composition.durationInFrames,4500);assert.equal(composition.fps,30);assert.equal(composition.width,1920);assert.equal(composition.height,1080);
 await mkdir('out/checks',{recursive:true});
 // Every scene, every crossfade midpoint, first and last frame.
 const frames=[0,60,480,750,1200,1710,2220,2730,3180,3630,4260,4499,435,705,1125,1635,2145,2655,3105,3555,4005];
 for(const frame of frames){await renderStill({serveUrl:'build',composition,frame,output:`out/checks/frame-${frame}.png`,puppeteerInstance:browser,scale:.5});console.log(`PASS frame ${frame}`);}
 await writeFile('out/checks/result.json',JSON.stringify({composition:composition.id,width:composition.width,height:composition.height,fps:composition.fps,durationInFrames:composition.durationInFrames,frames},null,2));
} finally {await browser.close({silent:true});}
