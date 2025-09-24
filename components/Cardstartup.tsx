import { formatDate } from '@/lib/utils'
import React from 'react'
import { FaEye } from "react-icons/fa";
import Link from 'next/link';
import { title } from 'process';
import Image from 'next/image';
import { Author, Startup } from '@/src/sanity/types';

export type CardstartupType = Omit<Startup ,"author" > & { author?: Author };

const Cardstartup = ( {_id,description,author , _createdAt,views, title,category} :CardstartupType) => {

        return (
            <li className='rounded-md border-2 border-black bg-white shadow-md px-2 pt-2'>
                <div className='flex justify-between items-center'>
                    <p className='text-sm font-stone-700 font-bold'>
                        {new Date(_createdAt).toLocaleDateString()}
                    </p>
                    <div className='flex items-center gap-1'>
                        <span>{views}</span>
                        <FaEye />
                    </div>
                </div>
                <div className='flex justify-between items-center mt-2'>
                    <div className='leading-2'>
                        <Link href={`user/${author?._id}`}>
                            <p className='text-[15px]'>{ author?.name}</p>
                        </Link>
                        <Link href={`startup/${_id}`}>
                            <p className='text-xl font-bold'>{ title}</p>
                        </Link>
                    </div>
                    <div className='pt-2'>
                        <Image src="https://placehold.co/400*400" alt='placeholder' width={50} height={50} rounded-full="true"  />
                    </div>
                </div>
                <Link href={`startup/${_id}`}>
                    <p className='py-1'>{ description}</p>
                </Link>

                <Link href={`startup/${_id}`}>
                    <img src="./assets/download (1).jfif" alt="placeholder" className='px-1 w-full   py-2 rounded-md' />
                </Link>
                <div className='pb-5 pt-2 flex justify-between items-center'>
                    <Link href= {`/?query=${category.toLowerCase()}`}>
                        <p className='text-[16px]'>
                            {category}
                        </p>
                    </Link>
                    <button className='rounded-2xl bg-primary-500 px-4 py-2  font-bold text-md'>
                        <Link  className= "font-white" href={`startup/${_id}`}> Details</Link>
                    </button>
                </div>
            </li>
    )
}
export default Cardstartup