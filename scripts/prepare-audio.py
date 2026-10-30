"""Conservative narration cleanup and original procedural SFX. No time stretching.
Requires ffmpeg and numpy. Originals remain unchanged. Optional music is private.
"""
import subprocess,json,pathlib,numpy as np,wave,hashlib
ROOT=pathlib.Path(__file__).resolve().parent.parent
OUT=ROOT/'out/audio-analysis';OUT.mkdir(parents=True,exist_ok=True)
def run(args):
 p=subprocess.run(['ffmpeg','-y','-hide_banner']+args,capture_output=True,text=True)
 if p.returncode:raise RuntimeError(p.stderr[-3000:])
 return p.stderr
def stats(args,target=-17):
 log=run(args+['-af',f'loudnorm=I={target}:TP=-1.8:LRA=8:print_format=json','-f','null','-'])
 return json.JSONDecoder().raw_decode(log[log.rfind('{'):])[0]
def normalize(inputfile,outfile,prefix,target):
 # two-pass loudness normalization after the conservative filters
 base=['-i',str(inputfile)]
 log=run(base+['-af',prefix+f',loudnorm=I={target}:TP=-1.8:LRA=8:print_format=json','-f','null','-'])
 m=json.JSONDecoder().raw_decode(log[log.rfind('{'):])[0]
 norm=f"loudnorm=I={target}:TP=-1.8:LRA=8:measured_I={m['input_i']}:measured_TP={m['input_tp']}:measured_LRA={m['input_lra']}:measured_thresh={m['input_thresh']}:offset={m['target_offset']}:linear=true"
 codec=['-c:a','flac','-sample_fmt','s16'] if str(outfile).endswith('.flac') else ['-c:a','libmp3lame','-b:a','256k']
 rate=['-ar','32000','-ac','1'] if str(outfile).endswith('.flac') else ['-ar','48000']
 run(base+['-af',prefix+','+norm]+rate+codec+[str(outfile)])
 return m
settings={'ria':(70,4,-55),'micah':(75,4,-58),'joseph':(85,8,-43)}
report={'originalsPreserved':True,'cleaned':{},'music':{'enabled':False,'missing':'A licensed instrumental track and its usage terms'}}
for name,(hp,nr,nf) in settings.items():
 source=ROOT/f'public/voices/{name}.mp3';dest=ROOT/f'public/voices/cleaned/{name}.flac'
 filters=f'aformat=channel_layouts=mono,highpass=f={hp}:p=2,lowpass=f=14000,afftdn=nr={nr}:nf={nf}:tn=0:gs=8,equalizer=f=2200:t=q:w=0.8:g=0.7,acompressor=threshold=0.18:ratio=2:attack=18:release=180:knee=2.5:makeup=1:detection=rms,alimiter=limit=0.84:level=false:latency=true'
 original=stats(['-i',str(source)]);normalize(source,dest,filters,-17)
 result=stats(['-i',str(dest)]);report['cleaned'][name]={'filters':filters,'original':original,'processed':result,'originalSha256':hashlib.sha256(source.read_bytes()).hexdigest(),'deEsser':'not applied; no clear persistent sibilance problem in spectral inspection'}
 print(name,result,flush=True)
# Original procedural sound designs: deterministic oscillators and filtered noise.
SR=48000;rng=np.random.default_rng(311)
def make(kind,dur):
 t=np.arange(round(dur*SR))/SR;n=rng.normal(0,1,len(t));n=np.convolve(n,np.ones(9)/9,mode='same');n/=max(np.max(abs(n)),1)
 if kind=='tick':v=(np.sin(2*np.pi*1700*t)+.25*n)*np.exp(-t*95)
 elif kind=='whoosh':v=n*np.sin(np.pi*t/dur)**2*.8
 elif kind=='rise':v=(.25*np.sin(2*np.pi*(240*t+550*t*t))+n*.2)*np.sin(np.pi*t/dur)**2
 elif kind=='click':v=np.sin(2*np.pi*1200*t)*np.exp(-t*75)
 elif kind=='shutter':v=n*(np.exp(-t*65)+np.where(t>.065,np.exp(-(t-.065)*75),0))*.6
 else:v=(np.sin(2*np.pi*660*t)+.4*np.sin(2*np.pi*990*t))*np.sin(np.pi*t/dur)**2*np.exp(-t*4)
 return v/max(1,np.max(abs(v)))
def save(path,v):
 with wave.open(str(path),'wb') as w:w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((np.clip(v,-1,1)*32767).astype('<i2').tobytes())
spec={'tick':.12,'whoosh':.8,'rise':1.9,'click':.12,'shutter':.22,'confirmation':.5,'notification':.6,'sync':.75}
sounds={k:make(k,d) for k,d in spec.items()}
for k,v in sounds.items():save(ROOT/f'public/audio/sfx/{k}.wav',v*.22)
bed=np.zeros(20*SR)
cues=[(.25,'tick',.022),(1.25,'tick',.018),(2.25,'tick',.018),(5.7,'whoosh',.055),(6.72,'click',.027),(7.8,'click',.027),(9.92,'click',.027),(12,'whoosh',.045),(12.65,'rise',.055),(14.9,'whoosh',.065),(16.7,'confirmation',.035)]
for start,key,vol in cues:
 v=sounds[key]*vol;i=round(start*SR);count=min(len(v),len(bed)-i);bed[i:i+count]+=v[:count]
save(OUT/'preview-sfx.wav',bed)
# Optional music: no unverified download. Supply a local rights-cleared track.
config=json.loads((ROOT/'src/audio/music.json').read_text());music=ROOT/'public/audio/music.mp3'
if config['enabled']:
 if not music.exists() or not config.get('licenseNote'):raise ValueError('Music requires file and licenseNote')
 # Sidechain the low music bed to the cleaned narration, with gentle attack/release.
 graph='[0:a]asplit=2[voice][side];[1:a]volume=0.07,afade=t=in:d=1.4,afade=t=out:st=18:d=2[music];[music][side]sidechaincompress=threshold=0.035:ratio=5:attack=35:release=450[duck];[voice][duck][2:a]amix=inputs=3:duration=first:normalize=0,aformat=channel_layouts=stereo[mix]'
 inputs=['-i',str(ROOT/'public/voices/cleaned/ria.flac'),'-stream_loop','-1','-i',str(music),'-i',str(OUT/'preview-sfx.wav')]
 report['music']={'enabled':True,'licenseNote':config['licenseNote']}
else:
 graph='[0:a][1:a]amix=inputs=2:duration=longest:normalize=0,aformat=channel_layouts=stereo[mix]';inputs=['-i',str(ROOT/'public/voices/cleaned/ria.flac'),'-i',str(OUT/'preview-sfx.wav')]
run(inputs+['-filter_complex',graph,'-map','[mix]','-t','20','-c:a','pcm_s24le',str(OUT/'preview-premix.wav')])
normalize(OUT/'preview-premix.wav',ROOT/'public/audio/preview-mix.mp3','anull',-16)
report['previewMix']=stats(['-i',str(ROOT/'public/audio/preview-mix.mp3')],-16);report['sfxCues']=[{'time':t,'effect':k,'gain':v} for t,k,v in cues]
(ROOT/'src/audio/processing-report.json').write_text(json.dumps(report,indent=2)+'\n')
print('MIX',report['previewMix'],flush=True)
