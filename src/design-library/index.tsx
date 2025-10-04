import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ComponentsTab } from './tabs/ComponentsTab';
import { FontsTab } from './tabs/FontsTab';
import { BackgroundsTab } from './tabs/BackgroundsTab';
import { MediaTab } from './tabs/MediaTab';

export default function DesignLibrary() {
  const [activeTab, setActiveTab] = useState('components');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Design Library</h1>
              <p className="text-sm text-gray-500 mt-1">TD Playground Component System</p>
            </div>
            <div className="text-sm text-gray-500">
              <span className="font-semibold text-gray-700">v1.0.0</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="bg-white border border-gray-200 p-1">
            <TabsTrigger value="components" className="data-[state=active]:bg-gray-900 data-[state=active]:text-white">
              Components
            </TabsTrigger>
            <TabsTrigger value="fonts" className="data-[state=active]:bg-gray-900 data-[state=active]:text-white">
              Fonts
            </TabsTrigger>
            <TabsTrigger value="backgrounds" className="data-[state=active]:bg-gray-900 data-[state=active]:text-white">
              Backgrounds
            </TabsTrigger>
            <TabsTrigger value="media" className="data-[state=active]:bg-gray-900 data-[state=active]:text-white">
              Media
            </TabsTrigger>
          </TabsList>

          <TabsContent value="components" className="mt-0">
            <ComponentsTab />
          </TabsContent>

          <TabsContent value="fonts" className="mt-0">
            <FontsTab />
          </TabsContent>

          <TabsContent value="backgrounds" className="mt-0">
            <BackgroundsTab />
          </TabsContent>

          <TabsContent value="media" className="mt-0">
            <MediaTab />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-500">
            <p>TD Studios Playground Design System</p>
            <p className="mt-1">Built with React, TypeScript, and Tailwind CSS</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
