"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import {
  Package,
  Calendar,
  ShieldCheck,
  Tag,
  Pencil,
  Bot,
  Sparkles,
  ArrowLeft,
  Clock,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useLanguage } from "@/lib/LanguageContext";



export default function ProductDetails() {


  const params = useParams();

  const id = params.id as string;


  const { language } = useLanguage() as {
  language: "EN" | "UR";
};




  const [product,setProduct] = useState<any>(null);

  const [loading,setLoading] = useState(true);






  const text = {


    EN:{


      loading:"Loading product...",

      notFound:"Product not found",

      back:"Back to Dashboard",

      details:"Product details and warranty information",

      edit:"Edit Product",

      information:"Product Information",

      category:"Category",

      purchase:"Purchase Date",

      warranty:"Warranty Period",

      status:"Warranty Status",

      active:"Active",

      insights:"VaultIQ AI Insights",

      aiText:"Get AI-powered troubleshooting, maintenance advice, and warranty guidance for this product.",

      askAI:"Ask AI Assistant",

      tips:"Maintenance Recommendation",

      tipText:"Regular maintenance and proper usage can increase product life and reduce unexpected issues."


    },



    UR:{


      loading:"پروڈکٹ لوڈ ہو رہا ہے...",

      notFound:"پروڈکٹ نہیں ملا",

      back:"ڈیش بورڈ پر واپس جائیں",

      details:"پروڈکٹ کی تفصیلات اور وارنٹی معلومات",

      edit:"پروڈکٹ میں ترمیم",

      information:"پروڈکٹ کی معلومات",

      category:"قسم",

      purchase:"خریداری کی تاریخ",

      warranty:"وارنٹی مدت",

      status:"وارنٹی کی حالت",

      active:"فعال",

      insights:"VaultIQ AI بصیرت",

      aiText:"اس پروڈکٹ کے لیے اے آئی سے مسائل کا حل، دیکھ بھال اور وارنٹی رہنمائی حاصل کریں۔",

      askAI:"اے آئی اسسٹنٹ سے پوچھیں",

      tips:"دیکھ بھال کی سفارش",

      tipText:"باقاعدہ دیکھ بھال پروڈکٹ کی عمر بڑھانے اور مسائل کم کرنے میں مدد کرتی ہے۔"


    }


  }[language];









  useEffect(()=>{


    async function fetchProduct(){


      try{


        const ref = doc(db,"items",id);


        const snapshot = await getDoc(ref);



        if(snapshot.exists()){


          setProduct({

            id:snapshot.id,

            ...snapshot.data()

          });


        }


      }

      catch(error){


        console.log(error);


      }


      finally{


        setLoading(false);


      }


    }



    if(id){

      fetchProduct();

    }



  },[id]);









  if(loading){


    return(


      <main className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">


        <p className="text-slate-500">

          {text.loading}

        </p>


      </main>


    );


  }







  if(!product){


    return(


      <main className="min-h-screen bg-[#F8FAFC] p-10">


        <h1 className="text-2xl font-bold">

          {text.notFound}

        </h1>


      </main>


    );


  }









  return(



<main className="min-h-screen bg-[#F8FAFC] p-6 md:p-10">


<div className="max-w-5xl mx-auto">







<Link

href="/dashboard"

className="flex items-center gap-2 text-slate-600 hover:text-blue-600 mb-6"

>


<ArrowLeft size={18}/>

{text.back}


</Link>









<div className="flex flex-col md:flex-row justify-between gap-5 mb-8">


<div>


<h1 className="text-4xl font-bold text-[#0F172A]">

{product.product}

</h1>


<p className="text-slate-500 mt-2">

{text.details}

</p>


</div>





<Link

href={`/edit/${product.id}`}

className="flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700"

>


<Pencil size={18}/>

{text.edit}


</Link>



</div>









<div className="grid md:grid-cols-2 gap-6">







<div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm">



<div className="flex items-center gap-3 mb-7">


<div className="bg-blue-100 text-blue-600 p-3 rounded-xl">

<Package size={25}/>

</div>


<h2 className="text-xl font-semibold">

{text.information}

</h2>


</div>







<div className="space-y-6">





<div className="flex gap-3">


<Tag className="text-slate-500"/>


<div>


<p className="text-sm text-slate-500">

{text.category}

</p>


<p className="font-medium">

{product.category}

</p>


</div>


</div>







<div className="flex gap-3">


<Calendar className="text-slate-500"/>


<div>


<p className="text-sm text-slate-500">

{text.purchase}

</p>


<p className="font-medium">

{product.date}

</p>


</div>


</div>







<div className="flex gap-3">


<ShieldCheck className="text-teal-600"/>


<div>


<p className="text-sm text-slate-500">

{text.warranty}

</p>


<p className="font-medium text-teal-600">

{product.warranty}

</p>


</div>


</div>






<div className="flex gap-3">


<Clock className="text-blue-600"/>


<div>


<p className="text-sm text-slate-500">

{text.status}

</p>


<p className="font-medium text-green-600">

🟢 {text.active}

</p>


</div>


</div>





</div>



</div>









<div className="space-y-6">





<div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm">



<div className="flex items-center gap-3 mb-5">


<div className="bg-teal-100 text-teal-600 p-3 rounded-xl">


<Bot size={25}/>


</div>


<h2 className="text-xl font-semibold">

{text.insights}

</h2>


</div>






<p className="text-slate-600 leading-7">

{text.aiText}

</p>






<Link

href="/ai"

className="inline-flex items-center gap-2 mt-6 bg-teal-600 text-white px-5 py-3 rounded-xl hover:bg-teal-700"

>


<Sparkles size={18}/>

{text.askAI}


</Link>



</div>








<div className="bg-white border border-slate-200 rounded-2xl p-7">


<h2 className="font-semibold text-lg mb-3">

{text.tips}

</h2>


<p className="text-slate-600 leading-7">

{text.tipText}

</p>


</div>





</div>






</div>





</div>


</main>


  );


}