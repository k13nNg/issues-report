import { Button } from "@radix-ui/themes";
import Link from "next/link";
import {useState} from "react";
import { FiActivity } from "react-icons/fi";
import { getSession, login, logout } from "../authentication";
import { redirect } from "next/navigation";
import NavBarMobile from "./navBarMobile";

const NavBar = async () => {
    const session = await getSession();
    
    return (
        <nav className = "w-full bg-blue-500  py-5 px-10">
            <div className="hidden md:flex flex-row justify-between items-center content-center">
                <div className="flex flex-row items-center">
                    <FiActivity/>
                    <h1 className="font-bold">Tech Issues Tracker</h1>
                </div>
                {
                    (session === null) ? (
                        <Button><Link href="/login">Log In</Link></Button>
                    ) : (
                        <ul className="flex space-x-5 items-center">
                            <li className="hover:text-gray-200">
                                <Link href="/">Dashboard</Link>
                            </li>
                            <li className="hover:text-gray-200">
                                <Link href="/issue">Issues</Link>
                            </li>
                            <Button className="hover:cursor-pointer" onClick={logout}>Log Out</Button>
                        </ul>
                    )
                }
            </div>
            <div className="md:hidden">
                {(session === null) ? (
                    <NavBarMobile loggedIn = {false}/>
                ) : (
                    <NavBarMobile loggedIn={true}/>
                )}
            </div>
        </nav>
    )
}

export default NavBar;