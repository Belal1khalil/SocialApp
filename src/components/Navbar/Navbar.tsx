"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hooks";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { HiMenuAlt3, HiX, HiUserCircle, HiChevronDown } from "react-icons/hi";
import { RiRocket2Line } from "react-icons/ri";
import userplaceholder from "../../assests/imgs/user (1).png"

import { logout } from "@/store/features/user.slice";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const { token , userData } = useAppSelector((store) => store.userReducer);

  const handleLogout = () => {
    dispatch(logout());
    setUserMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-sm"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group transition-transform hover:scale-105"
          >
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30 group-hover:rotate-6 transition-transform">
              <RiRocket2Line className="text-white text-2xl" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-gray-900 to-gray-600">
              Social<span className="text-primary-600">App</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {token ? (
              <>
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 p-1.5 pr-3 bg-gray-50 hover:bg-gray-100 rounded-full border border-gray-100 transition-all group"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                      {/* <HiUserCircle size={24} /> */}
                      <img 
                      src= {userData?.photo || userplaceholder.src}
                      className="w-6 h-6 rounded-full "
                       alt=""
                        />
                    </div>
                    <HiChevronDown
                      className={`text-gray-400 group-hover:text-primary-600 transition-transform duration-300 ${userMenuOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* User Dropdown */}
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 animate-in fade-in zoom-in duration-200">
                      <Link
                        href="/profile"
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                      >
                        Profile
                      </Link>
                      <Link
                        href="/settings"
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                      >
                        Settings
                      </Link>
                      <hr className="my-1 border-gray-100" />
                      <Link href={"/login"}>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left block px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          Logout
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-6 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-full hover:bg-primary-700 hover:shadow-xl hover:shadow-primary-500/40 transition-all transform hover:-translate-y-0.5 active:scale-95"
                >
                  Get Started
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 focus:outline-none p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-2xl border-b border-gray-100 overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen
              ? "max-h-96 opacity-100"
              : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex flex-col p-6 gap-4">
            {token ? (
              <>
                <Link
                  href="/profile"
                  className="flex items-center gap-3 text-lg font-medium text-gray-700 hover:text-primary-600 py-2"
                  onClick={() => setIsOpen(false)}
                >
                  <HiUserCircle size={24} className="text-primary-500" /> My
                  Profile
                </Link>
                <Link
                  href="/settings"
                  className="text-lg font-medium text-gray-700 hover:text-primary-600 py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Settings
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full text-left text-lg font-medium text-red-600 py-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-lg font-medium text-gray-700 hover:text-primary-600 py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="w-full text-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
