"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Clock, 
  MapPin, 
  Users, 
  CheckCircle, 
  Truck,
  Package,
  Heart
} from 'lucide-react';

interface Donation {
  id: string;
  item: string;
  quantity: string;
  status: 'pending' | 'matched' | 'in_transit' | 'delivered';
  recipient: string;
  location: string;
  timeRemaining: string;
  progress: number;
  driver?: string;
  estimatedDelivery?: string;
}

export default function ActiveDonationsCard() {
  const [donations, setDonations] = useState<Donation[]>([]);

  useEffect(() => {
    const mockDonations: Donation[] = [
      {
        id: '1',
        item: 'Fresh Produce Mix',
        quantity: '45 lbs',
        status: 'in_transit',
        recipient: 'Central Food Bank',
        location: 'Downtown Seattle',
        timeRemaining: '23 minutes',
        progress: 75,
        driver: 'Alex Rodriguez',
        estimatedDelivery: '6:30 PM'
      },
      {
        id: '2',
        item: 'Sandwich Platters',
        quantity: '8 trays',
        status: 'matched',
        recipient: 'Homeless Shelter',
        location: 'Capitol Hill',
        timeRemaining: '1 hour 15 minutes',
        progress: 50,
        driver: 'Sarah Chen'
      },
      {
        id: '3',
        item: 'Bakery Items',
        quantity: '24 items',
        status: 'pending',
        recipient: 'Pending match...',
        location: 'University District',
        timeRemaining: '2 hours 45 minutes',
        progress: 25
      },
      {
        id: '4',
        item: 'Dairy Products',
        quantity: '12 containers',
        status: 'delivered',
        recipient: 'Community Kitchen',
        location: 'Fremont',
        timeRemaining: 'Completed',
        progress: 100,
        driver: 'Mike Johnson'
      }
    ];

    setDonations(mockDonations);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'matched': return 'bg-blue-100 text-blue-700';
      case 'in_transit': return 'bg-purple-100 text-purple-700';
      case 'delivered': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return Clock;
      case 'matched': return Users;
      case 'in_transit': return Truck;
      case 'delivered': return CheckCircle;
      default: return Package;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Awaiting Match';
      case 'matched': return 'Driver Assigned';
      case 'in_transit': return 'In Transit';
      case 'delivered': return 'Delivered';
      default: return status;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5 text-blue-600" />
          Active Donations
        </CardTitle>
        <CardDescription>
          Track your donations from listing to delivery
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {donations.map((donation) => {
            const StatusIcon = getStatusIcon(donation.status);
            return (
              <div key={donation.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <StatusIcon className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{donation.item}</h3>
                      <p className="text-sm text-gray-600">{donation.quantity}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(donation.status)}>
                    {getStatusText(donation.status)}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <Progress value={donation.progress} className="h-2" />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Progress</span>
                    <span>{donation.progress}%</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Heart className="h-4 w-4" />
                      <span>Recipient</span>
                    </div>
                    <p className="font-medium">{donation.recipient}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>Location</span>
                    </div>
                    <p className="font-medium">{donation.location}</p>
                  </div>

                  {donation.driver && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Truck className="h-4 w-4" />
                        <span>Driver</span>
                      </div>
                      <p className="font-medium">{donation.driver}</p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{donation.status === 'delivered' ? 'Status' : 'Time Remaining'}</span>
                    </div>
                    <p className="font-medium">{donation.timeRemaining}</p>
                  </div>
                </div>

                {donation.status === 'pending' && (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Edit Listing
                    </Button>
                    <Button variant="destructive" size="sm" className="flex-1">
                      Cancel
                    </Button>
                  </div>
                )}

                {donation.status === 'in_transit' && donation.estimatedDelivery && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-blue-700">
                      <strong>Estimated delivery:</strong> {donation.estimatedDelivery}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}