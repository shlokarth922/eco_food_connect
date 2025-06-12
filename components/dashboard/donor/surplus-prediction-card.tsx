"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Brain, Clock, TrendingUp, AlertCircle } from 'lucide-react';

interface Prediction {
  id: string;
  item: string;
  quantity: string;
  confidence: number;
  timeWindow: string;
  peakTime: string;
  reason: string;
}

interface SurplusPredictionCardProps {
  predictions: Prediction[];
}

export default function SurplusPredictionCard({ predictions }: SurplusPredictionCardProps) {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600 bg-green-100';
    if (confidence >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-600" />
          AI Surplus Predictions
        </CardTitle>
        <CardDescription>
          Machine learning analysis of your inventory, sales patterns, and external factors
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {predictions.map((prediction) => (
            <div key={prediction.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{prediction.item}</h3>
                    <p className="text-gray-600">Predicted surplus: {prediction.quantity}</p>
                  </div>
                </div>
                <Badge className={getConfidenceColor(prediction.confidence)}>
                  {prediction.confidence}% confidence
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    Time Window
                  </div>
                  <p className="font-medium">{prediction.timeWindow}</p>
                  <p className="text-sm text-gray-500">Peak at {prediction.peakTime}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Brain className="h-4 w-4" />
                    AI Analysis
                  </div>
                  <Progress value={prediction.confidence} className="h-2" />
                  <p className="text-xs text-gray-500">{prediction.reason}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <AlertCircle className="h-4 w-4" />
                    Recommended Action
                  </div>
                  <Button 
                    size="sm" 
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    Create Donation Listing
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {predictions.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Brain className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium mb-2">No predictions available</p>
              <p className="text-sm">AI is analyzing your data to generate surplus predictions</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}