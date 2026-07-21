"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import {
  Search,
  Package,
  ShieldCheck,
  Folder,
  Pencil,
  Trash2,
  Eye,
  Plus,
} from "lucide-react";

import toast from "react-hot-toast";


export default function Dashboard() {


  const [items,setItems] = useState<any[]>([]);
  const [search,setSearch] = useState("");
  const [category,setCategory] = useState("All");





  async function fetchItems(){


    const snapshot = await getDocs(collection(db,"items"));


    const data = snapshot.docs.map((item)=>({

      id:item.id,
      ...item.data()

    }));


    setItems(data);


  }





  async function deleteItem(id:string){


    try{


      await deleteDoc(doc(db,"items",id));



      setItems((prev)=>

        prev.filter((item)=>item.id !== id)

      );



      toast.success("Product deleted successfully!");



    }

    catch(error){


      console.log(error);


      toast.error("Failed to delete product");


    }


  }







  useEffect(()=>{

    fetchItems();

  },[]);







  const categories = [

    "All",

    ...Array.from(

      new Set(

        items.map((item)=>item.category)

      )

    )

  ];







  const filteredItems = useMemo(()=>{


    return items.filter((item)=>{


      const matchesSearch =

      item.product
      ?.toLowerCase()
      .includes(search.toLowerCase());



      const matchesCategory =

      category==="All"

      ||

      item.category===category;



      return matchesSearch && matchesCategory;


    });


  },[items,search,category]);








  function warrantyStatus(){

    return "Active";

  }








return (

<main className="min-h-screen bg-[#F8FAFC] p-8">


<div className="max-w-7xl mx-auto">





<div className="flex flex-col md:flex-row justify-between gap-5 mb-10">


<div>

<h1 className="text-4xl font-bold text-[#0F172A]">

VaultIQ AI 🔐

</h1>


<p className="text-slate-500 mt-2">

Manage your products, receipts and warranties.

</p>


</div>




<Link href="/add-item">

<button className="bg-[#2563EB] text-white px-6 py-3 rounded-lg flex items-center gap-2">

<Plus size={18}/>

Add Product

</button>

</Link>



</div>








<div className="grid md:grid-cols-4 gap-5 mb-8">



<div className="bg-white border rounded-xl p-6">

<Package className="text-blue-600"/>

<p className="text-sm text-slate-500 mt-3">

Total Products

</p>

<h2 className="text-3xl font-bold">

{items.length}

</h2>

</div>






<div className="bg-white border rounded-xl p-6">


<Folder className="text-purple-600"/>


<p className="text-sm text-slate-500 mt-3">

Categories

</p>


<h2 className="text-3xl font-bold">

{categories.length-1}

</h2>


</div>






<div className="bg-white border rounded-xl p-6">


<ShieldCheck className="text-teal-600"/>


<p className="text-sm text-slate-500 mt-3">

Warranty Tracking

</p>


<h2 className="text-3xl font-bold">

Enabled

</h2>


</div>






<div className="bg-white border rounded-xl p-6">


<p className="text-sm text-slate-500">

AI Assistant

</p>


<h2 className="text-3xl font-bold text-teal-600 mt-3">

Ready

</h2>


</div>



</div>









<div className="bg-white border rounded-xl p-5 mb-8 flex flex-col md:flex-row gap-4">



<div className="flex items-center gap-3 border rounded-lg px-4 flex-1">


<Search size={20}/>


<input

placeholder="Search products..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

className="w-full outline-none p-3"

/>


</div>






<select

value={category}

onChange={(e)=>setCategory(e.target.value)}

className="border rounded-lg px-4"

>


{

categories.map((cat)=>(

<option key={cat}>

{cat}

</option>

))

}


</select>



</div>









{

filteredItems.length===0 ?


(

<div className="bg-white border rounded-xl p-12 text-center">


<h2 className="text-2xl font-bold">

Your Vault is Empty

</h2>


<p className="text-slate-500 mt-2">

Add your first product to start tracking warranties.

</p>


</div>

)



:

(


<div className="grid lg:grid-cols-2 gap-6">



{

filteredItems.map((item)=>(


<div

key={item.id}

className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition"

>



<div className="flex justify-between">


<div>


<h2 className="text-2xl font-bold">

{item.product}

</h2>


<p className="text-slate-500">

{item.category}

</p>


</div>





<span className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full h-fit text-sm">

🟢 {warrantyStatus()}

</span>



</div>







<div className="mt-5 space-y-2 text-slate-700">


<p>

📅 Purchase Date: {item.date}

</p>


<p>

🛡 Warranty: {item.warranty}

</p>


</div>







<div className="flex gap-3 mt-6 flex-wrap">



<Link href={`/product/${item.id}`}>

<button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex gap-2 items-center">

<Eye size={17}/>

View

</button>

</Link>






<Link href={`/edit/${item.id}`}>

<button className="bg-amber-500 text-white px-4 py-2 rounded-lg flex gap-2 items-center">

<Pencil size={17}/>

Edit

</button>

</Link>







<button

onClick={()=>deleteItem(item.id)}

className="bg-red-600 text-white px-4 py-2 rounded-lg flex gap-2 items-center"

>

<Trash2 size={17}/>

Delete

</button>



</div>




</div>


))


}


</div>


)


}







</div>


</main>


);


}