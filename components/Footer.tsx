"use client";
import { useState, useEffect } from "react";
import { portfolioData } from "../app/data/portfolio";

export default function Footer() {
  const [time, setTime] = useState<string>("");
  const [status, setStatus] = useState<string>("Checking...");

  useEffect(() => {
    const updateTime = () => {
      // 1. Get Current Time in Kolkata
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { 
        timeZone: "Asia/Kolkata", 
        hour: "numeric", 
        minute: "numeric", 
        hour12: true 
      };
      const timeString = new Intl.DateTimeFormat("en-US", options).format(now);
      setTime(timeString);

      // 2. Logic: Are you awake? (Assuming 9AM - 1AM schedule)
      const hour = parseInt(new Intl.DateTimeFormat("en-US", { 
        timeZone: "Asia/Kolkata", 
        hour: "numeric", 
        hour12: false 
      }).format(now));

      if (hour >= 9 && hour < 18) setStatus("Working 👨‍💻");
      else if (hour >= 18 && hour < 23) setStatus("Online 🟢");
      else if (hour >= 23 || hour < 7) setStatus("Sleeping 😴");
      else setStatus("Waking up ☕");
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="py-12 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#0a0a0a]">
      <div className="container-custom flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
        
        <div className="text-center md:text-left">
          <p>© {new Date().getFullYear()} {portfolioData.personalInfo.name}. All rights reserved.</p>
          <p className="mt-1">Built with Next.js, Tailwind & Framer Motion.</p>
        </div>

        {/* Live Status Indicator */}
        <div className="flex flex-col items-center md:items-end">
          <div className="flex items-center gap-2 mb-1">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            <span className="font-medium text-gray-900 dark:text-gray-200">Kolkata, India</span>
          </div>
          <p className="font-mono text-xs opacity-80">
            {time} • {status}
          </p>
        </div>
        
      </div>
    </footer>
  );
}