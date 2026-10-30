import {Audio} from '@remotion/media';
import {staticFile,useVideoConfig} from 'remotion';
import plan from './narration/timeline.json';
// Complete cleaned copies; originals preserved. No trimming, duration limits or rate changes.
// Mount this when assembling the approved full production.
export const OfficialNarration=()=>{
 const {fps}=useVideoConfig();
 return <>
 <Audio name="Ria · complete recording" src={staticFile(plan.tracks[0].cleanedFile)} from={Math.round(plan.tracks[0].fromFrame/plan.fps*fps)} premountFor={fps}/>
 <Audio name="Micah · complete recording" src={staticFile(plan.tracks[1].cleanedFile)} from={Math.round(plan.tracks[1].fromFrame/plan.fps*fps)} premountFor={fps}/>
 <Audio name="Joseph · complete recording" src={staticFile(plan.tracks[2].cleanedFile)} from={Math.round(plan.tracks[2].fromFrame/plan.fps*fps)} premountFor={fps}/>
 </>;
};
