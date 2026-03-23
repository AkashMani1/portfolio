"use client";
import { useState, useEffect } from "react";
import { portfolioData } from "../app/data/portfolio";

export default function Footer() {
  const [time, setTime] = useState<string>("");
  const [status, setStatus] = useState<string>("Checking...");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { 
        timeZone: "Asia/Kolkata", 
        hour: "numeric", 
        minute: "numeric", 
        hour12: true 
      };
      const timeString = new Intl.DateTimeFormat("en-US", options).format(now);
      setTime(timeString);

      const hour = parseInt(new Intl.DateTimeFormat("en-US", { 
        timeZone: "Asia/Kolkata", 
        hour: "numeric", 
        hour12: false 
      }).format(now));

      if (hour >= 9 && hour < 18) setStatus("In Product Mode 👨‍💻");
      else if (hour >= 18 && hour < 23) setStatus("Learning & Building 🟢");
      else if (hour >= 23 || hour < 7) setStatus("Recharging 😴");
      else setStatus("Powering Up ☕");
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="py-20 border-t border-white/5 relative overflow-hidden">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-xs">
             <div className="font-heading font-black tracking-tighter text-2xl mb-4">
              AKASH<span className="text-primary">.</span>
            </div>
            <p className="text-foreground/40 text-sm leading-relaxed mb-8">
              Full-stack developer focused on building production-ready apps with 
              backend depth and frontend precision.
            </p>
            
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest text-foreground/60">
                {time} • {status}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12 sm:gap-24">
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/20 mb-6">Social</h4>
              <ul className="space-y-4">
                <li>
                  <a href={portfolioData.personalInfo.github} target="_blank" rel="noreferrer" className="text-sm font-bold text-foreground/60 hover:text-primary transition-colors">Github</a>
                </li>
                <li>
                  <a href={portfolioData.personalInfo.linkedin} target="_blank" rel="noreferrer" className="text-sm font-bold text-foreground/60 hover:text-primary transition-colors">LinkedIn</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/20 mb-6">Location</h4>
              <p className="text-sm font-bold text-foreground/60">Kolkata, India</p>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-foreground/20">
          <p>© {new Date().getFullYear()} Akash Mani</p>
          <p>Nexus Design System v2.0</p>
        </div>
      </div>
    </footer >
  );
}