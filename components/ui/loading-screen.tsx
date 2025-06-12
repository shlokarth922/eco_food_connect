"use client";

import { useEffect, useState } from 'react';
import { Leaf, Brain, Users, Truck, Shield, Zap } from 'lucide-react';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { icon: Brain, text: "Initializing AI Systems", color: "text-purple-500" },
    { icon: Leaf, text: "Loading Food Network", color: "text-green-500" },
    { icon: Users, text: "Connecting Communities", color: "text-blue-500" },
    { icon: Truck, text: "Optimizing Routes", color: "text-orange-500" },
    { icon: Shield, text: "Securing Blockchain", color: "text-indigo-500" },
    { icon: Zap, text: "Ready to Connect", color: "text-yellow-500" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 2;
        
        // Update current step based on progress
        const stepIndex = Math.floor((newProgress / 100) * steps.length);
        setCurrentStep(Math.min(stepIndex, steps.length - 1));
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete?.();
          }, 500);
          return 100;
        }
        
        return newProgress;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete, steps.length]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center z-50">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-green-200 rounded-full opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        {/* Logo with pulse animation */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-green-500 rounded-full opacity-20 animate-ping"></div>
          <div className="relative p-6 bg-white rounded-full shadow-lg border border-green-100">
            <Leaf className="h-12 w-12 text-green-600 animate-bounce" />
          </div>
        </div>

        {/* Brand name with gradient */}
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          EcoFood Connect
        </h1>
        <p className="text-gray-600 mb-8 animate-fade-in">
          AI-Powered Food Waste Reduction
        </p>

        {/* Progress bar with glow effect */}
        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white opacity-30 animate-pulse"></div>
            </div>
          </div>
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>Loading...</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Current step indicator */}
        <div className="space-y-4">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            
            return (
              <div 
                key={index}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-500 ${
                  isActive 
                    ? 'bg-white shadow-md scale-105 border border-green-100' 
                    : isCompleted 
                      ? 'bg-green-50 opacity-75' 
                      : 'opacity-40'
                }`}
              >
                <div className={`p-2 rounded-lg transition-all duration-300 ${
                  isActive 
                    ? 'bg-green-100 scale-110' 
                    : isCompleted 
                      ? 'bg-green-200' 
                      : 'bg-gray-100'
                }`}>
                  <StepIcon 
                    className={`h-4 w-4 transition-all duration-300 ${
                      isActive 
                        ? `${step.color} animate-pulse` 
                        : isCompleted 
                          ? 'text-green-600' 
                          : 'text-gray-400'
                    }`} 
                  />
                </div>
                <span className={`text-sm font-medium transition-all duration-300 ${
                  isActive 
                    ? 'text-gray-900' 
                    : isCompleted 
                      ? 'text-green-700' 
                      : 'text-gray-500'
                }`}>
                  {step.text}
                </span>
                {isCompleted && (
                  <div className="ml-auto">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Floating icons animation */}
        <div className="absolute -top-10 -left-10 opacity-20">
          <Brain className="h-8 w-8 text-purple-500 animate-bounce" style={{ animationDelay: '0.5s' }} />
        </div>
        <div className="absolute -top-5 -right-8 opacity-20">
          <Truck className="h-6 w-6 text-orange-500 animate-bounce" style={{ animationDelay: '1s' }} />
        </div>
        <div className="absolute -bottom-8 -left-6 opacity-20">
          <Users className="h-7 w-7 text-blue-500 animate-bounce" style={{ animationDelay: '1.5s' }} />
        </div>
        <div className="absolute -bottom-5 -right-10 opacity-20">
          <Shield className="h-5 w-5 text-indigo-500 animate-bounce" style={{ animationDelay: '2s' }} />
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
}