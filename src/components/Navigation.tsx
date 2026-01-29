import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const links = [
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="flex flex-col bg-card shadow-md">
      <div className="flex justify-between items-center p-6">
        <Link key="Home" to="/" className="text-xl text-text font-bold">
          Home
        </Link>

        <div className="hidden md:flex space-x-6 text-text">
          {links.map((link) => (
            <Link key={link.name} to={link.href} className="hover:text-primary">
              {link.name}
            </Link>
          ))}
        </div>

        <button
          className="md:hidden text-text"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div
        className={`md:hidden text-text overflow-hidden transition-[max-height,opacity] ease-in-out ${
          isOpen
            ? "max-h-96 opacity-100 duration-[550ms]"
            : "max-h-0 opacity-0 duration-[300ms]"
        }`}
      >
        <div className="grid grid-cols-2 gap-4 px-6 py-4">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-lg font-medium text-center hover:text-primary"
              onClick={toggleMenu}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
