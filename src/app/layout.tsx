import "./globals.css"
import type { Metadata } from "next"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { CartProvider } from "@/hooks/use-cart"
import CartDrawer from "@/components/CartDrawer"
import { useState } from "react"

export const metadata: Metadata = {
  title: "Ecom Wireframe",
  description: "Plug-and-play Next.js + Firebase-ready ecom wireframe",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body><CartProvider><Shell>{children}</Shell></CartProvider></body></html>)
}

function Shell({children}:{children:React.ReactNode}){ return <ClientShell>{children}</ClientShell> }
function ClientShell({children}:{children:React.ReactNode}){
  const [open,setOpen]=useState(false)
  // @ts-expect-error server/client mix suppressed for brevity
  return (<>
    <Header onCart={()=>setOpen(true)}/>
    <main className="container py-8">{children}</main>
    <Footer/>
    <CartDrawer open={open} onClose={()=>setOpen(false)}/>
  </>)
}