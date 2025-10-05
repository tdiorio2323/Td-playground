export interface ComponentDefinition {
  name: string;
  path: string;
  category: string;
  description: string;
}

export const components: ComponentDefinition[] = [
  {
    name: 'AuthPage',
    path: '/src/components/AuthPage.tsx',
    category: 'Auth Pages',
    description: 'Base authentication page component'
  },
  {
    name: 'AuthPage2',
    path: '/src/components/AuthPage2.tsx',
    category: 'Auth Pages',
    description: 'Authentication variant 2'
  },
  {
    name: 'AuthPage3',
    path: '/src/components/AuthPage3.tsx',
    category: 'Auth Pages',
    description: 'Authentication variant 3'
  },
  {
    name: 'AuthPage4',
    path: '/src/components/AuthPage4.tsx',
    category: 'Auth Pages',
    description: 'Authentication variant 4 with glass effect'
  },
  {
    name: 'AuthPage6',
    path: '/src/components/AuthPage6.tsx',
    category: 'Auth Pages',
    description: 'Authentication variant 6'
  },
  {
    name: 'AuthPage7',
    path: '/src/components/AuthPage7.tsx',
    category: 'Auth Pages',
    description: 'Star Luv branded auth page'
  },
  {
    name: 'AuthPage7_2',
    path: '/src/components/AuthPage7_2.tsx',
    category: 'Auth Pages',
    description: 'Star Luv auth variant 2'
  },
  {
    name: 'AuthPage10',
    path: '/src/components/AuthPage10.tsx',
    category: 'Auth Pages',
    description: 'Quick Printz branded auth page'
  },
  {
    name: 'AuthPageLCG',
    path: '/src/components/AuthPageLCG.tsx',
    category: 'Auth Pages',
    description: 'Legacy Capital Group login page with gold chrome'
  },
  {
    name: 'AuthPageMgmt',
    path: '/src/components/AuthPageMgmt.tsx',
    category: 'Management',
    description: 'Management portal login - variant 1'
  },
  {
    name: 'AuthPageMgmt2',
    path: '/src/components/AuthPageMgmt2.tsx',
    category: 'Management',
    description: 'Management portal login - variant 2'
  },
  {
    name: 'AuthPageMgmt3',
    path: '/src/components/AuthPageMgmt3.tsx',
    category: 'Management',
    description: 'Management portal login - variant 3'
  },
  {
    name: 'BrandDashboard',
    path: '/src/components/BrandDashboard.tsx',
    category: 'Dashboards',
    description: 'Brand-specific dashboard interface'
  },
  {
    name: 'SuperAdminDashboard',
    path: '/src/components/SuperAdminDashboard.tsx',
    category: 'Dashboards',
    description: 'Super admin control panel'
  },
  {
    name: 'CustomerApp',
    path: '/src/components/CustomerApp.tsx',
    category: 'Apps',
    description: 'Customer-facing application'
  },
  {
    name: 'DashboardLayout',
    path: '/src/components/DashboardLayout.tsx',
    category: 'Layouts',
    description: 'Reusable dashboard layout wrapper'
  }
];
