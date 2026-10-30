import {Frame,Reveal,blue} from '../Design';
export const Closing=()=> <Frame number="10" chapter="OUR VISION"><div style={{position:'absolute',left:120,right:120,top:230,textAlign:'center'}}>
 <Reveal style={{fontSize:25,color:blue,letterSpacing:7}}>MiJoRi TECH · GROUP 2</Reveal>
 <Reveal delay={.4}><h1 style={{fontSize:108,letterSpacing:-5,lineHeight:1.12,margin:'35px 0'}}>Smarter Enforcement.<br/><span style={{color:blue,textShadow:'0 0 50px #168aff66'}}>Safer Roads.</span></h1></Reveal>
 <Reveal delay={1.2} style={{fontSize:30,color:'#a8c2dd'}}>LTO Officer</Reveal>
 <Reveal delay={2} style={{marginTop:80,display:'flex',justifyContent:'center',gap:75}}>
 {[[ 'Ria Jane A. Balacuit','Project Leader'],['Micah P. Cadeliña','Documentation'],['Joseph P. Yamson','Programmer']].map(([name,role])=><div key={name} style={{minWidth:380}}><div style={{height:1,width:60,background:blue,margin:'0 auto 25px'}}/><div style={{fontSize:29,color:'#e8f5ff'}}>{name}</div><div style={{fontSize:21,color:'#809fba',marginTop:15,letterSpacing:2}}>{role}</div></div>)}
 </Reveal>
 </div></Frame>;
