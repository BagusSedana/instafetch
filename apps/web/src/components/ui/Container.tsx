import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "hero";
}

export function Container({ children, className = "", size = "default" }: ContainerProps) {
  const maxW = size === "hero" ? "max-w-hero" : "max-w-content";
  return (
    <div className={`w-full mx-auto px-4 sm:px-6 lg:px-8 ${maxW} ${className}`}>
      {children}
    </div>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
}: SectionHeadingProps) {
  return (
    <div className={`space-y-2 ${centered ? "text-center mx-auto max-w-2xl" : ""}`}>
      {eyebrow && (
        <span className="text-xs font-semibold uppercase tracking-wider text-brand-violet bg-brand-violet/10 dark:bg-brand-violet/20 px-2.5 py-1 rounded-full">
          {eyebrow}
        </span>
      )}
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-mainLight dark:text-text-mainDark">
        {title}
      </h2>
      {description && (
        <p className="text-sm sm:text-base text-text-subduedLight dark:text-text-subduedDark leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
