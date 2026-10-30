import {CanvasImage,Sequence,interpolate,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {Video} from '@remotion/media';
import {smooth} from '../LaunchElements';
import {Screen} from './ProductionKit';
export type DemoMedia=Screen|'loginClip'|'namesClip'|'cameraClip'|'selectionClip'|'finesClip';
export type DemoBeat={at:number;media:DemoMedia;y:number;label:string;note?:string};
const NativeMedia=({media}:{media:DemoMedia})=>{
 const {fps}=useVideoConfig();const style={width:576,height:1280,display:'block'};
 return media.endsWith('Clip')?<Video src={staticFile(`footage/${media.replace('Clip','')}.mp4`)} muted loop={media==='addressClip'||media==='vehicleClip'} premountFor={fps} style={style}/>:<CanvasImage src={staticFile(`screenshots/approved/${media}.png`)} premountFor={fps} style={style}/>;
};
/** Whole-screen context and a large native-source crop. No perspective or rebuilt UI. */
export const AppDemo=({beats,title}:{beats:DemoBeat[];title:string})=>{
 const frame=useCurrentFrame();const {fps}=useVideoConfig();const t=frame/fps;
 let index=0;for(let i=1;i<beats.length;i++)if(t>=beats[i].at)index=i;
 const beat=beats[index];const previous=beats[Math.max(0,index-1)];
 let mediaIndex=index;while(mediaIndex>0&&beats[mediaIndex-1].media===beat.media)mediaIndex--;
 const mediaAt=beats[mediaIndex].at;
 let previousMediaIndex=Math.max(0,mediaIndex-1);while(previousMediaIndex>0&&beats[previousMediaIndex-1].media===beats[previousMediaIndex].media)previousMediaIndex--;
 const previousMedia=beats[previousMediaIndex];
 const blending=mediaIndex>0&&t<mediaAt+.35;
 const opacity=mediaIndex===0?1:interpolate(t,[mediaAt,mediaAt+.35],[0,1],smooth);
 const y=interpolate(t,[beat.at,beat.at+.7],[previous.y,beat.y],smooth);const sourceHeight=650/(1240/576);
 return <>
 <div style={{position:'absolute',left:90,top:113,fontSize:24,color:'#FFE1A1',letterSpacing:2}}>{title}</div>
 <div style={{position:'absolute',left:90,top:165,width:360,height:800,borderRadius:24,background:'#08192C',boxShadow:'0 22px 38px #00144066',border:'5px solid #bdd5ea',overflow:'hidden'}}>
 {blending&&<Sequence from={Math.round(previousMedia.at*fps)} premountFor={fps}><div style={{scale:350/576,transformOrigin:'0 0'}}><NativeMedia media={previousMedia.media}/></div></Sequence>}
 <Sequence from={Math.round(mediaAt*fps)} key={beat.media+mediaAt} premountFor={fps}><div style={{scale:350/576,transformOrigin:'0 0',opacity}}><NativeMedia media={beat.media}/></div></Sequence>
 <div style={{position:'absolute',left:0,top:y*350/576,width:350,height:sourceHeight*350/576,border:'3px solid #E6AA36',boxSizing:'border-box',pointerEvents:'none'}}/>
 </div>
 <div style={{position:'absolute',left:550,top:123,fontSize:38,fontWeight:600,color:'white'}}>{beat.label}</div>
 <div style={{position:'absolute',left:550,top:190,width:1240,height:650,borderRadius:19,background:'#F4F5FB',boxShadow:'0 22px 45px #00143e55',overflow:'hidden',border:'3px solid #cde6ff'}}>
 {blending&&<Sequence from={Math.round(previousMedia.at*fps)} premountFor={fps}><div style={{position:'absolute',left:0,top:-y*1240/576,scale:1240/576,transformOrigin:'0 0'}}><NativeMedia media={previousMedia.media}/></div></Sequence>}
 <Sequence from={Math.round(mediaAt*fps)} key={beat.media+mediaAt} premountFor={fps}><div style={{position:'absolute',left:0,top:-y*1240/576,scale:1240/576,transformOrigin:'0 0',opacity}}><NativeMedia media={beat.media}/></div></Sequence>
 </div>
 <div style={{position:'absolute',left:550,top:865,fontSize:20,color:'#d5e9ff'}}>{beat.note??'Actual LTO Officer application · personal information protected'}</div>
 </>;
};
