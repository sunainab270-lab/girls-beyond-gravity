import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://girlsbeyondgravity.org"),
  title: "Girls Beyond Gravity | AP Physics and Aerospace Opportunities",
  description:
    "Helping aspiring aerospace students master AP Physics and discover global scholarships, internships, undergraduate programs, research, and competitions.",
  openGraph: {
    title: "Girls Beyond Gravity",
    url: "https://girlsbeyondgravity.org",
    siteName: "Girls Beyond Gravity",
    type: "website",
    description:
      "Master AP Physics. Discover global aerospace opportunities.",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
