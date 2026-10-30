"""RNNoise speech denoising from the ORIGINAL MP3, preserving sample timing.
Model: GregorR/rnnoise-models somnolent-hogwash, included with upstream notice.
No synthesis, pitch, speed, word editing, or noise gating.
"""
import pathlib, subprocess, json, hashlib, numpy as np, shutil
ROOT=pathlib.Path(__file__).resolve().parent.parent
OUT=ROOT/'out/audio-revision';OUT.mkdir(parents=True,exist_ok=True)
source=ROOT/'public/voices/joseph.mp3';dest=ROOT/'public/voices/cleaned/joseph.flac'
def run(args):
    p=subprocess.run(['ffmpeg','-y','-hide_banner']+args,capture_output=True,text=True,check=True);return p.stderr
def pcm(file,rate=48000):return np.frombuffer(subprocess.check_output(['ffmpeg','-v','error','-i',str(file),'-ar',str(rate),'-ac','1','-f','f32le','-']),np.float32)
def stats(file):
    s=run(['-i',str(file),'-af','loudnorm=I=-17:TP=-1.8:LRA=8:print_format=json','-f','null','-']);return json.JSONDecoder().raw_decode(s[s.rfind('{'):])[0]
backup=OUT/'joseph-previous.flac'
if not backup.exists():
    try:
        backup.write_bytes(subprocess.check_output(['git','show','b96e72ecc5f34c052931500c124cc74bcf081f47:public/voices/cleaned/joseph.flac'],cwd=ROOT,stderr=subprocess.DEVNULL))
    except subprocess.CalledProcessError:
        shutil.copy2(dest,backup)
a=pcm(source);n=len(a)
# This model/filter has a measured 480-sample delay at 48 kHz (10 ms).
# Compensate it explicitly, retain the source sample count, and preserve the
# original trailing silence. The last spoken word ends >3 s before the file end.
filters=f'aformat=channel_layouts=mono,aresample=48000,highpass=f=85:p=2,arnndn=m={ROOT}/assets/audio-models/sh.rnnn:mix=0.88,atrim=start_sample=480,asetpts=PTS-STARTPTS,apad=whole_len={n},atrim=end_sample={n},lowpass=f=13000,equalizer=f=2200:t=q:w=0.8:g=0.7,acompressor=threshold=0.18:ratio=2:attack=18:release=180:knee=2.5:makeup=1:detection=rms,alimiter=limit=0.84:level=false:latency=true'
temp=OUT/'joseph-denoised.wav';run(['-i',str(source),'-af',filters,'-ar','48000','-c:a','pcm_f32le',str(temp)])
m=stats(temp);norm=f"loudnorm=I=-17:TP=-1.8:LRA=8:measured_I={m['input_i']}:measured_TP={m['input_tp']}:measured_LRA={m['input_lra']}:measured_thresh={m['input_thresh']}:offset={m['target_offset']}:linear=true"
run(['-i',str(temp),'-af',norm,'-ar','32000','-ac','1','-c:a','flac','-sample_fmt','s16',str(dest)])
b=pcm(dest);old=pcm(backup)
caps=json.load(open(ROOT/'src/production/joseph-captions.json'))
mask=np.ones(n,bool)
for w in caps:mask[max(0,round((w['startMs']/1000-.15)*48000)):min(n,round((w['endMs']/1000+.2)*48000))]=False
def rms(x):return float(np.sqrt(np.mean(x*x))+1e-12)
def db(x):return 20*np.log10(x)
# Compare floor after matching each file's speech level, avoiding the misleading
# appearance of improvement that simply turning down the whole track produces.
speech=~mask
floor={}
for name,x in [('original',a),('previous',old),('revised',b)]:
    x=x[:n];floor[name]={'speechRmsDb':db(rms(x[speech])),'nonSpeechRmsDb':db(rms(x[mask])),'speechToNonSpeechDb':db(rms(x[speech])/rms(x[mask])),'tailNoiseRelativeToSpeechDb':db(rms(x[round(54.6*48000):round(57.4*48000)])/rms(x[speech]))}
report={'sourceSha256':hashlib.sha256(source.read_bytes()).hexdigest(),'modelSha256':hashlib.sha256((ROOT/'assets/audio-models/sh.rnnn').read_bytes()).hexdigest(),'filter':filters,'modelMix':.88,'latencyCompensationSamples48000Hz':480,'originalSamples48000Hz':n,'revisedSamples48000Hz':len(b),'measurements':stats(dest),'floorComparison':floor,'note':'Non-speech windows can include breaths and handling noise. These are noise-floor proxies, not clean-reference intelligibility/STOI scores. Residual transient handling noise may remain.'}
(ROOT/'src/production/joseph-revision-report.json').write_text(json.dumps(report,indent=2)+'\n')
# Same passage: original, 1-second gap, revised. Also provide cleaned full voice.
run(['-i',str(source),'-i',str(dest),'-filter_complex','[0:a]atrim=start=0:end=20,asetpts=PTS-STARTPTS,aresample=48000,aformat=channel_layouts=mono,loudnorm=I=-17:TP=-1.8:LRA=8[a];anullsrc=r=48000:cl=mono,atrim=duration=1[s];[1:a]atrim=start=0:end=20,asetpts=PTS-STARTPTS,aresample=48000,aformat=channel_layouts=mono[b];[a][s][b]concat=n=3:v=0:a=1[out]','-map','[out]','-ar','48000','-c:a','libmp3lame','-b:a','192k',str(OUT/'Joseph-Original-Then-Revised-Comparison.mp3')])
print(json.dumps(report,indent=2),flush=True)
