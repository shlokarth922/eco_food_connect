"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Code2, 
  Database, 
  Zap, 
  Shield, 
  Globe,
  Download,
  ExternalLink,
  Copy
} from 'lucide-react';
import Header from '@/components/layout/header';

export default function APIDocsPage() {
  const endpoints = [
    {
      method: 'POST',
      path: '/api/donations',
      description: 'Create a new food donation listing',
      params: ['foodType', 'quantity', 'location', 'pickupWindow'],
      response: 'Returns donation ID and match predictions'
    },
    {
      method: 'GET',
      path: '/api/donations/{id}',
      description: 'Get donation details and current status',
      params: ['id'],
      response: 'Full donation object with status and matches'
    },
    {
      method: 'POST',
      path: '/api/matches',
      description: 'Create or update a donation match',
      params: ['donationId', 'recipientId', 'priority'],
      response: 'Match confirmation and routing details'
    },
    {
      method: 'GET',
      path: '/api/predictions',
      description: 'Get AI surplus predictions for a location',
      params: ['location', 'businessType', 'timeRange'],
      response: 'Array of predicted surplus events'
    },
    {
      method: 'POST',
      path: '/api/quality-check',
      description: 'Submit food quality assessment',
      params: ['donationId', 'images', 'manualGrade'],
      response: 'AI quality score and recommendations'
    },
    {
      method: 'GET',
      path: '/api/routes/optimize',
      description: 'Get optimized delivery route',
      params: ['pickupPoints', 'deliveryPoints', 'vehicleType'],
      response: 'Optimized route with timing and emissions'
    }
  ];

  const webhooks = [
    {
      event: 'donation.matched',
      description: 'Triggered when a donation is matched with a recipient',
      payload: 'Donation ID, recipient details, estimated pickup time'
    },
    {
      event: 'delivery.started',
      description: 'Sent when a volunteer begins pickup/delivery',
      payload: 'Delivery ID, driver info, real-time tracking URL'
    },
    {
      event: 'quality.assessed',
      description: 'AI quality assessment completed',
      payload: 'Quality score, grade, safety recommendations'
    },
    {
      event: 'blockchain.verified',
      description: 'Transaction recorded on blockchain',
      payload: 'Transaction hash, verification status'
    }
  ];

  const codeExamples = {
    javascript: `// Create a donation
const response = await fetch('/api/donations', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    foodType: 'Fresh Produce',
    quantity: 45,
    unit: 'lbs',
    location: '123 Main St, Seattle, WA',
    pickupWindow: 'afternoon',
    qualityGrade: 'A'
  })
});

const donation = await response.json();
console.log('Donation created:', donation.id);`,

    python: `import requests

# Create a donation
payload = {
    "foodType": "Fresh Produce",
    "quantity": 45,
    "unit": "lbs",
    "location": "123 Main St, Seattle, WA",
    "pickupWindow": "afternoon",
    "qualityGrade": "A"
}

headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}

response = requests.post(
    "https://api.ecofoodconnect.com/donations",
    json=payload,
    headers=headers
)

donation = response.json()
print(f"Donation created: {donation['id']}")`,

    curl: `curl -X POST https://api.ecofoodconnect.com/donations \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "foodType": "Fresh Produce",
    "quantity": 45,
    "unit": "lbs",
    "location": "123 Main St, Seattle, WA",
    "pickupWindow": "afternoon",
    "qualityGrade": "A"
  }'`
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">API Documentation</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Integrate EcoFood Connect's AI-powered food waste reduction platform 
            into your applications with our comprehensive REST API.
          </p>
        </div>

        {/* Quick Start */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-600" />
              Quick Start
            </CardTitle>
            <CardDescription>Get up and running in minutes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 border rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-xl">1</span>
                </div>
                <h3 className="font-semibold mb-2">Get API Key</h3>
                <p className="text-sm text-gray-600">Sign up and generate your API key from the dashboard</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="w-12 h-12 bg-green-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <span className="text-green-600 font-bold text-xl">2</span>
                </div>
                <h3 className="font-semibold mb-2">Make API Call</h3>
                <p className="text-sm text-gray-600">Use our REST endpoints to create donations and matches</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <span className="text-purple-600 font-bold text-xl">3</span>
                </div>
                <h3 className="font-semibold mb-2">Handle Webhooks</h3>
                <p className="text-sm text-gray-600">Receive real-time updates on matches and deliveries</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="endpoints" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
            <TabsTrigger value="examples">Code Examples</TabsTrigger>
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
            <TabsTrigger value="sdks">SDKs</TabsTrigger>
          </TabsList>

          <TabsContent value="endpoints" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-blue-600" />
                  API Endpoints
                </CardTitle>
                <CardDescription>
                  Complete list of available endpoints and their parameters
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {endpoints.map((endpoint, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge 
                          className={`${
                            endpoint.method === 'GET' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {endpoint.method}
                        </Badge>
                        <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                          {endpoint.path}
                        </code>
                      </div>
                      <p className="text-gray-700 mb-3">{endpoint.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-600">Parameters:</span>
                          <ul className="mt-1 ml-4 list-disc text-gray-600">
                            {endpoint.params.map((param, i) => (
                              <li key={i}><code>{param}</code></li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">Response:</span>
                          <p className="mt-1 text-gray-600">{endpoint.response}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="examples" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code2 className="h-5 w-5 text-purple-600" />
                  Code Examples
                </CardTitle>
                <CardDescription>
                  Ready-to-use code samples in popular languages
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="javascript">
                  <TabsList className="mb-4">
                    <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                    <TabsTrigger value="python">Python</TabsTrigger>
                    <TabsTrigger value="curl">cURL</TabsTrigger>
                  </TabsList>
                  
                  {Object.entries(codeExamples).map(([lang, code]) => (
                    <TabsContent key={lang} value={lang}>
                      <div className="relative">
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                          <code>{code}</code>
                        </pre>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="absolute top-2 right-2"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="webhooks" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-green-600" />
                  Webhook Events
                </CardTitle>
                <CardDescription>
                  Real-time notifications for important events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {webhooks.map((webhook, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge className="bg-purple-100 text-purple-700">
                          {webhook.event}
                        </Badge>
                      </div>
                      <p className="text-gray-700 mb-2">{webhook.description}</p>
                      <div className="text-sm">
                        <span className="font-medium text-gray-600">Payload includes:</span>
                        <p className="mt-1 text-gray-600">{webhook.payload}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sdks" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5 text-orange-600" />
                  Official SDKs
                </CardTitle>
                <CardDescription>
                  Pre-built libraries for faster integration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { lang: 'JavaScript/Node.js', pkg: 'npm install ecofood-connect', version: 'v2.1.0' },
                    { lang: 'Python', pkg: 'pip install ecofood-connect', version: 'v2.1.0' },
                    { lang: 'PHP', pkg: 'composer require ecofood/connect', version: 'v2.1.0' },
                    { lang: 'Ruby', pkg: 'gem install ecofood_connect', version: 'v2.1.0' },
                    { lang: 'Java', pkg: 'implementation "com.ecofood:connect:2.1.0"', version: 'v2.1.0' },
                    { lang: 'C#/.NET', pkg: 'Install-Package EcoFood.Connect', version: 'v2.1.0' }
                  ].map((sdk, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold">{sdk.lang}</h3>
                        <Badge variant="outline">{sdk.version}</Badge>
                      </div>
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm block mb-3">
                        {sdk.pkg}
                      </code>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex items-center gap-1">
                          <Download className="h-3 w-3" />
                          Install
                        </Button>
                        <Button size="sm" variant="outline" className="flex items-center gap-1">
                          <ExternalLink className="h-3 w-3" />
                          Docs
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Authentication & Rate Limits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-red-600" />
                Authentication
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <p>All API requests require authentication using an API key:</p>
                <code className="bg-gray-100 px-2 py-1 rounded block">
                  Authorization: Bearer YOUR_API_KEY
                </code>
                <p className="text-gray-600">
                  Get your API key from the dashboard Settings page.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-600" />
                Rate Limits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Free Tier:</span>
                  <span className="font-medium">1,000 requests/day</span>
                </div>
                <div className="flex justify-between">
                  <span>Pro Tier:</span>
                  <span className="font-medium">10,000 requests/day</span>
                </div>
                <div className="flex justify-between">
                  <span>Enterprise:</span>
                  <span className="font-medium">Unlimited</span>
                </div>
                <p className="text-gray-600">
                  Rate limit headers included in all responses.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}