"use client";
import React, { useEffect, useRef, useState } from "react";

export default function Breakout({ w=300, h=200 }:{w?:number;h?:number}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>();
  const playing = useRef(false);
  const [countdown,setCountdown]=useState(5);
  const [score,setScore]=useState(0);
  const [state,setState]=useState<"waiting"|"countdown"|"playing"|"gameOver"|"won">("waiting");

  // auto 5s countdown on mobile
  useEffect(()=>{ const mobile = matchMedia("(pointer: coarse)").matches || window.innerWidth<768;
    if(mobile) start(); },[]);
  function start(){
    setScore(0); setCountdown(5); setState("countdown"); playing.current=false;
    const id=setInterval(()=>setCountdown(c=>{ if(c<=1){clearInterval(id); setState("playing"); playing.current=true; return 0;} return c-1; }),1000);
  }

  useEffect(()=>{
    const c=canvasRef.current; if(!c) return;
    const ctx=c.getContext("2d")!;
    const DPR=Math.max(1,Math.floor(window.devicePixelRatio||1));
    c.width=w*DPR; c.height=h*DPR; c.style.width=w+"px"; c.style.height=h+"px"; ctx.setTransform(DPR,0,0,DPR,0,0);

    const paddle={ x:w/2-25, w:50, h:8 }, ball={ x:w/2, y:h-50, dx:3, dy:-3, r:4 };
    const bricks: {x:number;y:number;w:number;h:number;hit:boolean}[]=[];
    const cols=8, rows=4, bw=w/cols-2, bh=15;
    for(let r=0;r<rows;r++)for(let cix=0;cix<cols;cix++) bricks.push({x:cix*(bw+2)+1,y:r*(bh+2)+30,w:bw,h:bh,hit:false});

    const py=h-paddle.h-10;

    const draw=()=>{
      ctx.fillStyle="rgba(0,0,0,0.1)"; ctx.fillRect(0,0,w,h);

      // bricks (always show)
      for(const b of bricks){ if(!b.hit){ ctx.fillStyle=`hsl(${((b.x+b.y)*2)%360},70%,60%)`; ctx.fillRect(b.x,b.y,b.w,b.h);} }

      // ball + paddle (always show)
      ctx.fillStyle="#fff"; ctx.beginPath(); ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI*2); ctx.fill();
      ctx.fillRect(paddle.x, py, paddle.w, paddle.h);

      // overlays
      if(state==="waiting"){
        ctx.fillStyle="rgba(0,0,0,0.7)"; ctx.fillRect(0,0,w,h);
        ctx.fillStyle="#fff"; ctx.textAlign="center"; ctx.font="16px monospace";
        ctx.fillText("Tap to Start", w/2, h/2-10); ctx.fillText("Breakout Game", w/2, h/2+10);
      }
      if(state==="countdown"){
        ctx.fillStyle="rgba(0,0,0,0.5)"; ctx.fillRect(0,0,w,h);
        ctx.fillStyle="#ff0000"; ctx.textAlign="center"; ctx.font="bold 64px monospace";
        ctx.fillText(String(countdown), w/2, h/2);
        ctx.fillStyle="#fff"; ctx.font="14px monospace"; ctx.fillText("Touch & drag paddle to move", w/2, h/2+40);
      }

      if(playing.current && state==="playing"){
        ball.x+=ball.dx; ball.y+=ball.dy;
        if(ball.x<=ball.r||ball.x>=w-ball.r) ball.dx*=-1;
        if(ball.y<=ball.r) ball.dy*=-1;

        if(ball.y+ball.r>=py && ball.x>=paddle.x && ball.x<=paddle.x+paddle.w){
          ball.dy = -Math.abs(ball.dy);
          const hit=(ball.x-paddle.x)/paddle.w; ball.dx=(hit-0.5)*6; ball.y=py-ball.r-0.5;
        }
        for(const b of bricks){
          if(b.hit) continue;
          if(ball.x>b.x && ball.x<b.x+b.w && ball.y>b.y && ball.y<b.y+b.h){
            b.hit=true; ball.dy*=-1; setScore(s=>s+10); break;
          }
        }
        if(ball.y>h){ playing.current=false; setState("gameOver"); }
        else if(bricks.every(b=>b.hit)){ playing.current=false; setState("won"); }
      }

      ctx.textAlign="left"; ctx.font="14px monospace"; ctx.fillStyle="#fff"; ctx.fillText(`Score: ${score}`,10,20);

      rafRef.current=requestAnimationFrame(draw);
    };
    rafRef.current=requestAnimationFrame(draw);

    // touch/mouse - allow movement during countdown AND playing
    const move=(clientX:number)=>{ const r=c.getBoundingClientRect(); const x=clientX-r.left;
      paddle.x=Math.max(0,Math.min(w-paddle.w,x-paddle.w/2)); };
    const tm=(e:TouchEvent)=>{ if(state!=="countdown" && !playing.current) return; e.preventDefault(); move(e.touches[0].clientX); };
    const mm=(e:MouseEvent)=>{ if(state!=="countdown" && !playing.current) return; move(e.clientX); };
    const ts=()=>{ if(state==="waiting"||state==="gameOver"||state==="won") start(); };

    c.addEventListener("touchstart", ts, {passive:false});
    c.addEventListener("touchmove", tm, {passive:false});
    c.addEventListener("mousemove", mm);
    c.addEventListener("click", ts);

    return ()=>{ if(rafRef.current) cancelAnimationFrame(rafRef.current);
      c.removeEventListener("touchstart", ts); c.removeEventListener("touchmove", tm);
      c.removeEventListener("mousemove", mm); c.removeEventListener("click", ts); };
  },[w,h,state,countdown,score]);

  return <canvas ref={canvasRef} width={w} height={h} className="block touch-none cursor-pointer" />;
}
