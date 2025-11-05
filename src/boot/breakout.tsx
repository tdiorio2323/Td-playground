import React from "react";
import { createRoot } from "react-dom/client";
import Breakout from "@/components/Breakout";

function mount() {
  const el = document.getElementById("breakout-slot");
  if (!el) return;
  // avoid double-mount
  // @ts-expect-error simple guard to prevent double-mounting
  if (el.__mounted) return; // simple guard
  // @ts-expect-error simple guard to prevent double-mounting
  el.__mounted = true;
  const root = createRoot(el);
  root.render(<Breakout />);
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mount);
} else {
  mount();
}
