"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import SideBar from "../components/SideBar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children, showSidebar = true }) {
  // let x = 21;
  // const router = useRouter();

  // useEffect(() => {
  //   if (x != 1) router.push("/sign-in");
  // }, []);
  return (
    <html lang="en">
      <body className={inter.className}>
        {showSidebar && <SideBar></SideBar>}
        {children}
      </body>
    </html>
  );
}
