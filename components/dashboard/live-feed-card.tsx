"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Truck, 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Package
} from 'lucide-react';

interface FeedItem {
  id: string;
  type: 'match' | 'pickup' | 'delivery' | 'quality_check';
  message: string;
  location: string;
  timestamp: Date;
  status: 'active' | 'completed' | 'pending';
}

export default function LiveFeedCard() {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);

  // Simulate real-time feed updates
  useEffect(() => {
    const mockFeedItems: FeedItem[] = [
      {
        id: '1',
        type: 'match',
        message: 'Green Garden Restaurant matched with Central Food Bank',
        location: 'Downtown Seattle',
        timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
        status: 'active'
      },
      {
        id: '2',
        type: 'pickup',
        message: '45 lbs of fresh produce collected from Whole Foods',
        location: 'Capitol Hill',
        timestamp: new Date(Date.now() - 12 * 60 * 1000), // 12 minutes ago
        status: 'completed'
      },
      {
        id: '3',
        type: 'quality_check',
        message: 'AI quality assessment: 98% Grade A produce verified',
        location: 'Distribution Center',
        timestamp: new Date(Date.now() - 18 * 60 * 1000), // 18 minutes ago
        status: 'completed'
      },
      {
        id: '4',
        type: 'delivery',
        message: 'Volunteer Sarah delivered 200 meals to Homeless Shelter',
        location: 'South Seattle',
        timestamp: new Date(Date.now() - 25 * 60 * 1000), // 25 minutes ago
        status: 'completed'
      },
      {
        id: '5',
        type: 'match',
        message: 'Catering surplus from Microsoft event matched with 3 recipients',
        location: 'Redmond',
        timestamp: new Date(Date.now() - 32 * 60 * 1000), // 32 minutes ago
        status: 'pending'
      }
    ];

    setFeedItems(mockFeedItems);

    // Simulate new items being added
    const interval = setInterval(() => {
      const newItem: FeedItem = {
        id: Math.random().toString(36).substr(2, 9),
        type: ['match', 'pickup', 'delivery', 'quality_check'][Math.floor(Math.random() * 4)] as any,
        message: [
          'Fresh bread surplus matched with Community Kitchen',
          'Volunteer driver en route for pickup',
          'Quality scan completed: 95% fresh produce',
          'Emergency food request fulfilled in 23 minutes'
        ][Math.floor(Math.random() * 4)],
        location: ['Downtown', 'Capitol Hill', 'Fremont', 'Ballard'][Math.floor(Math.random() * 4)],
        timestamp: new Date(),
        status: ['active', 'completed', 'pending'][Math.floor(Math.random() * 3)] as any
      };

      setFeedItems(prev => [newItem, ...prev.slice(0, 4)]);
    }, 8000); // Add new item every 8 seconds

    return () => clearInterval(interval);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'match': return Package;
      case 'pickup': return Truck;
      case 'delivery': return CheckCircle;
      case 'quality_check': return AlertCircle;
      default: return Package;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Live Activity Feed
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-80">
          <div className="space-y-4">
            {feedItems.map((item) => {
              const Icon = getIcon(item.type);
              return (
                <div key={item.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Icon className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{item.message}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <MapPin className="h-3 w-3" />
                        {item.location}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        {formatTime(item.timestamp)}
                      </div>
                    </div>
                  </div>
                  <Badge className={`${getStatusColor(item.status)} text-xs`}>
                    {item.status}
                  </Badge>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}