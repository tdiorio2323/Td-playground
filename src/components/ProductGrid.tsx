"use client"
import ProductCard from "./ProductCard"; import { useProducts } from "../hooks/use-products"
export default function ProductGrid({category,collection}:{category?:string; collection?:string}){
  const {items,loading}=useProducts(category,collection)
  if(loading) return <p className="text-neutral-400">Loading...</p>
  if(!items.length) return <p className="text-neutral-400">No products.</p>
  return (<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {items.map(p=><ProductCard key={p.id} p={p}/>)}
  </div>)
}