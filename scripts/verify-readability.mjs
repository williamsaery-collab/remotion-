import {openBrowser,selectComposition,renderStill} from '@remotion/renderer';
import {mkdir,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const browser=await openBrowser('chrome',{browserExecutable:process.env.REMOTION_BROWSER_EXECUTABLE});
try{
 const composition=await selectComposition({serveUrl:'build',id:'FinalFilm',puppeteerInstance:browser});
 assert.equal(composition.durationInFrames,5027);assert.equal(composition.fps,30);
 await mkdir('out/readability-checks',{recursive:true});
 const frames=[1320,1460,1760,1900,1980,2140,2380,2440,2600,3100,3400,3620,3870,4120,4530];
 for(const frame of frames){await renderStill({serveUrl:'build',composition,frame,output:`out/readability-checks/${frame}.png`,puppeteerInstance:browser});console.log('PASS',frame);}
 await writeFile('out/readability-checks/frames.json',JSON.stringify({frames,crop:{x:550,y:190,width:1240,height:650},source:{width:576,height:1280},unmodifiedTiming:true},null,2));
}finally{await browser.close({silent:true});}
