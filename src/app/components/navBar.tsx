"use client"
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import {useState} from "react";
import { FiActivity } from "react-icons/fi";
import { useRouter } from "next/navigation";

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    }

    const toggleSignIn = () => {
        setIsLoggedIn(!isLoggedIn);
    }

    return (
        <nav className = "bg-blue-500">
            <div className="flex justify-between mb-5 px-5 h-14">
                <div className={`flex flex-row space-x-20 items-center`}>
                    <Link href="/">
                        <div className="flex space-x-2 items-center">
                            <FiActivity/>
                            <p>Tech Issues Tracker</p>
                        </div>
                    </Link>
                </div>
                <div className="hidden md:flex md:items-center ">
                    {
                        isLoggedIn? (
                            <div>
                                <ul className = "flex space-x-11 items-center">
                                    <li><Link className = "hover:text-gray-300 transition-colors" href = "/">Dashboard</Link></li>
                                    <li><Link className = "hover:text-gray-300 transition-colors" href = "/issue">Issues</Link></li>
                                    {/* <li><Link className = "hover:text-gray-300" href = "/printing">Printing</Link></li> */}
                                    <li><Button className="hover:cursor-pointer" onClick={toggleSignIn}>Log Out</Button></li>
                                </ul>
                            </div>
                        ) : (
                            <div className="flex space-x-3">

                                <Button className="hover:cursor-pointer" onClick={() => {
                                    router.push("/login")
                                }}>Login</Button>
                            </div>
                        )
                    }
                </div>

                <div className="md:hidden flex items-center">
                    <button className = "inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white focus:outline-none focus:ring-1 focus:ring-inset focus:ring-white" onClick={toggleNavbar}>
                        {isOpen ? (
                            <svg  
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor" >
                                <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        ) : (
                            <svg  className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16m-7 6h7"/>
                            </svg>
                        )}

                    </button>
                </div>
            </div>
            {isOpen && (
                <div className="">
                    <div className="px-2 pb-3 sm:px-3">

                        {
                            isLoggedIn ? (
                            <div>
                                <ul className = "flex flex-col text-center space-y-5">
                                    <li><Link className = "hover:text-gray-300" href = "/">Dashboard</Link></li>
                                    <li><Link className = "hover:text-gray-300" href = "/issue">Issues</Link></li>
                                    <li><a className = "hover:text-gray-300" onClick={toggleSignIn}>Log Out</a></li>
                                </ul>
                            </div>
                            ) : (
                            <div>
                                <ul className = "flex flex-col text-center space-y-2">
                                    <li><a className = "hover:text-gray-300" onClick={toggleSignIn}>Login</a></li>
                                </ul>
                            </div>
                            )
                        }
                    </div>
                </div>
            )}
        </nav>
    )
}

export default NavBar;