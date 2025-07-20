import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Menu, X, Compass, GraduationCap } from "lucide-react"
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
  const [mobileOpen, setMobileOpen] = useState(false)

  const toggleMenu = () => setMobileOpen(!mobileOpen)

  return (
    <nav className="w-full border-b bg-background px-4 py-2 shadow-sm">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/" className="text-lg font-semibold flex items-center gap-2">
          <img src="logo.png" alt="" className="w-10 h-10" />
          TrackNest
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <NavigationMenu>
            <NavigationMenuList className="flex items-center space-x-4">
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link to="/">Home</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

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

              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link to="/">Seminars & Webinars</Link>
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
                      <Logout />
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

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={toggleMenu}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden mt-2 space-y-2 px-4">
          <Link to="/" className="block" onClick={toggleMenu}>Home</Link>
          <Link to="/courses" className="block" onClick={toggleMenu}>Explore Courses</Link>
          {isAuth && (
            <Link to={`${userTypes.STUDENT}/enrolled`} className="block" onClick={toggleMenu}>Enrolled Courses</Link>
          )}
          <Link to="/" className="block" onClick={toggleMenu}>Seminars & Webinars</Link>
          {isAuth ? (
            <>
              <Link to="/profile" className="block" onClick={toggleMenu}>Profile</Link>
              <Logout />
            </>
          ) : (
            <>
              <Link to="/login" className="block" onClick={toggleMenu}>Login</Link>
              <Link to="/registration" className="block" onClick={toggleMenu}>Registration</Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
