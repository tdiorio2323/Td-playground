"use client";
import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function UploadHandler() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setMessage("Select a file first.");
      return;
    }

    setUploading(true);
    const { data, error } = await supabase.storage
      .from("creative-assets")
      .upload(`uploads/${file.name}`, file);

    setUploading(false);
    if (error) {
      console.error(error);
      setMessage("Upload failed: " + error.message);
    } else {
      console.log("File uploaded:", data);
      setMessage("✅ Upload successful!");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button
        onClick={handleUpload}
        disabled={uploading}
        style={{
          marginTop: "1rem",
          padding: "0.75rem 1.5rem",
          background: "#5c6bf7",
          color: "white",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
      <p>{message}</p>
    </div>
  );
}
