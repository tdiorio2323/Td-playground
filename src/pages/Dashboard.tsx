import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Phone, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col p-4 relative">
      {/* Static Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/827a6d46-d4f2-4ea8-9cf2-e7eb451da03b.png')` }}
      />
      <div className="absolute inset-0 bg-black/40" /> {/* Overlay */}

      {/* Content (Navbar and Card) */}
      <nav className="w-full bg-black/50 backdrop-blur-md border-b border-white/10 px-6 flex justify-between items-center relative z-20">
        {/* Left Section (Menu Items) */}
        <div className="flex space-x-4">
          <a href="/" className="text-white hover:text-gray-300 text-lg font-bebas uppercase">Home</a>
          <a href="/auth" className="text-white hover:text-gray-300 text-lg font-bebas uppercase">Auth</a>
          <a href="/creator" className="text-white hover:text-gray-300 text-lg font-bebas uppercase">Creator</a>
          <a href="/dashboard" className="text-white hover:text-gray-300 text-lg font-bebas uppercase">Dashboard</a>
        </div>
        {/* Center Section (Logo) */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <img src="/TD STUDIOS CHROME LOGO.png" alt="TD Studios Logo" className="h-16 w-auto" />
        </div>
        {/* Right Section (Icons + Search) */}
        <div className="flex items-center space-x-4">
          <Phone className="h-6 w-6 text-white cursor-pointer hover:text-gray-300" />
          <Search className="h-6 w-6 text-white cursor-pointer hover:text-gray-300" />
          <Input
            type="text"
            placeholder="Search..."
            className="w-32 bg-white/10 border-white/20 text-white placeholder:text-white/60"
          />
        </div>
      </nav>
      <Card className="w-[90%] mx-auto my-8 h-[calc(100vh-64px)] bg-black/30 backdrop-blur-sm border-white/10 border-2 shadow-lg relative z-10 flex-grow">
        <CardHeader className="text-center space-y-6">
          <h1 className="text-white text-4xl font-bebas">Your Dashboard</h1>
        </CardHeader>
        <CardContent className="space-y-6 px-8 py-6 text-white">
          {/* Add your dashboard content here. */}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
