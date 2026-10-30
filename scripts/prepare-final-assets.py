"""Export only reviewed, permanently redacted original app media."""
import pathlib,subprocess,json,hashlib
ROOT=pathlib.Path(__file__).resolve().parent.parent
sources={p.name:p for p in pathlib.Path('/workspace/attachments').rglob('*') if p.is_file()}
out=ROOT/'public/screenshots/approved';out.mkdir(parents=True,exist_ok=True)
navy='0x0B1B2E';white='white'
def box(x,y,w,h,c=white):return f'drawbox=x={x}:y={y}:w={w}:h={h}:color={c}:t=fill'
base=[box(0,0,576,59,'0xF4F5FB'),box(0,1220,576,60,navy)]
assets={
 'violator':('IMG_20261030_121016_736.jpg',[]),
 'violations':('IMG_20261030_121016_089.jpg',[]),
 'ticket':('IMG_20261030_121016_056.jpg',[box(392,244,141,145,navy),box(330,450,210,151)]),
 'review':('IMG_20261030_121015_973.jpg',[box(32,281,510,246,navy),box(350,630,180,185)]),
 'camera':('IMG_20261030_121016_502.jpg',[box(0,204,576,594,navy)]),
 'pin':('IMG_20261030_121016_629.jpg',[box(120,391,338,40,navy),box(150,1135,285,45,navy)])}
manifest=[]
for name,(file,masks) in assets.items():
 dest=out/(name+'.png');r=subprocess.run(['ffmpeg','-y','-v','error','-i',str(sources[file]),'-vf',','.join(base+masks),'-frames:v','1',str(dest)],capture_output=True)
 if r.returncode:raise RuntimeError(r.stderr.decode())
 manifest.append({'asset':str(dest.relative_to(ROOT)),'source':file,'masks':base+masks,'sha256':hashlib.sha256(dest.read_bytes()).hexdigest()})
record=sources['VID_20261030_121029_167.mp4']
for name,start,duration,masks in [
 ('address',53,4,[box(33,205,510,370)]),
 ('vehicle',79,3,[box(45,300,476,49),box(0,830,576,65,navy)])]:
 dest=ROOT/'public/footage'/(name+'.mp4');r=subprocess.run(['ffmpeg','-y','-v','error','-ss',str(start),'-i',str(record),'-t',str(duration),'-an','-vf',','.join(base+masks)+',fps=30','-c:v','libx264','-preset','fast','-crf','20','-pix_fmt','yuv420p','-movflags','+faststart',str(dest)],capture_output=True)
 if r.returncode:raise RuntimeError(r.stderr.decode())
 manifest.append({'asset':str(dest.relative_to(ROOT)),'source':record.name,'sourceStartSeconds':start,'durationSeconds':duration,'masks':base+masks,'sha256':hashlib.sha256(dest.read_bytes()).hexdigest()})
# A blank required-field state from the actual recording, with disabled Next.
dest=out/'vehicle.png'
subprocess.run(['ffmpeg','-y','-v','error','-ss','70','-i',str(record),'-frames:v','1','-vf',','.join(base),str(dest)],check=True)
manifest.append({'asset':'public/screenshots/approved/vehicle.png','source':record.name,'sourceStartSeconds':70,'masks':base,'sha256':hashlib.sha256(dest.read_bytes()).hexdigest()})
(ROOT/'src/production/asset-manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
print('Prepared',len(manifest),'safe assets')
