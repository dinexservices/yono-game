"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Contact Us", href: "/contact" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Privacy & Policy", href: "/privacy-policy" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo + Name */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden ring-2 ring-blue-300/40 group-hover:ring-blue-200 transition-all duration-300">
              <Image
                src="/logo.jpg"
                alt="All Yono Games Logo"
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-white font-bold text-xl tracking-wide">
                All Yono Games
              </span>
              <span className="text-blue-200 text-xs font-medium">
                allyonoogames.com
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-blue-100 hover:text-white font-medium text-sm rounded-lg hover:bg-white/10 transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile hamburger — only shows when drawer is closed */}
          <button
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition"
            onClick={() => setMobileOpen(true)}
            aria-label="Open Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Mobile right-side drawer (rendered outside the header flow) ── */}
      <div className="md:hidden">
        {/* Backdrop — click to close */}
        <div
          aria-hidden="true"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          style={{
            opacity: mobileOpen ? 1 : 0,
            pointerEvents: mobileOpen ? "auto" : "none",
          }}
        />

        {/* Drawer panel slides in from right */}
        <div
          className="fixed top-0 right-0 h-full w-72 bg-gradient-to-b from-blue-900 to-blue-950 z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out"
          style={{ transform: mobileOpen ? "translateX(0)" : "translateX(100%)" }}
        >
          {/* Drawer header with logo + close button */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-blue-700/50">
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0">
                <Image src="/logo.jpg" alt="logo" fill className="object-cover" sizes="32px" />
              </div>
              <span className="text-white font-bold text-sm">All Yono Games</span>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close Menu"
              className="text-blue-200 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col gap-1 px-4 py-6 flex-1">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-blue-100 hover:text-white font-medium text-sm rounded-xl hover:bg-white/10 transition-all duration-200"
                style={{ transitionDelay: mobileOpen ? `${i * 60}ms` : "0ms" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Telegram CTA at bottom */}
          <div className="px-5 py-4 border-t border-blue-700/50">
            <a
              href="https://t.me/+N3fCKqQK5tYxODdl"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors duration-200"
            >
              📱 Join Telegram
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
