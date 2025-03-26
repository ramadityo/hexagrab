import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";

import FloatContainer from "@/components/FloatContainer";
import Helpers from "@/components/Helpers";
import Preload from "@/components/Preload";

import "./globals.css";
import ClientWrapper from "@/components/ClientWrapper";

const jakartasans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-jakarta",
});

export const metadata = {
    title: "Hexagrab",
    description: "Grab your colors from any image!",
    icons: {
        icon: "icon.png",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            {/* <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>   */}

            <body className={`${jakartasans.variable} antialiased`} suppressHydrationWarning>
                <ClientWrapper>
                    {children}

                    <Preload />
                    <FloatContainer />
                    {/* <Helpers /> */}
                    <Toaster />
                </ClientWrapper>
            </body>
        </html>
    );
}
