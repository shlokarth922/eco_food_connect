import Link from 'next/link';
import { Leaf, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-green-600 rounded-lg">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl">EcoFood Connect</span>
            </div>
            <p className="text-gray-400">
              AI-powered platform connecting surplus food with communities in need, 
              reducing waste and fighting hunger through sustainable logistics.
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/dashboard/donor" className="hover:text-white transition-colors">Food Donors</Link></li>
              <li><Link href="/dashboard/recipient" className="hover:text-white transition-colors">Recipients</Link></li>
              <li><Link href="/dashboard/volunteer" className="hover:text-white transition-colors">Volunteers</Link></li>
              <li><Link href="/dashboard/admin" className="hover:text-white transition-colors">Administrators</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/api/docs" className="hover:text-white transition-colors">API Documentation</Link></li>
              <li><Link href="/demo" className="hover:text-white transition-colors">Live Demo</Link></li>
              <li><Link href="/integrations" className="hover:text-white transition-colors">Integrations</Link></li>
              <li><Link href="/support" className="hover:text-white transition-colors">Support</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/impact" className="hover:text-white transition-colors">Impact Report</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 EcoFood Connect. All rights reserved. Built with ❤️ for a sustainable future.</p>
        </div>
      </div>
    </footer>
  );
}