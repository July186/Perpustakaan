"use client";


import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Library, 
  Users, 
  Clock, 
  Award,
  ArrowRight,
  CheckCircle,
  GraduationCap,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl">
                <Library className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                School Library
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost" className="font-semibold">
                  Sign In
                </Button>
              </Link>
              <Link href="/login">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/30">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full">
                <Sparkles className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-600">Digital Library Management System</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Empowering Students Through
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Digital Reading</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                A modern library management system designed specifically for schools. 
                Manage books, track borrowing, and foster a love for reading among students.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/login">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl shadow-blue-500/30 text-lg px-8">
                    Start Exploring
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Learn More
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div>
                  <p className="text-3xl font-bold text-gray-900">5,000+</p>
                  <p className="text-sm text-gray-600">Books Available</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">2,500+</p>
                  <p className="text-sm text-gray-600">Active Students</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">98%</p>
                  <p className="text-sm text-gray-600">Satisfaction Rate</p>
                </div>
              </div>
            </div>

            {/* Hero Image/Illustration */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-8 shadow-2xl">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 space-y-6">
                  <div className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-lg">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <BookOpen className="h-8 w-8 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Digital Catalog</p>
                      <p className="text-sm text-gray-600">Browse thousands of books</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-lg">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <Users className="h-8 w-8 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Student Portal</p>
                      <p className="text-sm text-gray-600">Easy access for all students</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-lg">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <Clock className="h-8 w-8 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Track Borrowing</p>
                      <p className="text-sm text-gray-600">Real-time availability</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-400 rounded-full blur-3xl opacity-50"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-pink-400 rounded-full blur-3xl opacity-50"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Library System?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built specifically for educational institutions to enhance learning and reading culture
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200 hover:shadow-xl transition-all duration-300">
              <div className="p-3 bg-blue-600 rounded-xl w-fit mb-6">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Student-Focused</h3>
              <p className="text-gray-600 mb-6">
                Designed with students in mind. Easy-to-use interface that encourages independent learning and exploration.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Intuitive book search</span>
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Personal reading history</span>
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Book recommendations</span>
                </li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 border border-purple-200 hover:shadow-xl transition-all duration-300">
              <div className="p-3 bg-purple-600 rounded-xl w-fit mb-6">
                <Library className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Easy Management</h3>
              <p className="text-gray-600 mb-6">
                Streamline library operations with powerful admin tools. Manage inventory, track loans, and generate reports.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Real-time tracking</span>
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Automated notifications</span>
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Detailed analytics</span>
                </li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border border-green-200 hover:shadow-xl transition-all duration-300">
              <div className="p-3 bg-green-600 rounded-xl w-fit mb-6">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Promote Reading</h3>
              <p className="text-gray-600 mb-6">
                Foster a culture of reading with engagement tools. Track reading achievements and celebrate milestones.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Reading challenges</span>
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Achievement badges</span>
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Leaderboards</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your School Library?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join hundreds of schools already using our platform to enhance their library experience
          </p>
          <Link href="/login">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 shadow-xl">
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Library className="h-6 w-6 text-blue-400" />
                <span className="text-white font-bold">School Library</span>
              </div>
              <p className="text-sm">
                Empowering education through digital library management
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2024 School Library System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}