import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  unit: string;
  change: string;
  icon: LucideIcon;
  color: string;
}

export default function StatsCard({ title, value, unit, change, icon: Icon, color }: StatsCardProps) {
  const isPositive = change.startsWith('+');
  
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-2 bg-gray-100 rounded-lg`}>
            <Icon className={`h-5 w-5 ${color}`} />
          </div>
          <Badge 
            variant={isPositive ? "default" : "destructive"}
            className={isPositive ? "bg-green-100 text-green-700" : ""}
          >
            {change}
          </Badge>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold">{value}</span>
            <span className="text-sm text-gray-500">{unit}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}