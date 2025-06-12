"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Leaf, Users, Zap, Package } from 'lucide-react';

export default function ImpactVisualizationCard() {
  const monthlyData = [
    { month: 'Jan', foodSaved: 1240, mealsProvided: 3720, co2Saved: 18.6 },
    { month: 'Feb', foodSaved: 1580, mealsProvided: 4740, co2Saved: 23.7 },
    { month: 'Mar', foodSaved: 2100, mealsProvided: 6300, co2Saved: 31.5 },
    { month: 'Apr', foodSaved: 1890, mealsProvided: 5670, co2Saved: 28.4 },
    { month: 'May', foodSaved: 2340, mealsProvided: 7020, co2Saved: 35.1 },
    { month: 'Jun', foodSaved: 2780, mealsProvided: 8340, co2Saved: 41.7 }
  ];

  const foodTypeData = [
    { name: 'Produce', value: 35, color: '#10B981' },
    { name: 'Prepared Food', value: 28, color: '#3B82F6' },
    { name: 'Bakery', value: 20, color: '#F59E0B' },
    { name: 'Dairy', value: 12, color: '#8B5CF6' },
    { name: 'Other', value: 5, color: '#6B7280' }
  ];

  const impactMetrics = [
    {
      title: 'Total Food Saved',
      value: '12,930',
      unit: 'lbs',
      icon: Package,
      color: 'text-green-600',
      description: 'This month'
    },
    {
      title: 'Meals Provided',
      value: '38,790',
      unit: 'meals',
      icon: Users,
      color: 'text-blue-600',
      description: 'To communities in need'
    },
    {
      title: 'CO₂ Prevented',
      value: '194.4',
      unit: 'tons',
      icon: Zap,
      color: 'text-purple-600',
      description: 'Carbon emissions saved'
    },
    {
      title: 'Impact Score',
      value: '9.4',
      unit: '/10',
      icon: Leaf,
      color: 'text-orange-600',
      description: 'Sustainability rating'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Impact Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {impactMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <metric.icon className={`h-5 w-5 ${metric.color}`} />
                </div>
                <Badge variant="secondary">+15%</Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold">{metric.value}</span>
                  <span className="text-sm text-gray-500">{metric.unit}</span>
                </div>
                <p className="text-xs text-gray-500">{metric.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Impact Trend</CardTitle>
            <CardDescription>Food saved and meals provided over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="foodSaved" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  name="Food Saved (lbs)"
                />
                <Line 
                  type="monotone" 
                  dataKey="mealsProvided" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  name="Meals Provided"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Food Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Food Type Distribution</CardTitle>
            <CardDescription>Breakdown of donated food categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={foodTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {foodTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {foodTypeData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-gray-600">{item.name} ({item.value}%)</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Comparison Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Food Recovery Comparison</CardTitle>
          <CardDescription>Comparing food saved vs. CO₂ emissions prevented</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="foodSaved" fill="#10B981" name="Food Saved (lbs)" />
              <Bar dataKey="co2Saved" fill="#8B5CF6" name="CO₂ Saved (tons)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}