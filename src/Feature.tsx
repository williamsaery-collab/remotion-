import {useCurrentFrame,useVideoConfig,interpolate} from 'remotion';
import {Frame,Reveal,Eyebrow,blue} from './Design';
import {Phone} from './Phone';
type Props={number:string;chapter:string;kicker:string;title:string;body:string;steps:[string,string,string];file:string;label:string;second?:{file:string;label:string}};
export const Feature=({number,chapter,kicker,title,body,steps,file,label,second}:Props)=>{
 const f=useCurrentFrame();const {fps,durationInFrames}=useVideoConfig();
 const slot=Math.min(2,Math.floor(f/(durationInFrames/3)));
 return <Frame number={number} chapter={chapter}>
  <div style={{position:'absolute',left:120,top:250,width:second?790:900}}>
   <Reveal><Eyebrow>{kicker}</Eyebrow><h1 style={{fontSize:92,lineHeight:1.05,letterSpacing:-4,margin:0,whiteSpace:'pre-line'}}>{title}</h1></Reveal>
   <Reveal delay={.6} style={{fontSize:31,lineHeight:1.5,color:'#9fb6cf',marginTop:34,maxWidth:740}}>{body}</Reveal>
   <div style={{marginTop:46,display:'flex',flexDirection:'column',gap:16}}>{steps.map((step,i)=><Reveal key={step} delay={1.2+i*.3} style={{display:'flex',alignItems:'center',gap:20,fontSize:25,color:slot===i?'#e9f7ff':'#7896b2'}}><span style={{display:'block',width:slot===i?42:20,height:2,background:slot===i?blue:'#36516a'}}/>{step}</Reveal>)}</div>
  </div>
  {second&&<Phone file={second.file} label={second.label} left={1010} small/>}
  <Phone file={file} label={label} left={second?1400:1250}/>
  <div style={{position:'absolute',left:120,bottom:146,width:650,height:1,background:'#203c58'}}><div style={{width:interpolate(f,[0,durationInFrames],[0,650]),height:2,background:blue,boxShadow:'0 0 15px #48baff'}}/></div>
 </Frame>;
};
