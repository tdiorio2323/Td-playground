import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/integrations/supabase/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { 
  FileText, 
  Image, 
  Video, 
  Folder, 
  Settings,
  Sparkles,
  StickyNote,
  Crown,
  User,
  Link
} from "lucide-react";

const Portal = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [username, setUsername] = useState('User');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (user) {
      setUsername(user.email?.split('@')[0] || 'User');
    }
    const savedNotes = localStorage.getItem('user-notes') || '';
    setNotes(savedNotes);
  }, [user]);

  const handleNotesChange = (value: string) => {
    setNotes(value);
    localStorage.setItem('user-notes', value);
  };

  const projects = [
    { id: 'documents', name: 'Documents', icon: FileText, color: 'from-blue-500 to-purple-600' },
    { id: 'media', name: 'Media Gallery', icon: Image, color: 'from-pink-500 to-rose-500' },
    { id: 'videos', name: 'Video Library', icon: Video, color: 'from-green-500 to-emerald-600' },
    { id: 'projects', name: 'Projects', icon: Folder, color: 'from-orange-500 to-red-500' },
    { id: 'settings', name: 'Settings', icon: Settings, color: 'from-gray-500 to-slate-600' },
    { id: 'notes', name: 'Quick Notes', icon: StickyNote, color: 'from-teal-500 to-cyan-600' }
  ];

  const newFeatures = [
    { id: 'vip', name: 'Join VIP', icon: Crown, color: 'from-yellow-500 to-amber-600', path: '/waitlist' },
    { id: 'creator', name: 'Creator Onboard', icon: User, color: 'from-green-500 to-emerald-600', path: '/onboard' },
    { id: 'bio', name: 'Link in Bio', icon: Link, color: 'from-purple-500 to-violet-600', path: '/bio/demo' }
  ];

  const handleProjectClick = (projectId: string) => {
    navigate(`/project/${projectId}`);
  };

  const handleFeatureClick = (path: string) => {
    navigate(path);
  };

  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: `url('/lovable-uploads/74a236e3-3b28-4ffa-8e8e-cd545be0f4e5.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Luxury overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-purple-900/30 backdrop-blur-[1px]" />
      
      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 max-w-4xl mx-auto">
            <h1 className="text-6xl font-bold text-white mb-4 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Welcome {username}
            </h1>
            <p className="text-xl text-white/80">
              Your premium workspace for creativity, collaboration, and luxury experiences
            </p>
          </div>
        </header>

        {/* Projects Grid - 2 rows of 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-8">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-white/10 border-white/20 backdrop-blur-md"
              onClick={() => handleProjectClick(project.id)}
            >
              <CardContent className="p-8 text-center">
                <div className={`w-20 h-20 mx-auto mb-6 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                  <project.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-white font-semibold text-lg group-hover:text-purple-200 transition-colors duration-300">
                  {project.name}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* New Features Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-6 h-6 text-yellow-400" />
              <h2 className="text-2xl font-bold text-white">New Features</h2>
              <Sparkles className="w-6 h-6 text-yellow-400" />
            </div>
            <p className="text-white/70">Discover our latest Cabana VIP community features</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newFeatures.map((feature) => (
              <Card
                key={feature.id}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-gradient-to-br from-white/20 to-white/5 border-white/30 backdrop-blur-md"
                onClick={() => handleFeatureClick(feature.path)}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-white font-semibold text-lg group-hover:text-yellow-200 transition-colors duration-300">
                    {feature.name}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Your Logo Space */}
            <div className="text-center">
              <div className="w-32 h-20 bg-white/20 border-2 border-dashed border-white/40 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-white/60 text-sm">Your Logo</span>
              </div>
              <p className="text-white/60 text-sm">TD Studios</p>
            </div>

            {/* Notes Card */}
            <Card className="bg-white/20 border-white/30">
              <CardHeader>
                <CardTitle className="text-white text-center flex items-center justify-center gap-2">
                  <StickyNote className="w-5 h-5" />
                  Quick Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Add your notes here..."
                  value={notes}
                  onChange={(e) => handleNotesChange(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 min-h-[100px] resize-none"
                />
              </CardContent>
            </Card>

            {/* Client Logo Space */}
            <div className="text-center">
              <div className="w-32 h-20 bg-white/20 border-2 border-dashed border-white/40 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-white/60 text-sm">Client Logo</span>
              </div>
              <p className="text-white/60 text-sm">Client Brand</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Portal;