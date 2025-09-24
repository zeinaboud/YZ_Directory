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
          <section className='container-pink min-h-[230px]'>
                <h1
                    className="font-bold uppercase text-3xl md:text-4xl leading-10 md:leading-12 bold text-center text-white bg-black max-w-3xl mx-auto h-fit px-2 md:px-4  py-2 md:py-4 "
                >
                        SUBMIT YOUR STARTUP
              </h1>
              
          </section>
          <Formcreate/>
      </>
  )
}

export default page