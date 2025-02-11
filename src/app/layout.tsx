/* eslint-disable no-unused-vars */
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const jakartasans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-jakarta",
});

export const metadata = {
    title: "Hexagrab",
    description: "Input and get the color!",
    // icons: {
    //     icon: "/favicon.png", // /public path
    // },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${jakartasans.variable} antialiased`}>
                {children}

                <Toaster />
            </body>
        </html>
    );
}
