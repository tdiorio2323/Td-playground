export interface ColorToken {
  name: string;
  variable: string;
  value: string;
  category: 'Base' | 'Semantic' | 'Component';
}

export interface TypographyToken {
  name: string;
  element: string;
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
  letterSpacing?: string;
}

export interface SpacingToken {
  name: string;
  value: string;
  pixels: number;
  rem: string;
}

export const colorTokens: ColorToken[] = [
  // Base Colors
  { name: 'Background', variable: '--background', value: 'hsl(0 0% 100%)', category: 'Base' },
  { name: 'Foreground', variable: '--foreground', value: 'hsl(222.2 84% 4.9%)', category: 'Base' },
  { name: 'Border', variable: '--border', value: 'hsl(214.3 31.8% 91.4%)', category: 'Base' },
  { name: 'Input', variable: '--input', value: 'hsl(214.3 31.8% 91.4%)', category: 'Base' },
  { name: 'Ring', variable: '--ring', value: 'hsl(222.2 84% 4.9%)', category: 'Base' },

  // Semantic Colors
  { name: 'Primary', variable: '--primary', value: 'hsl(222.2 47.4% 11.2%)', category: 'Semantic' },
  { name: 'Primary Foreground', variable: '--primary-foreground', value: 'hsl(210 40% 98%)', category: 'Semantic' },
  { name: 'Secondary', variable: '--secondary', value: 'hsl(210 40% 96.1%)', category: 'Semantic' },
  { name: 'Secondary Foreground', variable: '--secondary-foreground', value: 'hsl(222.2 47.4% 11.2%)', category: 'Semantic' },
  { name: 'Destructive', variable: '--destructive', value: 'hsl(0 84.2% 60.2%)', category: 'Semantic' },
  { name: 'Destructive Foreground', variable: '--destructive-foreground', value: 'hsl(210 40% 98%)', category: 'Semantic' },
  { name: 'Success', variable: '--success', value: 'hsl(142 76% 36%)', category: 'Semantic' },
  { name: 'Success Foreground', variable: '--success-foreground', value: 'hsl(210 40% 98%)', category: 'Semantic' },
  { name: 'Warning', variable: '--warning', value: 'hsl(38 92% 50%)', category: 'Semantic' },
  { name: 'Warning Foreground', variable: '--warning-foreground', value: 'hsl(222.2 47.4% 11.2%)', category: 'Semantic' },

  // Component Colors
  { name: 'Muted', variable: '--muted', value: 'hsl(210 40% 96.1%)', category: 'Component' },
  { name: 'Muted Foreground', variable: '--muted-foreground', value: 'hsl(215.4 16.3% 46.9%)', category: 'Component' },
  { name: 'Accent', variable: '--accent', value: 'hsl(210 40% 96.1%)', category: 'Component' },
  { name: 'Accent Foreground', variable: '--accent-foreground', value: 'hsl(222.2 47.4% 11.2%)', category: 'Component' },
  { name: 'Card', variable: '--card', value: 'hsl(0 0% 100%)', category: 'Component' },
  { name: 'Card Foreground', variable: '--card-foreground', value: 'hsl(222.2 84% 4.9%)', category: 'Component' },
  { name: 'Popover', variable: '--popover', value: 'hsl(0 0% 100%)', category: 'Component' },
  { name: 'Popover Foreground', variable: '--popover-foreground', value: 'hsl(222.2 84% 4.9%)', category: 'Component' },
];

export const typographyTokens: TypographyToken[] = [
  {
    name: 'Heading 1',
    element: 'h1',
    fontSize: '2.25rem', // 36px
    fontWeight: '800',
    lineHeight: '2.5rem',
    letterSpacing: '-0.025em'
  },
  {
    name: 'Heading 2',
    element: 'h2',
    fontSize: '1.875rem', // 30px
    fontWeight: '700',
    lineHeight: '2.25rem',
    letterSpacing: '-0.025em'
  },
  {
    name: 'Heading 3',
    element: 'h3',
    fontSize: '1.5rem', // 24px
    fontWeight: '600',
    lineHeight: '2rem'
  },
  {
    name: 'Heading 4',
    element: 'h4',
    fontSize: '1.25rem', // 20px
    fontWeight: '600',
    lineHeight: '1.75rem'
  },
  {
    name: 'Heading 5',
    element: 'h5',
    fontSize: '1.125rem', // 18px
    fontWeight: '600',
    lineHeight: '1.75rem'
  },
  {
    name: 'Heading 6',
    element: 'h6',
    fontSize: '1rem', // 16px
    fontWeight: '600',
    lineHeight: '1.5rem'
  },
  {
    name: 'Body Large',
    element: 'p',
    fontSize: '1.125rem', // 18px
    fontWeight: '400',
    lineHeight: '1.75rem'
  },
  {
    name: 'Body',
    element: 'p',
    fontSize: '1rem', // 16px
    fontWeight: '400',
    lineHeight: '1.5rem'
  },
  {
    name: 'Body Small',
    element: 'p',
    fontSize: '0.875rem', // 14px
    fontWeight: '400',
    lineHeight: '1.25rem'
  },
  {
    name: 'Caption',
    element: 'small',
    fontSize: '0.75rem', // 12px
    fontWeight: '400',
    lineHeight: '1rem'
  },
  {
    name: 'Code',
    element: 'code',
    fontSize: '0.875rem', // 14px
    fontWeight: '500',
    lineHeight: '1.25rem'
  },
];

export const spacingTokens: SpacingToken[] = [
  { name: '0', value: '0', pixels: 0, rem: '0' },
  { name: '1', value: '0.25rem', pixels: 4, rem: '0.25rem' },
  { name: '2', value: '0.5rem', pixels: 8, rem: '0.5rem' },
  { name: '3', value: '0.75rem', pixels: 12, rem: '0.75rem' },
  { name: '4', value: '1rem', pixels: 16, rem: '1rem' },
  { name: '5', value: '1.25rem', pixels: 20, rem: '1.25rem' },
  { name: '6', value: '1.5rem', pixels: 24, rem: '1.5rem' },
  { name: '8', value: '2rem', pixels: 32, rem: '2rem' },
  { name: '10', value: '2.5rem', pixels: 40, rem: '2.5rem' },
  { name: '12', value: '3rem', pixels: 48, rem: '3rem' },
  { name: '16', value: '4rem', pixels: 64, rem: '4rem' },
];
