import {useCurrentFrame,useVideoConfig,interpolate} from 'remotion';
import {ProtectedAppScreen} from './ProtectedAppScreen';
export const smooth={extrapolateLeft:'clamp',extrapolateRight:'clamp'} as const;
export const BrandMark=()=> <svg width="150" height="150" viewBox="0 0 180 180"><path d="M90 8 162 49v82l-72 41-72-41V49Z" fill="#08192C" stroke="#E6AA36" strokeWidth="2"/><path d="M50 117V65l40 36 40-36v52" fill="none" stroke="white" strokeWidth="6"/></svg>;
export const BlueWaves=()=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();
 return <svg width="1920" height="1080" style={{position:'absolute',inset:0}}><defs><linearGradient id="waveFill" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#78bbff" stopOpacity=".12"/><stop offset="1" stopColor="#78bbff" stopOpacity="0"/></linearGradient></defs>{[0,1,2].map(i=><path key={i} d={`M-200 ${590+i*90} C400 ${250+i*80+Math.sin(f/fps*.4)*70},1050 ${1000+i*50},2150 ${390+i*70} L2150 1200H-200Z`} fill="url(#waveFill)" stroke="#b9deff" strokeOpacity=".12"/>)}{Array.from({length:14},(_,i)=><circle key={i} cx={(i*173)%1920} cy={((i*139-f/fps*9)%1080+1080)%1080} r={i%4===0?4:2} fill="white" opacity=".16"/>)}</svg>;
};
export const ProductPhone=({from=0,screen='login'}:{from?:number;screen?:'login'|'dashboard'})=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();const s=f/fps-from;const p=interpolate(s,[0,1.7],[0,1],smooth);
 return <div style={{position:'absolute',left:1220,top:125,width:330,height:740,perspective:1400,opacity:p,translate:`${(1-p)*240}px ${Math.sin(f/fps)*8}px`,scale:.78+p*.22}}><div style={{width:'100%',height:'100%',transformStyle:'preserve-3d',transform:`rotateY(${-68+p*56}deg) rotateX(${14-p*11}deg) rotateZ(${-12+p*17}deg)`}}>
 {Array.from({length:12},(_,i)=><div key={i} style={{position:'absolute',inset:0,borderRadius:43,background:'linear-gradient(120deg,#d3dfed,#30415a 30%,#08121f 60%,#829bb4)',border:'1px solid #71859c',transform:`translateZ(${-i*1.3}px)`}}/>)}
 <div style={{position:'absolute',inset:8,background:'#0b1b2e',borderRadius:35,overflow:'hidden',backfaceVisibility:'hidden'}}><ProtectedAppScreen screen={screen}/><div style={{position:'absolute',inset:0,background:'linear-gradient(120deg,transparent 40%,#fff1 48%,transparent 65%)'}}/></div>
 <div style={{position:'absolute',left:155,top:19,width:9,height:9,borderRadius:'50%',background:'#02050b',border:'2px solid #344556',transform:'translateZ(2px)'}}/>
 </div></div>;
};
export const RoadScene=({pulse=0}:{pulse?:number})=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();const t=f/fps;
 return <svg width="850" height="700" viewBox="0 0 850 700" style={{position:'absolute',right:30,top:130}}>
 <path d="M40 680 350 230h150L810 680Z" fill="#12375d"/>
 <path d="M425 245v430" stroke="#8bbcf4" strokeWidth="5" strokeDasharray="28 40" strokeDashoffset={-t*150}/>
 <path d="M55 680 354 235M795 680 496 235" stroke="#3b82d4" strokeWidth="4"/>
 <g transform={`translate(${220+t*28} ${475-t*18}) rotate(-12)`}><rect width="125" height="54" rx="15" fill="#E6AA36"/><path d="M20 5 35-23h52l20 28" fill="#ebf4ff"/><circle cx="25" cy="56" r="13" fill="#031022"/><circle cx="100" cy="56" r="13" fill="#031022"/></g>
 <g transform="translate(630 180)"><circle r="105" fill="#0b294b" stroke="#e4f2ff" strokeWidth="4"/><path d="M0-74v8M0 74v-8M74 0h-8M-74 0h8" stroke="#b5d5fa" strokeWidth="4"/><path d="M0 0V-53" stroke="#E6AA36" strokeWidth="5" transform={`rotate(${t*72})`}/><path d="M0 0 38 21" stroke="white" strokeWidth="7"/><circle r={8+pulse*8} fill="white"/></g>
 </svg>;
};
export const ProcessIcon=({kind}:{kind:'paper'|'calculator'|'records'})=><svg width="130" height="130" viewBox="0 0 130 130" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">{kind==='paper'?<><path d="M30 14h50l24 24v77H30Z"/><path d="M80 14v24h24M44 58h44M44 76h44M44 94h26"/></>:kind==='calculator'?<><rect x="29" y="14" width="73" height="102" rx="9"/><path d="M43 32h45v20H43Z"/>{[0,1,2].map(i=><path key={i} d={`M45 ${70+i*16}h2m18 0h2m18 0h2`}/>)}</>:<><ellipse cx="65" cy="30" rx="43" ry="16"/><path d="M22 30v61c0 23 86 23 86 0V30M22 59c0 23 86 23 86 0"/><circle cx="92" cy="94" r="26" fill="#0645B5"/><path d="M92 77v18l12 8" stroke="#E6AA36"/></>}</svg>;
