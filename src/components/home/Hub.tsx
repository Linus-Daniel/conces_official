import React from 'react';
import { ArrowRight, Users, Briefcase, TrendingUp, Star, ExternalLink, Rocket, Target, Globe, Zap } from 'lucide-react';
import Link from 'next/link';

const TalentHubSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-light rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-dark rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-primary-light/10 border border-primary-light/20 rounded-full text-primary-dark text-sm font-medium">
              <Rocket className="w-4 h-4 mr-2" />
              New Platform Launch
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Introducing{" "}
                <span className="bg-gradient-to-r from-primary-dark to-primary-light bg-clip-text text-transparent">
                  TalentHub
                </span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                CONCES members now have access to our dedicated talent platform where you can showcase your skills, connect with opportunities, and build your professional network.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: <Users className="w-5 h-5" />, text: "Professional Profiles", color: "text-blue-500" },
                { icon: <Briefcase className="w-5 h-5" />, text: "Job Opportunities", color: "text-green-500" },
                { icon: <TrendingUp className="w-5 h-5" />, text: "Career Growth", color: "text-purple-500" },
                { icon: <Target className="w-5 h-5" />, text: "Project Showcase", color: "text-orange-500" }
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-white/60 rounded-lg border border-gray-100">
                  <div className={`${feature.color}`}>
                    {feature.icon}
                  </div>
                  <span className="text-gray-700 font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="https://talenthub.conces.org"
                target="_blank"
                className="group inline-flex items-center justify-center px-8 py-4 bg-primary-dark text-white font-semibold rounded-xl hover:bg-primary-dark/90 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Explore TalentHub
                <ExternalLink className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="https://talenthub.conces.org/auth?mode=signup"
                target="_blank"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary-dark text-primary-dark font-semibold rounded-xl hover:bg-primary-dark hover:text-white transition-all duration-300"
              >
                Create Profile
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-8 pt-6 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-dark">500+</div>
                <div className="text-sm text-gray-600">Active Members</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-dark">150+</div>
                <div className="text-sm text-gray-600">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-dark">95%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative">
            <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
              {/* Mock Interface */}
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center space-x-3 pb-4 border-b border-gray-100">
                  <div className="w-8 h-8 bg-primary-dark rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">T</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">TalentHub</div>
                    <div className="text-xs text-gray-500">by CONCES</div>
                  </div>
                </div>

                {/* Profile Cards */}
                <div className="space-y-4">
                  {[
                    { name: "Sarah Chen", role: "Software Engineer", rating: "4.9", avatar: "S", color: "bg-purple-500" },
                    { name: "Michael Adebayo", role: "Product Designer", rating: "4.8", avatar: "M", color: "bg-blue-500" },
                    { name: "Fatima Hassan", role: "Data Scientist", rating: "5.0", avatar: "F", color: "bg-green-500" }
                  ].map((profile, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                      <div className={`w-10 h-10 ${profile.color} rounded-full flex items-center justify-center text-white font-semibold`}>
                        {profile.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{profile.name}</div>
                        <div className="text-sm text-gray-600">{profile.role}</div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-700">{profile.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom CTA */}
                <div className="pt-4 border-t border-gray-100">
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-2">Join the community</div>
                    <div className="w-full bg-primary-light/20 rounded-lg py-2 px-4 text-primary-dark font-medium text-sm">
                      Create Your Profile →
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-3 -right-3 bg-green-500 text-white rounded-full p-2 shadow-lg">
                <Zap className="w-4 h-4" />
              </div>
              <div className="absolute -bottom-3 -left-3 bg-blue-500 text-white rounded-full p-2 shadow-lg">
                <Globe className="w-4 h-4" />
              </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-primary-light/10 to-primary-dark/10 rounded-full blur-3xl"></div>
          </div>
        </div>

        {/* Bottom Testimonial/Social Proof */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-white rounded-full shadow-lg border border-gray-100">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold ${i === 1 ? 'bg-purple-500' : i === 2 ? 'bg-blue-500' : i === 3 ? 'bg-green-500' : 'bg-orange-500'}`}>
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <div className="text-sm">
              <span className="font-medium text-gray-900">500+ CONCES members</span>
              <span className="text-gray-600"> already using TalentHub</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TalentHubSection;