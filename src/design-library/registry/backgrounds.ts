export interface BackgroundDefinition {
  name: string;
  category: string;
  tailwindClass: string;
  cssCode: string;
  description: string;
}

export const backgrounds: BackgroundDefinition[] = [
  {
    name: "Glassmorphism White",
    category: "Glassmorphism",
    tailwindClass: "bg-white/10 backdrop-blur-md border-2 border-white/20",
    cssCode: `background: rgba(255, 255, 255, 0.1);
backdrop-filter: blur(12px);
border: 2px solid rgba(255, 255, 255, 0.2);`,
    description: "Frosted glass effect with white tint",
  },
  {
    name: "Glassmorphism Gradient",
    category: "Glassmorphism",
    tailwindClass:
      "bg-gradient-to-br from-white/15 via-white/10 to-white/15 backdrop-blur-md border-2 border-white/30",
    cssCode: `background: linear-gradient(to bottom right, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.15));
backdrop-filter: blur(12px);
border: 2px solid rgba(255, 255, 255, 0.3);`,
    description: "Gradient frosted glass with enhanced borders",
  },
  {
    name: "Purple to Pink",
    category: "Gradients",
    tailwindClass: "bg-gradient-to-r from-purple-500 to-pink-500",
    cssCode: `background: linear-gradient(to right, rgb(168, 85, 247), rgb(236, 72, 153));`,
    description: "Vibrant purple to pink gradient",
  },
  {
    name: "Blue to Cyan",
    category: "Gradients",
    tailwindClass: "bg-gradient-to-r from-blue-500 to-cyan-500",
    cssCode: `background: linear-gradient(to right, rgb(59, 130, 246), rgb(6, 182, 212));`,
    description: "Cool blue to cyan gradient",
  },
  {
    name: "Emerald to Teal",
    category: "Gradients",
    tailwindClass: "bg-gradient-to-r from-emerald-500 to-teal-500",
    cssCode: `background: linear-gradient(to right, rgb(16, 185, 129), rgb(20, 184, 166));`,
    description: "Fresh emerald to teal gradient",
  },
  {
    name: "Gold Chrome",
    category: "Chrome Effects",
    tailwindClass:
      "bg-gradient-to-br from-[#d9b24a] via-[#b58b32] to-[#6a4d1f] border border-[#f2d68e]/40",
    cssCode: `background: linear-gradient(to bottom right, #d9b24a, #b58b32, #6a4d1f);
border: 1px solid rgba(242, 214, 142, 0.4);`,
    description: "Metallic gold chrome effect",
  },
  {
    name: "Silver Chrome",
    category: "Chrome Effects",
    tailwindClass: "bg-gradient-to-b from-white via-white to-gray-200 border-none",
    cssCode: `background: linear-gradient(to bottom, white, white, rgb(229, 231, 235));`,
    description: "Polished silver chrome",
  },
  {
    name: "Black Marble",
    category: "Textures",
    tailwindClass: "bg-[url('/lovable-uploads/td-studios-black-marble.webp')] bg-cover bg-center",
    cssCode: `background-image: url('/lovable-uploads/td-studios-black-marble.webp');
background-size: cover;
background-position: center;`,
    description: "Black marble texture background",
  },
];
