"""Convert assets/source/fireball.gif into a coalesced horizontal RGBA sprite sheet.
Requires Pillow: python -m pip install Pillow
"""
from pathlib import Path
import json
from PIL import Image, ImageSequence

ROOT=Path(__file__).resolve().parents[1]
src=ROOT/'assets/source/fireball.gif'; out=ROOT/'assets/images/fireball_sheet.png'
im=Image.open(src); frames=[]; durations=[]
for frame in ImageSequence.Iterator(im):
    frames.append(frame.convert('RGBA').copy()); durations.append(frame.info.get('duration',40))
bbox=None
for f in frames:
    b=f.getbbox()
    if b: bbox=b if bbox is None else (min(bbox[0],b[0]),min(bbox[1],b[1]),max(bbox[2],b[2]),max(bbox[3],b[3]))
frames=[f.crop(bbox) for f in frames]; fw,fh=frames[0].size
sheet=Image.new('RGBA',(fw*len(frames),fh));
for i,f in enumerate(frames): sheet.alpha_composite(f,(i*fw,0))
sheet.save(out)
fps=round(1000/(sum(durations)/len(durations)))
(out.with_suffix('.json')).write_text(json.dumps({'frameWidth':fw,'frameHeight':fh,'frameCount':len(frames),'fps':fps,'sheet':out.name},indent=2))
print(f'{len(frames)} frames, {fw}x{fh}, {fps} fps')
