import {openBrowser} from '@remotion/renderer';
import {writeFile} from 'node:fs/promises';
const browser=await openBrowser('chrome',{browserExecutable:process.env.REMOTION_BROWSER_EXECUTABLE});
try{
 const page=await browser.newPage({context:()=>null,logLevel:'error',indent:false,pageIndex:0,onBrowserLog:null,onLog:()=>{}});
 await page.goto({url:'http://localhost:3000/Preview20',timeout:30000});
 const client=page._client();
 await client.send('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
 let body='';
 for(let i=0;i<30;i++){
 const result=await client.send('Runtime.evaluate',{expression:'document.body.innerText',returnByValue:true});body=result.value.result.value;
 if(body.includes('Preview20')&&body.includes('Opening15'))break;
 await new Promise(r=>setTimeout(r,500));
 }
 if(!body.includes('Preview20')||!body.includes('Opening15'))throw new Error('Studio composition list did not load');
 const image=await client.send('Page.captureScreenshot',{format:'png'});
 await writeFile('out/checks/studio.png',Buffer.from(image.value.data,'base64'));
 console.log('PASS Studio loaded both main compositions');
}finally{await browser.close({silent:true});}
