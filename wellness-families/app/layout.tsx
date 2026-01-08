import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const gaId = process.env.NEXT_PUBLIC_GA_ID;
const gadsId = process.env.NEXT_PUBLIC_GADS_ID;
const fbPixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://wellnes-heaven.vercel.app";

export const metadata: Metadata = {
  title: "Wellness Heaven - Privátny Wellness | Bratislava",
  description: "Privátny wellness v Bratislave – Ružinov. Súkromný wellness pre dvoch alebo partiu priateľov. Sauna, masáže, vírivka.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Wellness Heaven - Privátny Wellness | Bratislava",
    description: "Privátny wellness v Bratislave – Ružinov. Súkromný wellness pre dvoch alebo partiu priateľov. Sauna, masáže, vírivka.",
    images: [
      {
        url: `${siteUrl}/images/Photo%2011.png`,
        width: 1200,
        height: 630,
        alt: "Wellness Heaven lounge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wellness Heaven - Privátny Wellness | Bratislava",
    description: "Privátny wellness v Bratislave – Ružinov. Súkromný wellness pre dvoch alebo partiu priateľov. Sauna, masáže, vírivka.",
    images: [`${siteUrl}/images/Photo%2011.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#c97d60" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Wellness Heaven" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-body antialiased`}>
        {(gaId || gadsId) && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId || gadsId}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                ${gaId ? `gtag('config', '${gaId}');` : ""}
                ${gadsId ? `gtag('config', '${gadsId}');` : ""}
              `}
            </Script>
          </>
        )}

        {fbPixelId && (
          <>
            <Script id="fb-pixel" strategy="afterInteractive">
              {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${fbPixelId}');
                fbq('track', 'PageView');
              `}
            </Script>
            <noscript
              aria-hidden="true"
              dangerouslySetInnerHTML={{
                __html: `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${fbPixelId}&ev=PageView&noscript=1" />`,
              }}
            />
          </>
        )}

        <Header />
        <main className="overflow-x-hidden">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
