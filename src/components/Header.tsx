"use client"
import Link from "next/link"
import { ShoppingCart, Menu } from "lucide-react"
import { useState } from "react"
import { useCart } from "@/hooks/use-cart"
const links=[{href:"/",label:"Home"},{href:"/mens",label:"Mens"},{href:"/womens",label:"Womens"},{href:"/accessories",label:"Accessories"},{href:"/collections",label:"Collections"},{href:"/community",label:"Community"},{href:"/blog",label:"Blog"},{href:"/contact",label:"Contact"},{href:"/about-us",label:"About"}]
export default function Header({onCart}:{onCart:()=>void}){
  const [open,setOpen]=useState(false); const {items}=useCart(); const count=items.reduce((s,i)=>s+i.qty,0)
  return (<header className="sticky top-0 z-40 border-b border-neutral-800 bg-neutral-950/70 backdrop-blur">
    <div className="container flex h-16 items-center justify-between">
      <div className="flex items-center gap-3">
        <button className="md:hidden btn" onClick={()=>setOpen(v=>!v)} aria-label="Toggle Menu"><Menu size={18}/></button>
        <Link href="/" className="font-semibold tracking-wide">Ecom Wireframe</Link>
      </div>
      <nav className="hidden md:flex gap-6">{links.map(l=><Link key={l.href} className="navlink text-sm" href={l.href}>{l.label}</Link>)}</nav>
      <button onClick={onCart} className="btn relative" aria-label="Open Cart"><ShoppingCart size={18}/><span className="badge absolute -right-2 -top-2 bg-neutral-900">{count}</span></button>
    </div>
    {open && (<div className="md:hidden border-t border-neutral-800"><div className="container py-3 flex flex-wrap gap-4">{links.map(l=><Link key={l.href} className="navlink text-sm" href={l.href}>{l.label}</Link>)}</div></div>)}
  </header>)
}