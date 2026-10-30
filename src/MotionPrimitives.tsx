import React from 'react';
import {CameraMotionBlur} from '@remotion/motion-blur';
import {AbsoluteFill,spring,useCurrentFrame,useVideoConfig,interpolate} from 'remotion';
import {smooth} from './LaunchElements';
// Sampled DOM blur is used because this Chromium cannot reliably capture HTML-in-canvas.
export const MotionBlurLayer=({children}:{children:React.ReactNode})=><AbsoluteFill style={{pointerEvents:'none'}}><CameraMotionBlur samples={3} shutterAngle={100}>{children}</CameraMotionBlur></AbsoluteFill>;
export const KineticWords=({words,starts,size=100}:{words:string[];starts:number[];size?:number})=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();
 return <div style={{fontSize:size,letterSpacing:-4,fontWeight:700,lineHeight:1.09}}>{words.map((word,i)=>{const local=f-starts[i]*fps;const p=spring({frame:Math.max(0,local),fps,config:{damping:22,stiffness:95,mass:.8}});return <span key={i} style={{display:'inline-block',whiteSpace:'pre',opacity:interpolate(local,[0,5],[0,1],smooth),translate:`0 ${(1-p)*75}px`,rotate:`${(1-p)*-5}deg`,filter:`blur(${Math.max(0,(1-p)*5)}px)`}}>{word}</span>})}</div>;
};
export const LogoFormation=()=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();const t=f/fps;
 const p=spring({frame:Math.max(0,f-12.1*fps),fps,config:{damping:20,stiffness:85}});
 const exit=interpolate(t,[14.7,16.4],[0,1],smooth);
 return <div style={{position:'absolute',left:0,top:0,width:1920,height:1080,opacity:interpolate(t,[11.9,12.3,15.5,16.4],[0,1,1,0],smooth),translate:`${exit*-400}px ${exit*-170}px`,scale:(.65+p*.35)*(1-exit*.32)}}>
 <svg width="1920" height="1080" style={{position:'absolute'}}><defs><filter id="logoGlow"><feGaussianBlur stdDeviation="8"/></filter></defs>{[0,1,2].map(i=><path key={i} d={`M${-300+i*400} 1100 C${300+i*200} 400,${1600-i*150} 50,960 360`} fill="none" stroke={i===1?'#E6AA36':'#6ddcff'} strokeWidth={i===1?2:5} strokeDasharray="450 2200" strokeDashoffset={interpolate(t,[11.5,14],[700,-1850],smooth)} opacity=".8"/>)}<circle cx="960" cy="400" r={115+(1-p)*120} fill="none" stroke="#57c7ff" strokeWidth="20" filter="url(#logoGlow)" opacity=".2"/><g transform="translate(870 305)"><path d="M90 8 162 49v82l-72 41-72-41V49Z" fill="#08192C" fillOpacity={p*.9} stroke="#E6AA36" strokeWidth="2" strokeDasharray="510" strokeDashoffset={interpolate(t,[12.05,13.8],[510,0],smooth)}/><path d="M50 117V65l40 36 40-36v52" fill="none" stroke="white" strokeWidth="6" strokeDasharray="220" strokeDashoffset={interpolate(t,[12.6,14.1],[220,0],smooth)}/></g></svg>
 <div style={{position:'absolute',top:530,left:0,right:0,textAlign:'center'}}><KineticWords words={['Mi','Jo','Ri',' Tech']} starts={[12.5,12.65,12.8,13]} size={113}/><div style={{fontSize:23,color:'#FFE1A1',letterSpacing:8,marginTop:28,opacity:interpolate(t,[13.1,14],[0,1],smooth)}}>IDEAS INTO INNOVATION</div></div>
 </div>;
};
