import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { TRPCReactProvider } from "~/trpc/react";
import { Header } from "./_components/header";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Recipes",
  description:
    "It's the main page of Recipes App where you can browse five last existing recipes and add your own!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${inter.variable} h-screen bg-stone-950 px-6`}
      >
        <TRPCReactProvider cookies={cookies().toString()}>
          <Header />
          {children}
          <Toaster />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
