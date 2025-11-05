import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ComponentsTab } from "./tabs/ComponentsTab";
import { FontsTab } from "./tabs/FontsTab";
import { BackgroundsTab } from "./tabs/BackgroundsTab";
import { MediaTab } from "./tabs/MediaTab";
import { IconsTab } from "./tabs/IconsTab";
import { TemplatesTab } from "./tabs/TemplatesTab";
import { TokensTab } from "./tabs/TokensTab";

export default function DesignLibrary() {
  const [activeTab, setActiveTab] = useState("components");

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/lovable-uploads/td-studios-black-marble.webp')" }}
    >
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-32 h-20 overflow-hidden rounded-lg">
                <img
                  src="/lovable-uploads/td sttone.png"
                  alt="TD Studios"
                  className="w-full h-full object-cover object-[center_60%]"
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Design Library</h1>
                <p className="text-sm text-gray-500 mt-1">TD Playground Component System</p>
              </div>
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
            <TabsTrigger
              value="components"
              className="data-[state=active]:bg-gray-900 data-[state=active]:text-white uppercase font-['Inter',sans-serif] tracking-wide"
            >
              Components
            </TabsTrigger>
            <TabsTrigger
              value="templates"
              className="data-[state=active]:bg-gray-900 data-[state=active]:text-white uppercase font-['Inter',sans-serif] tracking-wide"
            >
              Templates
            </TabsTrigger>
            <TabsTrigger
              value="icons"
              className="data-[state=active]:bg-gray-900 data-[state=active]:text-white uppercase font-['Inter',sans-serif] tracking-wide"
            >
              Icons
            </TabsTrigger>
            <TabsTrigger
              value="fonts"
              className="data-[state=active]:bg-gray-900 data-[state=active]:text-white uppercase font-['Inter',sans-serif] tracking-wide"
            >
              Fonts
            </TabsTrigger>
            <TabsTrigger
              value="backgrounds"
              className="data-[state=active]:bg-gray-900 data-[state=active]:text-white uppercase font-['Inter',sans-serif] tracking-wide"
            >
              Backgrounds
            </TabsTrigger>
            <TabsTrigger
              value="media"
              className="data-[state=active]:bg-gray-900 data-[state=active]:text-white uppercase font-['Inter',sans-serif] tracking-wide"
            >
              Media
            </TabsTrigger>
            <TabsTrigger
              value="tokens"
              className="data-[state=active]:bg-gray-900 data-[state=active]:text-white uppercase font-['Inter',sans-serif] tracking-wide"
            >
              Tokens
            </TabsTrigger>
          </TabsList>

          <TabsContent value="components" className="mt-0">
            <ComponentsTab />
          </TabsContent>

          <TabsContent value="templates" className="mt-0">
            <TemplatesTab />
          </TabsContent>

          <TabsContent value="icons" className="mt-0">
            <IconsTab />
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

          <TabsContent value="tokens" className="mt-0">
            <TokensTab />
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
