export default function AamiraBasicMark({
  className,
}: Readonly<{ className?: string }>) {
  return (
    <svg
      viewBox="0 0 36 36"
      role="img"
      aria-label="Aamira Basic"
      className={className}
    >
      <rect x="1" y="1" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 31 14.7 5h6.6L30 31" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10.2 20.5h15.6" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M18 5v26M9 5h13.2c4.1 0 6.3 2.1 6.3 5.2 0 2.8-1.8 4.8-5.2 5.4 4.1.5 6.2 2.9 6.2 6.8 0 5.2-3.3 8.6-8.7 8.6H9" fill="none" stroke="currentColor" strokeWidth="1.15" />
    </svg>
  );
}
