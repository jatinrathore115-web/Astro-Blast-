import {C} from '../config.js';

const FULL_BOUNDS={left:0,top:0,right:C.W,bottom:C.H,width:C.W,height:C.H};

export class Fireball {
  constructor(rng){
    this.r=rng;this.alive=false;this.last=-1;this.frame=0;this.age=0;
    this.entered=false;this.chainStarted=false;this.color='normal';
  }

  spawn(edge,color='normal',bounds=FULL_BOUNDS){
    if(edge==null){do edge=(this.r()*3)|0;while(edge===this.last)}
    this.last=edge;
    const b=bounds,m=90,w=b.right-b.left,h=b.bottom-b.top;
    const positions=[
      [b.left+this.r()*w,b.top-m],
      [b.left-m,b.top+this.r()*h*.78],
      [b.right+m,b.top+this.r()*h*.78]
    ];
    const p=positions[edge]||positions[0];
    const tx=C.IMPACT_X+(this.r()-.5)*180,ty=C.IMPACT_Y+(this.r()-.5)*120;
    const dx=tx-p[0],dy=ty-p[1],d=Math.hypot(dx,dy);
    const speed=C.FIREBALL_MIN+this.r()*(C.FIREBALL_MAX-C.FIREBALL_MIN);
    Object.assign(this,{alive:true,x:p[0],y:p[1],vx:dx/d*speed,vy:dy/d*speed,edge,frame:0,age:0,entered:false,chainStarted:false,color});
  }

  update(dt,bounds=FULL_BOUNDS){
    if(!this.alive)return null;
    this.age+=dt;
    const q=Math.min(1,this.age/C.FIREBALL_FADE_IN),ease=q*q*(3-2*q);
    const speed=C.FIREBALL_ENTRY_SPEED+(1-C.FIREBALL_ENTRY_SPEED)*ease;
    this.x+=this.vx*dt*speed;this.y+=this.vy*dt*speed;
    this.frame=(this.frame+dt*C.FIREBALL_ANIMATION_FPS)%36;
    if(this.x>=bounds.left&&this.x<=bounds.right&&this.y>=bounds.top&&this.y<=bounds.bottom)this.entered=true;
    if(Math.hypot(this.x-C.IMPACT_X,this.y-C.IMPACT_Y)<C.IMPACT_RADIUS)return'miss';
    const margin=190;
    if(this.entered&&(this.x<bounds.left-margin||this.x>bounds.right+margin||this.y<bounds.top-margin||this.y>bounds.bottom+margin))return'exit';
    return null;
  }

  draw(x,img){
    if(!this.alive||!img)return;
    const q=Math.min(1,this.age/C.FIREBALL_FADE_IN),ease=q*q*(3-2*q);
    const alpha=ease*ease,scale=C.FIREBALL_ENTRY_SCALE+(1-C.FIREBALL_ENTRY_SCALE)*ease;
    const hue=this.color==='purple'?245:this.color==='pink'?305:this.color==='green'?90:this.color==='neon-green'?72:0;
    const glowColor=this.color==='purple'?'rgba(172,65,255,':this.color==='pink'?'rgba(255,66,175,':this.color==='green'?'rgba(70,255,110,':this.color==='neon-green'?'rgba(135,255,0,':'rgba(255,115,0,';
    x.save();x.globalAlpha=alpha;x.translate(this.x,this.y);
    x.rotate(Math.atan2(this.vy,this.vx)-C.ART_FORWARD_DEG*Math.PI/180);x.scale(scale,scale);
    x.filter=`blur(${(1-ease)*2}px)`;x.globalCompositeOperation='lighter';
    const glow=x.createRadialGradient(0,0,5,0,0,95);glow.addColorStop(0,`${glowColor}${.34*ease})`);glow.addColorStop(1,'transparent');
    x.fillStyle=glow;x.fillRect(-95,-95,190,190);x.globalCompositeOperation='source-over';
    x.filter=`blur(${(1-ease)*2}px) hue-rotate(${hue}deg) saturate(${this.color==='neon-green'?2.1:hue?1.45:1}) brightness(${this.color==='neon-green'?1.3:1})`;
    const fw=480,fh=864,height=C.FIREBALL_DRAW_H,width=height*fw/fh,i=this.frame|0;
    x.drawImage(img,i*fw,0,fw,fh,-width/2,-height/2,width,height);x.restore();
  }
}
