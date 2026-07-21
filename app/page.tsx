import Link from "next/link";

export default function HomePage() {

  return (

    <main className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-10">

      <div className="text-center max-w-xl">


        <h1 className="text-5xl font-bold text-[#0F172A]">
          VaultIQ AI 🔐
        </h1>


        <p className="mt-4 text-slate-500 text-lg">
          Your AI-powered personal ownership assistant.
          Store receipts, track warranties, and manage your products.
        </p>



        <div className="flex justify-center gap-4 mt-8">


          <Link

          href="/dashboard"

          className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"

          >

            Open Dashboard

          </Link>



          <Link

          href="/add-item"

          className="border border-slate-300 px-6 py-3 rounded-xl hover:bg-slate-100"

          >

            Add Product

          </Link>


        </div>



      </div>


    </main>

  );

}