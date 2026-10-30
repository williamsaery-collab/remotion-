import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(p,'utf8');
test('scene lengths minus crossfades equal the 150-second composition',()=>{
 const film=read('src/Film.tsx');
 const durations=[...film.matchAll(/durationInFrames=\{(\d+)\*fps\}/g)].map(m=>Number(m[1]));
 const fades=[...film.matchAll(/TransitionSeries\.Transition presentation/g)].length;
 assert.equal(durations.length,10);assert.equal(fades,9);
 assert.equal(durations.reduce((a,b)=>a+b,0)-fades,150);
 assert.match(read('src/Root.tsx'),/id="LTOOfficer" component=\{Film\} durationInFrames=\{4500\}/);
});
test('voice cues use only team recordings and fit the film without overlap',()=>{
 const cues=JSON.parse(read('src/voice-cues.json'));assert.deepEqual(Object.keys(cues),['ria','micah','joseph']);
 let end=0;
 for(const cue of Object.values(cues)){
  assert.equal(typeof cue.enabled,'boolean');
  for(const key of ['startSeconds','durationSeconds','trimStartSeconds','volume'])assert.ok(Number.isFinite(cue[key]));
  assert.ok(cue.durationSeconds>0&&cue.trimStartSeconds>=0&&cue.volume>=0&&cue.volume<=1);
  assert.ok(cue.startSeconds>=end);end=cue.startSeconds+cue.durationSeconds;assert.ok(end<=150);
 }
});
test('Remotion package versions match',()=>{
 const {dependencies,devDependencies}=JSON.parse(read('package.json'));
 for(const [name,version] of Object.entries({...dependencies,...devDependencies}))if(name.startsWith('@remotion/'))assert.equal(version,dependencies.remotion);
});
