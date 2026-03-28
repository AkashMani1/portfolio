"use client";
import { useState, useEffect } from "react";
import { db } from "../app/lib/firebase";
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp, Timestamp } from "firebase/firestore";
import { Send, User, MessageSquare } from "lucide-react";
import FadeIn from "./FadeIn";
import { cn } from "@/app/lib/utils";

type GuestbookMessage = {
  id: string;
  name: string;
  text: string;
  createdAt: Timestamp | null;
};

export default function Guestbook() {
  const [messages, setMessages] = useState<GuestbookMessage[]>([]);
  const [input, setInput] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "guestbook"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<GuestbookMessage, "id">),
        }))
      );
    });
    return () => unsubscribe();
  }, []);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim().slice(0, 50);
    const trimmedInput = input.trim().slice(0, 300);
    if (!trimmedInput || !trimmedName) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "guestbook"), {
        text: trimmedInput,
        name: trimmedName,
        createdAt: serverTimestamp(),
      });
      setInput("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container-custom">
        <FadeIn className="mb-16">
          <div className="max-w-3xl">
            <span className="text-primary font-black text-[10px] tracking-[0.4em] uppercase block mb-4">
              Community
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-black mb-6 tracking-tight">
              Sign the <span className="text-gradient">Guestbook</span>
            </h2>
            <p className="text-lg text-foreground/60 leading-relaxed font-body">
              Leave a note — thoughts, feedback, or just a hello. I read every message.
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <FadeIn delay={0.1}>
            <form onSubmit={sendMessage} className="glass-card p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">
                  Your Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Jane Doe"
                  maxLength={50}
                  required
                  className="modern-input w-full"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">
                  Message
                </label>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Leave a message..."
                  rows={4}
                  maxLength={300}
                  required
                  className="modern-input w-full resize-none"
                />
                <p className="text-[10px] text-foreground/20 text-right font-mono pr-1">
                  {input.length}/300
                </p>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 rounded-2xl bg-primary text-white font-black uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50 shadow-xl shadow-primary/20 hover:brightness-110"
              >
                {isSubmitting ? "Sending..." : <><span>Send Message</span><Send size={16} /></>}
              </button>
            </form>
          </FadeIn>

          {/* Messages */}
          <div className="space-y-4 max-h-[480px] overflow-y-auto pr-1">
            {messages.length === 0 ? (
              <FadeIn>
                <div className="glass-card p-10 flex flex-col items-center justify-center text-center gap-4 min-h-[200px]">
                  <MessageSquare size={36} className="text-primary/30" />
                  <p className="text-foreground/40 text-sm font-bold">No messages yet. Be the first!</p>
                </div>
              </FadeIn>
            ) : (
              messages.map((msg) => (
                <FadeIn key={msg.id}>
                  <div className="glass-card p-6 group hover:border-border-bright transition-all">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                        <User size={14} />
                      </div>
                      <span className="font-bold text-sm text-foreground">{msg.name}</span>
                      <span className="text-[10px] font-mono text-foreground/30 ml-auto">
                        {msg.createdAt?.toDate().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                    </div>
                    <p className="text-foreground/60 text-sm leading-relaxed pl-11">{msg.text}</p>
                  </div>
                </FadeIn>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}