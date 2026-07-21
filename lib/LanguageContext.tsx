"use client";

import {
  createContext,
  useContext,
  useState,
} from "react";

import { translations } from "./language";


type Language = "EN" | "UR";


const LanguageContext = createContext<any>(null);



export function LanguageProvider({
  children,
}:{
  children: React.ReactNode;
}){


  const [language,setLanguage] = useState<Language>("EN");



  const t = translations[language];



  function toggleLanguage(){

    setLanguage(
      language === "EN" ? "UR" : "EN"
    );

  }



  return (

    <LanguageContext.Provider

      value={{
        language,
        setLanguage,
        toggleLanguage,
        t
      }}

    >

      {children}

    </LanguageContext.Provider>

  );


}




export function useLanguage(){

  return useContext(LanguageContext);

}