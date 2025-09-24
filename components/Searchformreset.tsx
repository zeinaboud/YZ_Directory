"use client"
import Link from 'next/link';
import React from 'react'

const Searchformreset = () => {
    const reset = () =>
    {
        const form = document.querySelector('.search-form') as HTMLFormElement;
        if (form) form.reset();
    }
    return (
        <>
            <button type="reset" onClick={reset}>
                <Link href="/" className='search-btn' >
                    x
                </Link>
            </button>
        </>
    )
}

export default Searchformreset