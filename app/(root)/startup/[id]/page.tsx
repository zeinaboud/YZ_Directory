import React, { Suspense } from 'react'
import { client } from '@/sanity/lib/client';
import { startup_by_id_query } from '@/sanity/lib/query';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import View from '@/components/view';
import Image from 'next/image';
import markdownit from 'markdown-it';
import { Skeleton } from "@/components/ui/skeleton"
const md = markdownit();

const page = async ({ params } : { params: Promise<{id : string}>}) => {
  const id = (await params).id;
  const post = await client.fetch(startup_by_id_query, { id });
  if (!post) return notFound();
  const parsedcontent = md.render(post?.pitch || "");
  return (
      <>
      <section className=' p-8 max-w-8xl mt-0 mx-auto px-2 md:px-4  container-pink min-h-[300px] '>
        <h1
          className="font-bold uppercase text-3xl md:text-4xl leading-10 md:leading-12 bold text-center text-white bg-black max-w-3xl mx-auto h-fit px-2 md:px-4  py-2 md:py-4 "
          >
            {post.title}
        </h1>
        <p className='py-2 text-white text-center '>
          {post.description}
        </p>
      </section>
      <section className='p-8 max-w-4xl mx-auto'>
          <img src={post.image}
            alt="post-image"
          className='w-full rounded-xl h-screen '/>

        <div className='flex justify-between items-center pt-5'>
          <div className=' flex gap-2 items-center'>
             <Image
              src={post.author?.image}
              alt='author-image'
              width={65}
              height={65}
              className='rounded-full '
            />
            <Link href={`/user/${post.author?._id}`}>
               <h3 className='font-bold text-2xl'>
                  {post.author?.name}
              </h3>
              <p className='font-black-300'>
                  @{post.author?.username}
               </p>
            </Link>
          </div>
          <div>
            <span className=' bg-second-300 px-8 py-2 rounded-xl drop-shadow-lg '>
            {post.category}
          </span>
          </div>
        </div>
        <h3 className='text-2xl font-bold mt-8 mb-3'>
            Details
        </h3>
        {parsedcontent ? (
          <article
            className="prose prose-invert lg:prose-xl break-all"
            dangerouslySetInnerHTML={{ __html: parsedcontent }}>
            
          </article>
        ) : (
            <p>no results</p>
        )}
      </section>
      <Suspense fallback={<Skeleton className="bg-zinc-400 h-10 w-24 rounded-lg fixed bottom-3 right-3" />}>
        <View id={ id} />
        
      </Suspense>

      </>
  )
}

export default page