import { NextResponse } from "next/server";
import Groq from "groq-sdk";


const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});


export async function POST(request: Request) {


  try {


    const { receiptText } = await request.json();



    const completion = await groq.chat.completions.create({


      messages: [

        {

          role: "system",

          content: `
You are VaultIQ AI receipt analyzer.

Analyze the receipt text and extract all products.

Return ONLY valid JSON.

Format:

{
 "products":[
  {
   "name":"",
   "category":"",
   "date":"",
   "warranty":"",
   "price":""
  }
 ]
}


Rules:
- Extract multiple products if available.
- Do not invent information.
- If category is unclear use "Unknown".
- If warranty is missing use "Not found".
- If date is missing use "Not found".
- Keep product names accurate.
          `

        },


        {

          role:"user",

          content: receiptText

        }


      ],


      model:"llama-3.1-8b-instant",


    });




    const answer = completion.choices[0].message.content;



    return NextResponse.json({

      answer

    });




  } catch(error) {


    console.log("RECEIPT AI ERROR:", error);


    return NextResponse.json(

      {

        error:"Receipt analysis failed"

      },

      {

        status:500

      }

    );


  }


}