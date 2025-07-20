import React from "react"
import { Link } from "react-router-dom"
import {
    Compass,
    GraduationCap,
} from "lucide-react"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { useSelector } from "react-redux"
import Logout from "@/components/logout.jsx"
import { userTypes } from "../lib/utils"

export default function Navbar() {
    const isAuth = useSelector((state) => state.auth.isAuth)

    return (
        <nav className="w-[100vw] border-b bg-background px-4 py-2">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                {/* Logo + Navigation */}
                <div className="flex items-center space-x-6">
                    <Link to="/" className="text-lg font-semibold">
                        <div className="flex items-center gap-2">
                            <img src="logo.png" alt="" className="w-10 h-10" />
                            TrackNest
                        </div>
                    </Link>

                    <NavigationMenu>
                        <NavigationMenuList>
                            {/* Home */}
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                    <Link to="/">Home</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            {/* Courses with Submenu */}
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Courses</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[220px] gap-1 p-2">
                                        <li>
                                            <NavigationMenuLink asChild>
                                                <Link to="/courses" className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-muted">
                                                    <Compass size={16} />
                                                    Explore Courses
                                                </Link>
                                            </NavigationMenuLink>
                                        </li>
                                        {isAuth && (
                                            <li>
                                                <NavigationMenuLink asChild>
                                                    <Link to={`${userTypes.STUDENT}/enrolled`} className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-muted">
                                                        <GraduationCap size={16} />
                                                        Enrolled Courses
                                                    </Link>
                                                </NavigationMenuLink>
                                            </li>
                                        )}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                            {/* Seminars & Webinars */}
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                    <Link to="/">Seminars And Webinars</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            {isAuth ? (
                                <>
                                    <NavigationMenuItem>
                                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                            <Link to="/profile">Profile</Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>

                                    <NavigationMenuItem>
                                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                            <Logout/>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                </>
                            ) : (
                                <>
                                    <NavigationMenuItem>
                                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                            <Link to="/login">Login</Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>

                                    <NavigationMenuItem>
                                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                            <Link to="/registration">Registration</Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                </>
                            )}

                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </div>
        </nav>
    )
}
