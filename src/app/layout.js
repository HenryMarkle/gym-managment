"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import SideBar from "../components/dashboard/SideBar";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Footer from "../components/website/Footer";
import CustomHeader from "../components/website/CustomHeader";
import { isUserSignedIn } from "./api/v1/user";
// import Cookies from "js-cookie";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children, showSidebar = true }) {
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    isUserSignedIn().then((u) => {
      if (!u && (path.startsWith("/panel/") || path.startsWith("/panel"))) {
        router.push("/panel/sign-in");
      }
    });
  }, []);
  return (
    <html lang="en">
      <body className={inter.className}>
        {showSidebar &&
          path.includes("panel") &&
          !path.includes("dashboard") && <SideBar></SideBar>}
        {!path.includes("panel") && path != "/" && <CustomHeader />}
        {children}
        {!path.includes("panel") && <Footer />}
      </body>
    </html>
  );
}
