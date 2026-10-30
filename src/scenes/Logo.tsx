import {interpolate,useCurrentFrame,useVideoConfig} from 'remotion';
import {Frame,Reveal,blue,ease} from '../Design';
export const Logo=()=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();
 return <Frame number="02" chapter="MEET THE TEAM"><div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
 <svg width="180" height="180" viewBox="0 0 180 180" style={{filter:'drop-shadow(0 0 25px #168aff)',scale:interpolate(f,[0,2*fps],[.6,1],ease)}}><path d="M90 8 162 49v82l-72 41-72-41V49Z" fill="#0c2340" stroke={blue} strokeWidth="2" strokeDasharray="510" strokeDashoffset={interpolate(f,[0,2*fps],[510,0],ease)}/><path d="M50 117V65l40 36 40-36v52" fill="none" stroke="#eaf8ff" strokeWidth="7"/><path d="M90 118v23" stroke={blue} strokeWidth="4"/></svg>
 <Reveal delay={.7} style={{fontSize:116,fontWeight:700,letterSpacing:-5,marginTop:35,textShadow:'0 0 60px #168aff60'}}>MiJoRi <span style={{color:blue}}>Tech</span></Reveal>
 <Reveal delay={1.4} style={{fontSize:26,letterSpacing:11,marginTop:25,color:'#a8c2dd'}}>THREE MINDS. ONE SHARED VISION.</Reveal>
 <Reveal delay={2.1} style={{fontSize:22,letterSpacing:5,marginTop:38,color:blue}}>GROUP 2</Reveal>
 </div></Frame>;
};
