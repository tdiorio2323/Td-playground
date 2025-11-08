import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  MousePointer, 
  Eye, 
  Calendar,
  DollarSign,
  Star,
  BarChart3,
  PieChart,
  Activity,
  Download,
  Filter,
  RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface AnalyticsData {
  totalVisits: number;
  totalClicks: number;
  conversionRate: number;
  revenue: number;
  topLinks: Array<{
    name: string;
    clicks: number;
    conversion: number;
    revenue: number;
  }>;
  dailyStats: Array<{
    date: string;
    visits: number;
    clicks: number;
    revenue: number;
  }>;
  demographics: {
    countries: Array<{ name: string; percentage: number; }>;
    devices: Array<{ type: string; percentage: number; }>;
    referrers: Array<{ source: string; percentage: number; }>;
  };
}

const LunaStarAnalytics: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [isLoading, setIsLoading] = useState(true);

  // Mock data generation
  useEffect(() => {
    const generateMockData = (): AnalyticsData => {
      return {
        totalVisits: 458932,
        totalClicks: 89456,
        conversionRate: 19.5,
        revenue: 125420,
        topLinks: [
          { name: 'Fansly VIP', clicks: 23450, conversion: 35.2, revenue: 45600 },
          { name: 'OnlyFans FREE', clicks: 18930, conversion: 12.8, revenue: 18500 },
          { name: 'MYM Content', clicks: 15670, conversion: 28.5, revenue: 32100 },
          { name: 'Instagram', clicks: 12340, conversion: 5.2, revenue: 0 },
          { name: 'Amazon Shop', clicks: 8920, conversion: 22.1, revenue: 15400 },
          { name: 'X (Twitter)', clicks: 6780, conversion: 3.8, revenue: 0 },
          { name: 'Direct Message', clicks: 3210, conversion: 45.6, revenue: 13820 }
        ],
        dailyStats: Array.from({ length: 30 }, (_, i) => ({
          date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          visits: Math.floor(Math.random() * 5000) + 10000,
          clicks: Math.floor(Math.random() * 1000) + 2000,
          revenue: Math.floor(Math.random() * 2000) + 3000
        })),
        demographics: {
          countries: [
            { name: 'United States', percentage: 45.2 },
            { name: 'Canada', percentage: 18.7 },
            { name: 'United Kingdom', percentage: 12.4 },
            { name: 'Australia', percentage: 8.9 },
            { name: 'Germany', percentage: 6.1 },
            { name: 'Others', percentage: 8.7 }
          ],
          devices: [
            { type: 'Mobile', percentage: 72.3 },
            { type: 'Desktop', percentage: 21.4 },
            { type: 'Tablet', percentage: 6.3 }
          ],
          referrers: [
            { source: 'Instagram', percentage: 38.5 },
            { source: 'Twitter/X', percentage: 24.2 },
            { source: 'Direct', percentage: 18.9 },
            { source: 'TikTok', percentage: 12.7 },
            { source: 'Others', percentage: 5.7 }
          ]
        }
      };
    };

    setTimeout(() => {
      setAnalyticsData(generateMockData());
      setIsLoading(false);
    }, 1000);
  }, [timeRange]);

  if (isLoading || !analyticsData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-white text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Loading analytics...</p>
        </div>
      </div>
    );
  }

  const statsCards = [
    {
      title: 'Total Visits',
      value: analyticsData.totalVisits.toLocaleString(),
      change: '+12.5%',
      icon: Eye,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Total Clicks',
      value: analyticsData.totalClicks.toLocaleString(),
      change: '+8.2%',
      icon: MousePointer,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Conversion Rate',
      value: `${analyticsData.conversionRate}%`,
      change: '+2.1%',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Revenue',
      value: `$${analyticsData.revenue.toLocaleString()}`,
      change: '+15.7%',
      icon: DollarSign,
      color: 'from-yellow-500 to-orange-500'
    }
  ];

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
              <h1 className="text-4xl font-bold text-white mb-2">
                Luna Star Analytics
              </h1>
              <p className="text-gray-300">
                Track your performance and optimize your strategy
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex bg-black/20 rounded-lg p-1">
                {['7d', '30d', '90d'].map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range as '7d' | '30d' | '90d')}
                    className={`
                      px-4 py-2 rounded-md text-sm font-medium transition-all
                      ${timeRange === range 
                        ? 'bg-pink-500 text-white' 
                        : 'text-gray-300 hover:text-white'
                      }
                    `}
                  >
                    {range.toUpperCase()}
                  </button>
                ))}
              </div>
              <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {statsCards.map((stat, index) => (
            <Card key={stat.title} className="bg-black/40 border-gray-700 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                    {stat.change}
                  </Badge>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white mb-1">
                    {stat.value}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {stat.title}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Top Links Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
        >
          <Card className="bg-black/40 border-gray-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Top Performing Links
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.topLinks.map((link, index) => (
                  <div key={link.name} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-white font-medium">{link.name}</p>
                        <p className="text-gray-400 text-sm">{link.clicks.toLocaleString()} clicks</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-green-400 font-medium">{link.conversion}%</p>
                      <p className="text-gray-400 text-sm">${link.revenue.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Demographics */}
          <Card className="bg-black/40 border-gray-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <PieChart className="w-5 h-5 mr-2" />
                Audience Demographics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Countries */}
                <div>
                  <h4 className="text-white font-medium mb-3">Top Countries</h4>
                  <div className="space-y-2">
                    {analyticsData.demographics.countries.slice(0, 4).map((country) => (
                      <div key={country.name} className="flex items-center justify-between">
                        <span className="text-gray-300">{country.name}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className={`h-full bg-gradient-to-r from-pink-500 to-purple-600`}
                              style={{ width: `${country.percentage}%` }}
                            />
                          </div>
                          <span className="text-white text-sm w-10">{country.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Devices */}
                <div>
                  <h4 className="text-white font-medium mb-3">Device Types</h4>
                  <div className="flex space-x-2">
                    {analyticsData.demographics.devices.map((device) => (
                      <div key={device.type} className="flex-1 text-center">
                        <div 
                          className={`h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-1`}
                          style={{ width: `${device.percentage}%` }}
                        />
                        <p className="text-gray-300 text-xs">{device.type}</p>
                        <p className="text-white text-sm">{device.percentage}%</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Revenue Tracking */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-black/40 border-gray-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                Revenue Trends (Last 30 Days)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end space-x-1">
                {analyticsData.dailyStats.slice(-14).map((day, index) => {
                  const maxRevenue = Math.max(...analyticsData.dailyStats.map(d => d.revenue));
                  const height = (day.revenue / maxRevenue) * 100;
                  
                  return (
                    <div key={day.date} className="flex-1 flex flex-col items-center">
                      <div 
                        className={`w-full bg-gradient-to-t from-pink-500 to-purple-600 rounded-t-sm hover:from-pink-400 hover:to-purple-500 transition-colors cursor-pointer`}
                        style={{ height: `${height}%` }}
                        title={`${day.date}: $${day.revenue}`}
                      />
                      <p className="text-gray-400 text-xs mt-2 rotate-45 origin-left">
                        {new Date(day.date).getDate()}
                      </p>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-gray-400">Avg. Daily Revenue</p>
                  <p className="text-white font-bold text-lg">
                    ${Math.round(analyticsData.dailyStats.reduce((sum, day) => sum + day.revenue, 0) / analyticsData.dailyStats.length).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">Peak Day</p>
                  <p className="text-white font-bold text-lg">
                    ${Math.max(...analyticsData.dailyStats.map(d => d.revenue)).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">Growth Rate</p>
                  <p className="text-green-400 font-bold text-lg">+15.7%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default LunaStarAnalytics;