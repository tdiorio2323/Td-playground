"use client"
import { useCart } from "../hooks/use-cart"
export default function CartDrawer({open,onClose}:{open:boolean; onClose:()=>void}){
  const {items,remove,total,clear}=useCart()
  return (<div className={"fixed inset-y-0 right-0 w-full max-w-md bg-neutral-950 border-l border-neutral-800 transform transition-transform "+(open?"translate-x-0":"translate-x-full")}>
    <div className="p-4 border-b border-neutral-800 flex items-center justify-between"><h2 className="text-lg font-semibold">Cart</h2><button className="btn" onClick={onClose}>Close</button></div>
    <div className="p-4 flex flex-col gap-3">
      {items.length===0 && <p className="text-neutral-400">Cart is empty.</p>}
      {items.map(i=>(<div key={i.id} className="flex items-center justify-between card">
        <div><p className="font-medium">{i.title}</p><p className="text-sm text-neutral-400">Qty {i.qty} • ${(i.price*i.qty).toFixed(2)}</p></div>
        <button className="btn" onClick={()=>remove(i.id)}>Remove</button>
      </div>))}
    </div>
    <div className="p-4 border-t border-neutral-800 mt-auto">
      <div className="flex items-center justify-between mb-3"><span className="text-neutral-400">Total</span><span className="text-lg font-semibold">${total.toFixed(2)}</span></div>
      <button className="btn w-full">Checkout</button>
      <button className="btn w-full mt-2" onClick={clear}>Clear</button>
    </div>
  </div>)
}