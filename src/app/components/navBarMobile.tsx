"use client"
import React from 'react';
import Link from 'next/link';
import { logout } from "../authentication";
import { FiActivity } from "react-icons/fi";
import { useState } from 'react';
import { PiHamburger } from "react-icons/pi";
import { IoMdClose } from "react-icons/io";

const NavBarMobile = (props: any) => {
    const [isOpen , setIsOpen] = useState(false);

    function toggleHamburgerBar() {
        setIsOpen(!isOpen);
    }

    // if (props.loggedIn === false) {
        // return (
        //     <div className="flex flex-col space-y-2 text-center">
        //         <Link href="/login">Log In</Link> 
        //     </div>
        // )
    // } else {
    //     return (
            // <ul className="flex flex-col space-x-3 items-center">
            //     <li className="hover:text-gray-200">
            //         <Link href="/">Dashboard</Link>
            //     </li>
            //     <li className="hover:text-gray-200">
            //         <Link href="/issue">Issues</Link>
            //     </li>
            //     <li className="hover:text-gray-20 hover:cursor-pointer" onClick={logout}>Log Out</li>
            // </ul>
    //     )
    // }

    return (
        <div>
            <div className='flex flex-row justify-between'>
                <div className="flex flex-row items-center">
                    <FiActivity/>
                    <h1 className="font-bold">Tech Issues Tracker</h1>
                </div>
                <button onClick={() => toggleHamburgerBar()}>
                    {
                        isOpen ? (
                            <IoMdClose size="30"/>
                        ) : (
                            <PiHamburger size="30"/>
                        )
                    }
                </button>
            </div>
            <div>
                {
                    isOpen && (
                        (props.loggedIn === false) ? (
                            <div className="flex flex-col space-y-2 text-center mt-5">
                                <Link href="/login">Log In</Link> 
                            </div>
                        ) : (
                            <ul className="flex flex-col space-y-5 items-center mt-5">
                                <li className="hover:text-gray-200">
                                    <Link href="/">Dashboard</Link>
                                </li>
                                <li className="hover:text-gray-200">
                                    <Link href="/issue">Issues</Link>
                                </li>
                                <li className="hover:text-gray-20 hover:cursor-pointer" onClick={logout}>Log Out</li>
                            </ul>
                        )
                    )
                }
            </div>
        </div>
    )
}

export default NavBarMobile