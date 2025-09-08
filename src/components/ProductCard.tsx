"use client"
import Image from "next/image"; import type { Product } from "../lib/types"; import { useCart } from "../hooks/use-cart"
export default function ProductCard({p}:{p:Product}){
  const { add } = useCart()
  return (<div className="card flex flex-col gap-3">
    <div className="relative aspect-square wire overflow-hidden rounded-xl">
      <Image src={p.image} alt={p.title} fill sizes="(min-width:768px) 25vw, 50vw" className="object-cover"/>
    </div>
    <div className="flex items-start justify-between gap-2">
      <div><h3 className="font-medium">{p.title}</h3><p className="text-sm text-neutral-400">${p.price.toFixed(2)}</p></div>
      <button onClick={()=>add(p,1)} className="btn">Add</button>
    </div>
  </div>)
}