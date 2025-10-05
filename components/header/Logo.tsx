import Image from "next/image";

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <Image
      src="/logo.png"
      alt="EcomKar"
      width={128}
      height={32}
      priority
      className={`h-7 md:h-8 w-auto shrink-0 select-none pointer-events-none ${className}`}
    />
  );
}

