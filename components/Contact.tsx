"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { portfolioData } from "../app/data/portfolio";
import { Github, Linkedin, Copy, Check, Send, Calendar, Loader2, AlertCircle, X } from "lucide-react";
import FadeIn from "./FadeIn";
import confetti from "canvas-confetti"; 
import { toast } from "sonner";

// --- CONFIGURATION ---
// STEP 1: Go to Calendly.com (or Cal.com), create an account, and copy your scheduling link.
// STEP 2: Paste that link inside the quotes below.
const CALENDLY_URL = "https://calendly.com/akashmani9955/30min"; 

// 1. DEFINE VALIDATION SCHEMA
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [showScheduler, setShowScheduler] = useState(false); // NEW: State for modal

  // 2. SETUP FORM HOOK
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.personalInfo.email);
    setCopied(true);
    toast.success("Email copied to clipboard!", {
      description: "Ready to paste into your mail client.",
      icon: <Check className="text-green-500" size={16} />,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const onSubmit = async (data: FormData) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    const end = Date.now() + 1000;
    const colors = ["#3b82f6", "#10b981"];
    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();

    toast.success(`Thanks, ${data.name}!`, {
      description: "Message sent successfully. I'll reply shortly.",
      duration: 5000,
    });
    
    reset();
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      <div className="container-custom max-w-5xl">
        <FadeIn>
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-gray-900 dark:text-white">
              Let's work together.
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Currently open for <span className="text-primary font-medium">internships</span> and new opportunities. 
              Got a project in mind? Let's make it happen.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-5 gap-12 items-start">
          
          {/* LEFT: Actions (2/5 width) */}
          <div className="md:col-span-2 space-y-8">
            <FadeIn delay={0.2}>
              <div className="space-y-6">
                <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">Fast Actions</p>
                
                {/* COPY EMAIL BUTTON */}
                <button
                  onClick={handleCopyEmail}
                  className="group relative w-full text-left p-5 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-primary/50 transition-all shadow-sm hover:shadow-md overflow-hidden"
                >
                  <div className="relative z-10 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500 font-medium mb-1">Email me directly</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                        {portfolioData.personalInfo.email}
                      </p>
                    </div>
                    <div className="p-2 rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 group-hover:bg-primary group-hover:text-white transition-all">
                      {copied ? <Check size={20} /> : <Copy size={20} />}
                    </div>
                  </div>
                </button>

                {/* SCHEDULE CALL BUTTON - NOW FUNCTIONAL */}
                <button
                  onClick={() => setShowScheduler(true)} // Opens Modal
                  className="group relative w-full block p-5 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-primary/50 transition-all shadow-sm hover:shadow-md text-left"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500 font-medium mb-1">Prefer a video call?</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                        Schedule a meeting
                      </p>
                    </div>
                    <div className="p-2 rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 group-hover:bg-primary group-hover:text-white transition-all">
                      <Calendar size={20} />
                    </div>
                  </div>
                </button>
              </div>

              {/* Socials */}
              <div className="mt-10 space-y-4">
                <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">Connect</p>
                <div className="flex gap-3">
                  {[
                    { icon: Github, href: portfolioData.personalInfo.github },
                    { icon: Linkedin, href: portfolioData.personalInfo.linkedin }
                  ].map((Item, idx) => (
                    <a
                      key={idx}
                      href={Item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 rounded-xl bg-gray-100 dark:bg-white/5 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 hover:scale-110"
                    >
                      <Item.icon size={22} />
                    </a>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* RIGHT: Validated Form (3/5 width) */}
          <div className="md:col-span-3">
            <FadeIn delay={0.4}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white/50 dark:bg-white/5 p-8 rounded-3xl border border-gray-100 dark:border-white/5 backdrop-blur-sm">
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Name</label>
                    <input 
                      {...register("name")}
                      type="text" 
                      placeholder="John Doe" 
                      className={`w-full bg-white dark:bg-black/20 border-2 rounded-xl py-3 px-4 text-base focus:outline-none transition-colors placeholder-gray-400 dark:placeholder-gray-600 ${errors.name ? 'border-red-400 focus:border-red-500' : 'border-transparent focus:border-primary'}`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs flex items-center gap-1 ml-1">
                        <AlertCircle size={12} /> {errors.name.message}
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Email</label>
                    <input 
                      {...register("email")}
                      type="email" 
                      placeholder="john@example.com" 
                      className={`w-full bg-white dark:bg-black/20 border-2 rounded-xl py-3 px-4 text-base focus:outline-none transition-colors placeholder-gray-400 dark:placeholder-gray-600 ${errors.email ? 'border-red-400 focus:border-red-500' : 'border-transparent focus:border-primary'}`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs flex items-center gap-1 ml-1">
                        <AlertCircle size={12} /> {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Message</label>
                  <textarea 
                    {...register("message")}
                    rows={5} 
                    placeholder="Tell me about your project..." 
                    className={`w-full bg-white dark:bg-black/20 border-2 rounded-xl py-3 px-4 text-base focus:outline-none transition-colors resize-none placeholder-gray-400 dark:placeholder-gray-600 ${errors.message ? 'border-red-400 focus:border-red-500' : 'border-transparent focus:border-primary'}`}
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-500 text-xs flex items-center gap-1 ml-1">
                      <AlertCircle size={12} /> {errors.message.message}
                    </p>
                  )}
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full bg-gray-900 dark:bg-white text-white dark:text-black py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-primary dark:hover:bg-primary hover:text-white transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>Sending <Loader2 className="animate-spin" size={18} /></>
                  ) : (
                    <>Send Message <Send size={18} /></>
                  )}
                </motion.button>
              </form>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* SCHEDULER MODAL */}
      <AnimatePresence>
        {showScheduler && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowScheduler(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside
              className="relative w-full max-w-4xl h-[80vh] bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800"
            >
              {/* Close Button */}
              <button 
                onClick={() => setShowScheduler(false)}
                className="absolute top-4 right-4 z-10 p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-500 transition-colors"
              >
                <X size={20} />
              </button>

              {/* Iframe for Calendly/Cal.com */}
              <iframe 
                src={CALENDLY_URL} // Use the constant
                className="w-full h-full"
                title="Schedule a meeting"
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}