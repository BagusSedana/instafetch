import { Film, Image as ImageIcon, Layers, HardDrive } from "lucide-react";

export function FeatureCards() {
  const features = [
    {
      icon: Film,
      title: "Instagram Reels",
      description: "Direct MP4 extraction preserving original resolution, audio streams, and frame rate.",
      tag: "Video",
    },
    {
      icon: ImageIcon,
      title: "Single Photos",
      description: "Save individual high-resolution JPEG/WebP photos from verified public posts.",
      tag: "Image",
    },
    {
      icon: Layers,
      title: "Carousel Albums",
      description: "Inspect multi-item albums in original order with selective item download.",
      tag: "Album",
    },
    {
      icon: HardDrive,
      title: "Local Media Tool",
      description: "Inspect, view metadata, and re-download media stored on your device with 100% privacy.",
      tag: "Client-Only",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {features.map((feat) => (
        <div
          key={feat.title}
          className="p-5 rounded-btn border border-borderLight dark:border-borderDark bg-surface-light dark:bg-surface-dark space-y-2.5"
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-md bg-brand-violet/10 dark:bg-brand-violet/20 flex items-center justify-center text-brand-violet">
              <feat.icon className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-elevated-light dark:bg-elevated-dark text-text-subduedLight dark:text-text-subduedDark">
              {feat.tag}
            </span>
          </div>
          <h3 className="text-sm font-semibold text-text-mainLight dark:text-text-mainDark">
            {feat.title}
          </h3>
          <p className="text-xs text-text-subduedLight dark:text-text-subduedDark leading-relaxed">
            {feat.description}
          </p>
        </div>
      ))}
    </div>
  );
}
