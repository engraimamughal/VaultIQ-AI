import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import { LanguageProvider } from "@/lib/LanguageContext";


export const metadata: Metadata = {

  title: "VaultIQ AI",
  description: "Smart Warranty Vault",

};



export default function RootLayout({

  children,

}: Readonly<{

  children: React.ReactNode;

}>) {


  return (

    <html lang="en">


      <body>


        <LanguageProvider>


          <Navbar />


          {children}



          <Toaster

            position="top-right"

            toastOptions={{

              duration:3000,

            }}

          />


        </LanguageProvider>


      </body>


    </html>

  );


}