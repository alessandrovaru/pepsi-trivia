import Image from "next/image";

import { createClient } from '@supabase/supabase-js'

import styles from './Home.module.css'; // Import the CSS module
import Link from "next/link";


// Create a single supabase client for interacting with your database


export default async function Home() {
  const supabase = createClient('https://xyzcompany.supabase.co', 'public-anon-key')

  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className={styles.container}>
      <div className={styles.overlay}>
        <Link href="/login">
          <Image
            src="/images/can-2.webp"
            alt="Pepsi Pulse Logo"
            width={200}
            height={200}
          />
          <Image
            src="/images/pulse.webp"
            alt="Overlay Image"
            width={240}
            height={240}
            className={styles.overlayImage}
          />
        </Link>
      </div>
    </div>
  );
}
