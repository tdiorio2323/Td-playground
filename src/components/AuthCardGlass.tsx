"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Send, DollarSign } from "lucide-react";

export default function AuthCardGlass() {
  const [pin, setPin] = useState("");

  function handlePadClick(e: React.MouseEvent) {
    const t = e.target as HTMLElement;
    const digit = t.closest<HTMLElement>("[data-digit]")?.getAttribute("data-digit");
    const action = t.closest<HTMLElement>("[data-action]")?.getAttribute("data-action");

    if (digit) setPin((p) => (p + digit).slice(0, 6));
    else if (action === "backspace") setPin((p) => p.slice(0, -1));
    else if (action === "clear") setPin("");
  }

  return (
    <div
      className="mx-auto max-w-sm rounded-2xl bg-black/30 backdrop-blur-xl border-2 border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.05),0_12px_40px_rgba(0,0,0,0.45)] relative overflow-hidden p-8"
    >
      {/* Column layout to keep groups evenly spaced & centered */}
      <div className="flex flex-col items-center text-center gap-6">
        {/* Top group: Logo, Welcome, Contact icons */}
        <div className="flex flex-col items-center gap-4">
          {/* Logo */}
          <img
            src="/td-logo-chrome.png"
            alt="TD Studios"
            className="h-16 sm:h-20 object-contain drop-shadow-[0_2px_8px_rgba(255,255,255,.2)]"
          />

          <h2 className="text-xl sm:text-2xl font-semibold tracking-wide text-white/90">
            WELCOME BACK
          </h2>

          {/* Icon row */}
          <div className="flex items-center justify-center gap-6 text-white/80">
            <Mail className="h-6 w-6 hover:text-white cursor-pointer" />
            <Phone className="h-6 w-6 hover:text-white cursor-pointer" />
            <Send className="h-6 w-6 hover:text-white cursor-pointer" />
            <DollarSign className="h-6 w-6 hover:text-white cursor-pointer" />
          </div>
        </div>

        {/* PIN dots */}
        <div className="flex justify-center gap-2 my-2" aria-label="PIN progress">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className={`h-3 w-3 rounded-full transition-all ${
                i < pin.length ? "bg-white/90" : "bg-white/25"
              }`}
            />
          ))}
        </div>

        {/* Keypad group */}
        <div className="w-full">
          <div className="grid grid-cols-3 gap-4 mb-10" onClick={handlePadClick}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
              <motion.button
                key={n}
                whileTap={{ scale: 0.94 }}
                className="rounded-full aspect-square flex items-center justify-center text-xl font-semibold text-white/90 bg-white/10 border border-white/15 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,.15)] hover:bg-white/15 focus:outline-none focus:ring-4 focus:ring-white/20"
                data-digit={n}
              >
                {n}
              </motion.button>
            ))}

            <motion.button
              whileTap={{ scale: 0.94 }}
              className="rounded-full aspect-square flex items-center justify-center text-xl font-semibold text-red-100 bg-red-500/25 border border-red-400/30 hover:bg-red-500/35"
              data-action="backspace"
            >
              ⌫
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.94 }}
              className="rounded-full aspect-square flex items-center justify-center text-xl font-semibold text-white/90 bg-white/10 border border-white/15 hover:bg-white/15"
              data-digit="0"
            >
              0
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.94 }}
              className="rounded-full aspect-square flex items-center justify-center text-xl font-semibold text-black bg-emerald-400 hover:opacity-95"
              data-action="clear"
            >
              C
            </motion.button>
          </div>
        </div>

        {/* Footer link — spaced far from keypad */}
        <div className="mt-2 text-center">
          <a
            href="https://www.tdstudiosny.com"
            className="text-sm font-[Bebas Neue] tracking-[0.32em] text-white/70 hover:text-white"
          >
            WWW.TDSTUDIOSNY.COM
          </a>
        </div>
      </div>
    </div>
  );
}