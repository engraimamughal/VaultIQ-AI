"use client";

import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Tesseract from "tesseract.js";
import { useLanguage } from "@/lib/LanguageContext";
import toast from "react-hot-toast";


export default function AddItem() {


  const { language } = useLanguage() as {
  language: "EN" | "UR";
};


  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [receiptText, setReceiptText] = useState("");

  const [products, setProducts] = useState<any[]>([]);

  const [ocrLoading, setOcrLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);





  const text = {

    EN: {

      title:"Add Products 🔐",
      subtitle:"Upload receipt and let VaultIQ AI organize your products.",
      scanner:"🧾 Receipt Scanner",
      select:"Please select a receipt image",
      extract:"Extract Receipt",
      reading:"Reading...",
      placeholder:"Extracted receipt text",
      analyze:"Analyze With AI",
      analyzing:"Analyzing...",
      detected:"AI Detected Products",
      save:"Save All Products",
      saved:"Products saved successfully!",
      receiptDone:"Receipt text extracted successfully!",
      ocrFail:"OCR failed",
      extractFirst:"Extract receipt text first",
      aiFail:"AI analysis failed"

    },


    UR: {

      title:"پروڈکٹس شامل کریں 🔐",
      subtitle:"رسید اپ لوڈ کریں اور VaultIQ AI آپ کی مصنوعات کو منظم کرے گا۔",
      scanner:"🧾 رسید اسکینر",
      select:"براہ کرم رسید کی تصویر منتخب کریں",
      extract:"رسید نکالیں",
      reading:"پڑھا جا رہا ہے...",
      placeholder:"رسید کا متن",
      analyze:"اے آئی سے تجزیہ کریں",
      analyzing:"تجزیہ ہو رہا ہے...",
      detected:"اے آئی سے شناخت شدہ مصنوعات",
      save:"تمام مصنوعات محفوظ کریں",
      saved:"مصنوعات کامیابی سے محفوظ ہو گئیں!",
      receiptDone:"رسید کا متن کامیابی سے نکالا گیا!",
      ocrFail:"رسید اسکین نہیں ہو سکی",
      extractFirst:"پہلے رسید کا متن نکالیں",
      aiFail:"اے آئی تجزیہ ناکام ہو گیا"

    }


  }[language];









  async function extractReceiptText() {


    if (!receiptFile) {

      toast.error(text.select);

      return;

    }


    setOcrLoading(true);



    try {


      const result = await Tesseract.recognize(

        receiptFile,

        "eng"

      );


      setReceiptText(result.data.text);


      toast.success(text.receiptDone);



    } catch(error) {


      console.log(error);

      toast.error(text.ocrFail);


    }


    setOcrLoading(false);


  }









  async function analyzeReceipt() {


    if (!receiptText) {


      toast.error(text.extractFirst);

      return;


    }


    setAiLoading(true);



    try {


      const response = await fetch("/api/analyze-receipt", {


        method:"POST",


        headers:{


          "Content-Type":"application/json"


        },


        body:JSON.stringify({


          receiptText


        })


      });





      const data = await response.json();



      const parsed = JSON.parse(data.answer);



      setProducts(parsed.products);


      toast.success("AI analysis completed");



    } catch(error) {


      console.log(error);

      toast.error(text.aiFail);


    }


    setAiLoading(false);


  }









  function updateProduct(index:number, field:string, value:string){


    const updated=[...products];


    updated[index][field]=value;


    setProducts(updated);


  }









  async function saveProducts(){


    try {


      for(const item of products){


        await addDoc(collection(db,"items"),{


          product:item.name,

          category:item.category,

          date:item.date,

          warranty:item.warranty,

          price:item.price || "Not available"


        });


      }



      toast.success(text.saved);


      setProducts([]);



    } catch(error){


      console.log(error);

      toast.error("Failed to save products");


    }


  }









return(


<main className="min-h-screen bg-[#F8FAFC] text-[#0F172A] p-10">


<div className="max-w-3xl mx-auto">



<h1 className="text-4xl font-bold mb-3">

{text.title}

</h1>



<p className="text-slate-500 mb-8">

{text.subtitle}

</p>







<div className="bg-white rounded-xl border p-8 shadow-sm">





<h2 className="font-bold text-[#0D9488] mb-4">

{text.scanner}

</h2>







<input

type="file"

accept="image/*"

onChange={(e)=>{

if(e.target.files){

setReceiptFile(e.target.files[0]);

}

}}

/>







<button

onClick={extractReceiptText}

className="mt-4 bg-slate-700 text-white px-5 py-2 rounded-lg"

>

{ocrLoading ? text.reading : text.extract}

</button>








<textarea

className="w-full border rounded-lg p-3 mt-5 text-black"

rows={6}

value={receiptText}

onChange={(e)=>setReceiptText(e.target.value)}

placeholder={text.placeholder}

/>







<button

onClick={analyzeReceipt}

className="mt-4 bg-teal-600 text-white px-5 py-3 rounded-lg"

>

{aiLoading ? text.analyzing : text.analyze}

</button>






</div>









{products.length > 0 && (


<div className="mt-8 bg-white rounded-xl border p-8">



<h2 className="text-xl font-bold mb-5">

{text.detected}

</h2>







{products.map((item,index)=>(


<div

key={index}

className="border rounded-xl p-5 mb-5"

>





<input

className="w-full border p-2 rounded mb-3 text-black"

value={item.name}

onChange={(e)=>

updateProduct(index,"name",e.target.value)

}

/>





<input

className="w-full border p-2 rounded mb-3 text-black"

value={item.category}

onChange={(e)=>

updateProduct(index,"category",e.target.value)

}

/>





<input

className="w-full border p-2 rounded mb-3 text-black"

value={item.date}

onChange={(e)=>

updateProduct(index,"date",e.target.value)

}

/>





<input

className="w-full border p-2 rounded mb-3 text-black"

value={item.warranty}

onChange={(e)=>

updateProduct(index,"warranty",e.target.value)

}

/>





<input

className="w-full border p-2 rounded text-black"

value={item.price}

onChange={(e)=>

updateProduct(index,"price",e.target.value)

}

/>





</div>


))}







<button

onClick={saveProducts}

className="w-full bg-blue-600 text-white py-3 rounded-lg"

>


{text.save}


</button>







</div>


)}







</div>


</main>


);


}