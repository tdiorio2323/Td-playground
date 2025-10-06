#!/usr/bin/env node
/**
 * AI Command Bridge
 * Enables AI assistants to trigger local Design Library commands via a unified prefix.
 */
import { execSync } from "child_process";

const cmd = process.argv.slice(2).join(" ");
if (!cmd) {
  console.log("Usage: node tools/ai-bridge.js <command>");
  console.log("\nAvailable commands:");
  console.log("  pnpm ai ---dl open       Open Design Library in browser");
  console.log("  pnpm ai ---dl sync       Sync Design Library with registry");
  console.log("  pnpm ai ---dl export     Export Design Library assets");
  console.log("  pnpm ai ---dl version    Display Design Library version");
  console.log("  pnpm ai ---dl            Launch Design Library CLI menu");
  process.exit(0);
}

try {
  if (cmd.startsWith("---dl")) {
    const action = cmd.replace("---dl", "").trim();
    console.log(`🤖 Running Design Library action: ${action || "menu"}`);
    execSync(`pnpm lib ${action}`, { stdio: "inherit" });
  } else {
    console.log("Unrecognized prefix. Use ---dl <command>");
    console.log("Example: pnpm ai ---dl open");
  }
} catch (err) {
  console.error("Bridge Error:", err.message);
  process.exit(1);
}
