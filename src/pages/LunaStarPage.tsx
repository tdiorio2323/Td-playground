import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Instagram, MessageCircle, ShoppingBag, Heart, Eye, Play, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LinkData {
  id: string;
  title: string;
  subtitle?: string;
  url: string;
  icon: React.ReactNode;
  category: 'social' | 'content' | 'shopping' | 'entertainment' | 'vip';
  isVip?: boolean;
  isNew?: boolean;
  color: string;
}

const LunaStarPage: React.FC = () => {
  const [visitCount, setVisitCount] = useState(0);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const links: LinkData[] = [
    {
      id: 'x-twitter',
      title: 'Follow on X',
      subtitle: '@cutelunastar',
      url: 'https://x.com/cutelunastar',
      icon: <Star className="w-6 h-6" />,
      category: 'social',
      color: 'from-gray-800 to-black'
    },
    {
      id: 'instagram',
      title: 'Instagram',
      subtitle: '@luna5star',
      url: 'https://instagram.com/luna5star',
      icon: <Instagram className="w-6 h-6" />,
      category: 'social',
      color: 'from-pink-500 to-purple-600'
    },
    {
      id: 'fansly-vip',
      title: 'Fansly VIP',
      subtitle: 'Exclusive Premium Content',
      url: '#', // Replace with actual Fansly URL
      icon: <Star className="w-6 h-6" />,
      category: 'vip',
      isVip: true,
      color: 'from-purple-600 to-pink-600'
    },
    {
      id: 'onlyfans-free',
      title: 'FREE OnlyFans',
      subtitle: 'Free Content Access',
      url: '#', // Replace with actual OnlyFans URL
      icon: <Heart className="w-6 h-6" />,
      category: 'content',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'mym-content',
      title: 'MYM • New Exclusive Content',
      subtitle: 'Latest Updates',
      url: '#', // Replace with actual MYM URL
      icon: <Eye className="w-6 h-6" />,
      category: 'content',
      isNew: true,
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 'prime-video',
      title: 'Watch Suckers | Prime Video',
      subtitle: 'Featured Content',
      url: 'https://www.amazon.com/Suckers-Brandon-Morson/dp/B0DBXXHZ8S',
      icon: <Play className="w-6 h-6" />,
      category: 'entertainment',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 'wish-list',
      title: 'Wish List ♥',
      subtitle: 'Support Luna',
      url: 'https://www.amazon.com/hz/wishlist/ls/3RAZ5RSG1417Z',
      icon: <Gift className="w-6 h-6" />,
      category: 'shopping',
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 'amazon-shop',
      title: 'Buy what I buy',
      subtitle: 'Shop My Favorites',
      url: 'https://www.amazon.com/shop/luna5star',
      icon: <ShoppingBag className="w-6 h-6" />,
      category: 'shopping',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      id: 'cooking-videos',
      title: 'Watch Me Cook',
      subtitle: 'Cooking Content',
      url: 'https://of.tv/v/JEyDe',
      icon: <Play className="w-6 h-6" />,
      category: 'entertainment',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'direct-message',
      title: 'Talk to me',
      subtitle: 'Direct Communication',
      url: '#', // Replace with actual messaging URL
      icon: <MessageCircle className="w-6 h-6" />,
      category: 'social',
      color: 'from-pink-500 to-rose-500'
    }
  ];

  useEffect(() => {
    // Simulate visit tracking
    setVisitCount(Math.floor(Math.random() * 50000) + 100000);
  }, []);

  const handleLinkClick = (link: LinkData) => {
    // Track click analytics here
    console.log(`Link clicked: ${link.title}`);
    if (link.url !== '#') {
      window.open(link.url, '_blank');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-40 left-1/2 w-60 h-60 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-md mx-auto px-6 py-12">
        {/* Profile Section */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 10, stiffness: 100, delay: 0.2 }}
          className="text-center mb-8"
        >
          <div className="w-32 h-32 mx-auto mb-6 relative">
            <div className="w-full h-full bg-gradient-to-br from-pink-500 to-purple-600 rounded-full p-1">
              <div className="w-full h-full bg-gray-800 rounded-full flex items-center justify-center">
                {/* Replace with actual profile image */}
                <Star className="w-16 h-16 text-white" />
              </div>
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center">
              <Star className="w-4 h-4 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Luna Star
          </h1>
          
          <p className="text-gray-300 text-lg mb-4">
            Come and explore the world with me🌎<br />
            Follow all my pages ❤️
          </p>
          
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
            <span className="flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              {visitCount.toLocaleString()} visits
            </span>
            <span className="flex items-center">
              <Star className="w-4 h-4 mr-1" />
              10M+ followers
            </span>
          </div>
        </motion.div>

        {/* Links Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {links.map((link) => (
            <motion.div
              key={link.id}
              variants={itemVariants}
              onHoverStart={() => setHoveredLink(link.id)}
              onHoverEnd={() => setHoveredLink(null)}
              onClick={() => handleLinkClick(link)}
              className="cursor-pointer group"
            >
              <div className={`
                relative overflow-hidden rounded-2xl p-1 
                bg-gradient-to-r ${link.color}
                transform transition-all duration-300 ease-out
                hover:scale-105 hover:shadow-2xl
                ${hoveredLink === link.id ? 'scale-105 shadow-2xl' : ''}
              `}>
                <div className="bg-black/80 backdrop-blur-sm rounded-xl p-4 relative">
                  <div className="flex items-center space-x-4">
                    <div className={`
                      p-3 rounded-xl bg-gradient-to-r ${link.color}
                      transform transition-transform duration-300
                      ${hoveredLink === link.id ? 'rotate-12 scale-110' : ''}
                    `}>
                      {link.icon}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-white font-semibold text-lg">
                          {link.title}
                        </h3>
                        {link.isVip && (
                          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs px-2 py-1 rounded-full font-bold">
                            VIP
                          </span>
                        )}
                        {link.isNew && (
                          <span className="bg-gradient-to-r from-green-400 to-emerald-500 text-black text-xs px-2 py-1 rounded-full font-bold">
                            NEW
                          </span>
                        )}
                      </div>
                      {link.subtitle && (
                        <p className="text-gray-400 text-sm">
                          {link.subtitle}
                        </p>
                      )}
                    </div>
                    
                    <div className={`
                      w-8 h-8 rounded-full bg-white/10 flex items-center justify-center
                      transform transition-transform duration-300
                      ${hoveredLink === link.id ? 'translate-x-2' : ''}
                    `}>
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Hover effect overlay */}
                  <AnimatePresence>
                    {hoveredLink === link.id && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute inset-0 bg-white/5 rounded-xl pointer-events-none"
                      />
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-center"
        >
          <div className="flex justify-center space-x-4 mb-6">
            <Button
              onClick={() => window.open('/luna-star/cms', '_blank')}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
            >
              <Star className="w-4 h-4 mr-2" />
              Manage Content
            </Button>
            <Button
              onClick={() => window.open('/luna-star/analytics', '_blank')}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
            >
              <Eye className="w-4 h-4 mr-2" />
              View Analytics
            </Button>
            <Button
              onClick={() => window.open('/luna-star/premium', '_blank')}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
            >
              <Star className="w-4 h-4 mr-2" />
              Premium Platform
            </Button>
          </div>
          <p className="text-gray-500 text-sm mb-4">
            Powered by Custom Platform • Premium Experience
          </p>
          <div className="flex justify-center space-x-4">
            <button className="text-gray-400 hover:text-white transition-colors">
              Privacy
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              Terms
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              Contact
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LunaStarPage;