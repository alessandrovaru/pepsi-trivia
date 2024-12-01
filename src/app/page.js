import Image from "next/image";

import { createClient } from '@supabase/supabase-js'

import styles from './Home.module.css'; // Import the CSS module
import Link from "next/link";


// Create a single supabase client for interacting with your database


export default async function Home() {
  const supabase = createClient('https://xyzcompany.supabase.co', 'public-anon-key')

  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className={`${styles.container} bg-black min-h-screen flex items-center justify-center flex-col p-4`}>
      <div className={styles.overlay}>
        <Link href="/login">
          <Image
            src="/images/jonron.png"
            alt="Pepsi Pulse Logo"
            width={400}
            height={400}
          />
          <Image
            src="/images/logo.png"
            alt="Overlay Image"
            width={130}
            height={130}
            className={styles.overlayImage}
          />
        </Link>
      </div>
      <h1 className={`${styles.title} font-[family-name:var(--font-pepsi-owners-2-compressed)] text-white font text-[3rem] text-center mt-12`} >TOCA PARA INICIAR LA QUINIELA</h1>
    </div>
  );
}
