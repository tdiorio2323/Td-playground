import ProductGrid from "@/components/ProductGrid"
export default function Page(){ return (<div className="space-y-6">
  <h1 className="text-2xl font-semibold">Collections</h1>
  <section><h2 className="text-lg font-medium mb-3">Featured</h2><ProductGrid collection="featured"/></section>
  <section><h2 className="text-lg font-medium mb-3">New</h2><ProductGrid collection="new"/></section>
  <section><h2 className="text-lg font-medium mb-3">Sale</h2><ProductGrid collection="sale"/></section>
</div>) }