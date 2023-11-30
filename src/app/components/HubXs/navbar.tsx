'use client'
import { useState, FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';


interface Links {
    apiHub?: string,
    docs?: string,
    ListApi?: string,
    myApis?: string
}



const Navbar: FC<Links> = ({ apiHub, docs, ListApi, myApis }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className=' bg-white flex justify-between align-baseline py-2 px-6'>
            <nav className="flex items-top p-2 justify-start flex-wrap">
                <div className="flex items-center flex-shrink-0 pl-6 text-black mr-6">
                    {/* SVG Logo */}
                    <Image
                        src="/logos/logo-white-bg.svg"
                        alt="API GALAXY"
                        width={50}
                        height={50}
                        priority
                    />
                </div>

                <div className='relative'>
                    <input className="border  rounded-md p-2 pl-10 md:w-80 text-sm md:text-base" type="text" placeholder="Search" />
                    <Image
                        className='absolute left-3 top-1/2 transform -translate-y-1/2 '
                        src="/assets/magnifying-glass.png"
                        alt="API GALAXY"
                        width={20}
                        height={20}
                        priority
                    />
                </div>

                <div className={`${isOpen ? 'block' : 'hidden'} w-full block flex-grow lg:flex lg:items-center lg:w-auto lg:flex-grow-0`}>
                    <div className="text-sm lg:flex-grow text-black ml-4">
                        <Link href={""} className="block mt-4 lg:inline-block lg:mt-0 mr-4 hover:text-white"> API Hub </Link>
                        <Link href={""} className="block mt-4 lg:inline-block lg:mt-0 mr-4  hover:text-white">Docs</Link>
                        <Link href={""} className="block mt-4 lg:inline-block lg:mt-0 mr-4 hover:text-white">List your API</Link>
                        <Link href={""} className="block mt-4 lg:inline-block lg:mt-0 mr-4 hover:text-white">My API's</Link>
                    </div>
                </div>
            </nav>
            <div className="space-x-2 flex justify-start items-center font-body pr-4 text-xs sm:text-base">
                <Link href="/login" className="px-3 py-2 rounded md:rounded-lg md:px-6 bg-mainColor hover:bg-deepBlue">Login</Link>
                <Link href="/signup" className="px-3 py-2 rounded md:rounded-lg md:px-6 border text-black bg-goldColor hover:bg-white hover:text-goldColor hover:border-goldColor">Sign Up</Link>
                <div className="lg:hidden relative bottom-1">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className=" px-3 py-2 hover:text-white hover:border-white relative top-1"
                    >
                        <svg className="fill-black h-5 w-4" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>Menu</title>
                            <path d="M0 3h20v2H0zM0 9h20v2H0zM0 15h20v2H0z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Navbar;