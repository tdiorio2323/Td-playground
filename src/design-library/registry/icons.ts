export interface IconDefinition {
  name: string;
  importName: string;
  category: string;
  description: string;
}

export const icons: IconDefinition[] = [
  // Navigation
  {
    name: 'Arrow Left',
    importName: 'ArrowLeft',
    category: 'Navigation',
    description: 'Left pointing arrow for back navigation'
  },
  {
    name: 'Arrow Right',
    importName: 'ArrowRight',
    category: 'Navigation',
    description: 'Right pointing arrow for forward navigation'
  },
  {
    name: 'Chevron Down',
    importName: 'ChevronDown',
    category: 'Navigation',
    description: 'Downward chevron for dropdowns and accordions'
  },
  {
    name: 'Chevron Left',
    importName: 'ChevronLeft',
    category: 'Navigation',
    description: 'Left chevron for pagination'
  },
  {
    name: 'Chevron Right',
    importName: 'ChevronRight',
    category: 'Navigation',
    description: 'Right chevron for pagination'
  },
  {
    name: 'Chevron Up',
    importName: 'ChevronUp',
    category: 'Navigation',
    description: 'Upward chevron for collapsible sections'
  },
  {
    name: 'More Horizontal',
    importName: 'MoreHorizontal',
    category: 'Navigation',
    description: 'Three dots menu icon'
  },
  {
    name: 'Panel Left',
    importName: 'PanelLeft',
    category: 'Navigation',
    description: 'Sidebar panel toggle'
  },

  // Actions
  {
    name: 'Check',
    importName: 'Check',
    category: 'Actions',
    description: 'Checkmark for confirmations'
  },
  {
    name: 'Check Circle',
    importName: 'CheckCircle',
    category: 'Actions',
    description: 'Circle checkmark for success states'
  },
  {
    name: 'Circle',
    importName: 'Circle',
    category: 'Actions',
    description: 'Empty circle for radio buttons'
  },
  {
    name: 'Copy',
    importName: 'Copy',
    category: 'Actions',
    description: 'Copy to clipboard icon'
  },
  {
    name: 'Download',
    importName: 'Download',
    category: 'Actions',
    description: 'Download file icon'
  },
  {
    name: 'Upload Cloud',
    importName: 'UploadCloud',
    category: 'Actions',
    description: 'Upload to cloud icon'
  },
  {
    name: 'Refresh',
    importName: 'RefreshCcw',
    category: 'Actions',
    description: 'Refresh/reload icon'
  },
  {
    name: 'X',
    importName: 'X',
    category: 'Actions',
    description: 'Close/dismiss icon'
  },
  {
    name: 'Plus',
    importName: 'Plus',
    category: 'Actions',
    description: 'Add/create icon'
  },
  {
    name: 'Minus',
    importName: 'Minus',
    category: 'Actions',
    description: 'Remove/subtract icon'
  },
  {
    name: 'Grip Vertical',
    importName: 'GripVertical',
    category: 'Actions',
    description: 'Drag handle for resizable panels'
  },

  // E-commerce
  {
    name: 'Shopping Cart',
    importName: 'ShoppingCart',
    category: 'E-commerce',
    description: 'Shopping cart icon'
  },
  {
    name: 'Package',
    importName: 'Package',
    category: 'E-commerce',
    description: 'Package/product icon'
  },
  {
    name: 'Credit Card',
    importName: 'CreditCard',
    category: 'E-commerce',
    description: 'Payment/credit card icon'
  },
  {
    name: 'Star',
    importName: 'Star',
    category: 'E-commerce',
    description: 'Star rating icon'
  },
  {
    name: 'Heart',
    importName: 'Heart',
    category: 'E-commerce',
    description: 'Favorite/wishlist icon'
  },

  // Social Media
  {
    name: 'Facebook',
    importName: 'Facebook',
    category: 'Social Media',
    description: 'Facebook social icon'
  },
  {
    name: 'Instagram',
    importName: 'Instagram',
    category: 'Social Media',
    description: 'Instagram social icon'
  },
  {
    name: 'Twitter',
    importName: 'Twitter',
    category: 'Social Media',
    description: 'Twitter/X social icon'
  },
  {
    name: 'YouTube',
    importName: 'Youtube',
    category: 'Social Media',
    description: 'YouTube social icon'
  },
  {
    name: 'Mail',
    importName: 'Mail',
    category: 'Social Media',
    description: 'Email/contact icon'
  },

  // Authentication & Security
  {
    name: 'Eye',
    importName: 'Eye',
    category: 'Auth & Security',
    description: 'Show password icon'
  },
  {
    name: 'Eye Off',
    importName: 'EyeOff',
    category: 'Auth & Security',
    description: 'Hide password icon'
  },
  {
    name: 'Lock',
    importName: 'Lock',
    category: 'Auth & Security',
    description: 'Locked/secure icon'
  },
  {
    name: 'Key Round',
    importName: 'KeyRound',
    category: 'Auth & Security',
    description: 'Key/access icon'
  },
  {
    name: 'User',
    importName: 'User',
    category: 'Auth & Security',
    description: 'User profile icon'
  },
  {
    name: 'Users',
    importName: 'Users',
    category: 'Auth & Security',
    description: 'Multiple users icon'
  },

  // UI/UX
  {
    name: 'Search',
    importName: 'Search',
    category: 'UI/UX',
    description: 'Search/find icon'
  },
  {
    name: 'Filter',
    importName: 'Filter',
    category: 'UI/UX',
    description: 'Filter/sort icon'
  },
  {
    name: 'Crown',
    importName: 'Crown',
    category: 'UI/UX',
    description: 'Premium/VIP icon'
  },
  {
    name: 'Sparkles',
    importName: 'Sparkles',
    category: 'UI/UX',
    description: 'Special/featured icon'
  },
  {
    name: 'Dot',
    importName: 'Dot',
    category: 'UI/UX',
    description: 'Small dot indicator'
  },
  {
    name: 'Code',
    importName: 'Code2',
    category: 'UI/UX',
    description: 'Code/developer icon'
  },

  // Location & Time
  {
    name: 'Map Pin',
    importName: 'MapPin',
    category: 'Location & Time',
    description: 'Location/address icon'
  },
  {
    name: 'Clock',
    importName: 'Clock',
    category: 'Location & Time',
    description: 'Time/schedule icon'
  },
  {
    name: 'Globe',
    importName: 'Globe',
    category: 'Location & Time',
    description: 'Website/global icon'
  },

  // File Management
  {
    name: 'Folder',
    importName: 'Folder',
    category: 'File Management',
    description: 'Folder/directory icon'
  },
  {
    name: 'External Link',
    importName: 'ExternalLink',
    category: 'File Management',
    description: 'Open in new window icon'
  },
  {
    name: 'Image',
    importName: 'Image',
    category: 'File Management',
    description: 'Image file icon'
  },
];
