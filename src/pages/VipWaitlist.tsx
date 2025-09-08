import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Crown, Sparkles } from "lucide-react";

export default function VipWaitlist() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from("vip_waitlist")
        .insert({ email, source: "cannamenu-57" });

      if (error) {
        if (error.code === "23505") {
          toast.error("Email already registered for VIP access");
        } else {
          toast.error("Failed to join waitlist. Please try again.");
        }
      } else {
        setIsSubmitted(true);
        toast.success("Welcome to the VIP waitlist!");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-6">
        <Card className="w-full max-w-md bg-white/10 backdrop-blur-md border-white/20">
          <CardContent className="pt-6 text-center">
            <Crown className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
            <h2 className="text-2xl font-bold text-white mb-2">Welcome to VIP!</h2>
            <p className="text-white/80">
              You're now on our exclusive VIP waitlist. We'll notify you when early access is available.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-6">
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Crown className="w-8 h-8 text-yellow-400" />
            <Sparkles className="w-8 h-8 text-yellow-400" />
          </div>
          <CardTitle className="text-2xl text-white">Join VIP Waitlist</CardTitle>
          <p className="text-white/80">
            Get exclusive early access to premium cannabis products and special deals.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold hover:from-yellow-500 hover:to-yellow-700"
            >
              {isSubmitting ? "Joining..." : "Join VIP Waitlist"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}