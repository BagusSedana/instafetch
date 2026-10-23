import Link from "next/link";
import { FOOTER_LINKS, APP_CONFIG } from "../../lib/constants";

export function SiteFooter() {
  return (
    <footer className="w-full border-t border-borderLight dark:border-borderDark bg-surface-light dark:bg-surface-dark py-12 mt-20">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="font-semibold text-base text-text-mainLight dark:text-text-mainDark">
              {APP_CONFIG.name}
            </span>
            <p className="text-sm text-text-subduedLight dark:text-text-subduedDark mt-1 max-w-md">
              {APP_CONFIG.tagline}. High-utility media tools for creators and verified content owners.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-text-subduedLight dark:text-text-subduedDark">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-text-mainLight dark:hover:text-text-mainDark transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-borderLight dark:border-borderDark/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-text-subduedLight dark:text-text-subduedDark">
          <p className="max-w-xl leading-relaxed">
            {APP_CONFIG.disclaimer}
          </p>
          <p>© {new Date().getFullYear()} {APP_CONFIG.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
