import {AbsoluteFill,staticFile,useCurrentFrame,interpolate,useVideoConfig} from 'remotion';
import {Audio} from '@remotion/media';
import {SceneWindow,ProductionCaptions,ProjectFooter} from './ProductionKit';
import {Scene01} from './scenes/Scene01';
import {Scene02} from './scenes/Scene02';
import {Scene03} from './scenes/Scene03';
import {Scene04} from './scenes/Scene04';
import {Scene05} from './scenes/Scene05';
import {Scene06} from './scenes/Scene06';
import {Scene07} from './scenes/Scene07';
import {Scene08} from './scenes/Scene08';
import {Scene09} from './scenes/Scene09';
import {Scene10} from './scenes/Scene10';
export const FinalFilm=()=>{const {fps,durationInFrames}=useVideoConfig();const frame=useCurrentFrame();return <AbsoluteFill style={{background:'#0645B5'}}>
 <SceneWindow id={1}><Scene01/></SceneWindow>
 <SceneWindow id={2}><Scene02/></SceneWindow>
 <SceneWindow id={3}><Scene03/></SceneWindow>
 <SceneWindow id={4}><Scene04/></SceneWindow>
 <SceneWindow id={5}><Scene05/></SceneWindow>
 <SceneWindow id={6}><Scene06/></SceneWindow>
 <SceneWindow id={7}><Scene07/></SceneWindow>
 <SceneWindow id={8}><Scene08/></SceneWindow>
 <SceneWindow id={9}><Scene09/></SceneWindow>
 <SceneWindow id={10}><Scene10/></SceneWindow>
 <Audio name="Final stereo mix · complete team narration" src={staticFile('audio/final-mix.mp3')} premountFor={fps}/>
 <ProductionCaptions/><ProjectFooter/><AbsoluteFill style={{background:"#08192C",pointerEvents:"none",opacity:interpolate(frame,[durationInFrames-45,durationInFrames-1],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"})}}/>
 </AbsoluteFill>};
