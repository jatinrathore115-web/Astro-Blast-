import {C} from '../config.js';
const colors=['#ffffff','#cfe6ff','#e6c9ff','#ffe9b0'];
export class Starfield{
  constructor(rng){this.rng=rng;this.layers=[];[[140,.6,1.2,1.5,3,.35],[90,1.2,2,3,7,.6],[40,2,3.2,6,14,.9]].forEach((d,li)=>{const a=[];for(let i=0;i<d[0];i++)a.push({x:rng()*C.W,y:rng()*C.H,r:d[1]+rng()*(d[2]-d[1]),vx:d[3],vy:d[4],base:d[5],phase:rng()*6.28,speed:.4+rng()*1.2,c:colors[(rng()*4)|0],flare:li===2&&rng()<.08});this.layers.push(a)});}
  update(dt){for(const l of this.layers)for(const s of l){s.x+=s.vx*dt;s.y+=s.vy*dt;if(s.y>C.H){s.y=0;s.x=this.rng()*C.W}if(s.x>C.W)s.x=0}}
  draw(x,t){x.save();x.globalCompositeOperation='lighter';for(const l of this.layers)for(const s of l){x.globalAlpha=s.base*(.65+.35*Math.sin(t*s.speed+s.phase));x.fillStyle=s.c;x.beginPath();x.arc(s.x,s.y,s.r,0,7);x.fill();if(s.flare){x.strokeStyle=s.c;x.lineWidth=.7;x.beginPath();x.moveTo(s.x-12,s.y);x.lineTo(s.x+12,s.y);x.moveTo(s.x,s.y-12);x.lineTo(s.x,s.y+12);x.stroke()}}x.restore()}
}
