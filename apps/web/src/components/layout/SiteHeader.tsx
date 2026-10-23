"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ArrowDownToLine } from "lucide-react";
import { NAV_LINKS, APP_CONFIG } from "../../lib/constants";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-borderLight dark:border-borderDark bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-md">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Wordmark */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-brand-violet/10 dark:bg-brand-violet/20 flex items-center justify-center text-brand-violet group-hover:scale-105 transition-transform">
            <ArrowDownToLine className="w-5 h-5 text-brand-violet" />
          </div>
          <span className="font-semibold text-lg tracking-tight text-text-mainLight dark:text-text-mainDark">
            {APP_CONFIG.name}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-text-subduedLight dark:text-text-subduedDark">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-text-mainLight dark:hover:text-text-mainDark transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Header Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            className="md:hidden p-2 rounded-btn border border-borderLight dark:border-borderDark text-text-subduedLight dark:text-text-subduedDark"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-borderLight dark:border-borderDark bg-surface-light dark:bg-surface-dark px-4 py-4 space-y-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-btn text-base font-medium text-text-subduedLight dark:text-text-subduedDark hover:bg-elevated-light dark:hover:bg-elevated-dark hover:text-text-mainLight dark:hover:text-text-mainDark"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
