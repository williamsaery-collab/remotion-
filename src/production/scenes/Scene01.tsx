import {useCurrentFrame,useVideoConfig,interpolate} from 'remotion';
import {RoadScene,smooth} from '../../LaunchElements';
import {KineticWords,MotionBlurLayer} from '../../MotionPrimitives';
import {Stage} from '../ProductionKit';
export const Scene01=()=>{const f=useCurrentFrame();const {fps}=useVideoConfig();const t=f/fps;return <Stage navy><MotionBlurLayer><RoadScene/></MotionBlurLayer><div style={{position:'absolute',left:110,top:270,width:1060}}><div style={{fontSize:22,color:'#E6AA36',letterSpacing:6,marginBottom:32}}>EVERY SECOND MATTERS</div><KineticWords words={['Traffic ','violations']} starts={[.14,.74]} size={100}/><KineticWords words={['happen ','in ','seconds.']} starts={[1.18,1.88,2.26]} size={100}/><div style={{fontSize:33,color:'#c2daf3',marginTop:36,opacity:interpolate(t,[3.28,4.1],[0,1],smooth),translate:`0 ${interpolate(t,[3.28,4.2],[30,0],smooth)}px`}}>Recording them takes time.</div></div></Stage>};
