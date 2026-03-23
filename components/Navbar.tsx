"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X, Settings } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/app/lib/utils";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Value", href: "#value" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Certificates", href: "#certifications" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      const sections = navLinks.map(link => document.querySelector(link.href));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        if (section instanceof HTMLElement) {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(`#${section.id}`);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4",
      scrolled ? "px-4" : "px-0"
    )}>
      <nav className={cn(
        "container-custom mx-auto transition-all duration-500",
        scrolled ? "glass-card px-8 py-3 max-w-5xl rounded-full shadow-2xl" : "bg-transparent py-4"
      )}>
        <div className="flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-2 z-50">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:rotate-90">
              <Settings size={22} />
            </div>
            <span className="font-heading font-black tracking-tighter text-xl hidden sm:block">
              AKASH<span className="text-primary">.</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-[10px] uppercase font-black tracking-[0.2em] px-4 py-2 rounded-full transition-all",
                    activeSection === link.href 
                      ? "bg-primary/10 text-primary" 
                      : "text-foreground/40 hover:text-foreground hover:bg-surface-hover"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="h-6 w-px bg-border" />

            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-10 h-10 rounded-xl glass-card flex items-center justify-center hover:bg-primary hover:text-white transition-all"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}
          </div>

          <div className="md:hidden flex items-center gap-2">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-10 h-10 rounded-xl glass-card flex items-center justify-center"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-2xl md:hidden flex flex-col items-center justify-center p-8"
          >
            <div className="flex flex-col gap-8 text-center">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-3xl font-heading font-black tracking-tight",
                      activeSection === link.href ? "text-primary" : "text-foreground/60"
                    )}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-12 text-center"
            >
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/20">Get in touch</p>
              <p className="font-bold mt-2">akashmani9955@gmail.com</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
