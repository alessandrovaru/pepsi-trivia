'use client'

import Image from "next/image";
import { useEffect, useState } from "react";

import styles from '../Home.module.css'; // Import the CSS module


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
          width={200}
          height={200}
          className={`${styles.pulseScale}`}
        />
        <h1 className="text-black text-2xl">
          ¡Predicciones registradas!
        </h1>
        <p className="text-black text-sm">Ya habías dejado una predicción.</p>
        <p className="text-black text-sm">
          Sigue disfrutando del jonrón pepsi edición 22
        </p>
        {/* Agrega un icon de instagram que sea clickeable y que te lleve a su perfil */}
        <p className="text-black text-sm mt-4">
          síguenos en nuestras redes sociales
        </p>
        <a href="https://www.instagram.com/pepsiven/" target="_blank" className="mt-4 flex flex-col text-black items-center justify-center">

        <span className="underline text-black animate-pulse">@pepsiven</span>
        </a>
      </main>
    </div>
    // agrega un view que saga cuando ya la quinierla haya terminado

    // <div className="flex items-center justify-center h-[96vh] flex-col p-8 font-[family-name:var(--font-pepsi-owners-2-compressed)] bg-black">
    //   <Image
    //     src="/images/logo.png"
    //     alt="Logo"
    //     width={200}
    //     height={200}
    //     className="mx-auto h-20 w-20 mb-4"
    //   />
    //   <p className='text-white text-xl'>La quiniela ha terminado</p>
    //   <p className='text-white text-sm'>Pronto revelaremos al ganador</p>
    //   <p className="text-white text-sm mt-4">
    //    síguenos en nuestras redes sociales
    //   </p>
    //   <a href="https://www.instagram.com/pepsiven/" target="_blank" className="mt-4 flex flex-col text-white items-center justify-center">
    //    <span className="underline text-white animate-pulse">@pepsiven</span>
    //   </a>
    // </div>
  );
}