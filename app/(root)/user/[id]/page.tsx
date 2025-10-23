import React, { Suspense } from 'react'
import { Session } from 'next-auth';
import { auth } from '@/auth';
import { client } from '@/sanity/lib/client';
import { author_by_id_query} from '@/sanity/lib/query';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Startup } from '../../../../src/sanity/types';
import UserStartup from '@/components/UserStartup';
import { StartupCardSkeleton } from '../../../../components/Cardstartup';
const page = async ({ params }: { params: Promise<{ id: string }>}) =>
{
    const id = (await params).id;
    const Session = await auth();
    const user = await client.fetch(author_by_id_query, { id });
    if (!user) return notFound();

    return (
        <>
            <section className=' max-w-7xl px-10 pb-0 mx-auto profile-container'>
                <div className='profile-card w-full pb-10 mt-20 flex flex-col justify-center bg-primary-500 border-[5px] border-black shadow-100 rounded-2xl
                z-0 relative h-fit max-lg:w-full'>
                    <div className="
                        relative bg-white w-11/12 border-[5px] border-black rounded-full 
                        px-5 py-3 mx-auto -top-8
                        after:content-[''] after:absolute after:-top-1 after:right-0 after:rounded-full
                        after:-skew-y-4 after:bg-black after:-z-[10] after:w-full after:h-[60px]
                    ">
                        <h3 className='text-2xl font-black uppercase text-center font-sans'>{ user.name}</h3>
                    </div>
                     <Image
                            src={user.image}
                            alt={user.name}
                            width={220}
                            height={220}
                            className='mx-auto rounded-full outline-1 outline-black'
                        />
                    <p className='text-3xl font-extrabold text-white text-center '>
                            @{user?.username}
                    </p>
                    <p >
                        {user?.bio}
                    </p>
                </div>
                <div className='flex-1 flex flex-col gap-5 lg:mt-5'>
                    <p className=' pt-5 font-bold text-2xl'>
                        {Session?.user?.id === id ? 'Your' :'ALL'} Startup
                    </p>
                    <ul className="grid ">
                        <Suspense fallback={<StartupCardSkeleton />}>
                            <UserStartup id={user._id} />
                        </Suspense>
                    </ul>
                </div>
            </section>
        </>
  )
}

export default page