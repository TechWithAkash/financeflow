'use client';

import { useState } from 'react';
import { ArrowRight, DollarSign, BarChart3, PieChart, TrendingUp, Shield, Smartphone, Zap, CheckCircle, 
         Sparkles, Target, Lightbulb, Users, Award, Clock, Globe, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Footer from './Footer';

export default function LandingPage({ onGetStarted }) {
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const features = [
    {
      icon: DollarSign,
      title: 'Smart Transaction Management',
      description: 'Add, edit, and categorize your transactions with intelligent auto-completion and validation.',
      color: 'from-green-400 to-green-600'
    },
    {
      icon: BarChart3,
      title: 'Powerful Analytics',
      description: 'Visualize your spending patterns with interactive charts and detailed insights.',
      color: 'from-blue-400 to-blue-600'
    },
    {
      icon: PieChart,
      title: 'Budget Tracking',
      description: 'Set monthly budgets and track your progress with real-time alerts and recommendations.',
      color: 'from-purple-400 to-purple-600'
    },
    {
      icon: TrendingUp,
      title: 'Financial Insights',
      description: 'Get personalized insights and trends to make better financial decisions.',
      color: 'from-indigo-400 to-indigo-600'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your financial data is protected with enterprise-grade security and privacy.',
      color: 'from-red-400 to-red-600'
    },
    {
      icon: Smartphone,
      title: 'Fully Responsive',
      description: 'Access your finances anywhere with our mobile-optimized interface.',
      color: 'from-pink-400 to-pink-600'
    }
  ];

  const benefits = [
    'Track all your expenses in one place',
    'Set and monitor budgets effectively',
    'Visualize spending with beautiful charts',
    'Get insights to improve your finances',
    'Access from any device, anywhere',
    'Secure and private data protection'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.03'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} aria-hidden="true"></div>
      
      {/* Enhanced Gradient orbs with animations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" aria-hidden="true"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" aria-hidden="true"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-green-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse" aria-hidden="true"></div>
      
      {/* Floating Icons Animation */}
      <div className="absolute top-20 right-20 animate-bounce">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
          <DollarSign className="w-4 h-4 text-white" />
        </div>
      </div>
      <div className="absolute bottom-40 left-20 animate-bounce" style={{ animationDelay: '1s' }}>
        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
          <TrendingUp className="w-4 h-4 text-white" />
        </div>
      </div>
      <div className="absolute top-40 left-1/4 animate-bounce" style={{ animationDelay: '2s' }}>
        <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
          <PieChart className="w-4 h-4 text-white" />
        </div>
      </div>
      
      <div className="relative z-10">
        {/* Header */}
        <header className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors duration-300">FinanceFlow</h1>
                <p className="text-sm text-gray-600">Personal Finance Manager</p>
              </div>
            </div>
            <Button 
              onClick={onGetStarted}
              className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              <Sparkles className="w-4 h-4" />
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-20 relative">
          <div className="max-w-7xl mx-auto text-center">
            <div className="max-w-4xl mx-auto">
             

              <h2 className="text-5xl sm:text-5xl font-bold text-gray-800 mb-6 leading-tight">
                Take Control of Your
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Financial Future</span>
                <div className="inline-block ml-2 animate-bounce">
                  <Target className="w-12 h-12 text-blue-600" />
                </div>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
                FinanceFlow is a modern, intuitive personal finance manager that helps you track expenses, 
                set budgets, and gain valuable insights into your spending habits. Built with cutting-edge 
                technology for a seamless experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  onClick={onGetStarted}
                  className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 text-lg transform hover:scale-105"
                >
                  <Zap className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                  Start Managing Your Money
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </div>

              {/* Interactive Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12 max-w-2xl mx-auto">
                <div className="group cursor-pointer">
                  <div className="text-center p-4 rounded-xl hover:bg-white/50 transition-all duration-300 transform hover:scale-105">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl mb-2 group-hover:rotate-6 transition-transform duration-300">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">2min</div>
                    <div className="text-sm text-gray-600">Setup Time</div>
                  </div>
                </div>
                <div className="group cursor-pointer">
                  <div className="text-center p-4 rounded-xl hover:bg-white/50 transition-all duration-300 transform hover:scale-105">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl mb-2 group-hover:rotate-6 transition-transform duration-300">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">100%</div>
                    <div className="text-sm text-gray-600">Free to Use</div>
                  </div>
                </div>
                <div className="group cursor-pointer">
                  <div className="text-center p-4 rounded-xl hover:bg-white/50 transition-all duration-300 transform hover:scale-105">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl mb-2 group-hover:rotate-6 transition-transform duration-300">
                      <Lock className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">Bank+</div>
                    <div className="text-sm text-gray-600">Security</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-20 bg-white/50 backdrop-blur-sm relative">
          {/* Section Background Illustration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-50 animate-pulse"></div>
            <div className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full opacity-50 animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50  border-blue-200 rounded-full px-4 py-2 mb-6">
                <Lightbulb className="w-4 h-4 text-blue-600 animate-pulse" />
                <span className="text-sm font-medium text-blue-700">Powerful Features</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Everything You Need to Manage Your Finances
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Powerful features designed to give you complete control over your financial life.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className={`group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500  border-gray-100 cursor-pointer ${
                    hoveredFeature === index ? 'transform -translate-y-4 scale-105' : 'hover:transform hover:-translate-y-2'
                  }`}
                  onMouseEnter={() => setHoveredFeature(index)}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  <div className={`relative w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                    <feature.icon className="w-6 h-6 text-white group-hover:animate-bounce" />
                    {hoveredFeature === index && (
                      <div className="absolute -inset-2 bg-gradient-to-r from-white/20 to-white/10 rounded-xl animate-ping"></div>
                    )}
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors duration-300">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {feature.description}
                  </p>
                  
                  {/* Interactive indicator */}
                  <div className="mt-4 flex items-center text-sm text-gray-400 group-hover:text-blue-600 transition-colors duration-300">
                    <ArrowRight className="w-4 h-4 mr-1 group-hover:translate-x-1 transition-transform duration-300" />
                    Learn more
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  Why Choose FinanceFlow?
                </h3>
                <p className="text-lg text-gray-600 mb-8">
                  Built with modern technology and user-centric design, FinanceFlow provides 
                  everything you need to take control of your finances.
                </p>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl  border-gray-100">
                  <div className="mb-6">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Your Financial Dashboard</h4>
                    <p className="text-gray-600 text-sm">Real-time overview of your finances</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                      <div className="text-2xl font-bold text-blue-700">$12,450</div>
                      <div className="text-sm text-gray-600">Total Budget</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                      <div className="text-2xl font-bold text-green-700">$8,320</div>
                      <div className="text-sm text-gray-600">Total Spent</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
                      <div className="text-2xl font-bold text-orange-700">145</div>
                      <div className="text-sm text-gray-600">Transactions</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-r from-pink-50 to-red-50 rounded-xl">
                      <div className="text-2xl font-bold text-pink-700">67%</div>
                      <div className="text-sm text-gray-600">Budget Used</div>
                    </div>
                  </div>
                  
                  {/* Mock Transaction List */}
                  <div className="space-y-3">
                    <div className="text-sm font-semibold text-gray-700 mb-3">Recent Transactions</div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                          <span className="text-red-600 text-sm">🍽️</span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">Lunch at Restaurant</div>
                          <div className="text-xs text-gray-500">Food & Dining</div>
                        </div>
                      </div>
                      <div className="text-red-600 font-semibold">-$42.50</div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 text-sm">🚗</span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">Gas Station</div>
                          <div className="text-xs text-gray-500">Transportation</div>
                        </div>
                      </div>
                      <div className="text-red-600 font-semibold">-$65.00</div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 text-sm">🛍️</span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">Online Shopping</div>
                          <div className="text-xs text-gray-500">Shopping</div>
                        </div>
                      </div>
                      <div className="text-red-600 font-semibold">-$128.99</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-white mb-6">
              Ready to Transform Your Financial Life?
            </h3>
            <p className="text-xl text-blue-100 mb-8">
              Experience a modern approach to personal finance management with FinanceFlow.
            </p>
            <Button 
              onClick={onGetStarted}
              className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 text-lg"
            >
              <DollarSign className="w-5 h-5 mr-2" />
              Start Your Financial Journey
            </Button>
          </div>
        </section>

        {/* Footer */}
        <Footer/>
      </div>
    </div>
  );
}
