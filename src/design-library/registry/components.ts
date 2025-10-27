export interface ComponentDefinition {
  name: string;
  path: string;
  category: string;
  description: string;
  demoRoute?: string;
}

export const components: ComponentDefinition[] = [
  {
    name: 'AuthPage',
    path: '/src/components/AuthPage.tsx',
    category: 'Auth Pages',
    description: 'Base authentication page component',
    demoRoute: '/auth'
  },
  {
    name: 'AuthPage2',
    path: '/src/components/AuthPage2.tsx',
    category: 'Auth Pages',
    description: 'Authentication variant 2',
    demoRoute: '/juanita2'
  },
  {
    name: 'AuthPage3',
    path: '/src/components/AuthPage3.tsx',
    category: 'Auth Pages',
    description: 'Authentication variant 3',
    demoRoute: '/juanita3'
  },
  {
    name: 'AuthPage4',
    path: '/src/components/AuthPage4.tsx',
    category: 'Auth Pages',
    description: 'Authentication variant 4 with glass effect',
    demoRoute: '/'
  },
  {
    name: 'AuthPage6',
    path: '/src/components/AuthPage6.tsx',
    category: 'Auth Pages',
    description: 'Authentication variant 6',
    demoRoute: '/lilsex'
  },
  {
    name: 'AuthPage7',
    path: '/src/components/AuthPage7.tsx',
    category: 'Auth Pages',
    description: 'Star Luv branded auth page',
    demoRoute: '/starluv'
  },
  {
    name: 'AuthPage7_2',
    path: '/src/components/AuthPage7_2.tsx',
    category: 'Auth Pages',
    description: 'Star Luv auth variant 2',
    demoRoute: '/starluv-2'
  },
  {
    name: 'AuthPage10',
    path: '/src/components/AuthPage10.tsx',
    category: 'Auth Pages',
    description: 'Quick Printz branded auth page',
    demoRoute: '/quickprintz'
  },
  {
    name: 'AuthPageLCG',
    path: '/src/components/AuthPageLCG.tsx',
    category: 'Auth Pages',
    description: 'Legacy Capital Group login page with gold chrome',
    demoRoute: '/lcg'
  },
  {
    name: 'AuthPageMgmt',
    path: '/src/components/AuthPageMgmt.tsx',
    category: 'Management',
    description: 'Management portal login - variant 1',
    demoRoute: '/cabanamgmt'
  },
  {
    name: 'AuthPageMgmt2',
    path: '/src/components/AuthPageMgmt2.tsx',
    category: 'Management',
    description: 'Management portal login - variant 2',
    demoRoute: '/cabanamgmt-2'
  },
  {
    name: 'BrandDashboard',
    path: '/src/components/BrandDashboard.tsx',
    category: 'Dashboards',
    description: 'Brand-specific dashboard interface',
    demoRoute: '/brand'
  },
  {
    name: 'SuperAdminDashboard',
    path: '/src/components/SuperAdminDashboard.tsx',
    category: 'Dashboards',
    description: 'Super admin control panel',
    demoRoute: '/admin'
  },
  {
    name: 'CustomerApp',
    path: '/src/components/CustomerApp.tsx',
    category: 'Apps',
    description: 'Customer-facing application',
    demoRoute: '/shop'
  },
  {
    name: 'DashboardLayout',
    path: '/src/components/DashboardLayout.tsx',
    category: 'Layouts',
    description: 'Reusable dashboard layout wrapper',
    demoRoute: '/hub'
  }
];
