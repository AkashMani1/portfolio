"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { portfolioData } from "../app/data/portfolio";
import { Github, Linkedin, Copy, Check, Send, Calendar, Loader2, AlertCircle, X, Mail } from "lucide-react";
import FadeIn from "./FadeIn";
import confetti from "canvas-confetti"; 
import { toast } from "sonner";
import { db } from "../app/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { cn } from "@/app/lib/utils";

const CALENDLY_URL = "https://calendly.com/akashmani9955/30min"; 

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [showScheduler, setShowScheduler] = useState(false);

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
    toast.success("Email copied!", {
      description: "Ready to paste.",
      icon: <Check className="text-primary" size={16} />,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const onSubmit = async (data: FormData) => {
    try {
      await addDoc(collection(db, "contact_logs"), {
        name: data.name,
        email: data.email,
        message: data.message,
        timestamp: serverTimestamp(),
      });

      const end = Date.now() + 1000;
      const colors = ["#6366f1", "#a855f7"];
      (function frame() {
        confetti({ particleCount: 2, angle: 60, spread: 55, origin: { x: 0 }, colors: colors });
        confetti({ particleCount: 2, angle: 120, spread: 55, origin: { x: 1 }, colors: colors });
        if (Date.now() < end) requestAnimationFrame(frame);
      })();

      toast.success(`Message sent!`, {
        description: "I'll get back to you soon.",
        duration: 5000,
      });
      reset();
    } catch (error) {
      console.error("Firebase Error:", error);
      toast.error("Failed to send message.");
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="container-custom max-w-6xl">
        <FadeIn className="mb-20">
          <div className="text-center">
            <span className="text-primary font-black text-[10px] tracking-[0.4em] uppercase block mb-4">
              Get in Touch
            </span>
            <h2 className="text-5xl md:text-7xl font-heading font-black mb-6 tracking-tight">
              Let&apos;s Build <span className="text-gradient">Something</span> Great
            </h2>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* LEFT: INFO */}
          <div className="lg:col-span-5 space-y-6">
            <FadeIn delay={0.1}>
              <div className="glass-card p-10 space-y-12">
                <div>
                  <h3 className="text-2xl font-heading font-black mb-6 tracking-tight">Contact Info</h3>
                  <div className="space-y-6">
                    <button 
                      onClick={handleCopyEmail}
                      className="group flex items-center gap-4 w-full text-left p-4 rounded-2xl bg-surface-hover border border-border hover:border-primary/50 transition-all"
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Mail size={20} />
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-foreground/40 mb-1">Email</p>
                        <p className="font-bold text-foreground/80 group-hover:text-primary transition-colors truncate">
                          {portfolioData.personalInfo.email}
                        </p>
                      </div>
                      <div className="text-foreground/20 group-hover:text-primary transition-colors">
                        {copied ? <Check size={18} /> : <Copy size={18} />}
                      </div>
                    </button>

                    <button 
                      onClick={() => setShowScheduler(true)}
                      className="group flex items-center gap-4 w-full text-left p-4 rounded-2xl bg-surface-hover border border-border hover:border-accent/50 transition-all"
                    >
                      <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Calendar size={20} />
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-foreground/40 mb-1">Meeting</p>
                        <p className="font-bold text-foreground/80 group-hover:text-accent transition-colors">Schedule a Call</p>
                      </div>
                    </button>
                  </div>
                </div>

                <div>
                   <h3 className="text-[10px] font-black uppercase tracking-widest text-foreground/40 mb-6">Social</h3>
                   <div className="flex gap-4">
                    {[
                      { icon: Github, href: portfolioData.personalInfo.github },
                      { icon: Linkedin, href: portfolioData.personalInfo.linkedin }
                    ].map((Item, idx) => (
                      <a 
                        key={idx} 
                        href={Item.href}
                        target="_blank" 
                        rel="noreferrer"
                        className="w-14 h-14 rounded-2xl bg-surface-hover border border-border text-foreground/60 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-500 hover:scale-110"
                      >
                        <Item.icon size={24} />
                      </a>
                    ))}
                   </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* RIGHT: FORM */}
          <div className="lg:col-span-7">
            <FadeIn delay={0.2}>
              <form onSubmit={handleSubmit(onSubmit)} className="glass-card p-10 space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Name</label>
                    <input 
                      {...register("name")}
                      className="modern-input w-full"
                      placeholder="Your Name"
                    />
                    {errors.name && <p className="text-red-400 text-[10px] uppercase font-black tracking-widest ml-1">{errors.name.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Email</label>
                    <input 
                      {...register("email")}
                      className="modern-input w-full"
                      placeholder="hello@example.com"
                    />
                    {errors.email && <p className="text-red-400 text-[10px] uppercase font-black tracking-widest ml-1">{errors.email.message}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Message</label>
                  <textarea 
                    {...register("message")}
                    rows={6}
                    className="modern-input w-full resize-none"
                    placeholder="Tell me about your vision..."
                  />
                  {errors.message && <p className="text-red-400 text-[10px] uppercase font-black tracking-widest ml-1">{errors.message.message}</p>}
                </div>

                <button 
                  disabled={isSubmitting}
                  className="w-full h-16 rounded-2xl bg-primary text-white font-black uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-3 transition-transform active:scale-95 disabled:opacity-50 shadow-xl shadow-primary/20 hover:brightness-110"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <>Send Message <Send size={18} /></>}
                </button>
              </form>
            </FadeIn>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showScheduler && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowScheduler(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl h-[85vh] bg-background rounded-3xl overflow-hidden border border-border shadow-3xl"
            >
              <button 
                onClick={() => setShowScheduler(false)}
                className="absolute top-6 right-6 z-10 p-3 bg-surface-hover rounded-full hover:bg-red-500 hover:text-white transition-all ring-1 ring-border"
              >
                <X size={20} />
              </button>
              <iframe 
                src={CALENDLY_URL}
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