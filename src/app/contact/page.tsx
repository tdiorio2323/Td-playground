export default function Page(){ return (<div className="grid md:grid-cols-2 gap-6">
  <div className="card space-y-4"><h1 className="text-2xl font-semibold">Contact</h1>
    <form className="space-y-3"><input className="w-full p-3 rounded-xl wire bg-transparent" placeholder="Name"/><input className="w-full p-3 rounded-xl wire bg-transparent" placeholder="Email"/><textarea className="w-full p-3 rounded-xl wire bg-transparent" rows={5} placeholder="Message"/><button className="btn">Send</button></form>
  </div>
  <div className="aspect-video wire rounded-2xl bg-neutral-900 flex items-center justify-center text-neutral-500">Map / Image</div>
</div>) }