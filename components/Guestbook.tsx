"use client";
import { useState, useEffect } from "react";
import { db } from "../app/lib/firebase";
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from "firebase/firestore";
import { Send, User } from "lucide-react";
import FadeIn from "./FadeIn";

export default function Guestbook() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [name, setName] = useState("");

  // Real-time listener
  useEffect(() => {
    const q = query(collection(db, "guestbook"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !name.trim()) return;

    await addDoc(collection(db, "guestbook"), {
      text: input,
      name: name,
      createdAt: serverTimestamp(),
    });
    setInput("");
  };

  return (
    <section className="py-24 container-custom">
      <FadeIn>
        <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Sign the Guestbook</h2>
      </FadeIn>

      <div className="grid md:grid-cols-2 gap-12">
        <FadeIn delay={0.2}>
          <form onSubmit={sendMessage} className="bg-white/50 dark:bg-white/5 p-6 rounded-2xl border border-gray-200 dark:border-white/10">
            <div className="mb-4">
              <input 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="w-full bg-transparent border-b border-gray-300 dark:border-gray-700 py-2 focus:outline-none focus:border-primary transition-colors"
                required
              />
            </div>
            <div className="flex gap-2">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Leave a message..."
                className="flex-1 bg-transparent border-b border-gray-300 dark:border-gray-700 py-2 focus:outline-none focus:border-primary transition-colors"
                required
              />
              <button type="submit" className="p-2 bg-primary text-white rounded-full hover:scale-110 transition-transform">
                <Send size={18} />
              </button>
            </div>
          </form>
        </FadeIn>

        <div className="max-h-[400px] overflow-y-auto space-y-4 pr-2">
          {messages.map((msg) => (
            <FadeIn key={msg.id} className="p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
              <div className="flex items-center gap-2 mb-1">
                <div className="p-1 bg-primary/10 rounded-full text-primary"><User size={12} /></div>
                <span className="text-sm font-bold text-gray-900 dark:text-white">{msg.name}</span>
                <span className="text-xs text-gray-400">
                  {msg.createdAt?.toDate().toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm pl-7">{msg.text}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}