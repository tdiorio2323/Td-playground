import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { ExternalLink, Instagram, Twitter, Globe, Plus } from "lucide-react";

interface Creator {
  id: string;
  username: string;
  display_name: string;
  bio: string;
  avatar_url: string;
}

interface BioLink {
  id: string;
  label: string;
  url: string;
  order_index: number;
}

export default function LinkInBio() {
  const { username } = useParams();
  const [creator, setCreator] = useState<Creator | null>(null);
  const [links, setLinks] = useState<BioLink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreatorData = async () => {
      if (!username) return;

      try {
        // Fetch creator profile
        const { data: creatorData, error: creatorError } = await supabase
          .from("creators")
          .select("id, username, display_name, bio, avatar_url")
          .eq("username", username)
          .single();

        if (creatorError || !creatorData) {
          console.error("Creator not found:", creatorError);
          setLoading(false);
          return;
        }

        setCreator(creatorData);

        // Fetch bio links
        const { data: linksData, error: linksError } = await supabase
          .from("bio_links")
          .select("*")
          .eq("creator_id", creatorData.id)
          .order("order_index");

        if (!linksError && linksData) {
          setLinks(linksData);
        }
      } catch (error) {
        console.error("Error fetching creator data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCreatorData();
  }, [username]);

  const getIconForUrl = (url: string) => {
    if (url.includes("instagram.com")) return <Instagram className="w-4 h-4" />;
    if (url.includes("twitter.com") || url.includes("x.com")) return <Twitter className="w-4 h-4" />;
    return <Globe className="w-4 h-4" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900 flex items-center justify-center p-6">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!creator) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900 flex items-center justify-center p-6">
        <Card className="w-full max-w-md bg-white/10 backdrop-blur-md border-white/20">
          <CardContent className="pt-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Creator Not Found</h2>
            <p className="text-white/80 mb-4">
              The creator @{username} doesn't exist or hasn't set up their bio yet.
            </p>
            <Link to="/onboard">
              <Button className="bg-gradient-to-r from-purple-400 to-pink-600 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Create Your Profile
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-4">
        {/* Creator Profile */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader className="text-center">
            <Avatar className="w-20 h-20 mx-auto mb-4">
              <AvatarImage src={creator.avatar_url || ""} alt={creator.display_name} />
              <AvatarFallback className="bg-gradient-to-r from-purple-400 to-pink-600 text-white text-lg">
                {creator.display_name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <h1 className="text-2xl font-bold text-white">{creator.display_name}</h1>
            <p className="text-white/60">@{creator.username}</p>
            {creator.bio && (
              <p className="text-white/80 mt-2">{creator.bio}</p>
            )}
          </CardHeader>
        </Card>

        {/* Bio Links */}
        <div className="space-y-3">
          {links.length === 0 ? (
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="pt-6 text-center">
                <p className="text-white/60">No links added yet</p>
              </CardContent>
            </Card>
          ) : (
            links.map((link) => (
              <Card key={link.id} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-colors">
                <CardContent className="p-4">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-white hover:text-white/80 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {getIconForUrl(link.url)}
                      <span className="font-medium">{link.label}</span>
                    </div>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="text-center pt-4">
          <Link to="/onboard" className="text-white/60 hover:text-white/80 text-sm transition-colors">
            Create your own bio page
          </Link>
        </div>
      </div>
    </div>
  );
}