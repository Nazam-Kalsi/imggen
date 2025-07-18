import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@components/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@components/components/customComponents/header";
import ClientProvider from "app/client-provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Imggen",
  description: "An AI Image generation tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <ClientProvider>            
          <Toaster richColors />
          <Header/>
          {children}
            </ClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
