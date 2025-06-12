"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Leaf, Menu, BarChart3, Users, Heart, Truck } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const dashboards = [
    { href: '/dashboard/donor', title: 'Food Donors', icon: Leaf, description: 'Manage surplus predictions and donations' },
    { href: '/dashboard/recipient', title: 'Recipients', icon: Heart, description: 'View available food and manage requests' },
    { href: '/dashboard/volunteer', title: 'Volunteers', icon: Users, description: 'Sign up for delivery opportunities' },
    { href: '/dashboard/admin', title: 'Admin', icon: BarChart3, description: 'System analytics and oversight' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="p-2 bg-green-100 rounded-lg">
            <Leaf className="h-6 w-6 text-green-600" />
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            EcoFood Connect
          </span>
          <Badge variant="secondary" className="ml-2 text-xs">
            AI-Powered
          </Badge>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Dashboards</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-6 w-[500px] grid-cols-2">
                  {dashboards.map((dashboard) => (
                    <Link
                      key={dashboard.href}
                      href={dashboard.href}
                      className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-white p-4 text-sm font-medium transition-colors hover:bg-gray-50 hover:text-gray-900"
                    >
                      <div className="flex items-center gap-2">
                        <dashboard.icon className="h-4 w-4" />
                        {dashboard.title}
                      </div>
                      <div className="line-clamp-2 text-xs leading-snug text-gray-500">
                        {dashboard.description}
                      </div>
                    </Link>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/api/docs">
            <Button variant="ghost">API Docs</Button>
          </Link>
          <Link href="/demo">
            <Button variant="ghost">Demo</Button>
          </Link>
          <Link href="/dashboard/donor">
            <Button className="bg-green-600 hover:bg-green-700">Get Started</Button>
          </Link>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <div className="flex flex-col gap-4 mt-8">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Dashboards</h3>
                {dashboards.map((dashboard) => (
                  <Link
                    key={dashboard.href}
                    href={dashboard.href}
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <dashboard.icon className="h-4 w-4" />
                    <div>
                      <div className="font-medium">{dashboard.title}</div>
                      <div className="text-xs text-gray-500">{dashboard.description}</div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="border-t pt-4 space-y-2">
                <Link href="/api/docs" onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    API Documentation
                  </Button>
                </Link>
                <Link href="/demo" onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    View Demo
                  </Button>
                </Link>
                <Link href="/dashboard/donor" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}