import Groq from "groq-sdk";
import { NextResponse } from "next/server";


const groq = new Groq({

  apiKey: process.env.GROQ_API_KEY,

});





export async function POST(request: Request) {


  try {


    const { question, products } = await request.json();



    const productInfo = products && products.length > 0

      ? JSON.stringify(products, null, 2)

      : "No saved products available.";






    const completion = await groq.chat.completions.create({



      model: "llama-3.1-8b-instant",



      messages: [



        {


          role:"system",


          content:


`You are VaultIQ AI, a smart personal product warranty assistant.

Your job:
- Help users with product troubleshooting.
- Answer warranty questions.
- Give maintenance advice.
- Use saved user products when available.

Important rules:
- Only use information from saved products.
- Never invent product details.
- If information is missing, clearly say you don't have that information.
- Give safe practical advice.
- For electrical products, always include safety warnings when necessary.


User Saved Products:

${productInfo}


Provide clear and helpful answers.`


        },



        {


          role:"user",


          content:question


        }


      ],



    });





    const answer = completion.choices[0].message.content;



    return NextResponse.json({

      answer

    });



  }

  catch(error){


    console.log("AI ERROR:",error);



    return NextResponse.json(

      {

        error:"AI response failed"

      },

      {

        status:500

      }

    );


  }


}