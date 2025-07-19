"use client";
import React from "react";
import { Nunito } from "next/font/google";
import "./globals.css";
import { primaryColorBg } from "@/constants/values";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900", "1000"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={nunito.className}
        style={{ backgroundColor: primaryColorBg }}
        suppressHydrationWarning
      >
        <SessionProvider>
          <ToastContainer />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
