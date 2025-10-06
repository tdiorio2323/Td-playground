export interface TemplateDefinition {
  name: string;
  path: string;
  category: 'Page Template' | 'Layout' | 'Section';
  description: string;
  tags: string[];
}

export const templates: TemplateDefinition[] = [
  // Auth Page Templates
  {
    name: 'AuthPage',
    path: '/src/components/AuthPage.tsx',
    category: 'Page Template',
    description: 'Link-in-bio auth page with social media buttons',
    tags: ['auth', 'social', 'link-in-bio']
  },
  {
    name: 'AuthPage2',
    path: '/src/components/AuthPage2.tsx',
    category: 'Page Template',
    description: 'Simple link-in-bio page with Instagram focus',
    tags: ['auth', 'social', 'minimal']
  },
  {
    name: 'AuthPage3',
    path: '/src/components/AuthPage3.tsx',
    category: 'Page Template',
    description: 'Auth page with login form and social links',
    tags: ['auth', 'form', 'social']
  },
  {
    name: 'AuthPage4',
    path: '/src/components/AuthPage4.tsx',
    category: 'Page Template',
    description: 'Navigation-focused auth page with internal links',
    tags: ['auth', 'navigation', 'internal']
  },
  {
    name: 'AuthPage6',
    path: '/src/components/AuthPage6.tsx',
    category: 'Page Template',
    description: 'Creator auth page with email contact',
    tags: ['auth', 'creator', 'contact']
  },
  {
    name: 'AuthPage7',
    path: '/src/components/AuthPage7.tsx',
    category: 'Page Template',
    description: 'Multi-platform link page with exclusive access',
    tags: ['auth', 'multi-platform', 'exclusive']
  },
  {
    name: 'AuthPage7_2',
    path: '/src/components/AuthPage7_2.tsx',
    category: 'Page Template',
    description: 'Creator page with image slideshow',
    tags: ['auth', 'slideshow', 'creator']
  },
  {
    name: 'AuthPage10',
    path: '/src/components/AuthPage10.tsx',
    category: 'Page Template',
    description: 'Business/brand link-in-bio page',
    tags: ['auth', 'business', 'brand']
  },
  {
    name: 'AuthPageLCG',
    path: '/src/components/AuthPageLCG.tsx',
    category: 'Page Template',
    description: 'Legacy Capital Group branded auth page',
    tags: ['auth', 'corporate', 'lcg']
  },
  {
    name: 'AuthPageMgmt',
    path: '/src/components/AuthPageMgmt.tsx',
    category: 'Page Template',
    description: 'Management portal login page',
    tags: ['auth', 'management', 'portal']
  },
  {
    name: 'AuthPageMgmt2',
    path: '/src/components/AuthPageMgmt2.tsx',
    category: 'Page Template',
    description: 'Alternative management login design',
    tags: ['auth', 'management', 'alternative']
  },
  {
    name: 'AuthPageMgmt3',
    path: '/src/components/AuthPageMgmt3.tsx',
    category: 'Page Template',
    description: 'Third management login variant',
    tags: ['auth', 'management', 'variant']
  },

  // Dashboard Templates
  {
    name: 'BrandDashboard',
    path: '/src/components/BrandDashboard.tsx',
    category: 'Page Template',
    description: 'Complete brand analytics and management dashboard',
    tags: ['dashboard', 'analytics', 'brand']
  },
  {
    name: 'SuperAdminDashboard',
    path: '/src/components/SuperAdminDashboard.tsx',
    category: 'Page Template',
    description: 'Admin control panel with user management',
    tags: ['dashboard', 'admin', 'users']
  },

  // Layout Components
  {
    name: 'DashboardLayout',
    path: '/src/components/DashboardLayout.tsx',
    category: 'Layout',
    description: 'Reusable dashboard layout wrapper with sidebar',
    tags: ['layout', 'sidebar', 'navigation']
  },

  // Section Templates
  {
    name: 'CheckoutFlow',
    path: '/src/components/CheckoutFlow.tsx',
    category: 'Section',
    description: 'Multi-step checkout flow component',
    tags: ['checkout', 'ecommerce', 'flow']
  },
  {
    name: 'CustomerApp',
    path: '/src/components/CustomerApp.tsx',
    category: 'Page Template',
    description: 'E-commerce customer shopping interface',
    tags: ['ecommerce', 'shop', 'customer']
  },
];
