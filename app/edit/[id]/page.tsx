"use client";

import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useParams, useRouter } from "next/navigation";
import {
  Package,
  Tag,
  Calendar,
  ShieldCheck,
  Save,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useLanguage } from "@/lib/LanguageContext";


export default function EditProduct() {


  const params = useParams();
  const router = useRouter();

  const { language } = useLanguage() as {
  language: "EN" | "UR";
};


  const [product, setProduct] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [warranty, setWarranty] = useState("");

  const [loading, setLoading] = useState(true);




  const text = {

    EN:{

      loading:"Loading product...",
      back:"Back to Product",
      title:"Edit Product",
      subtitle:"Update your product details and warranty information.",
      name:"Product Name",
      category:"Category",
      date:"Purchase Date",
      warranty:"Warranty Period",
      save:"Save Changes",
      success:"Product updated successfully!",
      failed:"Failed to update product"

    },


    UR:{

      loading:"پروڈکٹ لوڈ ہو رہا ہے...",
      back:"پروڈکٹ پر واپس جائیں",
      title:"پروڈکٹ میں ترمیم",
      subtitle:"اپنی پروڈکٹ کی تفصیلات اور وارنٹی کی معلومات اپ ڈیٹ کریں۔",
      name:"پروڈکٹ کا نام",
      category:"قسم",
      date:"خریداری کی تاریخ",
      warranty:"وارنٹی مدت",
      save:"تبدیلیاں محفوظ کریں",
      success:"پروڈکٹ کامیابی سے اپ ڈیٹ ہو گئی!",
      failed:"پروڈکٹ اپ ڈیٹ نہیں ہو سکی"

    }


  }[language];





  useEffect(()=>{


    async function fetchProduct(){


      const ref = doc(db,"items",params.id as string);


      const snapshot = await getDoc(ref);



      if(snapshot.exists()){


        const data = snapshot.data();


        setProduct(data.product || "");
        setCategory(data.category || "");
        setDate(data.date || "");
        setWarranty(data.warranty || "");


      }


      setLoading(false);


    }



    fetchProduct();


  },[params]);







  async function updateProduct(){


    try{


      const ref = doc(db,"items",params.id as string);



      await updateDoc(ref,{

        product,
        category,
        date,
        warranty,

      });




      toast.success(text.success);



      router.push(`/product/${params.id}`);



    }


    catch(error){


      toast.error(text.failed);


      console.log(error);


    }


  }







  if(loading){


    return (

      <main className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">

        <p className="text-slate-500">

          {text.loading}

        </p>

      </main>

    );


  }






  return (


    <main className="min-h-screen bg-[#F8FAFC] p-6 md:p-10">



      <div className="max-w-2xl mx-auto">





        <Link

          href={`/product/${params.id}`}

          className="flex items-center gap-2 text-slate-600 hover:text-blue-600 mb-6"

        >


          <ArrowLeft size={18}/>


          {text.back}


        </Link>








        <div className="mb-8">


          <h1 className="text-3xl font-bold text-[#0F172A]">


            {text.title}


          </h1>



          <p className="text-slate-500 mt-2">


            {text.subtitle}


          </p>


        </div>









        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">







          <label className="flex items-center gap-2 text-sm font-medium mb-2">


            <Package size={16}/>


            {text.name}


          </label>


          <input

            className="w-full p-3 mb-5 rounded-xl border"

            value={product}

            onChange={(e)=>setProduct(e.target.value)}

          />






          <label className="flex items-center gap-2 text-sm font-medium mb-2">


            <Tag size={16}/>


            {text.category}


          </label>


          <input

            className="w-full p-3 mb-5 rounded-xl border"

            value={category}

            onChange={(e)=>setCategory(e.target.value)}

          />






          <label className="flex items-center gap-2 text-sm font-medium mb-2">


            <Calendar size={16}/>


            {text.date}


          </label>


          <input

            type="date"

            className="w-full p-3 mb-5 rounded-xl border"

            value={date}

            onChange={(e)=>setDate(e.target.value)}

          />






          <label className="flex items-center gap-2 text-sm font-medium mb-2">


            <ShieldCheck size={16}/>


            {text.warranty}


          </label>


          <input

            className="w-full p-3 mb-7 rounded-xl border"

            value={warranty}

            onChange={(e)=>setWarranty(e.target.value)}

          />






          <button

            onClick={updateProduct}

            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl"

          >


            <Save size={18}/>


            {text.save}


          </button>





        </div>




      </div>




    </main>


  );


}