import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/Footer/Footer";
import Script from "next/script";

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
  title: "Festival del Jonrón edición 22",
  description: " ¡Participa en la quiniela de Pepsi y gana premios!",
  openGraph: {
    title: 'Quiniela Pepsi - Festival del Jonrón edición 22',
    description: '¡Participa en la quiniela de Pepsi y gana premios!',
    url: 'https://quiniela-jonron-pepsi.vercel.app/',
    siteName: 'Quiniela Pepsi - Festival del Jonrón edición 22',
    images: [
      {
        url: 'images/bg2.png',
        width: 1366,
        height: 768
      },
    ],
    locale: 'es_ES',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <Script id="clarity-script" strategy="afterInteractive">
        {`
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "p7pvpj7ixq");
        `}
      </Script>
      </head>
      <body
        className={`${PepsiOwners2Compressed.variable} antialiased`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
