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

test('official narration remains complete, byte-identical and in requested order',async()=>{
 const {createHash}=await import('node:crypto');
 const plan=JSON.parse(read('src/narration/timeline.json'));
 assert.deepEqual(plan.tracks.map(t=>t.speaker),['ria','micah','joseph']);
 const expected=['cf76273bfee1e1c7972ef0b376cce80ac25257152887854cc747c40c010ae926','2fd17558604628d7b13c6f29e2db83933b19206d12d09c58fb3488dab8126c29','2002d2f5280c8814c0428f89509a363ca9a5225cf5e0003ec93981a69689bc79'];
 let end=0;
 for(const [i,t] of plan.tracks.entries()){
  assert.equal(createHash('sha256').update(readFileSync('public/'+t.file)).digest('hex'),expected[i]);
  assert.equal(t.playbackRate,1);assert.equal(t.trimStartFrames,0);
  assert.ok(t.fromFrame>=end);assert.ok(t.durationFrames/30>=t.sourceSeconds);
  end=t.fromFrame+t.durationFrames;
 }
 assert.equal(plan.closingFromFrame,end);assert.ok(plan.plannedDurationFrames/30>=165&&plan.plannedDurationFrames/30<=180);
 const words=JSON.parse(read('src/narration/ria-captions-draft.json'));
 assert.ok(words.some(w=>w.endMs===19220));
 assert.ok(words.find(w=>w.startMs>20000).startMs>=20920);
});
