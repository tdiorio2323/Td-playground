export type TemplateMeta = {
  name: string;
  description: string;
  category: string;
  tags: string[];
  importPath: string; // e.g. "@/components/AuthPage"
  namedExport?: string; // e.g. "AuthPage" if no default export
};

export const templates: TemplateMeta[] = [
  {
    name: 'Auth Page',
    description: 'A full-page authentication layout with social links.',
    category: 'Authentication',
    tags: ['auth', 'login', 'signup', 'social'],
    importPath: '@/components/AuthPage',
    namedExport: 'AuthPage', // AuthPage is a named export
  },
  {
    name: 'Auth Card',
    description: 'A simple authentication card for login/signup forms.',
    category: 'Authentication',
    tags: ['auth', 'card', 'login', 'signup'],
    importPath: '@/components/AuthCard',
    // No namedExport needed as it's a default export
  },
  {
    name: 'Brand Dashboard',
    description: 'A comprehensive dashboard for brand management.',
    category: 'Dashboards',
    tags: ['dashboard', 'admin', 'brand', 'analytics'],
    importPath: '@/components/BrandDashboard',
    // No namedExport needed as it's a default export
  },
];