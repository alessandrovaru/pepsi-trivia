import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/Footer/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const PepsiOwners2Compressed = localFont({
  src: "./fonts/PepsiOwners2Compressed.woff",
  variable: "--font-pepsi-owners-2-compressed",
  weight: "100 900",
});

const PepsiOwners2Extended = localFont({
  src: "./fonts/PepsiOwners2Extended.woff",
  variable: "--font-pepsi-owners-2-extended",
  weight: "100 900",
});

const PepsiOwners2Regular = localFont({
  src: "./fonts/PepsiOwners2Regular.woff",
  variable: "--font-pepsi-owners-2-regular",
  weight: "100 900",
});


export const metadata = {
  title: "Quiniela Pepsi - Festival de Jonrones 22",
  description: " ¡Participa en la quiniela de Pepsi y gana premios!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${PepsiOwners2Compressed.variable} antialiased`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
