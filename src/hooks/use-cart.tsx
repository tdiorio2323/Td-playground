"use client"
import { createContext, useContext, useEffect, useMemo, useState } from "react"
import type { Product } from "../lib/types"
type CartItem = Product & { qty:number }
type CartCtx = { items:CartItem[]; add:(p:Product,qty?:number)=>void; remove:(id:string)=>void; clear:()=>void; total:number }
const Ctx = createContext<CartCtx|null>(null)
export function CartProvider({children}:{children:React.ReactNode}){
  const [items,setItems]=useState<CartItem[]>([])
  useEffect(()=>{ const raw=localStorage.getItem("cart"); if(raw) setItems(JSON.parse(raw)) },[])
  useEffect(()=>{ localStorage.setItem("cart", JSON.stringify(items)) },[items])
  const api = useMemo<CartCtx>(()=>({
    items,
    add:(p,qty=1)=>setItems(prev=>{ const i=prev.findIndex(x=>x.id===p.id); if(i>=0){const c=[...prev]; c[i]={...c[i],qty:c[i].qty+qty}; return c} return [...prev,{...p,qty}] }),
    remove:(id)=>setItems(prev=>prev.filter(x=>x.id!==id)),
    clear:()=>setItems([]),
    total:items.reduce((s,i)=>s+i.price*i.qty,0),
  }),[items])
  return <Ctx.Provider value={api}>{children}</Ctx.Provider>
}
export function useCart(){ const ctx = useContext(Ctx); if(!ctx) throw new Error("CartContext missing"); return ctx }