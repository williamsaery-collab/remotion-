import {Scene01} from './production/scenes/Scene01';
import {Scene02} from './production/scenes/Scene02';
import {Scene03} from './production/scenes/Scene03';
import {Scene04} from './production/scenes/Scene04';
import {Scene05} from './production/scenes/Scene05';
import {Scene06} from './production/scenes/Scene06';
import {Scene07} from './production/scenes/Scene07';
import {Scene08} from './production/scenes/Scene08';
import {Scene09} from './production/scenes/Scene09';
import {Scene10} from './production/scenes/Scene10';
import {FinalFilm} from './production/FinalFilm';
import {Preview20} from './Preview20';
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
<Composition id="FinalFilm" component={FinalFilm} durationInFrames={5027} fps={30} width={1920} height={1080}/>
<Composition id="Preview20" component={Preview20} durationInFrames={600} fps={30} width={1920} height={1080}/>
<Composition id="Opening15" component={CinematicOpening} durationInFrames={450} fps={30} width={1920} height={1080}/>
<Composition id="LTOOfficer" component={Film} durationInFrames={4500} fps={30} width={1920} height={1080}/>
<Folder name="Final-Scenes">
<Composition id="FinalScene01" component={Scene01} durationInFrames={225} fps={30} width={1920} height={1080}/>
<Composition id="FinalScene02" component={Scene02} durationInFrames={520} fps={30} width={1920} height={1080}/>
<Composition id="FinalScene03" component={Scene03} durationInFrames={510} fps={30} width={1920} height={1080}/>
<Composition id="FinalScene04" component={Scene04} durationInFrames={446} fps={30} width={1920} height={1080}/>
<Composition id="FinalScene05" component={Scene05} durationInFrames={591} fps={30} width={1920} height={1080}/>
<Composition id="FinalScene06" component={Scene06} durationInFrames={751} fps={30} width={1920} height={1080}/>
<Composition id="FinalScene07" component={Scene07} durationInFrames={660} fps={30} width={1920} height={1080}/>
<Composition id="FinalScene08" component={Scene08} durationInFrames={515} fps={30} width={1920} height={1080}/>
<Composition id="FinalScene09" component={Scene09} durationInFrames={611} fps={30} width={1920} height={1080}/>
<Composition id="FinalScene10" component={Scene10} durationInFrames={360} fps={30} width={1920} height={1080}/>
</Folder>
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
