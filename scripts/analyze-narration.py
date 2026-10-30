"""Analyze original MP3s without altering them. Requires ffmpeg, ffprobe, numpy.
Word transcripts are generated separately with local faster-whisper CPU ASR.
"""
import pathlib,json,subprocess,hashlib,numpy as np,math
root=pathlib.Path(__file__).resolve().parent.parent
tracks=[];cursor=0
for name in ['ria','micah','joseph']:
 p=root/'public'/'voices'/(name+'.mp3')
 duration=float(json.loads(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','json',str(p)]))['format']['duration'])
 raw=subprocess.check_output(['ffmpeg','-v','error','-i',str(p),'-ac','1','-ar','16000','-f','f32le','-'])
 samples=np.frombuffer(raw,dtype=np.float32);win=800
 rms=[round(float(np.sqrt(np.mean(samples[i:i+win]**2))),5) for i in range(0,len(samples),win)]
 (root/'src'/'narration'/(name+'-waveform.json')).write_text(json.dumps({'windowSeconds':.05,'rms':rms},separators=(',',':'))+'\n')
 frames=math.ceil(duration*30)
 tracks.append({'speaker':name,'file':'voices/'+name+'.mp3','sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'sourceSeconds':duration,'fromFrame':cursor,'durationFrames':frames,'playbackRate':1,'trimStartFrames':0})
 cursor+=frames+15
closing=cursor-15
plan={'fps':30,'tracks':tracks,'closingFromFrame':closing,'closingDurationFrames':360,'plannedDurationFrames':closing+360,'previewDurationFrames':600,'previewSource':'ria','previewBoundaryNote':'Ria phrase ends 19.22s; next phrase starts 20.92s. Preview ends during pause at 20s.'}
(root/'src'/'narration'/'timeline.json').write_text(json.dumps(plan,indent=2)+'\n')
