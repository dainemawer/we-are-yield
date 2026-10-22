type IconProps = { size?: number; strokeWidth?: number; className?: string };

export function ArrowUpRight({
  size = 14,
  strokeWidth = 2,
  className,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M7 17L17 7M8 7h9v9" />
    </svg>
  );
}
