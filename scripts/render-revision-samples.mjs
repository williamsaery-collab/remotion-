import {spawnSync} from 'node:child_process';
import {mkdirSync,writeFileSync} from 'node:fs';
mkdirSync('out/revised-samples',{recursive:true});
const clips=[['ticket-creation',1740,1859],['camera-evidence',2340,2459],['violations-fines',3320,3439],['digital-ticket',3840,3959]];
for(const [name,start,end] of clips){
 const r=spawnSync('npx',['remotion','render','src/index.ts','FinalFilm',`out/revised-samples/${name}.mp4`,`--frames=${start}-${end}`,'--browser-executable=/usr/bin/chromium','--concurrency=2','--crf=18','--audio-bitrate=256k'],{stdio:'inherit'});
 if(r.status!==0)process.exit(r.status??1);
 const v=spawnSync('ffmpeg',['-v','error','-err_detect','explode','-i',`out/revised-samples/${name}.mp4`,'-f','null','-'],{stdio:'inherit'});if(v.status!==0)process.exit(v.status??1);
}
writeFileSync('out/revised-samples/results.json',JSON.stringify({clips,fullResolution:true,fps:30,strictDecode:'passed'},null,2));
