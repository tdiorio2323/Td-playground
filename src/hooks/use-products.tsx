"use client"
import { useEffect, useState } from "react"
import type { Product } from "../lib/types"
import productsJson from "@/data/products.json"
import { collection, getDocs } from "firebase/firestore"
import { getDb } from "../lib/firebase"

export function useProducts(category?: string, collectionTag?: string){
  const [items,setItems]=useState<Product[]>([])
  const [loading,setLoading]=useState(true)
  useEffect(()=>{(async()=>{
    try{
      const useFb = process.env.NEXT_PUBLIC_USE_FIREBASE==="true"
      if(useFb){
        const db = getDb()
        if(db){
          const snap = await getDocs(collection(db,"products"))
          setItems(snap.docs.map(d=>d.data() as Product))
        } else setItems(productsJson)
      } else setItems(productsJson)
    }catch{ setItems(productsJson) } finally{ setLoading(false) }
  })()},[])
  const filtered = items.filter(p=>{
    const okCat = category? p.category===category : true
    const okCol = collectionTag? (p.collections||[]).includes(collectionTag as any) : true
    return okCat && okCol
  })
  return { items: filtered, loading }
}