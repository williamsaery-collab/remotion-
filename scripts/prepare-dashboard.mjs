// Render opaque privacy overlays over the original capture. Raw input stays in
// ignored out/intake and is deleted after rendering; only the safe PNG is shipped.
import {mkdir,copyFile,writeFile,rm} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {resolve} from 'node:path';
if(!process.argv[2])throw new Error('Pass the private original dashboard image path');
const folder=resolve('out/intake');await mkdir(`${folder}/public`,{recursive:true});
await mkdir('public/screenshots/approved',{recursive:true});
await copyFile(process.argv[2],`${folder}/public/source.jpg`);
await writeFile(`${folder}/index.tsx`, `import {registerRoot,Still,AbsoluteFill,CanvasImage,staticFile} from 'remotion';
const Mask=({x,y,w,h,color='#FFFFFF'}:{x:number;y:number;w:number;h:number;color?:string})=><div style={{position:'absolute',left:x,top:y,width:w,height:h,background:color}}/>;
const Screen=()=> <AbsoluteFill><CanvasImage src={staticFile('source.jpg')} style={{width:576,height:1280}}/>
<Mask x={0} y={0} w={576} h={59} color="#F4F5FB"/>
<Mask x={114} y={106} w={300} h={32} color="#0B1B2E"/>
<Mask x={104} y={480} w={258} h={50}/><Mask x={104} y={531} w={438} h={23}/>
<Mask x={104} y={592} w={258} h={51}/><Mask x={104} y={643} w={438} h={23}/>
<Mask x={104} y={705} w={258} h={51}/><Mask x={104} y={756} w={438} h={23}/>
<Mask x={0} y={1220} w={576} h={60} color="#0B1B2E"/>
</AbsoluteFill>;
registerRoot(()=> <Still id="SanitizeDashboard" component={Screen} width={576} height={1280}/>);`);
const args=['remotion','still',`${folder}/index.tsx`,'SanitizeDashboard','public/screenshots/approved/dashboard.png',`--public-dir=${folder}/public`];
if(process.env.REMOTION_BROWSER_EXECUTABLE)args.push(`--browser-executable=${process.env.REMOTION_BROWSER_EXECUTABLE}`);
try{const r=spawnSync('npx',args,{stdio:'inherit'});if(r.status!==0)process.exitCode=r.status||1;}
finally{await rm(folder,{recursive:true,force:true});}
