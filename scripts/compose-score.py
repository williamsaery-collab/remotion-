"""Original instrumental score written for MiJoRi Tech. No samples or borrowed melody.
Generated composition/audio and this score source are offered under CC0-1.0.
"""
import numpy as np,wave,subprocess,pathlib,json
ROOT=pathlib.Path(__file__).resolve().parent.parent;SR=32000;D=5027/30
out=ROOT/'out/final-audio';out.mkdir(parents=True,exist_ok=True)
n=int((D+1)*SR);mix=np.zeros((n,2),np.float64);rng=np.random.default_rng(3112026)
def tone(start,duration,freq,amp,pan=.0,kind='pluck'):
 i=int(start*SR);count=min(int(duration*SR),n-i)
 if count<=0:return
 t=np.arange(count)/SR
 if kind=='pad':env=np.minimum(1,t/.6)*np.minimum(1,(duration-t)/.8);v=(np.sin(2*np.pi*freq*t)+.22*np.sin(2*np.pi*freq*2*t+.2))*env
 else:env=(1-np.exp(-t*100))*np.exp(-t*3)*np.minimum(1,(duration-t)/.06);v=(np.sin(2*np.pi*freq*t+.25*np.sin(2*np.pi*freq*2*t))+.12*np.sin(2*np.pi*freq*3*t))*env
 mix[i:i+count,0]+=v*amp*np.sqrt((1-pan)/2);mix[i:i+count,1]+=v*amp*np.sqrt((1+pan)/2)
def hz(note):return 440*2**((note-69)/12)
# An original restrained 96bpm arrangement, D minor/B-flat/F/C harmony.
beat=60/96;bar=4*beat;chords=[[50,57,62,65],[46,53,58,62],[41,53,57,60],[48,55,60,64]]
for b,start in enumerate(np.arange(0,D,bar)):
 chord=chords[b%4];energy=.55 if start<20 else .8 if start<28.84 else 1.0
 for j,note in enumerate(chord[1:]):tone(start,bar+.2,hz(note),.025*energy,(-.5,0,.5)[j],'pad')
 tone(start,bar,hz(chord[0]),.04*energy,0,'pad')
 for k in range(8):
  step=start+k*beat/2;note=chord[[1,2,3,2,1,3,2,3][k]]+12;tone(step,.7,hz(note),.016*energy,(-.35 if k%2 else .35))
 for k in range(4):
  i=int((start+k*beat)*SR);count=max(0,min(int(.18*SR),n-i));t=np.arange(count)/SR
  kick=np.sin(2*np.pi*(57*t+18*(1-np.exp(-t*25))))*np.exp(-t*30)*.035*energy;mix[i:i+count]+=kick[:,None]
 for k in range(8):
  i=int((start+k*beat/2)*SR);count=max(0,min(int(.05*SR),n-i));t=np.arange(count)/SR;noise=rng.normal(0,1,count);v=(noise-np.roll(noise,1))*np.exp(-t*95)*.004*energy;mix[i:i+count]+=v[:,None]
t=np.arange(n)/SR;fade=np.minimum(1,t/2)*np.minimum(1,np.maximum(0,D-t)/2.8);mix*=fade[:,None]
with wave.open(str(out/'original-score.wav'),'wb') as w:w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes((np.clip(mix,-.95,.95)*32767).astype('<i2').tobytes())
subprocess.run(['ffmpeg','-y','-v','error','-i',str(out/'original-score.wav'),'-c:a','libmp3lame','-b:a','128k',str(ROOT/'public/audio/original-score.mp3')],check=True)
(ROOT/'public/audio/ORIGINAL-SCORE-LICENSE.txt').write_text('MiJoRi Tech original procedural instrumental score\nCC0 1.0 Universal dedication: https://creativecommons.org/publicdomain/zero/1.0/\nComposition and synthesis authored for this project; no third-party samples, melodies, recordings or reference audio.\nSource: scripts/compose-score.py. Free to use, modify, export and share; no attribution required.\n')
print('Original score prepared',D)
