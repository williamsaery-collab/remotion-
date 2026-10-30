import {AbsoluteFill,Sequence,interpolate,staticFile,useCurrentFrame,useVideoConfig,spring,Easing} from 'remotion';
import {Audio} from '@remotion/media';
import type {Caption} from '@remotion/captions';
import captions from './narration/preview-captions.json';
import waveform from './narration/ria-waveform.json';
import {MotionBlurLayer,KineticWords,LogoFormation} from './MotionPrimitives';
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
 <AbsoluteFill style={{background:'radial-gradient(ellipse at 75% 30%,#174473,#08192C 72%)'}}/>
 <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 70% 35%,#1670d5,#0645B5 65%)',clipPath:`circle(${interpolate(t,[5.7,7.2],[0,150],smooth)}% at 85% 26%)`}}/>
 <BlueWaves/>
 <div style={{position:'absolute',left:95,top:60,fontSize:22,letterSpacing:5,color:'#d4e6ff'}}>MiJoRi TECH <span style={{color:'#E6AA36',marginLeft:22}}>GROUP 2</span></div>
 <div style={{position:'absolute',inset:0,opacity:fade(0,.25,6,7.2),translate:`${interpolate(t,[5.8,7.3],[0,-370],smooth)}px ${interpolate(t,[5.8,7.3],[0,90],smooth)}px`,scale:1,transformOrigin:'60% 40%'}}>
 <MotionBlurLayer><RoadScene pulse={pulse}/></MotionBlurLayer>
 <div style={{position:'absolute',left:110,top:270,width:1070}}><div style={{fontSize:22,color:'#E6AA36',letterSpacing:6,marginBottom:30,opacity:interpolate(t,[0,.5],[0,1],smooth)}}>EVERY SECOND MATTERS</div><KineticWords words={['Traffic ','violations']} starts={[.14,.74]} size={100}/><KineticWords words={['happen ','in ','seconds.']} starts={[1.18,1.88,2.26]} size={100}/><div style={{fontSize:34,color:'#b3cbe5',marginTop:38,translate:`0 ${interpolate(t,[3.28,4.2],[35,0],smooth)}px`,opacity:interpolate(t,[3.28,4.1],[0,1],smooth)}}>Recording them takes time.</div></div>
 </div>
 <svg width="1920" height="1080" style={{position:'absolute',opacity:fade(5.6,6,7.5,8.3),pointerEvents:'none'}}><circle cx={interpolate(t,[5.6,7.5],[1650,960],smooth)} cy={interpolate(t,[5.6,7.5],[275,470],smooth)} r={interpolate(t,[5.6,7.5],[100,550],smooth)} fill="none" stroke="#80d6ff" strokeWidth="2" opacity=".35"/></svg>
 <div style={{position:'absolute',inset:0,opacity:fade(6,6.7,12.2,13.5)}}>
 <div style={{position:'absolute',left:110,top:190,translate:`${interpolate(t,[11.7,13.5],[0,-120],smooth)}px 0px`,opacity:interpolate(t,[11.9,13.1],[1,0],smooth)}}><KineticWords words={['The work ','behind every ticket.']} starts={[6.1,6.5]} size={78}/></div>
 {(['paper','calculator','records'] as const).map((kind,i)=>{
 const starts=[6.72,7.8,9.92];const p=spring({frame:Math.max(0,f-starts[i]*fps),fps,config:{damping:19,stiffness:85,mass:.9}});const gather=interpolate(t,[11.75+i*.12,13.2],[0,1],smooth);
 const baseX=[320,930,1500][i];const x=baseX+(960-baseX)*gather;const y=455+Math.sin(t*1.6+i)*14+(400-455)*gather;
 return <div key={kind} style={{position:'absolute',left:x-110,top:y-100,width:220,textAlign:'center',opacity:interpolate(t,[starts[i],starts[i]+.3,12.7,13.3],[0,1,1,0],smooth),translate:`${(1-p)*(i===2?190:-170)}px ${(1-p)*105}px`,scale:(.55+p*.9)*(1-gather*.85),rotate:`${(1-p)*-22+Math.sin(t*1.1+i)*3}deg`}}>
 <svg width="240" height="240" style={{position:'absolute',left:-10,top:-20}}><circle cx="120" cy="120" r="100" fill="#addfff" opacity=".05"/><circle cx="120" cy="120" r="99" fill="none" stroke="#95dcff" strokeWidth="2" strokeDasharray="140 480" strokeDashoffset={-t*65-i*150} opacity=".4"/></svg>
 <div style={{position:'relative',paddingTop:30,filter:'drop-shadow(0 12px 14px #001a5066)'}}><ProcessIcon kind={kind}/></div><div style={{fontSize:25,fontWeight:600,marginTop:28,whiteSpace:'nowrap',translate:'-25px 0px',width:270}}>{['Paperwork','Manual calculations','Delayed records'][i]}</div><div style={{height:2,width:interpolate(t,[starts[i]+.2,starts[i]+1.2],[0,75],smooth),background:'#E6AA36',margin:'20px auto 0'}}/>
 </div>;
 })}
 </div>
 <MotionBlurLayer><LogoFormation/></MotionBlurLayer>
 <div style={{opacity:interpolate(t,[14.85,15.5],[0,1],smooth)}}><ProductPhone from={14.85} screen="login"/>
 <div style={{position:'absolute',left:110,top:300,width:1080,translate:`${interpolate(t,[15.8,17.4],[-100,0],smooth)}px ${Math.sin(t*.65)*5}px`}}><div style={{fontSize:23,letterSpacing:6,color:'#FFE1A1',marginBottom:30,opacity:interpolate(t,[16,16.8],[0,1],smooth)}}>A SMARTER APPROACH</div><KineticWords words={['LTO ','Officer']} starts={[16.1,16.35]} size={132}/><div style={{fontSize:38,marginTop:35,color:'#e7f4ff',opacity:interpolate(t,[17.18,18],[0,1],smooth)}}>Smarter traffic ticketing.</div><div style={{height:2,width:interpolate(t,[17.18,19.22],[0,580],smooth),background:'linear-gradient(90deg,#E6AA36,transparent)',marginTop:24}}/><div style={{fontSize:24,lineHeight:1.5,color:'#d1e3fc',marginTop:25,opacity:interpolate(t,[17,18.2],[0,1],smooth)}}>Mobile-Based Traffic Violation Ticketing System<br/>with Web Administration</div></div>
 </div>
 <Audio name="Cleaned Ria + original subtle SFX · stereo mix" src={staticFile('audio/preview-mix.mp3')} premountFor={fps}/>
 <Captions/>
 <div style={{position:'absolute',left:95,bottom:45,fontSize:17,letterSpacing:1.5,color:'#c6daf3'}}>IT311 — Application Development &amp; Emerging Technology <span style={{color:'#FFE1A1',marginLeft:20}}>FINAL PROJECT</span></div>
 <div style={{position:'absolute',right:95,bottom:45,fontSize:16,color:'#b7d2ef'}}>Student-developed application</div>
 </AbsoluteFill>;
};
