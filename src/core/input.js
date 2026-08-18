import {C} from '../config.js';
const inside=(p,b)=>Math.hypot(p.x-b.x,p.y-b.y)<=b.r+C.HIT_PAD;
export class Input {
  constructor(canvas,viewport,onFire,onMute,onClick,onAim){this.canvas=canvas;this.vp=viewport;this.onFire=onFire;this.onMute=onMute;this.onClick=onClick;this.onAim=onAim;this.left=this.right=false;this.ids=new Map();
    canvas.addEventListener('pointerdown',e=>this.down(e));canvas.addEventListener('pointermove',e=>this.move(e));canvas.addEventListener('pointerup',e=>this.up(e));canvas.addEventListener('pointercancel',e=>this.up(e));canvas.addEventListener('pointerleave',e=>this.up(e));
    addEventListener('keydown',e=>{if(e.code==='ArrowLeft')this.left=true;if(e.code==='ArrowRight')this.right=true;if(e.code==='Space'){e.preventDefault();this.onFire()};if(e.code==='KeyM')this.onMute()});
    addEventListener('keyup',e=>{if(e.code==='ArrowLeft')this.left=false;if(e.code==='ArrowRight')this.right=false});addEventListener('blur',()=>this.clear());
  }
  down(e){const p=this.vp.screenToVirtual(e.clientX,e.clientY),v=this.vp.visible,muteRadius=Math.max(70,52/this.vp.scale);let action='';if(inside(p,C.FIRE)){action='fire';this.onFire();this.onClick()}else if(Math.hypot(p.x-(v.right-muteRadius),p.y-(v.top+muteRadius))<=muteRadius){action='mute';this.onMute();this.onClick()}else{action='aim';this.onAim(p)}if(action){this.ids.set(e.pointerId,action);this.canvas.setPointerCapture?.(e.pointerId);e.preventDefault()}}
  move(e){if(this.ids.get(e.pointerId)==='aim')this.onAim(this.vp.screenToVirtual(e.clientX,e.clientY))}
  up(e){this.ids.delete(e.pointerId)}
  clear(){this.left=this.right=false;this.ids.clear()}
}
