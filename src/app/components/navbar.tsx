'use client'
import { useState, FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar(): JSX.Element {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className=' bg-mainColor flex justify-between items-top p-1 pl-6'>
            <nav className="flex items-top p-2 justify-start flex-wrap">
                <div className="flex items-center flex-shrink-0 text-white mr-6">
                    {/* SVG Logo */}
                    <Image
                        src="/logos/logo-blue-bg.svg"
                        alt="API GALAXY"
                        width={50}
                        height={50}
                        priority
                    />
                    <span className="ml-2 font-title font-semibold tracking-tight">API <br />GALAXY</span>
                </div>
                <div className={`${isOpen ? 'block' : 'hidden'} w-full block flex-grow lg:flex lg:items-center lg:w-auto lg:flex-grow-0`}>
                    <div className="text-sm lg:flex-grow text-white ml-4">
                        <Link href="/services" className="block mt-4 lg:inline-block lg:mt-0 mr-4 hover:text-white">Services</Link>
                        <Link href="/about" className="block mt-4 lg:inline-block lg:mt-0 mr-4  hover:text-white">About</Link>
                        <Link href="/pricing" className="block mt-4 lg:inline-block lg:mt-0 mr-4 hover:text-white">Pricing</Link>
                        <Link href="/contacts" className="block mt-4 lg:inline-block lg:mt-0 mr-4 hover:text-white">Contacts</Link>
                    </div>
                </div>
            </nav>
            <div className="space-x-2 pt-2 flex justify-start items-baseline font-body pr-4 text-xs sm:text-base">
                <Link href="/login" className="px-3 py-2 rounded hover:bg-deepBlue">Login</Link>
                <Link href="/signup" className="px-3 py-2 rounded bg-goldColor hover:bg-white hover:text-goldColor">Sign Up</Link>
                <div className="lg:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className=" px-3 py-2 hover:text-white hover:border-white"
                    >
                        <svg className="fill-current h-5 w-4" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>Menu</title>
                            <path d="M0 3h20v2H0zM0 9h20v2H0zM0 15h20v2H0z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}