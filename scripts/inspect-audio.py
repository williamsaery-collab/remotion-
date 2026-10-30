import numpy as np,subprocess,json,pathlib
for name in ['ria','micah','joseph']:
 p='public/voices/'+name+'.mp3'
 v=np.frombuffer(subprocess.check_output(['ffmpeg','-v','error','-i',p,'-ac','1','-ar','24000','-f','f32le','-']),np.float32)
 wins=np.array([np.sqrt(np.mean(v[i:i+1200]**2)) for i in range(0,len(v)-1200,1200)])
 quiet=np.argsort(wins)[:max(5,len(wins)//10)];speech=np.argsort(wins)[-len(wins)//3:]
 def bands(ids):
  spec=np.mean([abs(np.fft.rfft(v[i*1200:i*1200+1200]*np.hanning(1200)))**2 for i in ids],axis=0);freq=np.fft.rfftfreq(1200,1/24000)
  return {key:round(float(10*np.log10(np.sum(spec[(freq>=lo)&(freq<hi)])/np.sum(spec))),1) for key,lo,hi in [('rumble',0,80),('voice',150,4000),('sibilance',6000,10000)]}
 r={'name':name,'rmsDb':float(20*np.log10(np.sqrt(np.mean(v*v)))),'samplePeakDb':float(20*np.log10(np.max(abs(v)))),'quiet10PercentRmsDb':float(20*np.log10(np.mean(wins[quiet]))),'quietBandsDb':bands(quiet),'speechBandsDb':bands(speech)}
 f=subprocess.run(['ffmpeg','-hide_banner','-i',p,'-af','loudnorm=I=-17:TP=-1.5:LRA=8:print_format=json','-f','null','-'],capture_output=True,text=True)
 r['loudness']=json.JSONDecoder().raw_decode(f.stderr[f.stderr.rfind('{'):])[0];pathlib.Path('out/audio-analysis/'+name+'-original.json').write_text(json.dumps(r,indent=2));print(json.dumps(r))
