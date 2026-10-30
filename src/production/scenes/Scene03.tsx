import {useCurrentFrame,useVideoConfig,interpolate} from 'remotion';
import {LogoFormation,KineticWords,MotionBlurLayer} from '../../MotionPrimitives';
import {smooth} from '../../LaunchElements';
import sync from '../sync-map.json';
import {Stage,Device} from '../ProductionKit';
export const Scene03=()=>{const f=useCurrentFrame();const {fps}=useVideoConfig();const t=f/fps;const reveal=(sync.revealFrame-sync.scenes[2].startFrame)/30;return <Stage>
 <MotionBlurLayer><LogoFormation offsetFrames={-12*fps}/></MotionBlurLayer>
 <div style={{position:'absolute',left:110,top:295,fontSize:64,fontWeight:600,opacity:interpolate(t,[3.7,4.3,reveal,reveal+.3],[0,1,1,0],smooth)}}>Our own innovation.</div>
 <Device screen="login" enter={reveal}/>
 <div style={{position:'absolute',left:110,top:290,width:1010}}><div style={{fontSize:23,color:'#FFE1A1',letterSpacing:6,marginBottom:32,opacity:interpolate(t,[reveal,reveal+.4],[0,1],smooth)}}>INTRODUCING</div><KineticWords words={['LTO ','Officer']} starts={[reveal,reveal+.7]} size={132}/><div style={{fontSize:37,lineHeight:1.35,color:'#deedff',marginTop:35,opacity:interpolate(t,[reveal+2,reveal+3],[0,1],smooth)}}>Mobile-Based Traffic Violation<br/>Ticketing System<br/><span style={{fontSize:29,color:'#b8d5f7'}}>with Web Administration</span></div><div style={{width:interpolate(t,[reveal+4,reveal+6],[0,650],smooth),height:2,background:'linear-gradient(90deg,#E6AA36,transparent)',marginTop:38}}/><div style={{fontSize:25,marginTop:28,color:'#FFE1A1',opacity:interpolate(t,[reveal+5,reveal+6.5],[0,1],smooth)}}>Convenience. Accuracy. Efficiency.</div></div>
 </Stage>};
