import {useCurrentFrame,useVideoConfig,interpolate} from 'remotion';
import {Stage,Device,Copy,Badge} from '../ProductionKit';
import {smooth} from '../../LaunchElements';
export const Scene06=()=>{const f=useCurrentFrame();const {fps}=useVideoConfig();const t=f/fps;const gps=t>=9.96;const shutter=interpolate(t,[6.3,6.4,6.8],[0,.6,0],smooth);
 return <Stage><Copy kicker={gps?'LOCATION WHEN AVAILABLE':'CAPTURE PHOTO EVIDENCE'} title={gps?'Add the location.\nKeep the context.':'See the evidence.\nDocument the moment.'} body={gps?'GPS information can be attached when available.':'Capture photo evidence directly within the application.'}><Badge delay={1.5}>{gps?'GPS functionality illustration':'In-app camera controls'}</Badge><Badge delay={5}>{gps?'The supplied demo shows location unavailable.':'Evidence image hidden for privacy'}</Badge></Copy><Device screen={gps?'review':'camera'} previous={gps?'camera':undefined} changeAt={9.96} enter={-3}/>
 <div style={{position:'absolute',left:1195,top:70,width:375,height:810,borderRadius:35,background:'white',opacity:shutter,pointerEvents:'none'}}/>
 {gps&&<svg width="500" height="170" style={{position:'absolute',left:145,top:690}}><path d="M20 130Q170 20 300 105T480 45" fill="none" stroke="#9bdfff" strokeWidth="3" strokeDasharray="8 12" strokeDashoffset={-t*22}/><g transform={`translate(${220+Math.sin(t)*6} 65)`}><path d="M0 45C-65-25 65-25 0 45Z" fill="#E6AA36"/><circle cy="0" r="9" fill="#08192C"/></g></svg>}
 <div style={{position:'absolute',left:1180,top:978,fontSize:14,color:'#c9e4ff'}}>{gps?'Demo capture: location unavailable':'Actual camera UI · photo content protected'}</div>
 </Stage>};
