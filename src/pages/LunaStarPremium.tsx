import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Crown, 
  DollarSign, 
  Users, 
  MessageCircle, 
  Video, 
  Image as ImageIcon,
  Lock,
  Star,
  Heart,
  Eye,
  Calendar,
  CreditCard,
  Globe,
  Shield,
  Zap,
  Bell,
  Gift,
  Camera,
  Music,
  Download
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Subscription {
  id: string;
  type: 'monthly' | 'yearly' | 'lifetime';
  price: number;
  features: string[];
  popular?: boolean;
}

interface ContentItem {
  id: string;
  type: 'photo' | 'video' | 'message' | 'live';
  title: string;
  thumbnail?: string;
  price?: number;
  isExclusive: boolean;
  likes: number;
  comments: number;
  createdAt: string;
}

interface Subscriber {
  id: string;
  name: string;
  avatar?: string;
  tier: 'free' | 'premium' | 'vip';
  joinDate: string;
  totalSpent: number;
}

const LunaStarPremium: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'content' | 'subscribers' | 'monetization'>('overview');
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [content, setContent] = useState<ContentItem[]>([]);
  const [revenue, setRevenue] = useState({
    monthly: 125420,
    growth: 15.7,
    subscribers: 15420,
    avgRevenue: 8.13
  });

  const subscriptionTiers: Subscription[] = [
    {
      id: 'free',
      type: 'monthly',
      price: 0,
      features: [
        'Access to free content',
        'Basic messaging',
        'Public posts',
        'Community access'
      ]
    },
    {
      id: 'premium',
      type: 'monthly',
      price: 19.99,
      features: [
        'All free features',
        'Exclusive premium content',
        'Direct messaging',
        'HD photo/video access',
        'Priority support',
        'Custom requests'
      ],
      popular: true
    },
    {
      id: 'vip',
      type: 'monthly',
      price: 49.99,
      features: [
        'All premium features',
        'VIP exclusive content',
        'Personal video calls',
        '1-on-1 messaging priority',
        'Custom content requests',
        'Early access to new content',
        'Personal shoutouts'
      ]
    }
  ];

  useEffect(() => {
    // Generate mock data
    const mockSubscribers: Subscriber[] = Array.from({ length: 50 }, (_, i) => ({
      id: `sub-${i}`,
      name: `User ${i + 1}`,
      tier: (['free', 'premium', 'vip'] as const)[Math.floor(Math.random() * 3)],
      joinDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
      totalSpent: Math.floor(Math.random() * 1000)
    }));

    const mockContent: ContentItem[] = Array.from({ length: 20 }, (_, i) => ({
      id: `content-${i}`,
      type: (['photo', 'video', 'message', 'live'] as const)[Math.floor(Math.random() * 4)],
      title: `Exclusive Content ${i + 1}`,
      price: Math.random() > 0.5 ? Math.floor(Math.random() * 50) + 10 : undefined,
      isExclusive: Math.random() > 0.3,
      likes: Math.floor(Math.random() * 1000),
      comments: Math.floor(Math.random() * 100),
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
    }));

    setSubscribers(mockSubscribers);
    setContent(mockContent);
  }, []);

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'photo': return ImageIcon;
      case 'video': return Video;
      case 'message': return MessageCircle;
      case 'live': return Camera;
      default: return ImageIcon;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'free': return 'bg-gray-500';
      case 'premium': return 'bg-purple-500';
      case 'vip': return 'bg-gradient-to-r from-yellow-400 to-orange-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-pink-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
                <Crown className="w-10 h-10 mr-3 text-yellow-400" />
                Luna Star Premium Platform
              </h1>
              <p className="text-gray-300">
                Your exclusive content platform with advanced monetization
              </p>
            </div>
            <div className="flex space-x-4">
              <Button className="bg-gradient-to-r from-pink-500 to-purple-600">
                <Video className="w-4 h-4 mr-2" />
                Go Live
              </Button>
              <Button variant="outline" className="border-yellow-400 text-yellow-400">
                <Crown className="w-4 h-4 mr-2" />
                VIP Only
              </Button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex bg-black/20 rounded-lg p-1">
            {[
              { id: 'overview', label: 'Overview', icon: Star },
              { id: 'content', label: 'Content', icon: ImageIcon },
              { id: 'subscribers', label: 'Subscribers', icon: Users },
              { id: 'monetization', label: 'Monetization', icon: DollarSign }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'overview' | 'content' | 'subscribers' | 'monetization')}
                className={`
                  flex items-center px-6 py-3 rounded-md text-sm font-medium transition-all flex-1
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

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Revenue Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-black/40 border-gray-700 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <DollarSign className="w-8 h-8 text-green-400" />
                    <Badge className="bg-green-500/20 text-green-400">+{revenue.growth}%</Badge>
                  </div>
                  <p className="text-2xl font-bold text-white">${revenue.monthly.toLocaleString()}</p>
                  <p className="text-gray-400">Monthly Revenue</p>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-gray-700 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Users className="w-8 h-8 text-blue-400" />
                    <Badge className="bg-blue-500/20 text-blue-400">+12.3%</Badge>
                  </div>
                  <p className="text-2xl font-bold text-white">{revenue.subscribers.toLocaleString()}</p>
                  <p className="text-gray-400">Total Subscribers</p>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-gray-700 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Crown className="w-8 h-8 text-yellow-400" />
                    <Badge className="bg-yellow-500/20 text-yellow-400">+8.7%</Badge>
                  </div>
                  <p className="text-2xl font-bold text-white">${revenue.avgRevenue}</p>
                  <p className="text-gray-400">Avg. Revenue Per User</p>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-gray-700 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Heart className="w-8 h-8 text-pink-400" />
                    <Badge className="bg-pink-500/20 text-pink-400">+25.1%</Badge>
                  </div>
                  <p className="text-2xl font-bold text-white">94.2%</p>
                  <p className="text-gray-400">Engagement Rate</p>
                </CardContent>
              </Card>
            </div>

            {/* Subscription Tiers */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Subscription Tiers</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {subscriptionTiers.map((tier) => (
                  <Card key={tier.id} className={`bg-black/40 border-gray-700 backdrop-blur-sm relative ${tier.popular ? 'ring-2 ring-pink-500' : ''}`}>
                    {tier.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-pink-500 text-white">Most Popular</Badge>
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="text-white text-center">
                        {tier.id.charAt(0).toUpperCase() + tier.id.slice(1)}
                      </CardTitle>
                      <div className="text-center">
                        <span className="text-4xl font-bold text-white">${tier.price}</span>
                        <span className="text-gray-400">/month</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {tier.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-gray-300">
                            <Star className="w-4 h-4 text-pink-400 mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full mt-6 bg-gradient-to-r from-pink-500 to-purple-600">
                        {tier.price === 0 ? 'Current Plan' : 'Upgrade'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Content Tab */}
        {activeTab === 'content' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Content Management</h2>
              <div className="flex space-x-2">
                <Button className="bg-gradient-to-r from-pink-500 to-purple-600">
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Upload Photo
                </Button>
                <Button className="bg-gradient-to-r from-blue-500 to-cyan-500">
                  <Video className="w-4 h-4 mr-2" />
                  Upload Video
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.map((item) => {
                const IconComponent = getContentIcon(item.type);
                return (
                  <Card key={item.id} className="bg-black/40 border-gray-700 backdrop-blur-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <IconComponent className="w-5 h-5 text-pink-400" />
                          <span className="text-white font-medium">{item.title}</span>
                        </div>
                        {item.isExclusive && (
                          <Badge className="bg-yellow-500/20 text-yellow-400">
                            <Lock className="w-3 h-3 mr-1" />
                            Exclusive
                          </Badge>
                        )}
                      </div>
                      
                      <div className="bg-gray-800 rounded-lg h-32 mb-3 flex items-center justify-center">
                        <IconComponent className="w-12 h-12 text-gray-600" />
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-4 text-gray-400">
                          <span className="flex items-center">
                            <Heart className="w-4 h-4 mr-1" />
                            {item.likes}
                          </span>
                          <span className="flex items-center">
                            <MessageCircle className="w-4 h-4 mr-1" />
                            {item.comments}
                          </span>
                        </div>
                        {item.price && (
                          <Badge className="bg-green-500/20 text-green-400">
                            ${item.price}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Subscribers Tab */}
        {activeTab === 'subscribers' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Subscriber Management</h2>
              <Button className="bg-gradient-to-r from-pink-500 to-purple-600">
                <Bell className="w-4 h-4 mr-2" />
                Send Announcement
              </Button>
            </div>

            <div className="grid gap-4">
              {subscribers.slice(0, 10).map((subscriber) => (
                <Card key={subscriber.id} className="bg-black/40 border-gray-700 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarFallback className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
                            {subscriber.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-white font-medium">{subscriber.name}</h3>
                          <p className="text-gray-400 text-sm">
                            Joined {new Date(subscriber.joinDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge className={getTierColor(subscriber.tier)}>
                          {subscriber.tier.toUpperCase()}
                        </Badge>
                        <div className="text-right">
                          <p className="text-white font-medium">${subscriber.totalSpent}</p>
                          <p className="text-gray-400 text-sm">Total Spent</p>
                        </div>
                        <Button size="sm" variant="outline">
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* Monetization Tab */}
        {activeTab === 'monetization' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-white">Monetization Tools</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Streams */}
              <Card className="bg-black/40 border-gray-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Revenue Streams</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Subscriptions</span>
                    <span className="text-white font-medium">$89,420</span>
                  </div>
                  <Progress value={71} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Pay-per-view Content</span>
                    <span className="text-white font-medium">$24,890</span>
                  </div>
                  <Progress value={20} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Tips & Gifts</span>
                    <span className="text-white font-medium">$11,110</span>
                  </div>
                  <Progress value={9} className="h-2" />
                </CardContent>
              </Card>

              {/* Payment Methods */}
              <Card className="bg-black/40 border-gray-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Payment Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-6 h-6 text-blue-400" />
                      <span className="text-white">Credit/Debit Cards</span>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400">Active</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <DollarSign className="w-6 h-6 text-green-400" />
                      <span className="text-white">Cryptocurrency</span>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400">Active</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Gift className="w-6 h-6 text-pink-400" />
                      <span className="text-white">Gift Cards</span>
                    </div>
                    <Badge className="bg-gray-500/20 text-gray-400">Coming Soon</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Advanced Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-black/40 border-gray-700 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-white font-bold mb-2">Live Streaming</h3>
                  <p className="text-gray-400 text-sm mb-4">Host live sessions with pay-per-view access</p>
                  <Button className="w-full">Setup Live Streaming</Button>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-gray-700 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <Calendar className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-white font-bold mb-2">Scheduled Content</h3>
                  <p className="text-gray-400 text-sm mb-4">Plan and schedule content releases</p>
                  <Button className="w-full">Schedule Content</Button>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-gray-700 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-white font-bold mb-2">Content Protection</h3>
                  <p className="text-gray-400 text-sm mb-4">Advanced DRM and watermarking</p>
                  <Button className="w-full">Enable Protection</Button>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LunaStarPremium;