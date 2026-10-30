import {AbsoluteFill,useVideoConfig} from 'remotion';
import {TransitionSeries,linearTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {Opening} from './scenes/Opening';
import {Logo} from './scenes/Logo';
import {Introduction} from './scenes/Introduction';
import {Login} from './scenes/Login';
import {Details} from './scenes/Details';
import {Evidence} from './scenes/Evidence';
import {Violations} from './scenes/Violations';
import {Ticket} from './scenes/Ticket';
import {Offline} from './scenes/Offline';
import {Closing} from './scenes/Closing';
import {Voices} from './Voices';
export const Film=()=>{
 const {fps}=useVideoConfig();
 return <AbsoluteFill style={{background:'#020713'}}><TransitionSeries>
  <TransitionSeries.Sequence name="01 · Traffic enforcement problem" durationInFrames={15*fps} premountFor={fps}><Opening/></TransitionSeries.Sequence>
  <TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames:fps})}/>
  <TransitionSeries.Sequence name="02 · MiJoRi Tech" durationInFrames={10*fps} premountFor={fps}><Logo/></TransitionSeries.Sequence>
  <TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames:fps})}/>
  <TransitionSeries.Sequence name="03 · LTO Officer" durationInFrames={15*fps} premountFor={fps}><Introduction/></TransitionSeries.Sequence>
  <TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames:fps})}/>
  <TransitionSeries.Sequence name="04 · Login and dashboard" durationInFrames={18*fps} premountFor={fps}><Login/></TransitionSeries.Sequence>
  <TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames:fps})}/>
  <TransitionSeries.Sequence name="05 · Violator and vehicle" durationInFrames={18*fps} premountFor={fps}><Details/></TransitionSeries.Sequence>
  <TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames:fps})}/>
  <TransitionSeries.Sequence name="06 · Camera and GPS" durationInFrames={18*fps} premountFor={fps}><Evidence/></TransitionSeries.Sequence>
  <TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames:fps})}/>
  <TransitionSeries.Sequence name="07 · Violations and fines" durationInFrames={16*fps} premountFor={fps}><Violations/></TransitionSeries.Sequence>
  <TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames:fps})}/>
  <TransitionSeries.Sequence name="08 · Digital ticket" durationInFrames={16*fps} premountFor={fps}><Ticket/></TransitionSeries.Sequence>
  <TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames:fps})}/>
  <TransitionSeries.Sequence name="09 · Offline and sync" durationInFrames={16*fps} premountFor={fps}><Offline/></TransitionSeries.Sequence>
  <TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames:fps})}/>
  <TransitionSeries.Sequence name="10 · Closing and credits" durationInFrames={17*fps} premountFor={fps}><Closing/></TransitionSeries.Sequence>
 </TransitionSeries><Voices/></AbsoluteFill>;
};
