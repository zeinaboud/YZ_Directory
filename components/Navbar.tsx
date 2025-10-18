import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { auth, signIn, signOut } from '@/auth';
import { MdLogout } from "react-icons/md";
import { MdAddTask } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
                  <span className='max-sm:hidden'>Create</span>
                  <MdAddTask className='size-6 sm:hidden text-red-500'/>
                </Link>
                <form action={async () =>
                {
                  "use server";
                  await signOut({redirectTo : "/"});
                  }}
                >
                  <button type='submit' className='flex items-center gap-1' >
                    <span className='max-sm:hidden'> logout</span>
                    <MdLogout className='size-6 text-red-500 sm:hidden'/>
                  </button>
                </form>

                <Link href={`/user/${session?.user.id}`}>
                  <Avatar>
                    <AvatarImage
                      src={session?.user?.image || ''}
                      alt={session?.user?.name || ''}
                    />
                    <AvatarFallback>AV</AvatarFallback>
                  </Avatar>
                  
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