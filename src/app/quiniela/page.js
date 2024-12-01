'use client'

import Image from "next/image";
import { useEffect, useState } from "react";

export default function TriviaPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex items-center justify-center h-[96vh] p-8 bg-black font-[family-name:var(--font-pepsi-owners-2-compressed)] relative">
      <Image
        src={isMobile ? "/images/bg.png" : "/images/bg2.png"}
        alt="Background"
        fill
        objectFit="cover"
        className="absolute inset-0 z-0 opacity-20"
      />
      <main className="w-full max-w-md p-8 rounded-lg relative overflow-hidden bg-white text-center z-10 flex flex-col items-center">
      <Image  
          src="/images/logo.png"
          alt="Overlay Image"
          width={130}
          height={130}
          className="overlayImage"
        />
        <h1 className="text-black text-lg">
          ¡Predicciones registradas!
        </h1>
        <p className="text-black text-sm">
          Sigue disfrutando del jonrón pepsi edición 22
        </p>
      </main>
    </div>
  );
}