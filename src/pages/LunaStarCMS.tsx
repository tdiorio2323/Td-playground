import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Upload, 
  Link as LinkIcon, 
  Image as ImageIcon,
  Eye,
  Star,
  Settings,
  Palette,
  Globe,
  Shield
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface LinkItem {
  id: string;
  title: string;
  subtitle?: string;
  url: string;
  category: 'social' | 'content' | 'shopping' | 'entertainment' | 'vip';
  isVip?: boolean;
  isNew?: boolean;
  isActive: boolean;
  color: string;
  order: number;
}

interface ProfileData {
  name: string;
  bio: string;
  profileImage?: string;
  backgroundTheme: string;
  customDomain?: string;
  analytics: boolean;
}

const LunaStarCMS: React.FC = () => {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [profile, setProfile] = useState<ProfileData>({
    name: 'Luna Star',
    bio: 'Come and explore the world with me🌎\nFollow all my pages ❤️',
    backgroundTheme: 'galaxy',
    analytics: true
  });
  const [editingLink, setEditingLink] = useState<LinkItem | null>(null);
  const [isAddingLink, setIsAddingLink] = useState(false);
  const [activeTab, setActiveTab] = useState<'links' | 'profile' | 'settings'>('links');

  useEffect(() => {
    // Load initial data
    const initialLinks: LinkItem[] = [
      {
        id: '1',
        title: 'Follow on X',
        subtitle: '@cutelunastar',
        url: 'https://x.com/cutelunastar',
        category: 'social',
        isActive: true,
        color: 'from-gray-800 to-black',
        order: 1
      },
      {
        id: '2',
        title: 'Instagram',
        subtitle: '@luna5star',
        url: 'https://instagram.com/luna5star',
        category: 'social',
        isActive: true,
        color: 'from-pink-500 to-purple-600',
        order: 2
      },
      {
        id: '3',
        title: 'Fansly VIP',
        subtitle: 'Exclusive Premium Content',
        url: '#',
        category: 'vip',
        isVip: true,
        isActive: true,
        color: 'from-purple-600 to-pink-600',
        order: 3
      }
    ];
    setLinks(initialLinks);
  }, []);

  const handleSaveLink = (linkData: Partial<LinkItem>) => {
    if (editingLink) {
      setLinks(links.map(link => 
        link.id === editingLink.id 
          ? { ...editingLink, ...linkData }
          : link
      ));
      setEditingLink(null);
    } else if (isAddingLink) {
      const newLink: LinkItem = {
        id: Date.now().toString(),
        title: linkData.title || '',
        subtitle: linkData.subtitle,
        url: linkData.url || '',
        category: linkData.category || 'social',
        isVip: linkData.isVip || false,
        isNew: linkData.isNew || false,
        isActive: true,
        color: linkData.color || 'from-blue-500 to-purple-500',
        order: links.length + 1
      };
      setLinks([...links, newLink]);
      setIsAddingLink(false);
    }
  };

  const handleDeleteLink = (id: string) => {
    setLinks(links.filter(link => link.id !== id));
  };

  const handleToggleActive = (id: string) => {
    setLinks(links.map(link =>
      link.id === id ? { ...link, isActive: !link.isActive } : link
    ));
  };

  const colorOptions = [
    { name: 'Pink to Purple', value: 'from-pink-500 to-purple-600' },
    { name: 'Blue to Cyan', value: 'from-blue-500 to-cyan-500' },
    { name: 'Green to Emerald', value: 'from-green-500 to-emerald-500' },
    { name: 'Orange to Red', value: 'from-orange-500 to-red-500' },
    { name: 'Purple to Pink', value: 'from-purple-600 to-pink-600' },
    { name: 'Yellow to Orange', value: 'from-yellow-500 to-orange-500' },
    { name: 'Black to Gray', value: 'from-gray-800 to-black' }
  ];

  const LinkForm = ({ link, onSave, onCancel }: { 
    link?: LinkItem; 
    onSave: (data: Partial<LinkItem>) => void;
    onCancel: () => void;
  }) => {
    const [formData, setFormData] = useState<Partial<LinkItem>>(link || {
      category: 'social',
      color: 'from-pink-500 to-purple-600',
      isVip: false,
      isNew: false
    });

    return (
      <Dialog open onOpenChange={onCancel}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-md">
          <DialogHeader>
            <DialogTitle>
              {link ? 'Edit Link' : 'Add New Link'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Link title"
                className="bg-gray-800 border-gray-600"
              />
            </div>
            <div>
              <Label>Subtitle (Optional)</Label>
              <Input
                value={formData.subtitle || ''}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                placeholder="Link subtitle"
                className="bg-gray-800 border-gray-600"
              />
            </div>
            <div>
              <Label>URL</Label>
              <Input
                value={formData.url || ''}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                placeholder="https://..."
                className="bg-gray-800 border-gray-600"
              />
            </div>
            <div>
              <Label>Category</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value as 'social' | 'content' | 'shopping' | 'entertainment' | 'vip' })}>
                <SelectTrigger className="bg-gray-800 border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="social">Social</SelectItem>
                  <SelectItem value="content">Content</SelectItem>
                  <SelectItem value="shopping">Shopping</SelectItem>
                  <SelectItem value="entertainment">Entertainment</SelectItem>
                  <SelectItem value="vip">VIP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Color Theme</Label>
              <Select value={formData.color} onValueChange={(value) => setFormData({ ...formData, color: value })}>
                <SelectTrigger className="bg-gray-800 border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {colorOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={formData.isVip}
                  onCheckedChange={(checked) => setFormData({ ...formData, isVip: checked })}
                />
                <Label>VIP Link</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={formData.isNew}
                  onCheckedChange={(checked) => setFormData({ ...formData, isNew: checked })}
                />
                <Label>New Badge</Label>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button onClick={() => onSave(formData)} className="flex-1">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" onClick={onCancel}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-pink-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Content Management
              </h1>
              <p className="text-gray-300">
                Manage your custom link page and content
              </p>
            </div>
            <div className="flex space-x-4">
              <Button
                variant="outline"
                className="border-pink-500 text-pink-400 hover:bg-pink-500 hover:text-white"
                onClick={() => window.open('/luna-star', '_blank')}
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button
                className="bg-gradient-to-r from-pink-500 to-purple-600"
                onClick={() => window.open('/luna-star/analytics', '_blank')}
              >
                <Star className="w-4 h-4 mr-2" />
                Analytics
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex bg-black/20 rounded-lg p-1">
            {[
              { id: 'links', label: 'Links', icon: LinkIcon },
              { id: 'profile', label: 'Profile', icon: Star },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'links' | 'profile' | 'settings')}
                className={`
                  flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all
                  ${activeTab === tab.id 
                    ? 'bg-pink-500 text-white' 
                    : 'text-gray-300 hover:text-white'
                  }
                `}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Links Tab */}
        {activeTab === 'links' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Manage Links</h2>
              <Button
                onClick={() => setIsAddingLink(true)}
                className="bg-gradient-to-r from-pink-500 to-purple-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Link
              </Button>
            </div>

            <div className="grid gap-4">
              {links.map((link) => (
                <Card key={link.id} className="bg-black/40 border-gray-700 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${link.color} flex items-center justify-center`}>
                          <LinkIcon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="text-white font-semibold">{link.title}</h3>
                            {link.isVip && <Badge variant="destructive">VIP</Badge>}
                            {link.isNew && <Badge variant="secondary">NEW</Badge>}
                            {!link.isActive && <Badge variant="outline">Inactive</Badge>}
                          </div>
                          <p className="text-gray-400 text-sm">{link.subtitle}</p>
                          <p className="text-gray-500 text-xs">{link.url}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={link.isActive}
                          onCheckedChange={() => handleToggleActive(link.id)}
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingLink(link)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteLink(link.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-white">Profile Settings</h2>
            
            <Card className="bg-black/40 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-white">Display Name</Label>
                  <Input
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label className="text-white">Bio</Label>
                  <Textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    className="bg-gray-800 border-gray-600 text-white h-24"
                  />
                </div>
                <div>
                  <Label className="text-white">Profile Image</Label>
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-white" />
                    </div>
                    <Button variant="outline">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Image
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-white">Advanced Settings</h2>
            
            <div className="grid gap-6">
              <Card className="bg-black/40 border-gray-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Globe className="w-5 h-5 mr-2" />
                    Domain & Branding
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-white">Custom Domain</Label>
                    <Input
                      value={profile.customDomain || ''}
                      onChange={(e) => setProfile({ ...profile, customDomain: e.target.value })}
                      placeholder="your-custom-domain.com"
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-white">Background Theme</Label>
                    <Select value={profile.backgroundTheme} onValueChange={(value) => setProfile({ ...profile, backgroundTheme: value })}>
                      <SelectTrigger className="bg-gray-800 border-gray-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="galaxy">Galaxy</SelectItem>
                        <SelectItem value="sunset">Sunset</SelectItem>
                        <SelectItem value="ocean">Ocean</SelectItem>
                        <SelectItem value="minimal">Minimal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-gray-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Privacy & Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Enable Analytics</Label>
                      <p className="text-gray-400 text-sm">Track visitor data and link performance</p>
                    </div>
                    <Switch
                      checked={profile.analytics}
                      onCheckedChange={(checked) => setProfile({ ...profile, analytics: checked })}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        {/* Link Form Modal */}
        <AnimatePresence>
          {(editingLink || isAddingLink) && (
            <LinkForm
              link={editingLink || undefined}
              onSave={handleSaveLink}
              onCancel={() => {
                setEditingLink(null);
                setIsAddingLink(false);
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LunaStarCMS;