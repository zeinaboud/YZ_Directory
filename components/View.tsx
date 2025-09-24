import React from 'react'
import Circle from '@/components/Circle';
import { client } from '@/sanity/lib/client';
import { startup_views_query } from '@/sanity/lib/query';
import { writeClient } from '@/sanity/lib/write-client';
import { after } from 'next/server'
const View = async ({ id }: { id: string }) => {

  const { views: totalViews } = await client
    .withConfig({ useCdn: false })
    .fetch(startup_views_query, { id });
  
   after(
    async () =>
      await writeClient
        .patch(id)
        .set({ views: totalViews + 1 })
        .commit(),
  )
  
  return (
      <>
        <div className='rounded-xl px-6 py-3 bg-second-300 flex justify-end items-center fixed bottom-3 right-3 '>
          <div className='absolute -top-2 -right-5'>
            <Circle/>
              </div>
              <p>
              <span>{totalViews} veiw</span>
        </p>
        </div>
        
      </>
  )
}

export default View