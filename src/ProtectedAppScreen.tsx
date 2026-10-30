import {CanvasImage, getStaticFiles, staticFile, useVideoConfig} from 'remotion';
// Coordinates are fractions of the supplied 576 x 1280 captures.
// Opaque masks must stay on the same plane as the image throughout motion.
const masks = {
 login: [[.10,.385,.80,.047],[.10,.46,.80,.047],[.29,.89,.44,.025]],
 pin: [[.20,.305,.60,.035],[.29,.89,.44,.025]],
 dashboard: [], // Already redacted in the committed source PNG; preserve icons.
 violator: [], camera: [],
} as const;
export const ProtectedAppScreen=({screen='dashboard'}:{screen?:keyof typeof masks})=>{
 const {fps}=useVideoConfig();
 // Only sanitized exports are accepted. Raw source captures must not be committed.
 const path=`screenshots/approved/${screen}.png`;
 if(!getStaticFiles().some(file=>file.name===path))return <div style={{height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',padding:24,boxSizing:'border-box',color:'white'}}><div style={{fontSize:34,fontWeight:700}}>LTO Officer</div><div style={{fontSize:14,color:'#E6AA36',letterSpacing:2,marginTop:30}}>SCREENSHOT PLACEHOLDER</div><div style={{fontSize:18,color:'#a6bdd4',lineHeight:1.5,marginTop:20}}>Original app image<br/>awaiting file upload</div></div>;
 return <div style={{height:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{height:'100%',aspectRatio:'576 / 1280',maxWidth:'100%',position:'relative'}}>
 <CanvasImage src={staticFile(path)} premountFor={fps} style={{width:'100%',height:'100%'}}/>
 {masks[screen].map(([x,y,w,h],i)=><div key={i} style={{position:'absolute',left:`${x*100}%`,top:`${y*100}%`,width:`${w*100}%`,height:`${h*100}%`,background:screen==='dashboard'&&i>0?'#ffffff':'#08192C',borderRadius:2}}/>)}
 </div></div>;
};
