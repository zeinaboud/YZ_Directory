import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { auth, signIn, signOut } from '@/auth';

const Navbar =async () =>
{
  const session = await auth();
  

  return (
    <>
      <nav className='max-w-8xl px-6 md:px-8 mx-auto py-3 '>
        <div className='flex justify-between items-center text-black'>
          <div>
            <Link href="/">
               <Image
                src="/assets/logo.png" alt='icon'
                width={144}
                height={100}
              />
            </Link>
          </div>
          <div className='flex items-center gap-4'>
            {session && session?.user ? (
              <>
                <Link href="/startup/create">
                  <span>Create</span>
                </Link>
                <form action={async () =>
                {
                  "use server";
                  await signOut({redirectTo : "/"});
                  }}
                >
                  <button type='submit'>logOut</button>
                </form>

                <Link href={`/user/${session?.user.id}`}>
                  <span>{ session?.user.name}</span>
                </Link>
              </>
          ) :  (
                <form action={async() =>
                {
                  "use server"
                  await signIn('github');

              }} >
                  <button type="submit">signIn</button>
              </form>
            )}
          </div>
      </div>
      </nav>
    </>
  )
}

export default Navbar