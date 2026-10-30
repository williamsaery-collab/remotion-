import {useCurrentFrame,useVideoConfig,interpolate,Easing,spring} from 'remotion';
import {ProtectedAppScreen} from './ProtectedAppScreen';
export const smooth={extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.bezier(.22,1,.36,1)} as const;
export const BrandMark=()=> <svg width="150" height="150" viewBox="0 0 180 180"><path d="M90 8 162 49v82l-72 41-72-41V49Z" fill="#08192C" stroke="#E6AA36" strokeWidth="2"/><path d="M50 117V65l40 36 40-36v52" fill="none" stroke="white" strokeWidth="6"/></svg>;
export const BlueWaves=()=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();const t=f/fps;
 return <svg width="1920" height="1080" style={{position:'absolute',inset:0}}><defs><linearGradient id="waveFill" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#8ed5ff" stopOpacity=".24"/><stop offset="1" stopColor="#1685ff" stopOpacity=".01"/></linearGradient></defs>{[0,1,2,3].map(i=><path key={i} d={`M-350 ${620+i*85} C${250+Math.sin(t*.55+i)*220} ${240+i*90+Math.sin(t*.75+i)*120},${1100+Math.cos(t*.6+i)*250} ${950+i*60},2350 ${350+i*90+Math.cos(t*.5+i)*80} L2350 1300H-350Z`} fill="url(#waveFill)" stroke="#c9eeff" strokeOpacity={.06+i*.025} style={{translate:`${Math.sin(t*.4+i)*100}px ${Math.cos(t*.5+i)*30}px`}}/>)}{Array.from({length:22},(_,i)=><circle key={i} cx={(i*173+Math.sin(t*.4+i)*45)%1920} cy={((i*139-t*(9+i%5))%1080+1080)%1080} r={i%4===0?4:2} fill="white" opacity=".16"/>)}</svg>;
};
export const ProductPhone=({from=0,screen='login'}:{from?:number;screen?:'login'|'dashboard'})=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();const s=f/fps-from;
 const p=spring({frame:Math.max(0,s*fps),fps,config:{damping:22,stiffness:70,mass:1.1}});
 const drift=Math.sin(s*.9)*11;const orbit=Math.sin(s*.7)*3;
 return <><div style={{position:'absolute',left:1180,top:904,width:440,height:45,borderRadius:'50%',background:'#020e3480',filter:'blur(23px)',opacity:Math.min(1,p)*.7,scale:.7+p*.3}}/>
 <div style={{position:'absolute',left:1190,top:54,width:390,height:856,perspective:1500,opacity:interpolate(s,[0,.35],[0,1],smooth),translate:`${(1-p)*390}px ${drift+(1-p)*115}px`,scale:.7+p*.3}}><div style={{width:'100%',height:'100%',transformStyle:'preserve-3d',transform:`rotateY(${-100+p*84+orbit}deg) rotateX(${25-p*20+Math.sin(s*.8)*2}deg) rotateZ(${-24+p*30+Math.sin(s*.7)*1.5}deg)`,filter:'drop-shadow(26px 36px 27px #00103866)'}}>
 {Array.from({length:14},(_,i)=><div key={i} style={{position:'absolute',inset:0,borderRadius:49,background:'linear-gradient(115deg,#e5f2ff,#748fac 18%,#132640 36%,#050b14 65%,#a8c9ea)',border:'1px solid #92acc6',transform:`translateZ(${-i*1.25}px)`}}/>)}
 <div style={{position:'absolute',inset:9,background:'#0b1b2e',borderRadius:40,overflow:'hidden',backfaceVisibility:'hidden'}}><ProtectedAppScreen screen={screen}/><div style={{position:'absolute',inset:0,background:`linear-gradient(${110+Math.sin(s*.5)*10}deg,transparent 37%,#ffffff12 48%,transparent 64%)`}}/></div>
 <div style={{position:'absolute',left:184,top:20,width:10,height:10,borderRadius:'50%',background:'#02050b',border:'2px solid #344556',transform:'translateZ(2px)'}}/>
 </div></div></>;
};
export const RoadScene=({pulse=0}:{pulse?:number})=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();const t=f/fps;
 return <div style={{position:'absolute',right:-90,top:110,width:1000,height:770,scale:1+t*.026,translate:`${-t*7}px ${t*3}px`,transformOrigin:'65% 40%'}}><svg width="1000" height="770" viewBox="0 0 1000 770">
 <defs><linearGradient id="roadDepth" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#123453"/><stop offset="1" stopColor="#1c527f"/></linearGradient></defs>
 <path d="M70 760 430 220h140l360 540Z" fill="url(#roadDepth)"/>
 <path d="M500 235v525" stroke="#a6d7ff" strokeWidth="4" strokeDasharray="30 47" strokeDashoffset={t*180}/>
 <path d="M75 760 433 220M925 760 567 220" stroke="#59b5ff" strokeWidth="4"/>
 {[0,1,2].map(i=>{const p=((t*.155+i*.34)%1);const d=p*p;const y=255+d*530;const x=500+(i%2===0?-1:1)*(40+d*200);return <g key={i} transform={`translate(${x} ${y}) scale(${.3+d*1.1}) rotate(${i%2===0?-13:13})`}><ellipse cx="0" cy="18" rx="48" ry="20" fill="#020c1c" opacity=".3"/><rect x="-37" y="-74" width="74" height="124" rx="20" fill={i===0?'#E6AA36':i===1?'#7bc9ff':'#e9f6ff'}/><path d="M-26-39Q0-52 26-39L22-13h-44Z" fill="#0b2e51"/><path d="M-24 24h48v11h-48Z" fill="#27608a"/><path d="M-29-62h12m34 0h12" stroke="#fff9c4" strokeWidth="6"/><path d="M-43-45v28M43-45v28M-43 14v24M43 14v24" stroke="#031423" strokeWidth="7"/></g>})}
 <g transform={`translate(${690-t*6} ${175+Math.sin(t)*7})`}><circle r="110" fill="#0b294b" stroke="#e4f2ff" strokeWidth="3"/>{Array.from({length:12},(_,i)=><path key={i} d="M0-93v9" stroke="#9ecbf1" strokeWidth="3" transform={`rotate(${i*30})`}/>)}<path d="M0 0V-70" stroke="#E6AA36" strokeWidth="5" transform={`rotate(${t*90})`}/><path d="M0 0 42 24" stroke="white" strokeWidth="7"/><circle r={7+Math.min(.8,pulse)*5} fill="white"/></g>
 </svg></div>;
};
export const ProcessIcon=({kind}:{kind:'paper'|'calculator'|'records'})=><svg width="130" height="130" viewBox="0 0 130 130" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">{kind==='paper'?<><path d="M30 14h50l24 24v77H30Z"/><path d="M80 14v24h24M44 58h44M44 76h44M44 94h26"/></>:kind==='calculator'?<><rect x="29" y="14" width="73" height="102" rx="9"/><path d="M43 32h45v20H43Z"/>{[0,1,2].map(i=><path key={i} d={`M45 ${70+i*16}h2m18 0h2m18 0h2`}/>)}</>:<><ellipse cx="65" cy="30" rx="43" ry="16"/><path d="M22 30v61c0 23 86 23 86 0V30M22 59c0 23 86 23 86 0"/><circle cx="92" cy="94" r="26" fill="#0645B5"/><path d="M92 77v18l12 8" stroke="#E6AA36"/></>}</svg>;
