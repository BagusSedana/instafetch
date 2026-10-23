"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_LIST: FAQItem[] = [
  {
    question: "Can I download media from private Instagram accounts?",
    answer:
      "No. InstaFetch strictly respects privacy and platform access controls. We never collect Instagram login credentials or session cookies, and we cannot access content from private profiles.",
  },
  {
    question: "Why does an inspection sometimes report 'Media Retrieval Restricted'?",
    answer:
      "Instagram frequently applies rate limits or challenges unauthenticated requests from cloud servers. Furthermore, automated extraction is disabled by default for platform compliance until verified by the site administrator.",
  },
  {
    question: "What is the Local Device Files tool?",
    answer:
      "It is an in-browser utility allowing you to inspect dimensions, metadata, and format files already stored on your phone or computer. Zero bytes are uploaded to our servers.",
  },
  {
    question: "Is InstaFetch affiliated with Instagram or Meta?",
    answer:
      "No. InstaFetch is an independent open-source tool with zero affiliation, endorsement, or partnership with Meta Platforms, Inc. or Instagram.",
  },
  {
    question: "How long are temporary download links stored?",
    answer:
      "Any server-generated download links expire automatically after 30 minutes, after which transient files are deleted. We do not maintain a permanent media database.",
  },
];

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex((curr) => (curr === idx ? null : idx));
  };

  return (
    <div className="space-y-3 max-w-3xl mx-auto">
      {FAQ_LIST.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={item.question}
            className="rounded-btn border border-borderLight dark:border-borderDark bg-surface-light dark:bg-surface-dark overflow-hidden transition-all"
          >
            <button
              type="button"
              onClick={() => toggle(idx)}
              aria-expanded={isOpen}
              className="w-full p-4 text-left flex items-center justify-between gap-4 font-medium text-sm text-text-mainLight dark:text-text-mainDark hover:bg-elevated-light dark:hover:bg-elevated-dark transition-colors"
            >
              <span>{item.question}</span>
              <ChevronDown
                className={`w-4 h-4 text-text-subduedLight shrink-0 transition-transform duration-200 ${
                  isOpen ? "rotate-180 text-brand-violet" : ""
                }`}
              />
            </button>

            {isOpen && (
              <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-text-subduedLight dark:text-text-subduedDark leading-relaxed border-t border-borderLight/60 dark:border-borderDark/60">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
