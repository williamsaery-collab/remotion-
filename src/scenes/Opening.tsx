import {AbsoluteFill, interpolate, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import {Frame, Reveal, Eyebrow, blue, ease} from '../Design';
const Beat = ({kicker,title,sub}:{kicker:string;title:string;sub:string}) => {
 const f=useCurrentFrame();const {fps}=useVideoConfig();
 return <AbsoluteFill style={{justifyContent:'center',paddingLeft:125,opacity:interpolate(f,[0,.5*fps,4.4*fps,5*fps],[0,1,1,0],{extrapolateRight:'clamp'})}}><Reveal><Eyebrow>{kicker}</Eyebrow><h1 style={{fontSize:112,lineHeight:1.04,letterSpacing:-6,margin:0,whiteSpace:'pre-line',maxWidth:1150,textShadow:'0 0 50px #358aff25'}}>{title}</h1></Reveal><Reveal delay={.65} style={{fontSize:32,color:'#9cb5ce',marginTop:38,maxWidth:850,lineHeight:1.5}}>{sub}</Reveal></AbsoluteFill>;
};
export const Opening = () => {
 const f=useCurrentFrame();const {fps}=useVideoConfig();
 return <Frame number="01" chapter="THE CHALLENGE">
  <svg width="1920" height="1080" style={{position:'absolute',opacity:.6}}><defs><linearGradient id="road" x1="0" y1="0" x2="0" y2="1"><stop stopColor={blue} stopOpacity="0"/><stop offset="1" stopColor={blue}/></linearGradient></defs><path d="M1390 340 L1020 1080 M1420 340 L1770 1080" stroke="url(#road)" strokeWidth="3" fill="none"/>{Array.from({length:15},(_,i)=>{const y=((i*90+f*5)%1000)+280;return <path key={i} d={`M1405 ${y} L1405 ${y+36}`} stroke={blue} strokeOpacity={Math.max(0,(y-400)/1000)} strokeWidth={2+(y-280)/160}/>;})}</svg>
  <Sequence from={0} durationInFrames={5*fps} premountFor={fps}><Beat kicker="ON THE ROAD, EVERY DAY" title={'Every stop.\nEvery second.'} sub="Traffic enforcement demands focus, clarity and time."/></Sequence>
  <Sequence from={5*fps} durationInFrames={5*fps} premountFor={fps}><Beat kicker="THE CHALLENGE" title={'More paperwork.\nLess time.'} sub="Manual records can slow down the work that matters."/></Sequence>
  <Sequence from={10*fps} durationInFrames={5*fps} premountFor={fps}><Beat kicker="IMAGINE WHAT COMES NEXT" title={'A smarter\nway forward.'} sub="From roadside information to a connected digital record."/></Sequence>
  <div style={{position:'absolute',bottom:0,height:3,background:blue,boxShadow:'0 0 25px #48baff',width:interpolate(f,[0,15*fps],[0,1920],ease)}}/>
 </Frame>;
};
