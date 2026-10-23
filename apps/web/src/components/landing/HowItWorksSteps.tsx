import { Link, CheckCircle, Download } from "lucide-react";

export function HowItWorksSteps() {
  const steps = [
    {
      step: "01",
      icon: Link,
      title: "Add your link",
      description:
        "Paste the link to your own Instagram Reel or public post. We strip any tracking queries automatically.",
    },
    {
      step: "02",
      icon: CheckCircle,
      title: "Verify accessibility",
      description:
        "Confirm your rights. Our server securely verifies that the content is accessible and meets size limits.",
    },
    {
      step: "03",
      icon: Download,
      title: "Save your media",
      description:
        "Preview images or videos and download verified original media directly to your device.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {steps.map((item) => (
        <div
          key={item.step}
          className="p-6 rounded-btn border border-borderLight dark:border-borderDark bg-surface-light dark:bg-surface-dark space-y-3 relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-lg bg-brand-violet/10 dark:bg-brand-violet/20 flex items-center justify-center text-brand-violet">
              <item.icon className="w-5 h-5" />
            </div>
            <span className="font-mono text-xl font-bold text-text-subduedLight/30 dark:text-text-subduedDark/30">
              {item.step}
            </span>
          </div>
          <h3 className="text-base font-semibold text-text-mainLight dark:text-text-mainDark">
            {item.title}
          </h3>
          <p className="text-xs sm:text-sm text-text-subduedLight dark:text-text-subduedDark leading-relaxed">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}
