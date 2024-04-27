"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import SideBar from "../components/dashboard/SideBar";
import HeaderDash from "../components/dashboard/HeaderDash";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Footer from "../components/website/Footer";
import CustomHeader from "../components/website/CustomHeader";
import { isUserSignedIn } from "./api/v1/user";
import Header from "../components/dashboard/Header";
import { ReduxProvider } from "../redux/provider";
// import Cookies from "js-cookie";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
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
        <ReduxProvider>
          {path.includes("panel") &&
            !path.includes("sign-in") &&
            !path.includes("dashboard") && <SideBar></SideBar>}
          {!path.includes("panel") && path != "/" && <CustomHeader />}
          {path.includes("panel") && !path.includes("sign-in") && <Header />}
          {path.includes("dashboard") && <HeaderDash />}
          {children}
          {!path.includes("panel") && <Footer />}
        </ReduxProvider>
      </body>
    </html>
  );
}
