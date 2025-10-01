import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { User, Sparkles, ArrowRight } from "lucide-react";

export default function CreatorOnboarding() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    displayName: "",
    bio: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.username || !formData.displayName) {
      toast.error("Username and display name are required");
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      toast.success("Creator profile created successfully!");
      navigate(`/bio/${formData.username}`);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-teal-900 to-blue-900 flex items-center justify-center p-6">
      <Card className="w-full max-w-lg bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <User className="w-8 h-8 text-green-400" />
            <Sparkles className="w-8 h-8 text-green-400" />
          </div>
          <CardTitle className="text-2xl text-white">Creator Onboarding</CardTitle>
          <p className="text-white/80">
            Set up your creator profile and start building your Cabana VIP brand presence.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="username" className="text-white/90">Username*</Label>
              <Input
                id="username"
                type="text"
                placeholder="@yourcreatorname"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
            </div>
            
            <div>
              <Label htmlFor="displayName" className="text-white/90">Display Name*</Label>
              <Input
                id="displayName"
                type="text"
                placeholder="Your Brand Name"
                value={formData.displayName}
                onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
            </div>

            <div>
              <Label htmlFor="bio" className="text-white/90">Bio (Optional)</Label>
              <Textarea
                id="bio"
                placeholder="Tell your audience about your creator brand..."
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 min-h-[100px]"
              />
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-green-400 to-teal-600 text-black font-semibold hover:from-green-500 hover:to-teal-700"
            >
              {isSubmitting ? "Creating Profile..." : (
                <div className="flex items-center justify-center gap-2">
                  Create Profile <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}