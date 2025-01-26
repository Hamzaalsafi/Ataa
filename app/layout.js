import localFont from "next/font/local";
import "./globals.css";
import { Noto_Sans_Arabic } from "next/font/google";
import ClientProvider from "../components/ClientProvider";
import NavBar from "@/components/navBarComponent/NavBar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"], // Include the Arabic subset
  variable: "--font-noto-sans-arabic", // Set a custom CSS variable
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // Specify weights
});
export const metadata = {
  title: "عطاء",
  description: "مكتبة العطاء",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`overflow-x-hidden ${geistSans.variable} ${geistMono.variable} ${notoSansArabic.variable} antialiased`}
      >
        <NavBar />
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
