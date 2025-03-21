import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background">
              <div className="flex h-16 items-center justify-evenly">
                <div className="flex items-center gap-6">
                  <Link to="/" className="font-bold text-xl">
                    SAKURA
                  </Link>
                  <nav className="hidden md:flex gap-6">
                    <Link to="#" className="text-sm font-medium">
                      Home
                    </Link>
                    <Link to="#" className="text-sm font-medium">
                      Products
                    </Link>
                    <Link to="#" className="text-sm font-medium">
                      Programs
                    </Link>
                    <Link to="#" className="text-sm font-medium">
                      About
                    </Link>
                    <Link to="#" className="text-sm font-medium">
                      Contact
                    </Link>
                  </nav>
                </div>
                <div className="flex items-center gap-4">
                  <Link to="/dashboard" className="text-sm font-medium hidden md:block">
                    My Account
                  </Link>
                  <Button variant="outline" size="sm" className="hidden md:flex">
                    Sign In
                  </Button>
                  <Button size="sm">Shop Now</Button>
                </div>
              </div>
            </header>
    </>
  );
};

export default Header;
