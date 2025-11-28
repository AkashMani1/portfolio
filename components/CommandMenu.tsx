"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { FileText, Github, Linkedin, Mail, Laptop, Moon, Sun, User, Code, Briefcase, Command as CommandIcon } from "lucide-react";
import { useTheme } from "next-themes";

export function CommandMenu() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { setTheme } = useTheme();

  // Toggle with Ctrl+K or Cmd+K
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      {/* Floating Trigger Button for Mobile/Discovery */}
      <div className="fixed bottom-5 left-5 z-[90] md:hidden">
        <button 
          onClick={() => setOpen(true)}
          className="bg-primary text-white p-3 rounded-full shadow-lg border border-white/10 backdrop-blur-md"
          aria-label="Open Command Menu"
        >
          <CommandIcon size={20} />
        </button>
      </div>

      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Global Command Menu"
        className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm flex items-start md:items-center justify-center p-4 pt-[20vh] md:pt-0"
        onClick={(e) => { if(e.target === e.currentTarget) setOpen(false); }}
      >
        <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center border-b border-gray-100 dark:border-gray-800 px-3">
            <CommandIcon size={18} className="text-gray-400 mr-2" />
            <Command.Input 
              placeholder="Type a command or search..." 
              className="w-full px-2 py-4 text-base bg-transparent outline-none text-gray-900 dark:text-white placeholder:text-gray-400"
            />
            <div className="hidden md:flex items-center gap-1">
                <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded border border-gray-200 dark:border-gray-700">Ctrl</span>
                <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded border border-gray-200 dark:border-gray-700">K</span>
            </div>
          </div>
          
          <Command.List className="max-h-[300px] overflow-y-auto p-2">
            <Command.Empty className="py-6 text-center text-sm text-gray-500">
              No results found.
            </Command.Empty>

            <Command.Group heading="Navigation" className="text-xs font-medium text-gray-400 px-2 py-1.5 mb-1 uppercase tracking-wider">
              <Command.Item 
                onSelect={() => runCommand(() => router.push("#about"))}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 cursor-pointer transition-colors aria-selected:bg-gray-100 dark:aria-selected:bg-white/10"
              >
                <User size={16} /> About Me
              </Command.Item>
              <Command.Item 
                onSelect={() => runCommand(() => router.push("#projects"))}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 cursor-pointer transition-colors aria-selected:bg-gray-100 dark:aria-selected:bg-white/10"
              >
                <Code size={16} /> Projects
              </Command.Item>
              <Command.Item 
                onSelect={() => runCommand(() => router.push("#experience"))}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 cursor-pointer transition-colors aria-selected:bg-gray-100 dark:aria-selected:bg-white/10"
              >
                <Briefcase size={16} /> Experience
              </Command.Item>
              <Command.Item 
                onSelect={() => runCommand(() => router.push("#contact"))}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 cursor-pointer transition-colors aria-selected:bg-gray-100 dark:aria-selected:bg-white/10"
              >
                <Mail size={16} /> Contact
              </Command.Item>
            </Command.Group>

            <Command.Separator className="h-px bg-gray-100 dark:bg-gray-800 my-1" />

            <Command.Group heading="Socials" className="text-xs font-medium text-gray-400 px-2 py-1.5 mb-1 uppercase tracking-wider">
              <Command.Item 
                onSelect={() => runCommand(() => window.open("https://github.com/AkashMani1", "_blank"))}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 cursor-pointer transition-colors aria-selected:bg-gray-100 dark:aria-selected:bg-white/10"
              >
                <Github size={16} /> GitHub
              </Command.Item>
              <Command.Item 
                onSelect={() => runCommand(() => window.open("https://linkedin.com/in/akashmani1", "_blank"))}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 cursor-pointer transition-colors aria-selected:bg-gray-100 dark:aria-selected:bg-white/10"
              >
                <Linkedin size={16} /> LinkedIn
              </Command.Item>
              <Command.Item 
                onSelect={() => runCommand(() => window.open("/resume.pdf", "_blank"))}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 cursor-pointer transition-colors aria-selected:bg-gray-100 dark:aria-selected:bg-white/10"
              >
                <FileText size={16} /> Resume
              </Command.Item>
            </Command.Group>

            <Command.Separator className="h-px bg-gray-100 dark:bg-gray-800 my-1" />

            <Command.Group heading="Theme" className="text-xs font-medium text-gray-400 px-2 py-1.5 mb-1 uppercase tracking-wider">
              <Command.Item 
                onSelect={() => runCommand(() => setTheme("light"))}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 cursor-pointer transition-colors aria-selected:bg-gray-100 dark:aria-selected:bg-white/10"
              >
                <Sun size={16} /> Light Mode
              </Command.Item>
              <Command.Item 
                onSelect={() => runCommand(() => setTheme("dark"))}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 cursor-pointer transition-colors aria-selected:bg-gray-100 dark:aria-selected:bg-white/10"
              >
                <Moon size={16} /> Dark Mode
              </Command.Item>
              <Command.Item 
                onSelect={() => runCommand(() => setTheme("system"))}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 cursor-pointer transition-colors aria-selected:bg-gray-100 dark:aria-selected:bg-white/10"
              >
                <Laptop size={16} /> System
              </Command.Item>
            </Command.Group>
          </Command.List>
        </div>
      </Command.Dialog>
    </>
  );
}