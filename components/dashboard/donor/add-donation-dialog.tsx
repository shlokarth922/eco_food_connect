"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Camera, MapPin } from 'lucide-react';
import { format } from 'date-fns';

interface AddDonationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddDonationDialog({ open, onOpenChange }: AddDonationDialogProps) {
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    foodType: '',
    quantity: '',
    unit: '',
    description: '',
    allergens: [] as string[],
    location: '',
    pickupWindow: '',
    qualityGrade: ''
  });

  const foodTypes = [
    'Fresh Produce',
    'Prepared Meals',
    'Bakery Items',
    'Dairy Products',
    'Frozen Foods',
    'Pantry Items',
    'Beverages',
    'Other'
  ];

  const units = ['lbs', 'kg', 'items', 'trays', 'containers', 'boxes'];
  const allergens = ['Dairy', 'Gluten', 'Nuts', 'Soy', 'Eggs', 'Shellfish'];
  const qualityGrades = ['Grade A (Excellent)', 'Grade B (Good)', 'Grade C (Fair)'];

  const handleAllergenToggle = (allergen: string) => {
    setFormData(prev => ({
      ...prev,
      allergens: prev.allergens.includes(allergen)
        ? prev.allergens.filter(a => a !== allergen)
        : [...prev.allergens, allergen]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Donation data:', { ...formData, date });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Food Donation</DialogTitle>
          <DialogDescription>
            Create a listing for surplus food available for donation
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="foodType">Food Type</Label>
              <Select value={formData.foodType} onValueChange={(value) => 
                setFormData(prev => ({ ...prev, foodType: value }))
              }>
                <SelectTrigger>
                  <SelectValue placeholder="Select food type" />
                </SelectTrigger>
                <SelectContent>
                  {foodTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <div className="flex gap-2">
                <Input
                  id="quantity"
                  type="number"
                  placeholder="Enter quantity"
                  value={formData.quantity}
                  onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
                  className="flex-1"
                />
                <Select value={formData.unit} onValueChange={(value) => 
                  setFormData(prev => ({ ...prev, unit: value }))
                }>
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {units.map(unit => (
                      <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the food items, preparation method, etc."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Allergens Present</Label>
            <div className="flex flex-wrap gap-2">
              {allergens.map(allergen => (
                <Badge
                  key={allergen}
                  variant={formData.allergens.includes(allergen) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleAllergenToggle(allergen)}
                >
                  {allergen}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Pickup Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pickupWindow">Pickup Time Window</Label>
              <Select value={formData.pickupWindow} onValueChange={(value) => 
                setFormData(prev => ({ ...prev, pickupWindow: value }))
              }>
                <SelectTrigger>
                  <SelectValue placeholder="Select time window" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning (8AM - 12PM)</SelectItem>
                  <SelectItem value="afternoon">Afternoon (12PM - 5PM)</SelectItem>
                  <SelectItem value="evening">Evening (5PM - 9PM)</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Pickup Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="location"
                  placeholder="Enter pickup address"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="qualityGrade">Quality Assessment</Label>
              <Select value={formData.qualityGrade} onValueChange={(value) => 
                setFormData(prev => ({ ...prev, qualityGrade: value }))
              }>
                <SelectTrigger>
                  <SelectValue placeholder="Select quality grade" />
                </SelectTrigger>
                <SelectContent>
                  {qualityGrades.map(grade => (
                    <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-2 p-4 bg-blue-50 rounded-lg">
            <Camera className="h-5 w-5 text-blue-600" />
            <div className="flex-1">
              <p className="text-sm font-medium text-blue-900">AI Quality Scan Available</p>
              <p className="text-xs text-blue-700">Upload photos for automated quality assessment</p>
            </div>
            <Button variant="outline" size="sm">
              Add Photos
            </Button>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Create Donation Listing
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}