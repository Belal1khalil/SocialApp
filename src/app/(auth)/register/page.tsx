"use client";

import React from "react";
import Link from "next/link";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineUser,
  HiArrowRight,
} from "react-icons/hi";
import { RiRocket2Line } from "react-icons/ri";
import { FaGoogle, FaFacebookF } from "react-icons/fa";

export default function RegisterPage() {
  return (
    <div className=" flex items-center justify-center  px-4 py-8 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-200/20 rounded-full blur-[120px] animate-pulse" />
      <div
        className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-200/20 rounded-full blur-[120px] animate-pulse"
        style={{ animationDelay: "2s" }}
      />

      <div className="container max-w-5xl z-10">
        <div className="bg-white/70 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/40 overflow-hidden flex flex-col lg:flex-row min-h-[680px]">
          {/* Left Side: Brand Panel */}
          <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-br from-primary-600 via-primary-700 to-primary-900 z-0" />
            <div className="absolute top-[-20%] right-[-10%] w-[80%] h-[80%] bg-white/10 rounded-full blur-[80px] animate-pulse" />

            <div className="relative z-10 flex flex-col justify-between p-12 h-full text-white">
              <Link href="/" className="flex items-center gap-3 w-fit group">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-xl text-primary-600 group-hover:rotate-6 transition-transform duration-300">
                  <RiRocket2Line size={28} />
                </div>
                <span className="text-2xl font-bold tracking-tight">
                  SocialApp
                </span>
              </Link>

              <div className="max-w-sm">
                <h2 className="text-4xl font-extrabold leading-tight mb-6">
                  Experience the{" "}
                  <span className="text-primary-300">future</span> of social
                  connection.
                </h2>
                <p className="text-primary-100 text-lg mb-8 leading-relaxed">
                  Join millions of users and start sharing your journey with the
                  world today.
                </p>

                <div className="space-y-4">
                  {[
                    {
                      title: "Global Network",
                      desc: "Connect without borders.",
                    },
                    {
                      title: "Safe & Secure",
                      desc: "Your privacy is our priority.",
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-4 p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10"
                    >
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                        <HiArrowRight className="text-primary-300" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white text-sm">
                          {item.title}
                        </h4>
                        <p className="text-primary-200 text-xs">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 text-[10px] uppercase font-bold tracking-widest text-primary-300">
                <span>© 2026</span>
                <div className="w-1 h-1 bg-primary-400 rounded-full" />
                <span>NextGen Social</span>
              </div>
            </div>
          </div>

          {/* Right Side: Register Form */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 md:p-12 lg:p-16 bg-white/40">
            <div className="max-w-md mx-auto w-full space-y-8">
              <div className="space-y-2">
                <h3 className="text-3xl font-bold text-gray-900 tracking-tight">
                  Join Us
                </h3>
                <p className="text-gray-500 font-medium">
                  Create your account in seconds.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-3 px-4 py-3 bg-white border border-gray-100 rounded-2xl font-bold text-gray-700 hover:bg-gray-50 hover:shadow-sm transition-all active:scale-[0.98] text-sm">
                  <FaGoogle className="text-red-500" />
                  <span>Google</span>
                </button>
                <button className="flex items-center justify-center gap-3 px-4 py-3 bg-white border border-gray-100 rounded-2xl font-bold text-gray-700 hover:bg-gray-50 hover:shadow-sm transition-all active:scale-[0.98] text-sm">
                  <FaFacebookF className="text-blue-600" />
                  <span>Facebook</span>
                </button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-100"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold text-gray-400">
                  <span className="px-4 bg-transparent">Or email</span>
                </div>
              </div>

              <form className="space-y-5">
                <div className="space-y-2">
                  <label
                    className="text-xs font-bold text-gray-700  tracking-wider ml-1"
                    htmlFor="name"
                  >
                    Username
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary-500 transition-colors">
                      <HiOutlineUser size={20} />
                    </div>
                    <input
                      type="text"
                      id="name"
                      placeholder="John Doe"
                      className="w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all  placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    className="text-xs font-bold text-gray-700  tracking-wider ml-1"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary-500 transition-colors">
                      <HiOutlineMail size={20} />
                    </div>
                    <input
                      type="email"
                      id="email"
                      placeholder="name@company.com"
                      className="w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all  placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    className="text-xs font-bold text-gray-700  tracking-wider ml-1"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary-500 transition-colors">
                      <HiOutlineLockClosed size={20} />
                    </div>
                    <input
                      type="password"
                      id="password"
                      placeholder="••••••••"
                      className="w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all  placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 ml-1">
                  <input
                    type="checkbox"
                    id="terms"
                    className="mt-1 w-4 h-4 text-primary-600 border-gray-200 rounded-lg focus:ring-primary-500 transition-colors cursor-pointer"
                  />
                  <label
                    htmlFor="terms"
                    className="text-xs text-gray-500 font-medium leading-relaxed cursor-pointer mt-1"
                  >
                    I agree to the{" "}
                    <Link
                      href="#"
                      className="text-primary-600 font-bold hover:underline"
                    >
                      Terms
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="#"
                      className="text-primary-600 font-bold hover:underline"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-primary-600 text-white font-bold rounded-2xl shadow-xl shadow-primary-500/30 hover:bg-primary-700 hover:shadow-primary-500/40 transform hover:-translate-y-1 active:scale-[0.98] transition-all duration-300"
                >
                  Create Account
                </button>
              </form>

              <p className="text-center text-gray-600 font-medium pt-2">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-primary-600 font-semibold hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
