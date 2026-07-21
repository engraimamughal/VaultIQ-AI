"use client";

import Link from "next/link";
import { useState } from "react";
import {
  LayoutDashboard,
  PackagePlus,
  Bot,
  Globe,
  Menu,
  X,
  ShieldCheck,
} from "lucide-react";

import { useLanguage } from "@/lib/LanguageContext";


export default function Navbar() {


  const [open, setOpen] = useState(false);


  const { language, toggleLanguage, t } = useLanguage();





  const links = [


    {
      name: t.dashboard,
      href: "/dashboard",
      icon: LayoutDashboard
    },


    {
      name: t.addProduct,
      href: "/add-item",
      icon: PackagePlus
    },


    {
      name: t.aiAssistant,
      href: "/ai",
      icon: Bot
    },


  ];







  return (


    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">


      <div className="max-w-7xl mx-auto px-6">



        <div className="h-16 flex items-center justify-between">





          <Link

            href="/dashboard"

            className="flex items-center gap-3"

          >


            <div className="bg-blue-600 text-white p-2 rounded-lg">


              <ShieldCheck size={22}/>


            </div>





            <div>


              <h1 className="font-bold text-xl text-[#0F172A]">


                {t.vaultTitle}


              </h1>



              <p className="text-xs text-slate-500">


                Smart Warranty Vault


              </p>



            </div>



          </Link>









          <div className="hidden md:flex items-center gap-2">





            {links.map((link)=>{


              const Icon = link.icon;



              return (


                <Link


                  key={link.href}


                  href={link.href}


                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-700 hover:bg-slate-100"


                >


                  <Icon size={18}/>


                  {link.name}


                </Link>



              );


            })}








            <button


              onClick={toggleLanguage}


              className="flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-slate-100"


            >


              <Globe size={18}/>


              {language === "EN" ? "EN" : "اردو"}



            </button>





          </div>









          <button


            className="md:hidden"


            onClick={()=>setOpen(!open)}


          >



            {


              open ?


              <X size={25}/>


              :


              <Menu size={25}/>



            }



          </button>





        </div>









        {


          open && (


            <div className="md:hidden pb-5 flex flex-col gap-2">





              {links.map((link)=>{


                const Icon = link.icon;



                return (


                  <Link


                    key={link.href}


                    href={link.href}


                    onClick={()=>setOpen(false)}


                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100"


                  >


                    <Icon size={18}/>


                    {link.name}



                  </Link>



                );



              })}







              <button


                onClick={toggleLanguage}


                className="flex items-center gap-2 border p-3 rounded-lg"


              >


                <Globe size={18}/>


                {language === "EN" ? "EN" : "اردو"}



              </button>






            </div>


          )


        }





      </div>


    </nav>


  );


}