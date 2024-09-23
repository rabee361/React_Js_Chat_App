import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaSquareFacebook } from "react-icons/fa6";

function Navbar() {


  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    console.log(saved);
    if (saved === null) {
      return false;
    }
    try {
      const initialValue = JSON.parse(saved);
      return initialValue || false;
    } catch (error) {
      console.error("Error parsing dark mode state:", error);
      return false;
    }
  });

  useEffect(() => {
    localStorage.setItem("darkMode", dark ? "true" : "false");
    document.body.classList.toggle("dark", dark);
  }, [dark]);

  const darkModeHandler = () => {
    setDark(!dark);
  };

    return (
      <div className=" fixed top-0 z-10 flex justify-between h-14 w-full dark:text-white text-black font-medium">
          <div className="flex h-full items-center ml-5 gap-5 text-red-500">
              <div>
                Rabee <span className="text-white">Hasan</span>
              </div>
            <label className="grid text-white cursor-pointer place-items-center">
                <input
                    type="checkbox"
                    value="synthwave"
                    className="toggle theme-controller bg-base-content col-span-2 col-start-1 row-start-1"
                    checked={dark} onClick={()=> darkModeHandler()} />
                <svg
                    className="stroke-base-100 fill-base-100 col-start-1 row-start-1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5" />
                    <path
                    d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                </svg>
                <svg
                    className="stroke-base-100 fill-base-100 col-start-2 row-start-1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
            </label>
          </div>
          <div className="mr-10 hidden sm:block">
              <ul className="flex h-full items-center gap-8">
                  <li className="hover:text-red-400 ease-linear duration-100 cursor-pointer"><FaSquareFacebook size={25}/></li>
                  <li className="hover:text-red-400 ease-linear duration-100 cursor-pointer"><FaLinkedin size={25}/></li>
                  <li className="hover:text-red-400 ease-linear duration-100 cursor-pointer"><FaGithub size={25}/></li> 
              </ul>
          </div>
      </div>
    )
  }
  
  export default Navbar