import {AbsoluteFill, getStaticFiles, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import openingVoice from './opening-voice.json';
import {Audio} from '@remotion/media';
import {ProtectedAppScreen} from './ProtectedAppScreen';
import {ease} from './Design';
const gold='#E6AA36';
export const CinematicOpening=()=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();const t=f/fps;
 const ramp=(a:number,b:number,x:number,y:number)=>interpolate(t,[a,b],[x,y],ease);
 const logoOpacity=interpolate(t,[0,.8,3.8,4.8],[0,1,1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
 const assets=getStaticFiles();
 return <AbsoluteFill style={{background:'#08192C',fontFamily:'Arial, sans-serif',color:'white',overflow:'hidden'}}>
 <AbsoluteFill style={{background:`radial-gradient(ellipse at ${65+Math.sin(t)*8}% 60%,#0645B566,transparent 60%)`}}/>
 <div style={{position:'absolute',left:850,top:-400,width:240,height:1600,background:'linear-gradient(90deg,transparent,#0645B533,transparent)',transform:`rotate(${30-t*2}deg)`,filter:'blur(35px)'}}/>
 {Array.from({length:50},(_,i)=><div key={i} style={{position:'absolute',left:(i*277)%1920,top:((i*113-t*(8+i%5))%1080+1080)%1080,width:i%7===0?4:2,height:2,background:i%9===0?gold:'#62beff',opacity:.15+(i%4)*.12,boxShadow:'0 0 16px #1c9bff'}}/>)}
 <svg width="1920" height="1080" style={{position:'absolute',opacity:.45}}>{[0,1,2].map(i=><path key={i} d={`M-100 ${950+i*35} C700 ${1100+i*35},900 ${300+i*35},2020 ${420+i*35}`} fill="none" stroke={i===1?gold:'#279eff'} strokeWidth={i===1?1:2} strokeDasharray="450 1800" strokeDashoffset={-t*160-i*300}/>)}</svg>
 <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',opacity:logoOpacity,transform:`scale(${ramp(0,4,.84,1.08)})`}}>
 <svg width="200" height="200" viewBox="0 0 180 180" style={{filter:'drop-shadow(0 0 28px #289fff)'}}><path d="M90 8 162 49v82l-72 41-72-41V49Z" fill="#081a30" stroke={gold} strokeWidth="1.5" strokeDasharray="510" strokeDashoffset={ramp(0,2,510,0)}/><path d="M50 117V65l40 36 40-36v52" fill="none" stroke="white" strokeWidth="6" strokeDasharray="220" strokeDashoffset={ramp(.4,2,220,0)}/></svg>
 <div style={{fontSize:104,fontWeight:700,letterSpacing:-4,marginTop:28,textShadow:'0 0 60px #5dbaff55'}}>MiJoRi <span style={{color:'#65c4ff'}}>Tech</span></div>
 <div style={{fontSize:20,letterSpacing:10,color:gold,marginTop:26,opacity:ramp(1.8,2.6,0,1)}}>ENGINEERED FOR WHAT’S NEXT</div>
 </div>
 <div style={{position:'absolute',left:1190,top:170,width:350,height:718,perspective:1600,opacity:ramp(4,5.1,0,1),transform:`translateX(${ramp(4,8,-220,0)}px) translateY(${Math.sin(t*1.1)*12}px) scale(${ramp(4,8,1.35,1)})`}}>
 <div style={{width:'100%',height:'100%',transformStyle:'preserve-3d',transform:`rotateY(${ramp(4,9,-112,-16)}deg) rotateX(${ramp(4,9,24,5)}deg) rotateZ(${ramp(4,10,-24,9)}deg)`}}>
 {Array.from({length:16},(_,i)=><div key={i} style={{position:'absolute',inset:0,borderRadius:49,background:i===0?'#070c14':'linear-gradient(130deg,#adc6db,#1a2839 30%,#080d16 65%,#6d91b2)',transform:`translateZ(${-i*1.4}px)`,border:'1px solid #6d8aa4'}}/>)}
 <div style={{position:'absolute',inset:10,borderRadius:40,overflow:'hidden',background:'radial-gradient(ellipse at 30% 20%,#164576,#040b19 80%)',border:'1px solid #4b647c',backfaceVisibility:'hidden'}}>
 <ProtectedAppScreen screen="dashboard"/>
 <div style={{position:'absolute',inset:0,background:`linear-gradient(${110+t*3}deg,transparent 25%,#ffffff16 44%,transparent 60%)`,pointerEvents:'none'}}/>
 </div><div style={{position:'absolute',top:22,left:166,width:11,height:11,borderRadius:20,background:'#01030a',transform:'translateZ(2px)',border:'2px solid #243448'}}/>
 </div></div>
 <div style={{position:'absolute',left:150,top:345,opacity:ramp(7,8.5,0,1),translate:`0 ${ramp(7,9,45,0)}px`}}>
 <div style={{fontSize:20,letterSpacing:7,color:gold,marginBottom:30}}>DEVELOPED BY MiJoRi TECH — GROUP 2</div>
 <div style={{fontSize:132,fontWeight:700,letterSpacing:-7,lineHeight:1,textShadow:'0 0 50px #237fff44'}}>LTO <span style={{color:'#67c7ff'}}>Officer</span></div>
 <div style={{fontSize:31,color:'#a6bdd4',marginTop:38,lineHeight:1.5}}>Smarter Enforcement.<br/>Safer Roads.</div>
 <div style={{height:1,width:ramp(9,12,0,480),background:`linear-gradient(90deg,${gold},transparent)`,marginTop:40}}/>
 <div style={{fontSize:17,color:'#7692ae',letterSpacing:4,marginTop:24,opacity:ramp(10,12,0,1)}}>MOBILE TICKETING · WEB ADMINISTRATION</div>
 </div>
 <div style={{position:'absolute',left:150,bottom:62,fontSize:18,letterSpacing:2,color:'#b5c6d8'}}>IT311 — Application Development &amp; Emerging Technology<span style={{color:gold,marginLeft:24}}>FINAL PROJECT</span><div style={{fontSize:15,letterSpacing:1,marginTop:12,color:'#91a6bb'}}>Student-developed application · Academic demonstration</div></div>
 <AbsoluteFill style={{background:'radial-gradient(ellipse at center,transparent 40%,#01030a99)',pointerEvents:'none'}}/>
 {openingVoice.enabled&&assets.some(a=>a.name==='voices/ria.mp3')&&<Audio src={staticFile('voices/ria.mp3')} from={Math.round(openingVoice.startSeconds*fps)} trimBefore={Math.round(openingVoice.trimStartSeconds*fps)} durationInFrames={Math.round(openingVoice.durationSeconds*fps)} volume={openingVoice.volume} premountFor={fps}/>}
 </AbsoluteFill>;
};
