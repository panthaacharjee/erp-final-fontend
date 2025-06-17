import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

/* ============ Provider ============== */
import QueryProvider from "./components/Provider/QueryProvider";
import Session from "./components/Provider/SessionProvider";
import ReduxProvider from "./components/Provider/ReduxProvider";
import UserProvider from "./components/Provider/UserProvider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ERPAC-ERP SOLUTIONS",
  description: "Best ERP Solutions for Garments Sector",
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
        
        <ReduxProvider>
          <Session>
            <QueryProvider>
              <UserProvider>{children}</UserProvider>
            </QueryProvider>
          </Session>
        </ReduxProvider>
      </body>
    </html>
  );
}
