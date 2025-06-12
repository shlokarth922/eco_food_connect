"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Leaf, 
  Users, 
  Truck, 
  Brain, 
  Shield, 
  BarChart3,
  ArrowRight,
  Zap,
  Globe,
  Heart
} from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import StatsCard from '@/components/dashboard/stats-card';
import LiveFeedCard from '@/components/dashboard/live-feed-card';
import LoadingScreen from '@/components/ui/loading-screen';

export default function Home() {
  const [selectedRole, setSelectedRole] = useState<string>('donor');
  const [isLoading, setIsLoading] = useState(true);

  const features = [
    {
      icon: Brain,
      title: "AI Surplus Prediction",
      description: "Machine learning analyzes sales patterns, weather, and events to predict food surplus with 94% accuracy."
    },
    {
      icon: Users,
      title: "Smart Matching",
      description: "Dynamically matches food donations to recipients based on type, quantity, location, and nutritional needs."
    },
    {
      icon: Truck,
      title: "Route Optimization",
      description: "AI-powered logistics minimize emissions and delivery time with real-time traffic and weather integration."
    },
    {
      icon: Shield,
      title: "Blockchain Verification",
      description: "Transparent, tamper-proof records of all donations and deliveries for complete food safety assurance."
    },
    {
      icon: Zap,
      title: "Zero-Impact Logistics",
      description: "Electric vehicle priority, carbon tracking, and automated offset recommendations for sustainable delivery."
    },
    {
      icon: Globe,
      title: "Open API Network",
      description: "RESTful APIs enable seamless integration with existing restaurant, store, and charity management systems."
    }
  ];

  const roles = [
    {
      id: 'donor',
      title: 'Food Donors',
      description: 'Restaurants, grocery stores, and event organizers',
      icon: Leaf,
      color: 'bg-green-100 text-green-700'
    },
    {
      id: 'recipient',
      title: 'Recipients',
      description: 'Charities, food banks, and composting centers',
      icon: Heart,
      color: 'bg-blue-100 text-blue-700'
    },
    {
      id: 'volunteer',
      title: 'Volunteers',
      description: 'Community members for last-mile delivery',
      icon: Users,
      color: 'bg-purple-100 text-purple-700'
    },
    {
      id: 'admin',
      title: 'Administrators',
      description: 'Platform oversight and analytics management',
      icon: BarChart3,
      color: 'bg-orange-100 text-orange-700'
    }
  ];

  useEffect(() => {
    // Simulate initial loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <Header />
      
      {/* Hero Section */}
      <section className="px-4 py-20 md:py-32">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-green-100 text-green-700 hover:bg-green-200">
            AI-Powered Food Waste Reduction
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Connect Surplus Food with Communities in Need
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            EcoFood Connect uses artificial intelligence to predict food surplus, match donations with recipients, 
            and optimize sustainable delivery routes - reducing waste while fighting hunger.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard/donor">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button variant="outline" size="lg">
                View Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Live Stats Section */}
      <section className="px-4 py-16 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Real-Time Impact Dashboard
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Food Saved Today"
              value="12,847"
              unit="lbs"
              change="+23%"
              icon={Leaf}
              color="text-green-600"
            />
            <StatsCard
              title="Meals Delivered"
              value="3,421"
              unit="meals"
              change="+18%"
              icon={Heart}
              color="text-blue-600"
            />
            <StatsCard
              title="CO₂ Prevented"
              value="8.2"
              unit="tons"
              change="+31%"
              icon={Zap}
              color="text-purple-600"
            />
            <StatsCard
              title="Active Matches"
              value="156"
              unit="live"
              change="+12%"
              icon={Users}
              color="text-orange-600"
            />
          </div>
          <LiveFeedCard />
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Powered by Advanced AI Technology
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <feature.icon className="h-6 w-6 text-green-600" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* User Roles Section */}
      <section className="px-4 py-16 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Built for Every Role in the Food Recovery Ecosystem
          </h2>
          <Tabs value={selectedRole} onValueChange={setSelectedRole} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
              {roles.map((role) => (
                <TabsTrigger key={role.id} value={role.id} className="flex items-center gap-2">
                  <role.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{role.title.split(' ')[0]}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            {roles.map((role) => (
              <TabsContent key={role.id} value={role.id}>
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${role.color}`}>
                        <role.icon className="h-8 w-8" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl">{role.title}</CardTitle>
                        <CardDescription className="text-lg">
                          {role.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4">
                      <Link href={`/dashboard/${role.id}`}>
                        <Button className="bg-green-600 hover:bg-green-700">
                          Access {role.title} Dashboard
                        </Button>
                      </Link>
                      <Link href="/api/docs">
                        <Button variant="outline">
                          View API Documentation
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
}