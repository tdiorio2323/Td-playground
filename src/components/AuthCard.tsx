import React from "react";

export default function AuthCard() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-900 via-black to-neutral-950 p-6">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl p-6">
        <h2 className="text-2xl font-semibold text-white text-center">Welcome Back</h2>
        <p className="text-sm text-neutral-400 text-center mt-1">Sign in to your account</p>
        <div className="mt-6 space-y-3">
          <input className="w-full rounded-lg bg-white/10 border border-white/10 px-3 py-2 text-white placeholder-neutral-400 outline-none focus:ring focus:ring-white/20" placeholder="Email" />
          <input className="w-full rounded-lg bg-white/10 border border-white/10 px-3 py-2 text-white placeholder-neutral-400 outline-none focus:ring focus:ring-white/20" placeholder="Password" type="password" />
        </div>
        <button className="mt-5 w-full rounded-lg bg-white text-black py-2 font-medium hover:bg-neutral-200 transition">
          Sign In
        </button>
        <p className="mt-3 text-center text-sm text-neutral-500">
          Don't have an account? <span className="text-white underline cursor-pointer">Sign up</span>
        </p>
      </div>
    </div>
  );
}
