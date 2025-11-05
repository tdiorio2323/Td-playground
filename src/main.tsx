import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./boot/breakout";
import { AuthProvider } from "@/integrations/supabase/auth";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <App />
  </AuthProvider>,
);
