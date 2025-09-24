import React from 'react'
import Form from "next/form";
import Searchformreset from './Searchformreset';

const Searchform = ({query}:{query?:string}) =>
{
    return (
        <>
            <Form action="/" scroll={false} className='search-form text-center'>
                <input type="text"
                    className='search-input'
                    name='query'
                    placeholder='search startup'
                    defaultValue={query}
                />
                <div className='flex gap-2 flex items-center'>
                    {query && <Searchformreset />}

                    <button type='submit' className='search-btn '>
                        s
                    </button>
                </div>
        </Form >
        </>
    )
}

export default Searchform