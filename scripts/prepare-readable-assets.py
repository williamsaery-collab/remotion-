"""Use original 576×1280 app footage; permanently redact private content."""
import pathlib, subprocess, json, hashlib
ROOT=pathlib.Path(__file__).resolve().parent.parent
source=next(pathlib.Path('/workspace/attachments').rglob('VID_20261030_121029_167.mp4'))
def box(x,y,w,h,color='0xF4F5FB',enable=None):
    return f'drawbox=x={x}:y={y}:w={w}:h={h}:color={color}:t=fill'+(f":enable='{enable}'" if enable else '')
base=[box(0,0,576,59),box(0,1220,576,60,'0x0B1B2E')]
clips=[
 ('login',18.5,7,[box(110,480,400,180,'white','lt(t,1.9)'),box(150,1125,300,55,'0x0B1B2E','lt(t,1.9)'),box(0,830,576,390,'0x0B1B2E','lt(t,1.9)'),box(110,100,360,85,'0x0B1B2E','gte(t,1.5)'),box(100,470,440,410,'white','gte(t,1.5)')]),
 ('names',37,5,[box(50,300,475,48,'white'),box(50,420,475,45,'white'),box(50,535,475,45,'white'),box(0,820,576,85,'0x0B1B2E')]),
 ('camera',94,4,[]),
 ('selection',98,5,[]),
 ('fines',118.4,3,[box(0,830,576,75,'0x0B1B2E')]),
]
manifest=[]
for name,start,duration,masks in clips:
    dest=ROOT/'public/footage'/(name+'.mp4')
    subprocess.run(['ffmpeg','-y','-v','error','-ss',str(start),'-i',str(source),'-t',str(duration),'-an','-vf',','.join(base+masks)+',fps=30','-c:v','libx264','-crf','18','-preset','fast','-pix_fmt','yuv420p','-movflags','+faststart',str(dest)],check=True)
    manifest.append({'file':str(dest.relative_to(ROOT)),'source':source.name,'start':start,'seconds':duration,'masks':base+masks,'sha256':hashlib.sha256(dest.read_bytes()).hexdigest()})
(ROOT/'src/production/readability-assets.json').write_text(json.dumps(manifest,indent=2)+'\n')
print('Prepared',len(clips),'privacy-safe interaction clips')
