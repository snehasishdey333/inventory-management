
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
import GlobalProvider from "@/providers/GlobalProvider";
import { fetchAuthSession } from "aws-amplify/auth";
import { Amplify } from "aws-amplify";




export const metadata: Metadata = {
  title: "Inventory Management App",
  description: "Inventory Management App",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (
    <html lang="en">
      <body>
        
        {/* <Navbar/> */}
        <GlobalProvider>
       
        {children}
        <ToastContainer position="bottom-right" theme="dark" />
        
        </GlobalProvider>
      </body>
    </html>
  );
}
