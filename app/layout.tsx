// المسار: vera-law/app/layout.tsx
// نوع التعديل: ربط الهيدر والفوتر من داخل app/components

import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "VERA by Ahmed Al-Shamy",
  description: "Legal, Business & Investment Solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}