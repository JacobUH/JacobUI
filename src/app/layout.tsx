import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../../resources/global.css";
import StoreProvider from "./StoreProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JacobUI",
  description: "A bunch of small projects and ideas!",
  icons: "icons/jacobUI.svg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} home-background antialiased overflow-hidden`}
        >
          <main>{children}</main>
        </body>
      </html>
    </StoreProvider>
  );
}
