"use client";

import { useState, useEffect } from 'react';
import { GlassCard } from '@/components/ui/glass-card';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  Zap, 
  Heart, 
  Star, 
  ArrowRight,
  Search,
  Bell,
  Settings,
  User
} from 'lucide-react';

export function ModernShowcase() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 transition-colors duration-500">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/10 dark:bg-blue-400/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-400/10 dark:bg-purple-400/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-400/10 dark:bg-pink-400/5 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="p-6">
          <nav className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-3">
              <GlassCard className="p-3 rounded-2xl">
                <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </GlassCard>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                ModernUI
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <GlassCard className="hidden md:flex items-center gap-3 px-4 py-2 rounded-full">
                <Search className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <Input 
                  placeholder="Search..." 
                  className="border-0 bg-transparent focus:ring-0 text-sm w-48"
                />
              </GlassCard>
              
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="glass-morphism w-10 h-10 rounded-full">
                  <Bell className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="glass-morphism w-10 h-10 rounded-full">
                  <Settings className="w-4 h-4" />
                </Button>
                <ThemeToggle />
              </div>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main className="px-6 pb-12">
          <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <section className={`text-center py-20 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <Badge className="glass-morphism mb-6 px-4 py-2 text-sm font-medium">
                ✨ Glass Morphism Design
              </Badge>
              
              <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 dark:from-white dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent leading-tight">
                Beautiful
                <br />
                Modern UI
              </h2>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Experience the future of web design with glass morphism effects, 
                smooth animations, and perfect dark mode integration.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="glass-morphism-elevated px-8 py-3 text-lg font-medium group">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button variant="outline" className="glass-morphism px-8 py-3 text-lg font-medium">
                  Learn More
                </Button>
              </div>
            </section>

            {/* Feature Cards */}
            <section className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              {[
                {
                  icon: Zap,
                  title: "Lightning Fast",
                  description: "Optimized performance with smooth 60fps animations and minimal resource usage.",
                  color: "text-yellow-500"
                },
                {
                  icon: Heart,
                  title: "User Focused",
                  description: "Designed with accessibility and user experience as the top priority.",
                  color: "text-red-500"
                },
                {
                  icon: Star,
                  title: "Premium Quality",
                  description: "Production-ready components with attention to every detail and interaction.",
                  color: "text-purple-500"
                }
              ].map((feature, index) => (
                <GlassCard 
                  key={index}
                  className="p-8 rounded-3xl hover:scale-105 transition-all duration-300 group cursor-pointer"
                >
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </GlassCard>
              ))}
            </section>

            {/* Interactive Demo Section */}
            <section className={`transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <GlassCard variant="elevated" className="p-12 rounded-3xl text-center">
                <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                  Interactive Components
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                  All components feature smooth hover effects, perfect contrast ratios, 
                  and seamless theme transitions.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {['Primary', 'Secondary', 'Success', 'Warning'].map((variant, index) => (
                    <Button 
                      key={variant}
                      className={`glass-morphism-subtle py-3 transition-all duration-300 hover:scale-105 ${
                        index === 0 ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400' :
                        index === 1 ? 'bg-purple-500/20 text-purple-600 dark:text-purple-400' :
                        index === 2 ? 'bg-green-500/20 text-green-600 dark:text-green-400' :
                        'bg-orange-500/20 text-orange-600 dark:text-orange-400'
                      }`}
                    >
                      {variant}
                    </Button>
                  ))}
                </div>
              </GlassCard>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}