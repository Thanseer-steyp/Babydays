import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Wrapper from "@/components/includes/HeaderFooterWrapper";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "BabyDays | Premium Baby Products",
    template: "%s | BabyDays",
  },
  description:
    "Shop premium baby products — head pillows, swaddle wraps, sherpa sleepers & more.",
  keywords:
    "baby products, baby pillow, swaddle wrap, baby blanket, sherpa sleeper",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://yourdomain.com",
  ),
  openGraph: { type: "website", locale: "en_IN", siteName: "BabyDays" },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Wrapper>{children}</Wrapper>
      </body>
    </html>
  );
}
