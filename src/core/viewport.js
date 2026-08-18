import {C} from '../config.js';
export class Viewport {
  constructor(canvas){this.canvas=canvas;this.ctx=canvas.getContext('2d',{alpha:false});this.resize=this.resize.bind(this);addEventListener('resize',this.resize);this.resize();}
  resize(){const dpr=Math.min(devicePixelRatio||1,2),w=innerWidth,h=innerHeight;this.scale=Math.max(w/C.W,h/C.H);this.ox=(w-C.W*this.scale)/2;this.oy=(h-C.H*this.scale)/2;this.dpr=dpr;this.canvas.width=Math.round(w*dpr);this.canvas.height=Math.round(h*dpr);}
  begin(shakeX=0,shakeY=0){const x=this.ctx;x.setTransform(this.dpr,0,0,this.dpr,0,0);x.fillStyle='#090415';x.fillRect(0,0,innerWidth,innerHeight);x.setTransform(this.scale*this.dpr,0,0,this.scale*this.dpr,(this.ox+shakeX*this.scale)*this.dpr,(this.oy+shakeY*this.scale)*this.dpr);}
  screenToVirtual(cx,cy){return{x:(cx-this.ox)/this.scale,y:(cy-this.oy)/this.scale};}
}
