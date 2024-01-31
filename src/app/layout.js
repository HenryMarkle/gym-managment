"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import SideBar from "../components/SideBar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children, showSidebar = true }) {
  const router = useRouter();
  useEffect(() => {
    // const numberCookie = Cookies.get("number");
    // if (numberCookie == null) {
    //   router.push("/sign-up");
    // }
  }, []);
  return (
    <html lang="en">
      <body className={inter.className}>
        {showSidebar && <SideBar></SideBar>}
        {children}
      </body>
    </html>
  );
}
