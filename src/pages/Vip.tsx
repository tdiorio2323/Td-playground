import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import {
  Paintbrush,
  Link as LinkIcon,
  EyeOff,
  Copy,
  Check,
  Upload,
  LayoutTemplate,
  Share2,
  Plus
} from "lucide-react";

const fontOptions = [
  { label: "Inter", value: "'Inter', sans-serif" },
  { label: "Space Grotesk", value: "'Space Grotesk', sans-serif" },
  { label: "Playfair Display", value: "'Playfair Display', serif" },
  { label: "Bricolage Grotesque", value: "'Bricolage Grotesque', sans-serif" },
  { label: "Archivo Black", value: "'Archivo Black', sans-serif" }
];

const socialCatalog = [
  { key: "instagram", label: "Instagram", icon: "IG" },
  { key: "tiktok", label: "TikTok", icon: "TT" },
  { key: "youtube", label: "YouTube", icon: "YT" },
  { key: "x", label: "X / Twitter", icon: "X" },
  { key: "website", label: "Website", icon: "↗" }
];

interface ButtonConfig {
  id: string;
  label: string;
  url: string;
  bg: string;
  text: string;
  font: string;
}

interface SocialConfig {
  key: string;
  url: string;
  enabled: boolean;
}

const createId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2, 9);

const createButton = (): ButtonConfig => ({
  id: createId(),
  label: "New Button",
  url: "https://",
  bg: "#111827",
  text: "#ffffff",
  font: fontOptions[0].value
});

const initialButtons: ButtonConfig[] = [
  { id: createId(), label: "Shop Launch", url: "https://tdstudiosny.com", bg: "#111827", text: "#ffffff", font: fontOptions[0].value },
  { id: createId(), label: "Watch Capsule", url: "https://youtube.com", bg: "#111827", text: "#ffffff", font: fontOptions[0].value }
];

const initialSocials: SocialConfig[] = socialCatalog.map(item => ({ key: item.key, url: "https://", enabled: item.key === "instagram" }));

const Vip = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [cardTitle, setCardTitle] = useState("TD Studios VIP");
  const [subtitle, setSubtitle] = useState("@tdstudiosnyc");
  const [slug, setSlug] = useState("vip-demo");
  const [profileShape, setProfileShape] = useState<"circle" | "rounded">("circle");
  const [profileImage, setProfileImage] = useState("/lovable-uploads/td-studios-black-marble.webp");
  const [backgroundImage, setBackgroundImage] = useState<string | null>("https://cdn.midjourney.com/4a36bb1c-b197-442f-a477-0c357f760cf5/0_0.jpeg");
  const [backgroundColor, setBackgroundColor] = useState("#05050a");
  const [cardColor, setCardColor] = useState("rgba(0,0,0,0.78)");
  const [buttons, setButtons] = useState<ButtonConfig[]>(initialButtons);
  const [socials, setSocials] = useState<SocialConfig[]>(initialSocials);
  const [customRequestUrl, setCustomRequestUrl] = useState("https://tdstudiosny.com/custom");
  const [copied, setCopied] = useState(false);

  const permalink = useMemo(() => {
    const normalized = slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-");
    return `playground.tdstudiosny.com/${normalized || "your-name"}`;
  }, [slug]);

  const previewButtons = buttons.filter(btn => btn.label.trim().length > 0);
  const enabledSocials = socials.filter(s => s.enabled && s.url.trim().length > 0);

  const handleImageUpload = (file: File | null, setter: (value: string) => void) => {
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setter(objectUrl);
  };

  const updateButton = (id: string, field: keyof ButtonConfig, value: string) => {
    setButtons(prev => prev.map(btn => (btn.id === id ? { ...btn, [field]: value } : btn)));
  };

  const updateSocial = (key: string, updates: Partial<SocialConfig>) => {
    setSocials(prev => prev.map(s => (s.key === key ? { ...s, ...updates } : s)));
  };

  const removeButton = (id: string) => {
    setButtons(prev => prev.filter(btn => btn.id !== id));
  };

  const generateSnippet = () => {
    const safeProfile = profileImage.startsWith("blob:") ? "https://placehold.co/160" : profileImage;
    const safeBackground = backgroundImage?.startsWith("blob:") ? "" : backgroundImage;

    const payload = {
      cardTitle,
      subtitle,
      profileShape,
      cardColor,
      backgroundColor,
      profileImage: safeProfile,
      backgroundImage: safeBackground,
      buttons: previewButtons,
      socials: enabledSocials,
      customRequestUrl
    };

    return `import React from "react";

const config = ${JSON.stringify(payload, null, 2)};

export const VipLinkCard = () => {
  const shapeClass = config.profileShape === "circle" ? "rounded-full" : "rounded-3xl";
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: config.backgroundColor,
        backgroundImage: config.backgroundImage ? \`url(\${config.backgroundImage})\` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem"
      }}
    >
      <div
        style={{
          maxWidth: "360px",
          width: "100%",
          borderRadius: "32px",
          padding: "2rem",
          background: config.cardColor,
          color: "white",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.12)"
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ width: "112px", height: "112px", margin: "0 auto" }} className={shapeClass}>
            <img src={config.profileImage} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "inherit" }} />
          </div>
          <h2 style={{ marginTop: "1.5rem", fontSize: "1.75rem", fontWeight: 700 }}>{config.cardTitle}</h2>
          <p style={{ color: "rgba(255,255,255,0.65)", marginTop: "0.25rem" }}>{config.subtitle}</p>
        </div>
        <div style={{ marginTop: "1.5rem", display: "grid", gap: "0.75rem" }}>
          {config.buttons.map(btn => (
            <a
              key={btn.id}
              href={btn.url}
              target="_blank"
              rel="noreferrer"
              style={{
                background: btn.bg,
                color: btn.text,
                borderRadius: "999px",
                padding: "0.85rem 1.25rem",
                textAlign: "center",
                fontFamily: btn.font,
                textDecoration: "none",
                fontWeight: 600
              }}
            >
              {btn.label}
            </a>
          ))}
        </div>
        {config.socials.length > 0 && (
          <div style={{ display: "flex", justifyContent: "center", gap: "0.85rem", marginTop: "1.5rem" }}>
            {config.socials.map(social => (
              <a key={social.key} href={social.url} target="_blank" rel="noreferrer" style={{ color: "white", fontSize: "0.85rem", opacity: 0.85 }}>
                {social.key}
              </a>
            ))}
          </div>
        )}
        <a
          href={config.customRequestUrl}
          target="_blank"
          rel="noreferrer"
          style={{
            marginTop: "1.5rem",
            display: "block",
            textAlign: "center",
            borderRadius: "999px",
            padding: "0.85rem 1.25rem",
            fontWeight: 600,
            textDecoration: "none",
            background: "linear-gradient(135deg, #7F5FFF, #B54CFF)",
            color: "white"
          }}
        >
          Custom Request
        </a>
      </div>
    </div>
  );
};
`;
  };

  const handleCopySnippet = async () => {
    try {
      await navigator.clipboard.writeText(generateSnippet());
      setCopied(true);
      toast({ title: "Snippet copied", description: "Paste into any React project and wire your own data sources." });
      setTimeout(() => setCopied(false), 2500);
    } catch (error) {
      console.error(error);
      toast({ title: "Unable to copy", variant: "destructive" });
    }
  };

  const profileShapeOptions = [
    { value: "circle", label: "Circle" },
    { value: "rounded", label: "Rounded" }
  ];

  const builderBackground = {
    backgroundColor,
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
    backgroundSize: "cover",
    backgroundPosition: "center"
  } as const;

  return (
    <div className="min-h-screen bg-[#03030a] text-white">
      <div className="mx-auto max-w-6xl px-4 py-10 lg:py-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between mb-8 text-white">
          <div>
            <p className="uppercase text-xs tracking-[0.3em] text-white/60">VIP Link Builder</p>
            <h1 className="text-4xl font-bold mt-2">Link-in-Bio composer</h1>
            <p className="text-white/60 mt-2 max-w-2xl">
              Configure profile art, buttons, social embeds, and custom backgrounds in a mobile-focused preview.
              Copy the generated snippet and wire any backend later.
            </p>
          </div>
          <Button onClick={() => navigate("/library")} variant="outline" className="text-white border-white/30">
            Browse Library
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,420px)_1fr]">
          <div className="space-y-6">
            <Card className="bg-white/5 border-white/15">
              <CardHeader className="flex flex-row items-center gap-3">
                <Paintbrush className="h-5 w-5 text-purple-300" />
                <div>
                  <CardTitle className="text-lg">Branding</CardTitle>
                  <p className="text-xs text-white/60">Hero details + background</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" value={cardTitle} onChange={e => setCardTitle(e.target.value)} className="mt-1 bg-white/10 border-white/20" />
                </div>
                <div>
                  <Label htmlFor="subtitle">Username</Label>
                  <Input id="subtitle" value={subtitle} onChange={e => setSubtitle(e.target.value)} className="mt-1 bg-white/10 border-white/20" />
                </div>
                <div>
                  <Label htmlFor="slug">Custom link</Label>
                  <Input id="slug" value={slug} onChange={e => setSlug(e.target.value)} className="mt-1 bg-white/10 border-white/20" />
                  <p className="text-xs text-white/50 mt-1">{permalink}</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <Label>Background color</Label>
                    <Input type="color" value={backgroundColor} onChange={e => setBackgroundColor(e.target.value)} className="mt-1 h-10" />
                  </div>
                  <div>
                    <Label>Card fill</Label>
                    <Input type="text" value={cardColor} onChange={e => setCardColor(e.target.value)} className="mt-1 bg-white/10 border-white/20" />
                    <p className="text-[11px] text-white/40 mt-1">Supports rgba or hex.</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Background upload</Label>
                  <Button
                    variant="outline"
                    className="bg-white/5 border-white/20"
                    onClick={() => document.getElementById("background-upload")?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" /> Upload artwork
                  </Button>
                  <input
                    id="background-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={e => handleImageUpload(e.target.files?.[0] || null, value => setBackgroundImage(value))}
                  />
                  {backgroundImage && (
                    <Button variant="ghost" className="text-xs text-red-300 px-0" onClick={() => setBackgroundImage(null)}>
                      Remove background
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/15">
              <CardHeader className="flex flex-row items-center gap-3">
                <LayoutTemplate className="h-5 w-5 text-purple-300" />
                <div>
                  <CardTitle className="text-lg">Profile</CardTitle>
                  <p className="text-xs text-white/60">Avatar + layout</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Profile shape</Label>
                  <Select value={profileShape} onValueChange={value => setProfileShape(value as "circle" | "rounded")}>
                    <SelectTrigger className="mt-1 bg-white/5 border-white/20">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#111] text-white border-white/10">
                      {profileShapeOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Profile image</Label>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      className="bg-white/5 border-white/20"
                      onClick={() => document.getElementById("profile-upload")?.click()}
                    >
                      <Upload className="h-4 w-4 mr-2" /> Upload
                    </Button>
                    <Button variant="ghost" className="text-sm text-white/60" onClick={() => setProfileImage("/lovable-uploads/td-studios-black-marble.webp")}>Reset</Button>
                  </div>
                  <input
                    id="profile-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={e => handleImageUpload(e.target.files?.[0] || null, value => setProfileImage(value))}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/15">
              <CardHeader className="flex flex-row items-center gap-3">
                <LinkIcon className="h-5 w-5 text-purple-300" />
                <div>
                  <CardTitle className="text-lg">Buttons</CardTitle>
                  <p className="text-xs text-white/60">Link tiles + style</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {buttons.map(button => (
                  <div key={button.id} className="rounded-xl border border-white/10 p-4 space-y-3 bg-white/5">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm text-white/70">{button.label || "Button"}</Label>
                      <Button variant="ghost" size="icon" onClick={() => removeButton(button.id)}>
                        <EyeOff className="h-4 w-4 text-white/40" />
                      </Button>
                    </div>
                    <Input
                      value={button.label}
                      onChange={e => updateButton(button.id, "label", e.target.value)}
                      placeholder="Button text"
                      className="bg-white/10 border-white/20"
                    />
                    <Input
                      value={button.url}
                      onChange={e => updateButton(button.id, "url", e.target.value)}
                      placeholder="https://"
                      className="bg-white/10 border-white/20"
                    />
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <Label className="text-xs">Background</Label>
                        <Input type="color" value={button.bg} onChange={e => updateButton(button.id, "bg", e.target.value)} className="mt-1 h-10" />
                      </div>
                      <div>
                        <Label className="text-xs">Text</Label>
                        <Input type="color" value={button.text} onChange={e => updateButton(button.id, "text", e.target.value)} className="mt-1 h-10" />
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs">Font</Label>
                      <Select value={button.font} onValueChange={value => updateButton(button.id, "font", value)}>
                        <SelectTrigger className="mt-1 bg-white/5 border-white/20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#111] text-white border-white/10">
                          {fontOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-dashed border-white/30 text-white"
                  onClick={() => setButtons(prev => [...prev, createButton()])}
                >
                  <Plus className="h-4 w-4 mr-2" /> Add button
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/15">
              <CardHeader className="flex flex-row items-center gap-3">
                <Share2 className="h-5 w-5 text-purple-300" />
                <div>
                  <CardTitle className="text-lg">Social + Request</CardTitle>
                  <p className="text-xs text-white/60">Embeds & CTA</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {socialCatalog.map(item => {
                    const social = socials.find(s => s.key === item.key)!;
                    return (
                      <div key={item.key} className="flex items-center gap-3 border border-white/10 rounded-lg px-3 py-2">
                        <Switch
                          checked={social.enabled}
                          onCheckedChange={checked => updateSocial(item.key, { enabled: checked })}
                        />
                        <div className="flex-1">
                          <Label className="text-sm text-white/70">{item.label}</Label>
                          <Input
                            value={social.url}
                            onChange={e => updateSocial(item.key, { url: e.target.value })}
                            placeholder="https://"
                            className="mt-1 bg-white/10 border-white/20"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div>
                  <Label>Custom request URL</Label>
                  <Input
                    value={customRequestUrl}
                    onChange={e => setCustomRequestUrl(e.target.value)}
                    placeholder="https://"
                    className="mt-1 bg-white/10 border-white/20"
                  />
                </div>
                <div>
                  <Label>Notes</Label>
                  <Textarea className="bg-white/10 border-white/20" placeholder="Optional production notes for teammates" />
                </div>
                <Button
                  onClick={handleCopySnippet}
                  className="w-full bg-white/10 border border-white/30 text-white hover:bg-white/20"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 mr-2" /> Snippet copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" /> Copy React snippet
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="lg:sticky lg:top-10">
            <div className="flex flex-col gap-4" style={builderBackground}>
              <div className="rounded-[40px] border border-white/15 bg-black/50 p-6 max-w-sm mx-auto w-full backdrop-blur-xl">
                <div className="flex justify-end">
                  <span className="text-[11px] uppercase tracking-[0.3em] text-white/60">Preview</span>
                </div>
                <div className="mt-4 flex justify-center">
                  <div
                    className={`${profileShape === "circle" ? "rounded-full" : "rounded-3xl"} w-28 h-28 overflow-hidden border-2 border-white/20`}
                  >
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="text-center mt-6 space-y-1">
                  <p className="text-2xl font-semibold">{cardTitle || "Title"}</p>
                  <p className="text-white/60">{subtitle || "@username"}</p>
                  <p className="text-xs text-white/40">{permalink}</p>
                </div>
                <div className="mt-6 space-y-3">
                  {previewButtons.map(button => (
                    <a
                      key={button.id}
                      href={button.url}
                      target="_blank"
                      rel="noreferrer"
                      className="block rounded-full px-4 py-3 text-center font-semibold"
                      style={{ background: button.bg, color: button.text, fontFamily: button.font }}
                    >
                      {button.label || "Button"}
                    </a>
                  ))}
                </div>
                {enabledSocials.length > 0 && (
                  <div className="flex justify-center gap-4 mt-6">
                    {enabledSocials.map(social => {
                      const meta = socialCatalog.find(item => item.key === social.key);
                      return (
                        <a key={social.key} href={social.url} target="_blank" rel="noreferrer" className="text-white/70 text-sm">
                          {meta?.icon}
                        </a>
                      );
                    })}
                  </div>
                )}
                <a
                  href={customRequestUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 block rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 text-center font-semibold py-3"
                >
                  Custom Request
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vip;
