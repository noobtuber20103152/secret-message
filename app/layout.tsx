import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextUiProvider } from "@/providers/next-ui-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";
import Topbar from "@/components/topbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create your secret message",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <NextUiProvider>
            <NextTopLoader />
            <Topbar />
            {children}
            <Toaster
              position="top-center"
              gutter={8}
              toastOptions={{
                duration: 3000,
              }}
            />
          </NextUiProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
