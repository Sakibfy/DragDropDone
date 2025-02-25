
"use client";

import { Link, NavLink } from "react-router-dom";
import useAuth from "../Auth/useAuth";
import { useState } from "react";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";


export function NavbarComponent() {
  const { user, logOut } = useAuth();
  
  const handleLogOut = () => {
        logOut()
         .then(() => { })
        .catch(error => console.log(error));
        
    }
 
     

 
   
    
const [isToggleOpen, setIsToggleOpen] = useState(false)

  

  return (
    
   <>
      {/*<!-- Component: Navbar with CTA --> */}
      <header className="relative   z-20 w-10/12 mx-auto  after:absolute after:left-0 after:top-full after:z-10 after:block after:h-px after:w-full after:bg-slate-200 lg:border-slate-200 lg:backdrop-blur-sm lg:after:hidden">
        <div className="relative mx-auto max-w-full px-6 lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[96rem]">
          <nav
            aria-label="main navigation"
            className="flex h-[5.5rem] items-stretch justify-between font-medium text-slate-700"
            role="navigation"
          >
            {/*      <!-- Brand logo --> */}
            <Link to={'/'}>
             <p
              id="WindUI"
              aria-label="WindUI logo"
              aria-current="page"
              className="flex items-center gap-2 py-5 text-3xl whitespace-nowrap focus:outline-none lg:flex-1 font-bold"
              
            >
              <span className="text-[#10b981] -m-2">T</span>ask <span className="text-[#10b981] -m-2">H</span>aven
              </p>
            </Link>
            {/*      <!-- Mobile trigger --> */}
            <button
              className={`relative order-10 block h-10 w-10 self-center lg:hidden
              ${
                isToggleOpen
                  ? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(2)]:-rotate-45 [&_span:nth-child(3)]:w-0 "
                  : ""
              }
            `}
              onClick={() => setIsToggleOpen(!isToggleOpen)}
              aria-expanded={isToggleOpen ? "true" : "false"}
              aria-label="Toggle navigation"
            >
              <div className="absolute w-6 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
                ></span>
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition duration-300"
                ></span>
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
                ></span>
              </div>
            </button>
            {/*      <!-- Navigation links --> */}
            <ul
              role="menubar"
              aria-label="Select page"
              className={`absolute left-0 top-0 z-[-1] h-[28.5rem] w-full justify-center overflow-hidden  overflow-y-auto overscroll-contain bg-white/90 px-8 pb-12 pt-24 font-medium transition-[opacity,visibility] duration-300 lg:visible lg:relative lg:top-0  lg:z-0 lg:flex lg:h-full lg:w-auto lg:items-stretch lg:overflow-visible lg:bg-white/0 lg:px-0 lg:py-0  lg:pt-0 lg:opacity-100 ${
                isToggleOpen
                  ? "visible opacity-100 backdrop-blur-sm"
                  : "invisible opacity-0"
              }`}
            >
             
              <NavLink to={'/taskbord'}>
                 <li  className="flex items-stretch md:mt-4">
                <p
                  
                  className="flex items-center  gap-2 py-4 transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600 focus:outline-none focus-visible:outline-none lg:px-8"
                 
                >
                  <span>Task Board</span>
                </p>
              </li>
             </NavLink>
            </ul>
            <div className="flex items-center px-6 ml-auto lg:ml-0 lg:p-0">
              {user ? <button onClick={handleLogOut}
                className="inline-flex items-center justify-center h-10 gap-2 px-5 text-sm text-xl   font-medium tracking-wide text-red-500 transition ">
                <span><Link to={'/'}>Logout</Link></span>
                <IoIosLogOut />
              </button>
                : 
              <button className="inline-flex items-center justify-center h-10 gap-2 px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded shadow-md whitespace-nowrap bg-emerald-500 shadow-emerald-200 hover:bg-emerald-600 hover:shadow-sm hover:shadow-emerald-200 focus:bg-emerald-700 focus:shadow-sm focus:shadow-emerald-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none">
                <span><Link to={'/login'}>Login</Link></span>
              </button>
              }
            </div>
          </nav>
        </div>
      </header>
      {/*<!-- End Navbar with CTA --> */}
    </>
   
  );
}
