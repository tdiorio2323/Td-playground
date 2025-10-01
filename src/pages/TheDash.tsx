import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Package, ShoppingCart, Crown, Users } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            TD STUDIOS PLAYGROUND
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Invite-only creator network. Build, showcase, and manage your creative projects.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={() => navigate('/shop')}>
              Explore Shop <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/waitlist')}>
              Join Waitlist
            </Button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/shop')}>
            <CardHeader>
              <ShoppingCart className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Shop</CardTitle>
              <CardDescription>
                Browse premium products and collections
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/portal')}>
            <CardHeader>
              <Users className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Creator Portal</CardTitle>
              <CardDescription>
                Manage your projects and content
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/brand')}>
            <CardHeader>
              <Package className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Brand Dashboard</CardTitle>
              <CardDescription>
                Track analytics and performance
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/waitlist')}>
            <CardHeader>
              <Crown className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>VIP Access</CardTitle>
              <CardDescription>
                Join our exclusive creator network
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Quick Links */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-6">Quick Access</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button variant="secondary" onClick={() => navigate('/admin')}>
              Admin Dashboard
            </Button>
            <Button variant="secondary" onClick={() => navigate('/onboard')}>
              Creator Onboarding
            </Button>
            <Button variant="secondary" onClick={() => navigate('/bio/demo')}>
              Link in Bio
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
        <p>Frontend Component Playground - No Authentication Required</p>
      </div>
    </div>
  );
};

export default Index;
