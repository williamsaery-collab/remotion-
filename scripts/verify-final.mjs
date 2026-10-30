import {openBrowser,selectComposition,renderStill} from '@remotion/renderer';
import {mkdir,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const browser=await openBrowser('chrome',{browserExecutable:process.env.REMOTION_BROWSER_EXECUTABLE});
try{
 const composition=await selectComposition({serveUrl:'build',id:'FinalFilm',puppeteerInstance:browser});
 assert.equal(composition.durationInFrames,5027);assert.equal(composition.width,1920);assert.equal(composition.height,1080);assert.equal(composition.fps,30);
 await mkdir('out/final-checks',{recursive:true});
 const frames=[0,120,330,550,785,864,865,895,1010,1320,1629,1900,2100,2380,2690,3060,3350,3680,3910,4230,4530,4800,5000];
 for(const frame of frames){await renderStill({serveUrl:'build',composition,frame,output:`out/final-checks/${frame}.png`,puppeteerInstance:browser,scale:.5});console.log('PASS',frame);}
 await writeFile('out/final-checks/results.json',JSON.stringify({composition:'FinalFilm',frames,durationFrames:5027,fps:30,width:1920,height:1080},null,2));
}finally{await browser.close({silent:true});}
