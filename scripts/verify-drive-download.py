"""Verify an already-uploaded Drive file by downloading its public bytes.
Supply the observed Drive viewer URL and the expected local file. No credentials
or cookies are used. The download URL is read from Drive's viewer response.
"""
import sys, pathlib, urllib.request, urllib.parse, re, hashlib, json
viewer,expected=sys.argv[1:3]
assert urllib.parse.urlparse(viewer).hostname=='drive.google.com'
page=urllib.request.urlopen(viewer,timeout=60).read().decode()
matches=re.findall(r'https://drive\.usercontent\.google\.com/[^"<> ]+',page)
assert matches,'Drive did not expose a public download URL'
download=matches[0].encode().decode('unicode_escape')
local=pathlib.Path(expected);expected_hash=hashlib.sha256(local.read_bytes()).hexdigest()
sha=hashlib.sha256();size=0
with urllib.request.urlopen(download,timeout=60) as response:
    while block:=response.read(1024*1024):sha.update(block);size+=len(block)
    report={'viewer':viewer,'download':response.url,'status':response.status,'bytes':size,'mimeType':response.headers.get('Content-Type'),'contentDisposition':response.headers.get('Content-Disposition'),'sha256':sha.hexdigest(),'anonymousDownload':True,'matchesOriginal':size==local.stat().st_size and sha.hexdigest()==expected_hash}
assert report['matchesOriginal'],'Public download did not match the original'
print(json.dumps(report,indent=2))
