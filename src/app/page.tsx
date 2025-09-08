import ProductGrid from "@/components/ProductGrid"
import Link from "next/link"

export default function Page(){
  return (
    <div className="space-y-10">
      <section className="card">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-semibold">Clean wireframe. Ready to brand.</h1>
            <p className="text-neutral-400">Next.js + Firebase scaffold. Swap copy. Connect Firestore when ready.</p>
            <div className="flex gap-3">
              <Link className="btn" href="/collections">Shop Collections</Link>
              <Link className="btn" href="/about-us">About Us</Link>
            </div>
          </div>
          <div className="aspect-video wire rounded-2xl bg-neutral-900 flex items-center justify-center text-neutral-500">Hero Image</div>
        </div>
      </section>
      <section className="space-y-4">
        <div className="flex items-center justify-between"><h2 className="text-xl font-semibold">Featured</h2><Link className="navlink text-sm" href="/collections">View all</Link></div>
        <ProductGrid collection="featured" />
      </section>
    </div>
  )
}