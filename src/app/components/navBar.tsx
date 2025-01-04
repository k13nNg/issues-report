import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { FiActivity } from "react-icons/fi";
import { getSession, login, logout } from "../authentication";
import NavBarMobile from "./navBarMobile";


const NavBar = async () => {
    const session = await getSession();

    return (
        <nav className = "w-full bg-blue-500 py-2 px-10">
            <div className="hidden md:flex flex-row justify-between items-center content-center">
                <Link href="/">
                    <div className="flex flex-row items-center">
                            <FiActivity/>
                            <h1 className="font-bold">Tech Issues Tracker</h1>
                    </div>
                </Link>
                {
                    (session === null) ? (
                        <Button><Link href="/login">Log In</Link></Button>
                    ) : (
                        <ul className="flex space-x-5 items-center">
                            <li className="hover:text-gray-200">
                                <Link href="/">Dashboard</Link>
                            </li>
                            {
                                (session.user.role === "ADMIN") ? (
                                    <li className="hover:text-gray-200">
                                        <Link href="admin">Portal</Link>
                                    </li>
                                ) : (
                                    <li className="hover:text-gray-200">
                                        <Link href="/issue">Issues</Link>
                                    </li>
                                )
                            }
                            <li className="hover:text-gray-200">
                                <Link href="/changePassword">Change Password</Link>
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
                    (session.user.role=== "ADMIN") ? (
                        <NavBarMobile loggedIn={true} admin={true}/>
                    ):(
                        <NavBarMobile loggedIn={true} admin={false}/>
                    )
                )}
            </div>
        </nav>
    )
}

export default NavBar;