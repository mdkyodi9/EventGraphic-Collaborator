/**
 * Home page with onboarding experience and feature highlights
 */
import React from 'react'
import { Link } from 'react-router'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { useAuthStore } from '../stores/useAuthStore'
import { 
  Palette, 
  Users, 
  Download, 
  Zap, 
  Star, 
  ArrowRight,
  CheckCircle,
  Sparkles,
  Target,
  Clock
} from 'lucide-react'

/**
 * Landing page component with feature showcase and call-to-action
 */
export default function Home() {
  const { isAuthenticated } = useAuthStore()

  const features = [
    {
      icon: <Palette className="h-6 w-6" />,
      title: 'Drag & Drop Editor',
      description: 'Intuitive visual editor that requires no design experience. Simply drag, drop, and customize.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Team Collaboration',
      description: 'Invite team members, share projects, and collaborate in real-time with comments and feedback.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: <Download className="h-6 w-6" />,
      title: 'Multi-Format Export',
      description: 'Download graphics optimized for Instagram, Facebook, Twitter, LinkedIn and more platforms.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'Lightning Fast',
      description: 'Create professional graphics in minutes, not hours. Perfect for busy event organizers.',
      color: 'from-orange-500 to-red-500'
    }
  ]

  const benefits = [
    'No design skills required',
    'Professional templates for every event type',
    'Real-time team collaboration',
    'Multi-platform export formats',
    'Brand consistency tools',
    'Unlimited projects and downloads'
  ]

  const handleGetStarted = () => {
    if (!isAuthenticated) {
      useAuthStore.getState().login({
        id: 'user_1',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'admin'
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
              <Sparkles className="h-3 w-3 mr-1" />
              New: AI-Powered Design Suggestions
            </Badge>
            
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
              Create Stunning
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                Event Graphics
              </span>
              in Minutes
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              The complete automation platform for event organizers. Design professional social media graphics 
              without any design skills. Collaborate with your team and export to any platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3 text-lg"
                onClick={handleGetStarted}
                asChild
              >
                <Link to={isAuthenticated ? "/dashboard" : "#"}>
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" className="px-8 py-3 text-lg" asChild>
                <Link to="/templates">
                  Browse Templates
                </Link>
              </Button>
            </div>
            
            <div className="flex items-center justify-center mt-8 text-sm text-gray-500">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="ml-2 font-medium">Trusted by 10,000+ event organizers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to create amazing graphics
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed specifically for event organizers and marketing teams
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-r ${feature.color} mb-4`}>
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Why event organizers love EventDesign
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Save time, maintain brand consistency, and create professional graphics that drive event attendance.
              </p>
              
              <div className="grid gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
              
              <Button 
                size="lg" 
                className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={handleGetStarted}
                asChild
              >
                <Link to={isAuthenticated ? "/dashboard" : "#"}>
                  Start Creating Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            
            <div className="relative">
              <img 
                src="https://pub-cdn.sider.ai/u/U0W8H7AJXEV/web-coder/688fc0850cd2d7c5a265891b/resource/2da389ba-8e17-4444-9573-c437e34e9446.jpg" 
                alt="EventDesign Dashboard"
                className="rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-4">
                <div className="flex items-center">
                  <Target className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-sm font-medium">95% Faster</span>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-sm font-medium">5 Min Setup</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to transform your event marketing?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of event organizers who create stunning graphics in minutes, not hours.
          </p>
          
          <Button 
            size="lg" 
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
            onClick={handleGetStarted}
            asChild
          >
            <Link to={isAuthenticated ? "/dashboard" : "#"}>
              Get Started Free Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          
          <p className="text-blue-200 text-sm mt-4">
            No credit card required • Free templates included • Cancel anytime
          </p>
        </div>
      </section>
    </div>
  )
}
