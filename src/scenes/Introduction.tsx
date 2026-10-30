import {Frame,Reveal,Eyebrow,blue} from '../Design';
import {Phone} from '../Phone';
export const Introduction=()=> <Frame number="03" chapter="INTRODUCING LTO OFFICER"><div style={{position:'absolute',left:120,top:280,width:990}}>
 <Reveal><Eyebrow>DESIGNED FOR THE ROADS AHEAD</Eyebrow><h1 style={{fontSize:138,letterSpacing:-7,lineHeight:1,margin:0,textShadow:'0 0 70px #168aff45'}}>LTO<span style={{color:blue}}> Officer</span></h1></Reveal>
 <Reveal delay={.7} style={{fontSize:40,lineHeight:1.35,maxWidth:850,marginTop:48}}>Mobile-Based Traffic Violation<br/>Ticketing System<br/><span style={{color:'#99b6d2'}}>with Web Administration</span></Reveal>
 <Reveal delay={1.5} style={{fontSize:24,color:blue,letterSpacing:4,marginTop:50}}>MOBILE CAPTURE <span style={{color:'#496581',margin:'0 18px'}}>→</span> CONNECTED ADMINISTRATION</Reveal>
 </div><Phone file="dashboard.png" label="LTO Officer dashboard"/></Frame>;
