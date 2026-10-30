import {AbsoluteFill,Sequence,interpolate,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {Audio} from '@remotion/media';
import type {Caption} from '@remotion/captions';
import captions from './narration/preview-captions.json';
import waveform from './narration/ria-waveform.json';
import {BlueWaves,BrandMark,ProductPhone,RoadScene,ProcessIcon,smooth} from './LaunchElements';
const pages:Caption[][]=[];
for(const word of captions){if(!pages.length||pages[pages.length-1].length>=6||/[.?!]$/.test(pages[pages.length-1].at(-1)!.text))pages.push([]);pages[pages.length-1].push(word);}
const Captions=()=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();const ms=f/fps*1000;
 const words:Caption[]=captions;let active=-1;for(let i=0;i<words.length;i++)if(ms>=words[i].startMs)active=i;
 if(active<0||ms>words[active].endMs+400)return null;
 const group=pages.find(page=>page.some(w=>w.startMs===words[active].startMs))!;
 return <div style={{position:'absolute',left:190,right:190,bottom:117,textAlign:'center',fontSize:33,lineHeight:1.4,color:'white',textShadow:'0 2px 8px #0008'}}>{group.map((w,i)=><span key={w.startMs} style={{color:w.startMs===words[active].startMs?'#FFE1A1':'white',fontWeight:w.startMs===words[active].startMs?700:400}}>{w.text}</span>)}</div>;
};
export const Preview20=()=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();const t=f/fps;
 const pulse=waveform.rms[Math.min(waveform.rms.length-1,Math.floor(t/.05))]*4;
 const fade=(a:number,b:number,c:number,d:number)=>interpolate(t,[a,b,c,d],[0,1,1,0],smooth);
 return <AbsoluteFill style={{fontFamily:'Arial, Helvetica, sans-serif',background:'#08192C',color:'white',overflow:'hidden'}}>
 <AbsoluteFill style={{background:'radial-gradient(ellipse at 70% 30%,#174473,#08192C 72%)'}}/>
 <div style={{position:'absolute',inset:0,background:'#0645B5',clipPath:`circle(${interpolate(t,[6.1,7.1],[0,150],smooth)}% at 75% 50%)`}}/>
 <BlueWaves/>
 <div style={{position:'absolute',left:95,top:60,fontSize:22,letterSpacing:5,color:'#d4e6ff'}}>MiJoRi TECH <span style={{color:'#E6AA36',marginLeft:22}}>GROUP 2</span></div>
 <Sequence name="Problem · road and clock" from={0} durationInFrames={7*fps} premountFor={fps}>
 <div style={{opacity:fade(0,.5,5.9,6.7)}}><RoadScene pulse={pulse}/><div style={{position:'absolute',left:120,top:300,width:960}}><div style={{fontSize:22,color:'#E6AA36',letterSpacing:6,marginBottom:30}}>EVERY SECOND MATTERS</div><h1 style={{fontSize:96,letterSpacing:-4,lineHeight:1.08,margin:0}}>Traffic violations<br/>happen in seconds.</h1><div style={{fontSize:32,color:'#b3cbe5',marginTop:34}}>Recording them takes time.</div></div></div>
 </Sequence>
 <Sequence name="Paperwork · calculations · delayed records" from={6*fps} durationInFrames={8*fps} premountFor={fps}>
 <div style={{position:'absolute',inset:0,opacity:fade(6.3,6.9,12.0,13.1)}}><div style={{position:'absolute',left:120,top:205,fontSize:82,fontWeight:700,letterSpacing:-3}}>The work behind every ticket.</div>
 <div style={{position:'absolute',top:390,left:160,right:160,display:'flex',gap:90,justifyContent:'space-between'}}>{(['paper','calculator','records'] as const).map((kind,i)=><div key={kind} style={{width:440,opacity:interpolate(t,[6.5+i*.75,7.2+i*.75],[0,1],smooth),translate:`0 ${interpolate(t,[6.5+i*.75,7.5+i*.75],[55,0],smooth)}px`}}><ProcessIcon kind={kind}/><div style={{fontSize:37,fontWeight:600,marginTop:38}}>{['Paperwork','Manual calculations','Delayed records'][i]}</div><div style={{height:3,width:75,background:'#E6AA36',marginTop:30}}/></div>)}</div></div>
 </Sequence>
 <Sequence name="MiJoRi Tech logo reveal" from={12*fps} durationInFrames={5*fps} premountFor={fps}>
 <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',opacity:fade(12.1,12.8,14.8,15.7),scale:interpolate(t,[12,15],[.9,1.04],smooth)}}><BrandMark/><div style={{fontSize:108,fontWeight:700,letterSpacing:-5,marginTop:26}}>MiJoRi Tech</div><div style={{fontSize:25,color:'#FFE1A1',letterSpacing:8,marginTop:28}}>IDEAS INTO INNOVATION</div></div>
 </Sequence>
 <Sequence name="LTO Officer · real login reveal" from={15*fps} durationInFrames={5*fps} premountFor={fps}>
 <div style={{opacity:interpolate(t,[15,15.8],[0,1],smooth)}}><ProductPhone from={0} screen="login"/><div style={{position:'absolute',left:120,top:310,width:1050}}><div style={{fontSize:24,letterSpacing:6,color:'#FFE1A1',marginBottom:30}}>A SMARTER APPROACH</div><h1 style={{fontSize:128,lineHeight:1,margin:0,letterSpacing:-6}}>LTO Officer</h1><div style={{fontSize:38,marginTop:35,color:'#daeaff'}}>Smarter traffic ticketing.</div><div style={{fontSize:24,lineHeight:1.5,color:'#d1e3fc',marginTop:30}}>Mobile-Based Traffic Violation Ticketing System<br/>with Web Administration</div></div></div>
 </Sequence>
 <Audio name="Ria · original recording, unmodified" src={staticFile('voices/ria.mp3')} premountFor={fps}/>
 <Captions/>
 <div style={{position:'absolute',left:95,bottom:45,fontSize:17,letterSpacing:1.5,color:'#c6daf3'}}>IT311 — Application Development &amp; Emerging Technology <span style={{color:'#FFE1A1',marginLeft:20}}>FINAL PROJECT</span></div>
 <div style={{position:'absolute',right:95,bottom:45,fontSize:16,color:'#b7d2ef'}}>Student-developed application</div>
 </AbsoluteFill>;
};
