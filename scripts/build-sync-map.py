"""Build source-relative captions and a phrase-level production map from inspected ASR.
Source starts and word times are observations, not approximate storyboard times.
"""
import json,pathlib,math
ROOT=pathlib.Path(__file__).resolve().parent.parent
plan=json.load(open(ROOT/'src/narration/timeline.json'));FPS=30
boundaries=[0,6.9,23.64,40.04,54.3,54.3+19.09,2935/30,2935/30+21.41,2935/30+37.97,4667/30,5027/30]
titles=['The documentation problem','From paperwork to a smarter approach','MiJoRi Tech introduces LTO Officer','Essential tools: login and dashboard','Create a traffic ticket','Camera evidence and GPS','Violations and calculated fines','Electronic traffic ticket','Offline storage and synchronization','Project credits']
assets=['vector/road','vector/process','screenshots/approved/login.png','screenshots/approved/dashboard.png','screenshots/approved/violator.png','screenshots/approved/camera.png','screenshots/approved/violations.png','screenshots/approved/ticket.png','vector/offline-sync','team/credits']
scenes=[{'id':i+1,'title':titles[i],'startFrame':round(boundaries[i]*FPS),'endFrame':round(boundaries[i+1]*FPS),'asset':assets[i],'overlapFrames':18} for i in range(10)]
phrases=[];allwords=[]
for tr,Name in zip(plan['tracks'],['Ria','Micah','Joseph']):
 src=json.load(open('/tmp/mijori-asr/'+Name+'-small.json'));offset=tr['fromFrame']/30;words=[]
 for j,seg in enumerate(src):
  txt=seg['text'].strip().replace('misery tech','MiJoRi Tech').replace('LTO officer','LTO Officer')
  for w in seg['words']:
   text=w['word'];
   if Name=='Ria' and text.strip()=='misery':text=' MiJoRi'
   if Name=='Ria' and text.strip()=='tech,':text=' Tech,'
   if Name=='Ria' and text.strip().lower()=='officer,':text=' Officer,'
   words.append({'text':text,'startMs':round(w['start']*1000),'endMs':round(w['end']*1000),'timestampMs':round((w['start']+w['end'])*500),'confidence':round(w['probability'],4)})
  start=offset+seg['start'];end=offset+seg['end'];idx=max(i for i in range(10) if boundaries[i]<=start)
  phrases.append({'speaker':tr['speaker'],'spokenPhrase':txt,'sourceStartSeconds':seg['start'],'sourceEndSeconds':seg['end'],'startSeconds':round(start,6),'endSeconds':round(end,6),'startFrame':round(start*30),'endFrame':round(end*30),'scene':idx+1,'visualAsset':assets[idx],'animation':'frame-driven spring entrance, continuous drift and readable focus','transition':'18-frame overlapping lateral reveal','soundEffect': 'click' if idx in [3,4,6] else 'whoosh' if idx<3 else 'shutter' if idx==5 else 'notification' if idx==7 else 'sync' if idx==8 else None})
 (ROOT/'src/production'/(tr['speaker']+'-captions.json')).write_text(json.dumps(words,indent=2)+'\n')
 allwords += [{**w,'speaker':tr['speaker'],'startMs':w['startMs']+round(offset*1000),'endMs':w['endMs']+round(offset*1000),'timestampMs':w['timestampMs']+round(offset*1000)} for w in words]
reveal=round(28.84*30)
sfx=[{'time':t,'effect':effect,'gain':gain} for t,effect,gain in [(0.3,'tick',.02),(1.3,'tick',.018),(2.3,'tick',.018),(6.7,'whoosh',.04),(6.9,'click',.025),(7.9,'click',.025),(9.9,'click',.025),(23.5,'rise',.035),(28.84,'whoosh',.045),(30,'confirmation',.025),(45.26,'click',.024),(48.76,'click',.024),(54.3,'whoosh',.04),(61,'click',.02),(64,'click',.02),(68.2,'confirmation',.025),(79.8,'shutter',.035),(84,'notification',.02),(98.4,'whoosh',.035),(105.4,'click',.02),(113.1,'confirmation',.025),(119.24,'notification',.028),(130,'click',.018),(135.8,'whoosh',.035),(143,'notification',.016),(149.5,'sync',.025),(155.6,'rise',.035)]]
out={'fps':30,'durationFrames':5027,'revealFrame':reveal,'revealSeconds':28.84,'titleRevealPhrase':'LTO Officer','audioOrder':['ria','micah','joseph'],'tracks':plan['tracks'],'scenes':scenes,'phrases':phrases,'sfx':sfx,'purposeNarrationPresent':False,'captionPolicy':'Observed spoken wording retained; known brand names normalized. ASR timestamps checked against phrase boundaries and waveform.'}
(ROOT/'src/production/sync-map.json').write_text(json.dumps(out,indent=2)+'\n');(ROOT/'src/production/all-captions.json').write_text(json.dumps(allwords,indent=2)+'\n')
print('Scenes',len(scenes),'Phrases',len(phrases),'Words',len(allwords),'Reveal frame',reveal)
