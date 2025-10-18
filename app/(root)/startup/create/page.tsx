import Formcreate from '@/components/Formcreate'
import React from 'react'
import { auth } from "@/auth";
import { redirect } from 'next/navigation';
import { url } from 'inspector';
const page = async() =>
{
    const session = await auth();
    if (!session) redirect("/");
  return (
      <>
          <section className=" w-full bg-primary h-[250px] pattern flex justify-center items-center flex-col  ">
        <div
          className="pattern  bg-primary-500  h-screen w-full relative "
        >
                 <h1
                className="subtitle  relative mt-20 uppercase text-2xl md:text-4xl leading-10 md:leading-12 bold 
                text-center text-white bg-[#3F3F46] max-w-3xl mx-auto h-fit px-2 md:px-4 max-sm:mx-2
                py-2 md:py-4 rounded-tl-4xl rounded-br-4xl  shadow-xl outline-2 outline-outlinecolor"
          >
                        SUBMIT YOUR STARTUP
              </h1>
            </div>
              
          </section>
          <Formcreate/>
      </>
  )
}

export default page