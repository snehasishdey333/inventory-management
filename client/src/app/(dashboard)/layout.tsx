import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";




export const metadata: Metadata = {
  title: "Inventory Management App",
  description: "Inventory Management App",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
      <main>
        <Navbar/>
        <div className="flex h-screen bg-gray-100">
          <Sidebar />
          <main className="flex-1 overflow-y-auto bg-gray-100 p-3 md:p-5">{children}</main>
          <ToastContainer position="bottom-right" theme="dark" />
        </div>
      </main>
    
  );
}
