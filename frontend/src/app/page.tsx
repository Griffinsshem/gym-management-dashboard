"use client";

import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Users,
  CreditCard,
  Activity,
  Dumbbell,
  BarChart3,
  CheckCircle2,
} from "lucide-react";

export default function HomePage() {
  const features = [
    {
      title: "Member Management",
      description:
        "Manage gym members, profiles, attendance, and memberships in one place.",
      icon: Users,
    },
    {
      title: "Subscription Tracking",
      description:
        "Track active plans, expiring subscriptions, and payment activity easily.",
      icon: CreditCard,
    },
    {
      title: "Attendance Monitoring",
      description:
        "Monitor daily check-ins and gym usage with real-time attendance tracking.",
      icon: Activity,
    },
    {
      title: "Admin & Staff Roles",
      description:
        "Secure role-based access for admins, staff, and gym members.",
      icon: ShieldCheck,
    },
  ];

  const stats = [
    {
      label: "Active Members",
      value: "2,500+",
    },
    {
      label: "Gyms Managed",
      value: "120+",
    },
    {
      label: "Monthly Check-ins",
      value: "50K+",
    },
    {
      label: "System Uptime",
      value: "99.9%",
    },
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* NAVBAR */}
      <header className="border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">

          {/* LOGO */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Dumbbell className="text-white" size={22} />
            </div>

            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Gym<span className="text-blue-600">Pro</span>
              </h1>

              <p className="text-sm text-gray-900 font-bold">
                Management Platform
              </p>
            </div>
          </div>

          {/* NAV LINKS */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#features" className="hover:text-blue-600 transition font-bold text-lg text-gray-900">
              Features
            </a>

            <a href="#benefits" className="hover:text-blue-600 transition font-bold text-lg text-gray-900">
              Benefits
            </a>
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-blue-500/20"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-32">

          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* LEFT */}
            <div>

              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-6">
                <CheckCircle2 size={16} />
                Smart Gym Management System
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
                Run Your Gym
                <span className="text-blue-600"> Smarter</span>
              </h1>

              <p className="mt-6 text-lg text-gray-900 leading-8 max-w-xl font-semi-bold">
                GymPro helps gyms manage members, subscriptions,
                attendance, staff, and analytics from one powerful
                dashboard.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-10">

                <Link
                  href="/login"
                  className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-4 rounded-2xl font-medium flex items-center justify-center gap-2 shadow-xl shadow-blue-500/20"
                >
                  Access Dashboard
                  <ArrowRight size={18} />
                </Link>

                <Link
                  href="/register"
                  className="border border-gray-500 hover:border-blue-600 hover:text-blue-600 transition px-6 py-4 rounded-2xl font-semibold text-gray-900 flex items-center justify-center"
                >
                  Create Account
                </Link>
              </div>

              {/* STATS */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14">

                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm"
                  >
                    <h3 className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </h3>

                    <p className="text-sm text-gray-900 mt-1font-semi-bold text-sm">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT */}
            <div className="relative">

              <div className="bg-white border border-gray-100 rounded-3xl shadow-2xl p-6">

                {/* DASHBOARD TOP */}
                <div className="flex items-center justify-between mb-8">

                  <div>
                    <p className="text-sm text-gray-900 font-bold">
                      Gym Overview
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-1">
                      Dashboard Analytics
                    </h2>
                  </div>

                  <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
                    <BarChart3
                      className="text-blue-900"
                      size={26}
                    />
                  </div>
                </div>

                {/* ANALYTICS */}
                <div className="grid grid-cols-2 gap-4">

                  <div className="bg-gray-50 rounded-2xl p-5">
                    <p className="text-sm text-gray-900 font-bold">
                      Total Members
                    </p>

                    <h3 className="text-3xl font-bold text-gray-900 mt-2">
                      1,248
                    </h3>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-5">
                    <p className="text-sm text-gray-900 font-bold">
                      Active Plans
                    </p>

                    <h3 className="text-3xl font-bold text-green-600 mt-2">
                      982
                    </h3>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-5">
                    <p className="text-sm text-gray-900 font-bold">
                      Attendance Today
                    </p>

                    <h3 className="text-3xl font-bold text-purple-600 mt-2">
                      324
                    </h3>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-5">
                    <p className="text-sm text-gray-900 font-bold">
                      Revenue
                    </p>

                    <h3 className="text-3xl font-bold text-blue-600 mt-2">
                      $12.4K
                    </h3>
                  </div>
                </div>

                {/* ACTIVITY */}
                <div className="mt-6 bg-blue-50 rounded-2xl p-5 border border-blue-100">
                  <div className="flex items-center justify-between">

                    <div>
                      <p className="text-lg text-blue-700 font-bold">
                        System Status
                      </p>

                      <h3 className="text-lg font-bold text-gray-900 mt-1">
                        All services operational
                      </h3>
                    </div>

                    <div className="w-4 h-4 rounded-full bg-green-500 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        className="py-24 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-gray-900">
              Powerful Features Built For Modern Gyms
            </h2>

            <p className="text-blue-900 mt-5 text-lg leading-8">
              Everything you need to manage operations,
              memberships, staff, and analytics efficiently.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-3xl border border-gray-600 p-7 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-6">
                  <feature.icon
                    className="text-blue-600"
                    size={24}
                  />
                </div>

                <h3 className="text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>

                <p className="text-gray-700 mt-4 leading-7 text-sm font-bold">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section
        id="benefits"
        className="py-24 bg-white"
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-10 text-center">

          <h2 className="text-4xl font-bold text-gray-900">
            Why Gym Owners Choose GymPro
          </h2>

          <p className="text-lg text-gray-900 mt-5 max-w-3xl mx-auto leading-8">
            GymPro is designed to simplify operations,
            improve efficiency, and help fitness businesses
            scale faster with smart automation.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-16">

            <div className="bg-gray-200 rounded-3xl p-8 border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900">
                Faster Operations
              </h3>

              <p className="text-gray-900 mt-4 leading-7">
                Reduce manual work with automated
                membership and attendance management.
              </p>
            </div>

            <div className="bg-gray-200 rounded-3xl p-8 border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900">
                Secure Access
              </h3>

              <p className="text-gray-900 mt-4 leading-7">
                Role-based authentication keeps your
                system secure and organized.
              </p>
            </div>

            <div className="bg-gray-200 rounded-3xl p-8 border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900">
                Real-Time Insights
              </h3>

              <p className="text-gray-900 mt-4 leading-7">
                Track business performance and make
                smarter decisions using live analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-blue-600">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">

          <h2 className="text-4xl font-bold text-white">
            Ready To Transform Your Gym Operations?
          </h2>

          <p className="text-blue-100 text-lg mt-6 leading-8">
            Start managing memberships, subscriptions,
            attendance, and staff with one centralized platform.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">

            <Link
              href="/register"
              className="bg-white text-blue-600 hover:bg-gray-100 transition px-7 py-4 rounded-2xl font-semibold"
            >
              Get Started
            </Link>

            <Link
              href="/login"
              className="border border-white/30 hover:bg-white/10 transition text-white px-7 py-4 rounded-2xl font-semibold"
            >
              Login To Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-4">

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
              <Dumbbell className="text-white" size={18} />
            </div>

            <div>
              <h3 className="font-bold text-gray-900">
                GymPro
              </h3>

              <p className="text-xs text-gray-900 font-bold">
                Modern Gym Management Platform
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-900 font-bold">
            © 2026 GymPro. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}