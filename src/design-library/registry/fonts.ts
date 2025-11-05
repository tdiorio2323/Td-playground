export interface FontDefinition {
  name: string;
  family: string;
  googleFontsImport: string;
  tailwindConfig: string;
  cssDeclaration: string;
  weights: number[];
  category: string;
}

export const fonts: FontDefinition[] = [
  {
    name: "Inter",
    family: "'Inter', sans-serif",
    googleFontsImport:
      "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');",
    tailwindConfig: `fontFamily: {
  sans: ['Inter', 'sans-serif'],
}`,
    cssDeclaration: "font-family: 'Inter', sans-serif;",
    weights: [400, 600, 700],
    category: "Sans Serif",
  },
  {
    name: "Ballet",
    family: "'Ballet', cursive",
    googleFontsImport:
      "@import url('https://fonts.googleapis.com/css2?family=Ballet&display=swap');",
    tailwindConfig: `fontFamily: {
  ballet: ['Ballet', 'cursive'],
}`,
    cssDeclaration: "font-family: 'Ballet', cursive;",
    weights: [400],
    category: "Display",
  },
  {
    name: "Bebas Neue",
    family: "'Bebas Neue', sans-serif",
    googleFontsImport:
      "@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');",
    tailwindConfig: `fontFamily: {
  bebas: ['Bebas Neue', 'sans-serif'],
}`,
    cssDeclaration: "font-family: 'Bebas Neue', sans-serif;",
    weights: [400],
    category: "Display",
  },
  {
    name: "Cinzel",
    family: "'Cinzel', serif",
    googleFontsImport:
      "@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&display=swap');",
    tailwindConfig: `fontFamily: {
  cinzel: ['Cinzel', 'serif'],
}`,
    cssDeclaration: "font-family: 'Cinzel', serif;",
    weights: [400, 600, 700],
    category: "Serif",
  },
  {
    name: "Dancing Script",
    family: "'Dancing Script', cursive",
    googleFontsImport:
      "@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;600;700&display=swap');",
    tailwindConfig: `fontFamily: {
  dancing: ['Dancing Script', 'cursive'],
}`,
    cssDeclaration: "font-family: 'Dancing Script', cursive;",
    weights: [400, 600, 700],
    category: "Handwriting",
  },
];
