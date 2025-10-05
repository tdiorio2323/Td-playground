import { useState, lazy } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, Copy, Code2, Search } from 'lucide-react';
import { templates } from '../registry/templates';
import { copyToClipboard } from '../utils/copyToClipboard';
import { SafePreview } from '../utils/SafePreview';

// Lazy load templates for previews
const templateLoaders: Record<string, React.LazyExoticComponent<any>> = {
  'AuthPage': lazy(() => import('@/components/AuthPage').then(m => ({ default: m.default ?? m.AuthPage }))),
  'AuthPage2': lazy(() => import('@/components/AuthPage2').then(m => ({ default: m.default ?? m.AuthPage2 }))),
  'AuthPage3': lazy(() => import('@/components/AuthPage3').then(m => ({ default: m.default ?? m.AuthPage3 }))),
  'AuthPage4': lazy(() => import('@/components/AuthPage4').then(m => ({ default: m.default ?? m.AuthPage4 }))),
  'AuthPage6': lazy(() => import('@/components/AuthPage6').then(m => ({ default: m.default ?? m.AuthPage6 }))),
  'AuthPage7': lazy(() => import('@/components/AuthPage7').then(m => ({ default: m.default ?? m.AuthPage7 }))),
  'AuthPage7_2': lazy(() => import('@/components/AuthPage7_2').then(m => ({ default: m.default ?? m.AuthPage7_2 }))),
  'AuthPage10': lazy(() => import('@/components/AuthPage10').then(m => ({ default: m.default ?? m.AuthPage10 }))),
  'AuthPageLCG': lazy(() => import('@/components/AuthPageLCG').then(m => ({ default: m.default ?? m.AuthPageLCG }))),
  'AuthPageMgmt': lazy(() => import('@/components/AuthPageMgmt').then(m => ({ default: m.default ?? m.AuthPageMgmt }))),
  'AuthPageMgmt2': lazy(() => import('@/components/AuthPageMgmt2').then(m => ({ default: m.default ?? m.AuthPageMgmt2 }))),
  'AuthPageMgmt3': lazy(() => import('@/components/AuthPageMgmt3').then(m => ({ default: m.default ?? m.AuthPageMgmt3 }))),
  'BrandDashboard': lazy(() => import('@/components/BrandDashboard').then(m => ({ default: m.default ?? m.BrandDashboard }))),
  'SuperAdminDashboard': lazy(() => import('@/components/SuperAdminDashboard').then(m => ({ default: m.default ?? m.SuperAdminDashboard }))),
  'CustomerApp': lazy(() => import('@/components/CustomerApp').then(m => ({ default: m.default ?? m.CustomerApp }))),
  'CheckoutFlow': lazy(() => import('@/components/CheckoutFlow').then(m => ({ default: m.default ?? m.CheckoutFlow }))),
  'DashboardLayout': lazy(() => import('@/components/DashboardLayout').then(m => ({ default: m.default ?? m.DashboardLayout }))),
};

// Safe props for templates that need them
const templateProps: Record<string, any> = {
  'CheckoutFlow': {
    items: [{ id: 1, name: 'Sample Item', price: 10, quantity: 1 }],
    steps: ['cart', 'shipping', 'payment', 'confirmation'],
    onSubmit: () => {}
  },
  'DashboardLayout': { children: null },
};

export function TemplatesTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedCode, setExpandedCode] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['All', ...Array.from(new Set(templates.map(t => t.category)))];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCopy = async (templateName: string) => {
    const code = `import { ${templateName} } from '@/components/${templateName}';\n\n<${templateName} />`;
    const success = await copyToClipboard(code);
    if (success) {
      setCopiedId(templateName);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="text-white"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Template Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredTemplates.map(template => {
          const isExpanded = expandedCode === template.name;
          const isCopied = copiedId === template.name;
          const TemplatePreview = templateLoaders[template.name];

          return (
            <Card key={template.name} className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>{template.name}</span>
                  <span className="text-xs font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {template.category}
                  </span>
                </CardTitle>
                <p className="text-sm text-gray-600 mt-2">{template.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {template.tags.map(tag => (
                    <span key={tag} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                  <div className="w-full h-96 overflow-hidden relative">
                    {TemplatePreview ? (
                      <SafePreview>
                        <div className="scale-[0.25] origin-top-left w-[400%] h-[400%] pointer-events-none">
                          <TemplatePreview {...(templateProps[template.name] || {})} />
                        </div>
                      </SafePreview>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center text-gray-400 text-sm">
                          <Code2 className="h-8 w-8 mx-auto mb-2 opacity-50" />
                          <p>Preview unavailable</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-white"
                    onClick={() => handleCopy(template.name)}
                  >
                    {isCopied ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Import
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p>No templates found matching your search.</p>
        </div>
      )}

      {/* Stats */}
      <div className="text-center text-sm text-gray-500">
        Showing {filteredTemplates.length} of {templates.length} templates
      </div>
    </div>
  );
}
