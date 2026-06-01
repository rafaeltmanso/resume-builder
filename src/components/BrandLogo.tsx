interface BrandLogoProps {
  /** Icon footprint */
  size?: 'sm' | 'md';
  showWordmark?: boolean;
  className?: string;
}

export function BrandMark({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="8" className="fill-stone-900 dark:fill-stone-100" />
      <path
        d="M9 8h9.5l3.5 3.5V23a1.5 1.5 0 0 1-1.5 1.5H9A1.5 1.5 0 0 1 7.5 23V9.5A1.5 1.5 0 0 1 9 8Z"
        className="fill-stone-50 dark:fill-stone-900"
      />
      <path
        d="M18.5 8v3.5H22"
        className="stroke-stone-300 dark:stroke-neutral-600"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 15.5h10"
        className="stroke-cyan-600 dark:stroke-cyan-400"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M11 18.5h8M11 21h6"
        className="stroke-stone-400 dark:stroke-neutral-500"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BrandWordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`leading-none tracking-tight ${className}`}>
      <span className="font-display font-semibold text-stone-950 dark:text-stone-50">Resume</span>
      <span className="font-sans font-medium text-stone-600 dark:text-stone-400"> Builder</span>
    </span>
  );
}

export default function BrandLogo({ size = 'md', showWordmark = true, className = '' }: BrandLogoProps) {
  const iconClass = size === 'sm' ? 'h-7 w-7' : 'h-9 w-9';
  const textClass = size === 'sm' ? 'text-sm' : 'text-[15px]';

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <BrandMark className={iconClass} />
      {showWordmark && <BrandWordmark className={textClass} />}
    </div>
  );
}
