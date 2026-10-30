import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
export const blue = '#48baff';
export const ease = {extrapolateLeft:'clamp', extrapolateRight:'clamp', easing:Easing.bezier(.16,1,.3,1)} as const;
export const Backdrop = () => {
 const f=useCurrentFrame(); const {fps}=useVideoConfig();
 return <AbsoluteFill style={{overflow:'hidden',background:'radial-gradient(ellipse at 76% 40%, #0d2a53 0%, #071327 38%, #020713 85%)'}}>
  <div style={{position:'absolute',inset:0,opacity:.13,backgroundImage:'linear-gradient(#62aeff33 1px, transparent 1px),linear-gradient(90deg,#62aeff33 1px,transparent 1px)',backgroundSize:'100px 100px',transform:`perspective(900px) rotateX(65deg) translateY(${(f/fps*24)%100}px)`,transformOrigin:'center 75%'}}/>
  {Array.from({length:24},(_,i)=><div key={i} style={{position:'absolute',left:(i*193)%1920,top:((i*137-f/fps*14)%1080+1080)%1080,width:i%4===0?4:2,height:i%4===0?4:2,borderRadius:'50%',background:blue,opacity:.18+i%3*.12,boxShadow:'0 0 14px #48baff'}}/>)}
  <div style={{position:'absolute',width:900,height:900,border:'1px solid #42adff18',borderRadius:'50%',right:-160,top:20,scale:1+Math.sin(f/fps/3)*.025}}/>
 </AbsoluteFill>;
};
export const Frame = ({children,chapter,number}:{children:React.ReactNode;chapter:string;number:string}) => <AbsoluteFill style={{fontFamily:'Arial, Helvetica, sans-serif',color:'#f3f8ff'}}>
 <Backdrop/>
 <div style={{position:'absolute',left:100,top:66,fontSize:23,letterSpacing:5,color:'#a9c4e0'}}>MiJoRi <span style={{color:blue}}>TECH</span> <span style={{marginLeft:25,color:'#526b86'}}> / GROUP 2</span></div>
 <div style={{position:'absolute',right:100,top:69,fontSize:19,letterSpacing:4,color:'#8aa4be'}}>LTO OFFICER</div>
 {children}
 <div style={{position:'absolute',bottom:62,left:100,right:100,display:'flex',alignItems:'center',gap:22,fontSize:19,letterSpacing:4,color:'#92b1cd'}}><span style={{color:blue}}>{number}</span><span style={{height:1,width:70,background:blue}}/>{chapter}<span style={{marginLeft:'auto',fontSize:16,letterSpacing:3,color:'#718ba5'}}>SCHOOL PROJECT · CONCEPT FILM</span></div>
</AbsoluteFill>;
export const Reveal = ({children,delay=0,style={}}:{children:React.ReactNode;delay?:number;style?:React.CSSProperties})=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();
 return <div style={{...style,opacity:interpolate(f,[delay*fps,(delay+.8)*fps],[0,1],ease),translate:`0 ${interpolate(f,[delay*fps,(delay+1.2)*fps],[48,0],ease)}px`}}>{children}</div>;
};
export const Eyebrow = ({children}:{children:React.ReactNode})=><div style={{fontSize:24,letterSpacing:7,color:blue,fontWeight:600,marginBottom:30}}>{children}</div>;
