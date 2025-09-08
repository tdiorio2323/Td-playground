export default function Page(){ return (<div className="grid md:grid-cols-2 gap-6">
  <div className="card space-y-3"><h1 className="text-2xl font-semibold">Community</h1><p className="text-neutral-400">Plug Telegram, Discord, or email list.</p><div className="flex gap-3"><a className="btn" href="#">Join Telegram</a><a className="btn" href="#">Discord</a></div></div>
  <div className="aspect-video wire rounded-2xl bg-neutral-900 flex items-center justify-center text-neutral-500">Community Image</div>
</div>) }