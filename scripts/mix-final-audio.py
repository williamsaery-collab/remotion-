"""Assemble complete cleaned team recordings, original score and original SFX.
Source timing comes only from sync-map.json. No speech trim or speed operation.
"""
import json,pathlib,subprocess,wave,numpy as np
ROOT=pathlib.Path(__file__).resolve().parent.parent;OUT=ROOT/'out/final-audio';OUT.mkdir(parents=True,exist_ok=True)
sync=json.load(open(ROOT/'src/production/sync-map.json'));SR=48000;duration=sync['durationFrames']/30;n=round(duration*SR)
def run(args):
 r=subprocess.run(['ffmpeg','-y','-hide_banner']+args,capture_output=True,text=True)
 if r.returncode:raise RuntimeError(r.stderr[-4000:])
 return r.stderr
def norm_stats(file):
 s=run(['-i',str(file),'-af','loudnorm=I=-16:TP=-1.5:LRA=8:print_format=json','-f','null','-']);return json.JSONDecoder().raw_decode(s[s.rfind('{'):])[0]
fx=np.zeros(n)
for cue in sync['sfx']:
 with wave.open(str(ROOT/'public/audio/sfx'/(cue['effect']+'.wav')),'rb') as w:a=np.frombuffer(w.readframes(w.getnframes()),dtype='<i2').astype(float)/32768/.22
 i=round(cue['time']*SR);count=min(len(a),n-i);fx[i:i+count]+=a[:count]*cue['gain']
# Original low traffic-like air texture, not a borrowed ambience recording.
rng=np.random.default_rng(311);count=round(6.5*SR);a=rng.normal(0,1,count);a=np.convolve(a,np.ones(120)/120,'same');a/=max(.001,np.max(abs(a)));t=np.arange(count)/SR;fx[:count]+=a*.007*np.sin(np.pi*t/6.5)**2
with wave.open(str(OUT/'full-sfx.wav'),'wb') as w:w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((np.clip(fx,-.95,.95)*32767).astype('<i2').tobytes())
inputs=[]
for tr in sync['tracks']:inputs+=['-i',str(ROOT/'public'/tr['cleanedFile'])]
inputs+=['-i',str(ROOT/'public/audio/original-score.mp3'),'-i',str(OUT/'full-sfx.wav')]
parts=[]
for i,tr in enumerate(sync['tracks']):
 delay=round(tr['fromFrame']/30*SR);parts.append(f'[{i}:a]aresample=48000,aformat=sample_fmts=fltp:channel_layouts=stereo,adelay={delay}S:all=1[v{i}]')
parts+=['[v0][v1][v2]amix=inputs=3:normalize=0:duration=longest,apad,asplit=2[voice][side]',"[3:a]volume='if(lt(t,154),1.5,if(lt(t,158),1.5+(t-154)*0.75,4.5))':eval=frame,afade=t=in:d=2,afade=t=out:st=164.5:d=3.067[music]",'[music][side]sidechaincompress=threshold=0.028:ratio=4:attack=25:release=450:makeup=1[duck]','[4:a]aformat=channel_layouts=stereo[fx]','[voice][duck][fx]amix=inputs=3:normalize=0:duration=shortest[mix]']
run(inputs+['-filter_complex',';'.join(parts),'-map','[mix]','-t',str(duration),'-ar','48000','-c:a','pcm_s24le',str(OUT/'premix.wav')])
m=norm_stats(OUT/'premix.wav');norm=f"loudnorm=I=-16:TP=-1.5:LRA=8:measured_I={m['input_i']}:measured_TP={m['input_tp']}:measured_LRA={m['input_lra']}:measured_thresh={m['input_thresh']}:offset={m['target_offset']}:linear=true"
run(['-i',str(OUT/'premix.wav'),'-af',norm,'-ar','48000','-ac','2','-c:a','libmp3lame','-b:a','256k',str(ROOT/'public/audio/final-mix.mp3')])
report={'targetLufs':-16,'targetTruePeakDbtp':-1.5,'mixMeasurements':norm_stats(ROOT/'public/audio/final-mix.mp3'),'durationSeconds':duration,'voiceTracks':sync['tracks'],'music':'Original score: CC0-1.0, no borrowed samples or reference media','ducking':{'threshold':.028,'ratio':4,'attackMs':25,'releaseMs':450},'sfx':sync['sfx'],'speechProcessing':'Cleaned copies from previous measured conservative pipeline; complete files unchanged in duration.'}
(ROOT/'src/production/final-audio-report.json').write_text(json.dumps(report,indent=2)+'\n');print(report['mixMeasurements'],flush=True)
