"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Package, 
  Clock, 
  MapPin, 
  Brain,
  ChefHat,
  Leaf,
  Users,
  Camera,
  Plus
} from 'lucide-react';
import Header from '@/components/layout/header';
import StatsCard from '@/components/dashboard/stats-card';
import SurplusPredictionCard from '@/components/dashboard/donor/surplus-prediction-card';
import ActiveDonationsCard from '@/components/dashboard/donor/active-donations-card';
import ImpactVisualizationCard from '@/components/dashboard/donor/impact-visualization-card';
import AddDonationDialog from '@/components/dashboard/donor/add-donation-dialog';

export default function DonorDashboard() {
  const [showAddDonation, setShowAddDonation] = useState(false);
  const [predictions, setPredictions] = useState<any[]>([]);

  useEffect(() => {
    // Simulate AI predictions loading
    const mockPredictions = [
      {
        id: '1',
        item: 'Fresh Salad Mix',
        quantity: '45 lbs',
        confidence: 94,
        timeWindow: '2-4 hours',
        peakTime: '6:00 PM',
        reason: 'Historical demand pattern + weather data'
      },
      {
        id: '2',
        item: 'Sandwich Platters',
        quantity: '12 trays',
        confidence: 87,
        timeWindow: '4-6 hours',
        peakTime: '7:30 PM',
        reason: 'Event overorder detected'
      },
      {
        id: '3',
        item: 'Baked Goods',
        quantity: '28 items',
        confidence: 92,
        timeWindow: '1-2 hours',
        peakTime: '8:00 PM',
        reason: 'Daily production surplus pattern'
      }
    ];

    setPredictions(mockPredictions);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Food Donor Dashboard</h1>
            <p className="text-gray-600">AI-powered surplus prediction and donation management</p>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
            >
              <Camera className="h-4 w-4" />
              Quick Scan
            </Button>
            <Button 
              onClick={() => setShowAddDonation(true)}
              className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Donation
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Today's Surplus"
            value="127"
            unit="lbs"
            change="+15%"
            icon={Package}
            color="text-blue-600"
          />
          <StatsCard
            title="AI Accuracy"
            value="94.2"
            unit="%"
            change="+2.1%"
            icon={Brain}
            color="text-purple-600"
          />
          <StatsCard
            title="Active Donations"
            value="8"
            unit="live"
            change="+3"
            icon={TrendingUp}
            color="text-green-600"
          />
          <StatsCard
            title="Impact Score"
            value="2,847"
            unit="meals"
            change="+23%"
            icon={Leaf}
            color="text-orange-600"
          />
        </div>

        <Tabs defaultValue="predictions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="predictions" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              AI Predictions
            </TabsTrigger>
            <TabsTrigger value="active" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Active Donations
            </TabsTrigger>
            <TabsTrigger value="impact" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Impact Analytics
            </TabsTrigger>
            <TabsTrigger value="quality" className="flex items-center gap-2">
              <Camera className="h-4 w-4" />
              Quality Checks
            </TabsTrigger>
          </TabsList>

          <TabsContent value="predictions" className="space-y-6">
            <SurplusPredictionCard predictions={predictions} />
          </TabsContent>

          <TabsContent value="active" className="space-y-6">
            <ActiveDonationsCard />
          </TabsContent>

          <TabsContent value="impact" className="space-y-6">
            <ImpactVisualizationCard />
          </TabsContent>

          <TabsContent value="quality" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  AI Quality Assessment
                </CardTitle>
                <CardDescription>
                  Computer vision-powered food quality analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Recent Quality Scans</h3>
                    <div className="space-y-3">
                      {[
                        { item: 'Mixed Greens', quality: 98, status: 'Grade A', color: 'text-green-600' },
                        { item: 'Bread Loaves', quality: 85, status: 'Grade B', color: 'text-yellow-600' },
                        { item: 'Dairy Products', quality: 92, status: 'Grade A', color: 'text-green-600' },
                      ].map((scan, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">{scan.item}</p>
                            <p className={`text-sm ${scan.color}`}>{scan.status}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold">{scan.quality}%</p>
                            <Progress value={scan.quality} className="w-20 h-2" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold">Quality Guidelines</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span>Grade A (90-100%): Perfect for immediate donation</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span>Grade B (70-89%): Good for processing/cooking</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                        <span>Grade C (50-69%): Suitable for composting</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span>Below 50%: Not suitable for donation</span>
                      </div>
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Start Quality Scan
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <AddDonationDialog 
        open={showAddDonation} 
        onOpenChange={setShowAddDonation} 
      />
    </div>
  );
}