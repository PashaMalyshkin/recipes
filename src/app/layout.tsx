import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { TRPCReactProvider } from "~/trpc/react";
import { Header } from "./_components/header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Recipes",
  description: "",
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
        </TRPCReactProvider>
      </body>
    </html>
  );
}
