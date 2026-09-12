export default function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className={className}>
      <g transform="translate(10, 10)">
        <path 
          d="M25 65 V20 L55 65 V20" 
          stroke="currentColor" 
          strokeWidth="12" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          fill="none" 
        />
        <path 
          d="M36 20 H55 V39" 
          stroke="#4ade80" 
          strokeWidth="12" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          fill="none" 
        />
      </g>
    </svg>
  );
}
