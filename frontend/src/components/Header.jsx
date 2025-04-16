import React, { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { Button } from "./ui/button";

const Header = () => {
  const [menu, setMenu] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background">
              <div className="flex h-16 px-2">
                <div className="flex justify-evenly w-full items-center gap-6">
                  <Link to="/" className="font-bold text-xl">
                    CATERING DEWA DEWI
                  </Link >
                  <nav className="hidden md:flex gap-6">
                    <ScrollLink smooth={true} spy={true} to={"home"} className="text-sm cursor-pointer font-medium">
                        Home
                    </ScrollLink>
                    <ScrollLink smooth={true} spy={true} to={"products"} className="text-sm cursor-pointer font-medium" offset={-100} duration={500} >
                        Product
                    </ScrollLink>
                    <ScrollLink smooth={true} spy={true} to={"about"} className="text-sm cursor-pointer font-medium" offset={-100} duration={500} >
                        About
                    </ScrollLink>
                    <ScrollLink smooth={true} spy={true} to={"contact"} className="text-sm cursor-pointer font-medium" offset={-100} duration={500} >
                        Contact
                    </ScrollLink>
                  </nav>
                  <Button onClick={() => setMenu(!menu)} className="md:hidden">
                    {menu?<FiX></FiX>:<FiMenu/>}
                  </Button>
                </div>
              </div>

             {menu && (<div className="flex justify-center w-full items-center py-8">
                  <nav className="md:hidden gap-6 flex bg-white flex-col justify-center w-[80vw] items-center text-center">
                    <ScrollLink smooth={true} spy={true} to={"home"} onClick={() => setMenu(false)} className="text-sm font-medium">
                        Home
                    </ScrollLink>
                    <ScrollLink onClick={() => setMenu(false)} smooth={true} spy={true} to={"products"} className="text-sm cursor-pointer font-medium" offset={-100} duration={500} >
                        Product
                    </ScrollLink>
                    <ScrollLink onClick={() => setMenu(false)} smooth={true} spy={true} to={"about"} className="text-sm cursor-pointer font-medium" offset={-100} duration={500} >
                        About
                    </ScrollLink>
                    <ScrollLink onClick={() => setMenu(false)} smooth={true} spy={true} to={"contact"} className="text-sm cursor-pointer font-medium" offset={-100} duration={500} >
                        Contact
                    </ScrollLink>
                  </nav>
             </div>)}
            </header>
    </>
  );
};

export default Header;
