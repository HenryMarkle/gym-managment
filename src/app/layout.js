"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import SideBar from "../components/dashboard/SideBar";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Footer from "../components/website/Footer";
import CustomHeader from "../components/website/CustomHeader";
// import Cookies from "js-cookie";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children, showSidebar = true }) {
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    console.log(path);
    // const numberCookie = Cookies.get("number");
    // if (numberCookie == null) {
    //   router.push("/sign-up");
    // }
  }, []);
  return (
    <html lang="en">
      <body className={inter.className}>
        {showSidebar && path.includes("panel") && <SideBar></SideBar>}
        {!path.includes("panel") && path != "/" && <CustomHeader />}
        {children}
        {!path.includes("panel") && <Footer />}
      </body>
    </html>
  );
}
