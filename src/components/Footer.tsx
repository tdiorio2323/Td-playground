export default function Footer(){
  return (<footer className="mt-12 border-t border-neutral-800">
    <div className="container py-8 text-sm text-neutral-400">
      <div className="flex flex-col md:flex-row gap-2 md:items-center md:justify-between">
        <p>&copy; {new Date().getFullYear()} Ecom Wireframe</p>
        <div className="flex gap-4"><a className="navlink" href="#">Terms</a><a className="navlink" href="#">Privacy</a></div>
      </div>
    </div>
  </footer>)
}