import {Audio} from '@remotion/media';
import {staticFile,useVideoConfig} from 'remotion';
import plan from './narration/timeline.json';
// Full original files, no trimming, no duration limits, no playback-rate change.
// Mount this when assembling the approved full production.
export const OfficialNarration=()=>{
 const {fps}=useVideoConfig();
 return <>
 <Audio name="Ria · complete recording" src={staticFile(plan.tracks[0].file)} from={Math.round(plan.tracks[0].fromFrame/plan.fps*fps)} premountFor={fps}/>
 <Audio name="Micah · complete recording" src={staticFile(plan.tracks[1].file)} from={Math.round(plan.tracks[1].fromFrame/plan.fps*fps)} premountFor={fps}/>
 <Audio name="Joseph · complete recording" src={staticFile(plan.tracks[2].file)} from={Math.round(plan.tracks[2].fromFrame/plan.fps*fps)} premountFor={fps}/>
 </>;
};
