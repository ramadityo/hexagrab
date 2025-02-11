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
        <html lang="en">
            <body className={`${jakartasans.variable} antialiased`}>
                {children}

                <Toaster />
            </body>
        </html>
    );
}
