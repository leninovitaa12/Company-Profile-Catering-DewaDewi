import React from "react";
import { Instagram, Facebook, Twitter } from "lucide-react"

const Footer = () => {
  return (
    <footer className="border-t bg-background">
        <div className="container py-8 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <h3 className="font-bold">CATERING DEDE</h3>
              <p className="text-sm text-muted-foreground">Menerima Pesanan dan Catering</p>
            </div>
            <div className="space-y-3">
              <h3 className="font-bold">Shop</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#">Cara Pesan</a>
                </li>
                <li>
                  <a href="#">Menu</a>
                </li>
                <li>
                  <a href="#">Programs</a>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-bold">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-bold">Connect</h3>
              <div className="flex space-x-3">
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
              <div className="pt-2">
                <a href="#" className="text-sm">
                  Download our app
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© 2025 CATERING DEDE. All rights reserved.</p>
          </div>
        </div>
      </footer>
  );
};

export default Footer;
