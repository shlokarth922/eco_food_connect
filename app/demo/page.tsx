"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Brain, 
  Truck, 
  Users, 
  Shield,
  Zap,
  MapPin,
  Package,
  Clock,
  CheckCircle,
  TrendingUp
} from 'lucide-react';
import Header from '@/components/layout/header';

export default function DemoPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const demoSteps = [
    {
      id: 'prediction',
      title: 'AI Surplus Prediction',
      description: 'ML algorithms analyze sales data, weather, and events to predict 45 lbs of produce surplus',
      icon: Brain,
      color: 'text-purple-600',
      duration: 3000
    },
    {
      id: 'matching',
      title: 'Smart Recipient Matching',
      description: 'System matches surplus with Central Food Bank based on location, capacity, and nutritional needs',
      icon: Users,
      color: 'text-blue-600',
      duration: 2500
    },
    {
      id: 'routing',
      title: 'Route Optimization',
      description: 'AI calculates most efficient delivery route, considering traffic and carbon footprint',
      icon: Truck,
      color: 'text-green-600',
      duration: 2000
    },
    {
      id: 'quality',
      title: 'Quality Assessment',
      description: 'Computer vision scans food quality: 98% Grade A produce verified for donation',
      icon: CheckCircle,
      color: 'text-yellow-600',
      duration: 2500
    },
    {
      id: 'blockchain',
      title: 'Blockchain Verification',
      description: 'Transaction recorded on blockchain for transparency and food safety compliance',
      icon: Shield,
      color: 'text-indigo-600',
      duration: 2000
    },
    {
      id: 'delivery',
      title: 'Volunteer Delivery',
      description: 'Volunteer Sarah completes pickup and delivery, earning 50 impact points',
      icon: Zap,
      color: 'text-orange-600',
      duration: 3000
    }
  ];

  const liveMetrics = {
    foodSaved: 12847,
    mealsDelivered: 3421,
    co2Prevented: 8.2,
    activeMatches: 156,
    volunteers: 89,
    accuracy: 94.2
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 1;
          
          if (newProgress >= 100) {
            setCurrentStep(prevStep => {
              const nextStep = (prevStep + 1) % demoSteps.length;
              return nextStep;
            });
            return 0;
          }
          
          return newProgress;
        });
      }, demoSteps[currentStep]?.duration / 100 || 30);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentStep, demoSteps]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  const currentStepData = demoSteps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            EcoFood Connect Live Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Watch our AI-powered platform in action as it predicts surplus food, matches recipients, 
            and coordinates sustainable deliveries in real-time.
          </p>
        </div>

        {/* Demo Controls */}
        <div className="flex justify-center gap-4 mb-8">
          <Button 
            onClick={handlePlayPause}
            className={`${isPlaying ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} flex items-center gap-2`}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {isPlaying ? 'Pause Demo' : 'Start Demo'}
          </Button>
          <Button variant="outline" onClick={handleReset} className="flex items-center gap-2">
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </div>

        {/* Live Metrics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8">
          <Card className="border-green-200">
            <CardContent className="p-4 text-center">
              <Package className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-600">{liveMetrics.foodSaved.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Food Saved (lbs)</p>
            </CardContent>
          </Card>
          <Card className="border-blue-200">
            <CardContent className="p-4 text-center">
              <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-600">{liveMetrics.mealsDelivered.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Meals Delivered</p>
            </CardContent>
          </Card>
          <Card className="border-purple-200">
            <CardContent className="p-4 text-center">
              <Zap className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-600">{liveMetrics.co2Prevented}</p>
              <p className="text-sm text-gray-600">CO₂ Saved (tons)</p>
            </CardContent>
          </Card>
          <Card className="border-orange-200">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-6 w-6 text-orange-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-orange-600">{liveMetrics.activeMatches}</p>
              <p className="text-sm text-gray-600">Active Matches</p>
            </CardContent>
          </Card>
          <Card className="border-indigo-200">
            <CardContent className="p-4 text-center">
              <Users className="h-6 w-6 text-indigo-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-indigo-600">{liveMetrics.volunteers}</p>
              <p className="text-sm text-gray-600">Volunteers Online</p>
            </CardContent>
          </Card>
          <Card className="border-pink-200">
            <CardContent className="p-4 text-center">
              <Brain className="h-6 w-6 text-pink-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-pink-600">{liveMetrics.accuracy}%</p>
              <p className="text-sm text-gray-600">AI Accuracy</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Demo Visualization */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <currentStepData.icon className={`h-6 w-6 ${currentStepData.color}`} />
              {currentStepData.title}
            </CardTitle>
            <CardDescription>{currentStepData.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between text-sm text-gray-600">
                <span>Step {currentStep + 1} of {demoSteps.length}</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Demo Steps Timeline */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Demo Timeline</CardTitle>
            <CardDescription>Follow the complete food recovery journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {demoSteps.map((step, index) => (
                <div 
                  key={step.id} 
                  className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
                    index === currentStep 
                      ? 'bg-blue-50 border-2 border-blue-200' 
                      : index < currentStep 
                        ? 'bg-green-50 border border-green-200' 
                        : 'bg-gray-50 border border-gray-200'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    index === currentStep 
                      ? 'bg-blue-100' 
                      : index < currentStep 
                        ? 'bg-green-100' 
                        : 'bg-gray-100'
                  }`}>
                    <step.icon className={`h-5 w-5 ${
                      index === currentStep 
                        ? 'text-blue-600' 
                        : index < currentStep 
                          ? 'text-green-600' 
                          : 'text-gray-400'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                  {index < currentStep && (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  )}
                  {index === currentStep && (
                    <Badge className="bg-blue-100 text-blue-700">
                      Active
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Technology Features */}
        <Tabs defaultValue="ai" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="ai">AI/ML</TabsTrigger>
            <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
            <TabsTrigger value="logistics">Logistics</TabsTrigger>
            <TabsTrigger value="api">Open API</TabsTrigger>
          </TabsList>

          <TabsContent value="ai" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-600" />
                  Artificial Intelligence & Machine Learning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Surplus Prediction Model</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Historical sales pattern analysis</li>
                      <li>• Weather impact modeling</li>
                      <li>• Event-based demand forecasting</li>
                      <li>• Seasonal trend recognition</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Computer Vision Quality Assessment</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Automated freshness detection</li>
                      <li>• Cosmetic vs. safety defect classification</li>
                      <li>• Real-time quality scoring</li>
                      <li>• Safety compliance verification</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="blockchain" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-indigo-600" />
                  Blockchain Verification System
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Transaction Transparency</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Immutable donation records</li>
                      <li>• End-to-end traceability</li>
                      <li>• Quality check verification</li>
                      <li>• Delivery confirmation</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Food Safety Compliance</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Automated compliance checking</li>
                      <li>• Temperature monitoring logs</li>
                      <li>• Chain of custody documentation</li>
                      <li>• Regulatory reporting</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logistics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-green-600" />
                  Sustainable Logistics Network
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Route Optimization</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Real-time traffic integration</li>
                      <li>• Multi-stop delivery planning</li>
                      <li>• Carbon footprint minimization</li>
                      <li>• Electric vehicle prioritization</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Volunteer Network</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Gamified participation system</li>
                      <li>• Skill-based task matching</li>
                      <li>• Impact point rewards</li>
                      <li>• Community leaderboards</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="api" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-orange-600" />
                  Open API Ecosystem
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Integration Endpoints</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Restaurant POS system integration</li>
                      <li>• Grocery inventory management</li>
                      <li>• Charity management platforms</li>
                      <li>• Event planning software</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Real-time Webhooks</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Match notifications</li>
                      <li>• Delivery status updates</li>
                      <li>• Quality assessment results</li>
                      <li>• Impact metric reporting</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}