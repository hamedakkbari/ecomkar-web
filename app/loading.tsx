import Image from "next/image";

export default function Loading() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "#0B0F14" }}
    >
      <div className="flex items-center justify-center animate-pulse">
        <Image src="/media/logo.svg" alt="EcomKar" width={120} height={120} priority />
      </div>
    </div>
  );
}


