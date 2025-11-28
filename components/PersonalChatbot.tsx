"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, Minimize2, Sparkles, FileText, Github, ExternalLink, Users } from "lucide-react";
import { portfolioData } from "../app/data/portfolio";
import Fuse from "fuse.js";

// --- TYPES ---
type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  actionLink?: { text: string; url: string; icon?: any }; // Logic for buttons
};

// --- THE KNOWLEDGE BASE (THE BRAIN) ---
// We map potential questions (keys) to answers (values).
const knowledgeBase = [
  {
    keys: ["resume", "cv", "download", "pdf", "document", "hiring"],
    answer: "You can download my full resume below. It contains my detailed work history and academic records.",
    link: { text: "Download Resume", url: portfolioData.personalInfo.resumeLink, icon: FileText }
  },
  {
    keys: ["skills", "stack", "technologies", "languages", "coding", "java", "react", "nextjs"],
    answer: `My technical arsenal includes:
    • Languages: ${portfolioData.skills.languages.join(", ")}
    • Web: ${portfolioData.skills.webMobile.join(", ")}
    • Tools: ${portfolioData.skills.tools.join(", ")}`
  },
  {
    keys: ["projects", "work", "portfolio", "apps", "built", "development"],
    answer: "I have built several scalable applications. You can check out my 'Medical App', 'Financial Platform', or this 'Portfolio Website'. Which one would you like to know more about?"
  },
  {
    keys: ["contact", "email", "reach", "phone", "call", "message", "hire"],
    answer: `I am currently open for opportunities! You can email me directly at ${portfolioData.personalInfo.email}.`
  },
  {
    keys: ["github", "code", "repo", "git"],
    answer: "Check out my raw code and contributions on GitHub.",
    link: { text: "Visit GitHub", url: portfolioData.personalInfo.github, icon: Github }
  },
  {
    keys: ["linkedin", "social", "connect", "network"],
    answer: "Let's connect professionally on LinkedIn.",
    link: { text: "Visit LinkedIn", url: portfolioData.personalInfo.linkedin, icon: ExternalLink }
  },
  {
    keys: ["experience", "internship", "job", "company", "codecrafters"],
    answer: `I interned at ${portfolioData.experience[0].company} as a ${portfolioData.experience[0].role}. I optimized backend performance and built scalable UI components.`
  },
  {
    keys: ["about", "who", "yourself", "intro", "summary"],
    answer: "I am a Computer Science student and Full-Stack Developer based in Kolkata. I love building scalable systems and solving algorithmic problems."
  },
  // Specific Project Queries
  {
    keys: ["medical", "android", "doctor"],
    answer: "My Medical App uses Android (Java/Kotlin) and SQLite. It provides medicine recommendations and works offline.",
    link: { text: "View Medical App", url: "#projects", icon: Sparkles }
  },
  {
    keys: ["financial", "finance", "money", "gamified"],
    answer: "The Gamified Financial Literacy Platform is a MEAN stack app that teaches stock market basics through interactive gameplay.",
    link: { text: "View Finance App", url: "#projects", icon: Sparkles }
  }
];

// --- FUZZY SEARCH CONFIGURATION ---
const fuseOptions = {
  includeScore: true,
  threshold: 0.4, // 0.0 = perfect match, 1.0 = match anything (0.4 allows for typos)
  keys: ["keys"]
};
const fuse = new Fuse(knowledgeBase, fuseOptions);

export default function PersonalChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Akash's AI Assistant. 🤖\nI can help you find his Resume, explain his projects, or list his skills. Try asking me anything!",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  
  // NEW: State for Live Visitor Count
  const [liveVisitors, setLiveVisitors] = useState(12);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // NEW: Simulation of Live Visitors (Fluctuates every few seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveVisitors(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const newValue = prev + change;
        return newValue < 8 ? 8 : newValue > 25 ? 25 : newValue; // Keep reasonable range
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // --- THE BRAIN: GENERATE RESPONSE ---
  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userText = inputValue;
    setInputValue(""); // Clear input immediately

    const userMessage: Message = {
      id: Date.now().toString(),
      text: userText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // AI SIMULATION DELAY
    setTimeout(() => {
      // 1. Search Knowledge Base using Fuzzy Logic
      const result = fuse.search(userText);
      
      let botResponse: Message;

      if (result.length > 0) {
        // Found a match!
        const match = result[0].item;
        botResponse = {
          id: (Date.now() + 1).toString(),
          text: match.answer,
          sender: 'bot',
          timestamp: new Date(),
          actionLink: match.link // Attach button if available
        };
      } else {
        // Fallback for unknown queries
        botResponse = {
          id: (Date.now() + 1).toString(),
          text: "I'm still learning about that! Try asking about 'Resume', 'Skills', 'Projects', or 'Contact'.",
          sender: 'bot',
          timestamp: new Date()
        };
      }

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {/* FLOATING TRIGGER */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-primary to-blue-600 text-white shadow-2xl border border-white/20 backdrop-blur-md"
          >
            <Bot size={28} />
            
            {/* Notification Badge */}
            <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>

            {/* Hover Tooltip */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap shadow-xl border border-gray-100 dark:border-gray-700"
                >
                  Chat with AI
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        )}
      </AnimatePresence>

      {/* CHAT WINDOW */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[350px] md:w-[400px] h-[600px] max-h-[80vh] bg-white dark:bg-[#121212] rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/20 rounded-full">
                  <Bot size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white">Akash AI Assistant</h3>
                  
                  {/* NEW: Live Visitor Count */}
                  <div className="flex items-center gap-3 mt-0.5">
                    <p className="text-[10px] text-green-500 font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                      Bot Active
                    </p>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium flex items-center gap-1">
                      <Users size={10} />
                      {liveVisitors} Live Visitors
                    </p>
                  </div>

                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors text-gray-500">
                <Minimize2 size={18} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 dark:bg-black/20">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div 
                    className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      msg.sender === 'user' 
                        ? 'bg-primary text-white rounded-br-none' 
                        : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-bl-none'
                    }`}
                  >
                    {msg.text.split('\n').map((line, i) => (
                      <p key={i} className={i > 0 ? "mt-2" : ""}>{line}</p>
                    ))}
                  </div>
                  
                  {/* Action Link Button (if exists) */}
                  {msg.actionLink && (
                    <motion.a
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      href={msg.actionLink.url}
                      target={msg.actionLink.url.startsWith("http") ? "_blank" : "_self"}
                      className="mt-2 flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-xl text-xs font-bold text-primary hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
                    >
                      {msg.actionLink.icon && <msg.actionLink.icon size={14} />}
                      {msg.actionLink.text}
                    </motion.a>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-3 rounded-2xl rounded-bl-none shadow-sm flex gap-1">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white dark:bg-[#121212] border-t border-gray-100 dark:border-gray-800">
              <div className="relative flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask for resume, skills, etc..."
                  className="w-full bg-gray-100 dark:bg-gray-900 border-none rounded-xl py-3 pl-4 pr-10 text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder-gray-400 dark:placeholder-gray-600 dark:text-white"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className="p-3 bg-primary text-white rounded-xl disabled:opacity-50 hover:bg-blue-600 transition-colors shadow-md"
                >
                  <Send size={18} />
                </button>
              </div>
              
              {/* Quick Prompts */}
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {["Download CV", "Tech Stack?", "Experience?"].map((hint) => (
                  <button
                    key={hint}
                    onClick={() => { setInputValue(hint); handleSend(); }}
                    className="whitespace-nowrap px-3 py-1.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-xs font-medium text-gray-500 hover:text-primary hover:border-primary/30 transition-colors"
                  >
                    {hint}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}