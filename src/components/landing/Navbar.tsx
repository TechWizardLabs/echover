"use client";

import { useUser } from '@/context/UserContext';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Globe, LogIn, LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { ThemeToggle } from '../ThemeToggle';
import { Button } from '../ui/button';

export default function Navbar() {
  const [activeLink, setActiveLink] = useState("/");
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setActiveLink(window.location.pathname);
  }, []);

  const navItems = [
    {
      name: "Explore",
      link: "/explore",
      icon: <Globe size={20} />,
    },
    user
      ? {
        name: "Signout",
        link: "/signout",
        icon: <LogOut size={20} />,
      }
      : {
        name: "Signin",
        link: "/signin",
        icon: <LogIn size={20} />,
      },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "py-2" : "py-4"
      )}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div
          className={cn(
            "backdrop-blur-md rounded-xl border border-white/10 shadow-lg",
            "bg-primary/10 transition-all duration-300 px-4 md:px-6",
            scrolled ? "py-3" : "py-4"
          )}
        >
          <div className="flex items-center justify-between">
            <Link
              href="/"
              aria-label="Go to home"
              className="font-bold text-xl md:text-2xl"
            >
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                echover
              </span>
            </Link>

            <nav className="flex items-center space-x-1">
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  aria-label={`Navigate to ${item.name}`}
                  className={cn(
                    "relative flex items-center gap-2 px-4 py-2 rounded-lg transition-colors cursor-pointer",
                    activeLink === item.link
                      ? "hover:bg-primary/10 text-primary"
                      : "text-primary/70 hover:bg-primary/10 hover:text-primary"
                  )}
                  onClick={async (e) => {
                    e.preventDefault();
                    setActiveLink(item.link);
                    if (item.name === "Signout") {
                      await signOut();
                      toast.success("Signed out successfully");
                      return;
                    }
                    router.push(item.link);
                  }}
                >
                  {activeLink === item.link && (
                    <motion.span
                      className="absolute inset-0 bg-primary/20 rounded-lg z-0"
                      layoutId="navHighlight"
                      transition={{ type: "spring", duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {item.icon}
                    {item.name}
                  </span>
                </Button>
              ))}
              <ThemeToggle position="relative" />
            </nav>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
