import {CanvasImage, getStaticFiles, staticFile, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {blue, ease} from './Design';
export const hasAsset=(name:string)=>getStaticFiles().some(file=>file.name===name);
export const Phone=({file,label,left=1210,small=false}:{file:string;label:string;left?:number;small?:boolean})=>{
 const f=useCurrentFrame(); const {fps}=useVideoConfig();const width=small?300:354;const height=small?610:718;
 return <div style={{position:'absolute',left,top:small?224:180,width,height,transform:`perspective(1400px) rotateY(${interpolate(f,[0,1.8*fps],[-24,-9],ease)}deg) rotateZ(${small?-5:3}deg) translateY(${Math.sin(f/fps*1.2)*9}px)`,borderRadius:50,padding:12,background:'linear-gradient(120deg,#7893ad,#162a40 20%,#02050a 65%,#526e87)',boxShadow:'14px 15px 0 #01040a, 22px 26px 0 #17324b, 0 35px 90px #0009, 0 0 80px #168aff20',border:'2px solid #6688ab'}}>
  <div style={{height:'100%',borderRadius:38,overflow:'hidden',position:'relative',background:'#051020',border:'1px solid #2a4a68'}}>
  {hasAsset(`screenshots/${file}`)?<CanvasImage src={staticFile(`screenshots/${file}`)} premountFor={fps} style={{width:'100%',height:'100%',objectFit:'contain'}}/>:<div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',padding:24,background:'radial-gradient(ellipse at center,#102f4f,#05101e)'}}>
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" stroke={blue} strokeWidth="1.5"><path d="M22 7H7v15M58 7h15v15M7 58v15h15M73 58v15H58"/><rect x="20" y="25" width="40" height="30" rx="3"/><circle cx="31" cy="35" r="4"/><path d="M21 51l15-11 10 8 7-5 7 7"/></svg>
    <div style={{fontSize:16,color:blue,letterSpacing:3,lineHeight:1.6,marginTop:28}}>SCREENSHOT<br/>PLACEHOLDER</div>
    <div style={{fontSize:28,lineHeight:1.25,color:'white',marginTop:28}}>{label}</div>
    <div style={{fontSize:17,color:'#91abc2',lineHeight:1.5,marginTop:22}}>Actual Android app<br/>capture pending</div>
    <div style={{fontSize:14,color:'#6689aa',marginTop:40}}>{file}</div>
  </div>}
  </div>
 </div>;
};
