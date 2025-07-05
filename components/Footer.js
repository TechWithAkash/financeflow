'use client';

import { Heart, Github, Mail, Globe, Shield, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                FinanceFlow
              </h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6 max-w-md">
              Take control of your finances with our modern, intuitive personal finance management platform. 
              Track expenses, set budgets, and achieve your financial goals with ease.
            </p>
            <div className="flex items-center space-x-4">
              <Link
                href="https://github.com/TechWithAkash/financeflow?tab=readme-ov-file#financeflow-" 
                className="flex items-center justify-center w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-200 hover:scale-105"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5 text-gray-300" />
              </Link>
              <Link
                href="https://github.com/TechWithAkash/financeflow?tab=readme-ov-file#financeflow-" 
                className="flex items-center justify-center w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-200 hover:scale-105"
                aria-label="Website"
              >
                <Globe className="w-5 h-5 text-gray-300" />
              </Link>
              <a 
                href="#" 
                className="flex items-center justify-center w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-200 hover:scale-105"
                aria-label="Email"
              >
                <Mail className="w-5 h-5 text-gray-300" />
              </a>
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-semibold text-white mb-4">Features</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Transaction Tracking
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Budget Management
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Financial Analytics
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Goal Setting
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>


        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-sm text-gray-400">
              © {currentYear} FinanceFlow. All rights reserved.
            </p>
            <p className="text-sm text-gray-400 flex items-center">
              Made with <Heart className="w-4 h-4 text-red-500 mx-1" /> for better financial wellness
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
