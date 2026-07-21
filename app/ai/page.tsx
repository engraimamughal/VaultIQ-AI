"use client";


import { useState,useEffect } from "react";

import {
  Bot,
  Send,
  Sparkles,
  User,
  LoaderCircle,
} from "lucide-react";

import { useLanguage } from "@/lib/LanguageContext";

import {
  collection,
  getDocs
} from "firebase/firestore";

import { db } from "@/lib/firebase";





export default function AIPage(){



const { language } = useLanguage() as {
  language: "EN" | "UR";
};



const [question,setQuestion]=useState("");

const [answer,setAnswer]=useState("");

const [loading,setLoading]=useState(false);

const [products,setProducts]=useState<any[]>([]);







useEffect(()=>{


async function fetchProducts(){


const snapshot = await getDocs(

collection(db,"items")

);



const data=snapshot.docs.map(item=>(

{

id:item.id,

...item.data()

}

));



setProducts(data);



}



fetchProducts();



},[]);









const text={


EN:{


title:"VaultIQ AI Assistant",

subtitle:"Ask questions about your products, maintenance, troubleshooting, and warranty guidance.",

ask:"Ask VaultIQ",

placeholder:"Example: Is my Samsung TV still under warranty?",

thinking:"Thinking...",

button:"Ask AI",

response:"VaultIQ AI Response",

error:"Sorry, something went wrong."


},



UR:{


title:"VaultIQ AI اسسٹنٹ",

subtitle:"اپنی مصنوعات، دیکھ بھال، مسائل کے حل اور وارنٹی کے بارے میں سوالات پوچھیں۔",

ask:"VaultIQ سے پوچھیں",

placeholder:"مثال: کیا میری Samsung TV کی وارنٹی ابھی موجود ہے؟",

thinking:"سوچا جا رہا ہے...",

button:"اے آئی سے پوچھیں",

response:"VaultIQ AI جواب",

error:"معذرت، کچھ غلط ہو گیا۔"


}



}[language];











async function askAI(){



if(!question.trim()) return;



setLoading(true);

setAnswer("");




try{


const response=await fetch("/api/ai",{


method:"POST",


headers:{


"Content-Type":"application/json"


},



body:JSON.stringify({


question,

products


})


});





const data=await response.json();



setAnswer(data.answer);



}



catch(error){


setAnswer(text.error);


}



finally{


setLoading(false);


}



}











return(


<main className="min-h-screen bg-[#F8FAFC] p-6 md:p-10">



<div className="max-w-4xl mx-auto">





<div className="mb-8">


<div className="flex items-center gap-3">


<div className="bg-teal-100 text-teal-600 p-3 rounded-xl">


<Bot size={28}/>


</div>



<h1 className="text-3xl md:text-4xl font-bold text-[#0F172A]">


{text.title}


</h1>


</div>





<p className="text-slate-500 mt-4">


{text.subtitle}


</p>


</div>







<div className="bg-white border rounded-2xl p-6 shadow-sm">



<div className="flex gap-2 items-center mb-4">


<Sparkles size={18} className="text-teal-600"/>


<h2 className="font-semibold">


{text.ask}


</h2>


</div>





<textarea


value={question}


onChange={(e)=>setQuestion(e.target.value)}


placeholder={text.placeholder}


className="w-full min-h-36 p-4 rounded-xl border resize-none"


/>







<button


onClick={askAI}


disabled={loading}


className="mt-5 flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl"


>


{


loading ?


<>

<LoaderCircle className="animate-spin" size={18}/>

{text.thinking}

</>


:


<>

<Send size={18}/>

{text.button}

</>


}



</button>





</div>









{answer && (


<div className="mt-8 space-y-5">





<div className="flex justify-end">


<div className="bg-blue-600 text-white rounded-2xl px-5 py-3 flex gap-3">


<User size={18}/>


<p>{question}</p>


</div>


</div>






<div className="bg-white border border-teal-200 rounded-2xl p-6">



<div className="flex items-center gap-3 mb-4">


<div className="bg-teal-100 text-teal-600 p-2 rounded-lg">


<Bot size={22}/>


</div>


<h3 className="font-semibold">


{text.response}


</h3>


</div>





<p className="whitespace-pre-line text-slate-700 leading-7">


{answer}


</p>



</div>





</div>


)}







</div>



</main>


);



}