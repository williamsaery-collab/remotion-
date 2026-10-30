"""Verify a real final MP4 after rendering; never treats an incomplete file as success."""
import sys,pathlib,subprocess,json,numpy as np,hashlib
ROOT=pathlib.Path(__file__).resolve().parent.parent;path=pathlib.Path(sys.argv[1]) if len(sys.argv)>1 else ROOT/'out/mijori-lto-officer-final.mp4'
if not path.is_absolute():path=ROOT/path
assert path.is_file() and path.stat().st_size>1000000,'No complete MP4 file'
sync=json.load(open(ROOT/'src/production/sync-map.json'))
def call(args):return subprocess.check_output(args,stderr=subprocess.PIPE)
p=json.loads(call(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(path)]));v=next(s for s in p['streams'] if s['codec_type']=='video');a=next(s for s in p['streams'] if s['codec_type']=='audio')
assert (v['width'],v['height'],v['r_frame_rate'],int(v['nb_frames']))==(1920,1080,'30/1',5027)
assert a['channels']==2 and a['codec_name']=='aac'
assert abs(float(p['format']['duration'])-5027/30)<.1
# Decode the entire exported picture and audio with strict error handling.
subprocess.run(['ffmpeg','-v','error','-err_detect','explode','-i',str(path),'-map','0:v','-map','0:a','-f','null','-'],capture_output=True,check=True)
# Non-identical one-second samples confirm motion throughout the authored film.
md5=call(['ffmpeg','-v','error','-i',str(path),'-an','-vf','fps=1,scale=320:180','-f','framemd5','-']).decode();hashes=[line.split(',')[-1].strip() for line in md5.splitlines() if not line.startswith('#')]
duplicates=sum(x==y for x,y in zip(hashes,hashes[1:]));assert duplicates==0,'Repeated one-second frame samples'
def pcm(file):return np.frombuffer(call(['ffmpeg','-v','error','-i',str(file),'-vn','-ar','16000','-ac','1','-f','f32le','-']),np.float32)
source=pcm(ROOT/'public/audio/final-mix.mp3');render=pcm(path)
x=source[:320000];y=render[:320000];n=1
while n<len(x)+len(y):n*=2
cross=np.fft.irfft(np.fft.rfft(y,n)*np.conj(np.fft.rfft(x,n)),n);lag=max(range(-1600,1601),key=lambda i:cross[i%n])
begin=max(0,-lag);end=min(len(source),len(render)-lag);corr=float(np.corrcoef(source[begin:end],render[begin+lag:end+lag])[0,1]);assert corr>.97,'Export audio differs from prepared complete narration mix'
voice_checks=[]
for t in sync['tracks']:
 f=ROOT/'public'/t['file'];assert hashlib.sha256(f.read_bytes()).hexdigest()==t['sha256']
 clean=pcm(ROOT/'public'/t['cleanedFile']);offset=round(t['fromFrame']/30*16000)+lag
 # Check speech sections across the full file, not just its first phrase.
 cs=[]
 captions=json.load(open(ROOT/f'src/production/{t["speaker"]}-captions.json'));last_spoken=max(w['endMs'] for w in captions)/1000
 for second in [.1, max(1,last_spoken/2),max(1,last_spoken-2.5)]:
  start=round(second*16000);count=min(3*16000,len(clean)-start,len(render)-offset-start)
  xx=clean[start:start+count];yy=render[offset+start:offset+start+count]
  cs.append(float(np.corrcoef(xx,yy)[0,1]))
 assert min(cs)>.70,('Voice section mismatch',t['speaker'],cs)
 voice_checks.append({'speaker':t['speaker'],'sectionCorrelations':cs,'fullSourceSeconds':t['sourceSeconds'],'fromFrame':t['fromFrame']})
r=subprocess.run(['ffmpeg','-hide_banner','-i',str(path),'-af','loudnorm=I=-16:TP=-1:LRA=8:print_format=json','-f','null','-'],capture_output=True,text=True,check=True);l=json.JSONDecoder().raw_decode(r.stderr[r.stderr.rfind('{'):])[0]
assert -17<=float(l['input_i'])<=-15;assert float(l['input_tp'])<-1
report={'path':str(path),'bytes':path.stat().st_size,'sha256':hashlib.sha256(path.read_bytes()).hexdigest(),'durationSeconds':float(p['format']['duration']),'videoFrames':int(v['nb_frames']),'fps':30,'width':1920,'height':1080,'audioChannels':a['channels'],'completeDecode':'passed','consecutiveIdenticalOneSecondSamples':duplicates,'sampledFrames':len(hashes),'audioCorrelationToPreparedMix':corr,'audioEncoderOffsetSeconds':lag/16000,'voices':voice_checks,'integratedLufs':float(l['input_i']),'truePeakDbtp':float(l['input_tp']),'titleRevealFrame':sync['revealFrame'],'purposeNarrationInvented':False}
(ROOT/'out/final-checks').mkdir(parents=True,exist_ok=True);(ROOT/'out/final-checks/export-verification.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report,indent=2))
