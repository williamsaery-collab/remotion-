import {Audio} from '@remotion/media';
import {staticFile,useVideoConfig} from 'remotion';
import {hasAsset} from './Phone';
import cues from './voice-cues.json';
export const Voices=()=>{
 const {fps}=useVideoConfig();
 return <>
 {cues.ria.enabled&&hasAsset('voices/ria.mp3')&&<Audio src={staticFile('voices/ria.mp3')} from={Math.round(cues.ria.startSeconds*fps)} durationInFrames={Math.round(cues.ria.durationSeconds*fps)} trimBefore={Math.round(cues.ria.trimStartSeconds*fps)} volume={cues.ria.volume} premountFor={fps}/>}
 {cues.micah.enabled&&hasAsset('voices/micah.mp3')&&<Audio src={staticFile('voices/micah.mp3')} from={Math.round(cues.micah.startSeconds*fps)} durationInFrames={Math.round(cues.micah.durationSeconds*fps)} trimBefore={Math.round(cues.micah.trimStartSeconds*fps)} volume={cues.micah.volume} premountFor={fps}/>}
 {cues.joseph.enabled&&hasAsset('voices/joseph.mp3')&&<Audio src={staticFile('voices/joseph.mp3')} from={Math.round(cues.joseph.startSeconds*fps)} durationInFrames={Math.round(cues.joseph.durationSeconds*fps)} trimBefore={Math.round(cues.joseph.trimStartSeconds*fps)} volume={cues.joseph.volume} premountFor={fps}/>}
 </>;
};
