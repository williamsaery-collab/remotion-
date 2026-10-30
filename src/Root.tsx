import {CinematicOpening} from './CinematicOpening';
import {Composition,Folder} from 'remotion';
import {Film} from './Film';
import {Logo} from './scenes/Logo';
import {Introduction} from './scenes/Introduction';
import {Login} from './scenes/Login';
import {Details} from './scenes/Details';
import {Evidence} from './scenes/Evidence';
import {Violations} from './scenes/Violations';
import {Ticket} from './scenes/Ticket';
import {Offline} from './scenes/Offline';
import {Closing} from './scenes/Closing';
export const RemotionRoot=()=> <>
<Composition id="Opening15" component={CinematicOpening} durationInFrames={450} fps={30} width={1920} height={1080}/>
<Composition id="LTOOfficer" component={Film} durationInFrames={4500} fps={30} width={1920} height={1080}/>
<Folder name="Scenes">
<Composition id="Logo" component={Logo} durationInFrames={300} fps={30} width={1920} height={1080}/>
<Composition id="Introduction" component={Introduction} durationInFrames={450} fps={30} width={1920} height={1080}/>
<Composition id="Login" component={Login} durationInFrames={540} fps={30} width={1920} height={1080}/>
<Composition id="Details" component={Details} durationInFrames={540} fps={30} width={1920} height={1080}/>
<Composition id="Evidence" component={Evidence} durationInFrames={540} fps={30} width={1920} height={1080}/>
<Composition id="Violations" component={Violations} durationInFrames={480} fps={30} width={1920} height={1080}/>
<Composition id="Ticket" component={Ticket} durationInFrames={480} fps={30} width={1920} height={1080}/>
<Composition id="Offline" component={Offline} durationInFrames={480} fps={30} width={1920} height={1080}/>
<Composition id="Closing" component={Closing} durationInFrames={510} fps={30} width={1920} height={1080}/>
</Folder></>;
