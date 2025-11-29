"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, Bot, Minimize2, Users, AlertCircle, Calendar, Clock, 
  FileText, Download, ExternalLink, Phone, Mail, Linkedin, Github, 
  Check, Sparkles, X, ChevronRight
} from "lucide-react";

// --- CONFIGURATION ---
const CALENDLY_URL = "https://calendly.com/"; 
const EMAIL_ADDRESS = "akashmani9955@gmail.com"; 

// --- TYPES ---
type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isError?: boolean;
  type?: 'text' | 'appointment';
};

export default function PersonalChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Akash's AI Assistant. 🤖\nI can provide his Resume, discuss his projects, or share his contact info. How can I help?",
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [liveVisitors, setLiveVisitors] = useState(12);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // --- SCROLL LOGIC ---
  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior, block: "end" });
    }, 100);
  };

  useEffect(() => {
    if (isOpen) scrollToBottom("smooth");
  }, [messages, isTyping]); 

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
        scrollToBottom("auto");
      }, 300);
    }
  }, [isOpen]);

  // Live Visitor Simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveVisitors(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const newValue = prev + change;
        return newValue < 8 ? 8 : newValue > 25 ? 25 : newValue;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // --- 🎨 ADVANCED CONTENT PARSER ---

  // 1. Parse Bold & Highlights
  const parseBold = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <span key={i} className="font-bold text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-700/50 px-1.5 py-0.5 rounded text-[13px]">
            {part.slice(2, -2)}
          </span>
        );
      }
      return part;
    });
  };

  // 2. Rich Content (Links, Cards, Buttons)
  const parseRichContent = (text: string) => {
    // Regex: Matches [Link](url), Raw URL, [Raw URL], Email, Phone
    const splitRegex = /(\[[^\]]+\]\([^)]+\)|\[?https?:\/\/[^\s]+\]?|\[?\/[\w-]+\.pdf\]?|[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+|\+?\d[\d -]{8,15}\d)/g;
    
    const parts = text.split(splitRegex).filter(Boolean);

    return parts.map((part, i) => {
      // CLEAN BRACKETS
      const cleanPart = part.replace(/^\[|\]$/g, '');

      // MATCHERS
      const mdMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      const urlMatch = cleanPart.match(/^(https?:\/\/[^\s]+|\/[\w-]+\.pdf)$/);
      const emailMatch = cleanPart.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+$/);
      const phoneMatch = cleanPart.match(/^\+?\d[\d -]{8,15}\d$/);

      // --- A. LINKS & PDFS ---
      if (mdMatch || urlMatch) {
        const url = mdMatch ? mdMatch[2] : cleanPart;
        const rawLabel = mdMatch ? mdMatch[1] : url;
        const label = (rawLabel.includes('/') || rawLabel.includes('http')) && url.endsWith('.pdf') 
                      ? "Akash_Resume.pdf" 
                      : rawLabel;

        // PDF CARD
        if (url.toLowerCase().endsWith('.pdf') || url.includes("drive.google.com")) {
          return (
            <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="block my-3 group no-underline select-none">
               <div className="relative flex items-center gap-4 p-3.5 bg-white dark:bg-[#1a1d24] rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 group-hover:border-red-200 dark:group-hover:border-red-900/50">
                  <div className="w-12 h-12 bg-red-50 dark:bg-red-900/10 rounded-xl flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                    <FileText size={24} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 dark:text-gray-100 text-sm truncate">
                       {label.endsWith('.pdf') ? label : 'Resume.pdf'}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] font-medium px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-500 rounded">PDF</span>
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                           Tap to download
                        </span>
                    </div>
                  </div>
                  <div className="text-gray-300 group-hover:text-red-500 transition-colors">
                    <Download size={20} />
                  </div>
               </div>
            </a>
          );
        }

        // SOCIAL BUTTONS
        if (url.includes("linkedin.com")) return <SocialButton key={i} href={url} icon={<Linkedin size={14} />} label="LinkedIn" color="bg-[#0077b5]" />;
        if (url.includes("github.com")) return <SocialButton key={i} href={url} icon={<Github size={14} />} label="GitHub" color="bg-[#24292e]" />;

        // STANDARD LINK
        return (
          <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium hover:underline break-all">
            {label} <ExternalLink size={12} className="inline" />
          </a>
        );
      }

      // --- B. EMAIL & PHONE ---
      if (emailMatch) return <ContactPill key={i} href={`mailto:${cleanPart}`} icon={<Mail size={14} />} label={cleanPart} color="text-orange-600 bg-orange-50 border-orange-200" />;
      if (phoneMatch) return <ContactPill key={i} href={`tel:${cleanPart.replace(/\D/g, '')}`} icon={<Phone size={14} />} label={cleanPart} color="text-green-600 bg-green-50 border-green-200" />;

      // --- C. PLAIN TEXT ---
      const textOnly = part.replace(/[\[\]]/g, ''); 
      if (!textOnly.trim()) return null;
      return <span key={i}>{parseBold(textOnly)}</span>;
    });
  };

  // 3. Main Message Renderer
  const renderFormattedMessage = (text: string) => {
    const formattedText = text.replace(/([^\n])\s(\*|-)\s/g, '$1\n$2 ');
    const lines = formattedText.split('\n');

    return (
      <div className="space-y-1.5 font-sans text-[14px] leading-relaxed">
        {lines.map((line, index) => {
          // Detect List Item
          const isBullet = line.trim().match(/^[\*-]\s/);
          if (isBullet) {
             const content = line.trim().substring(2); 
             return (
               <div key={index} className="flex gap-2.5 items-start pl-1">
                  <div className="mt-1.5 w-4 h-4 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                    <Check size={10} strokeWidth={3} />
                  </div>
                  <div className="flex-1 text-gray-700 dark:text-gray-300">
                    {parseRichContent(content)}
                  </div>
               </div>
             );
          }
          
          // Detect Headers
          const isHeader = line.match(/^[A-Z][a-zA-Z\s]+:$/);
          if (isHeader) {
              return (
                  <div key={index} className="mt-4 mb-2">
                      <h4 className="font-bold text-gray-900 dark:text-white text-xs uppercase tracking-wider flex items-center gap-2">
                        <Sparkles size={12} className="text-yellow-500 fill-yellow-500" />
                        {line}
                      </h4>
                  </div>
              )
          }

          if (line.trim() === "") return <div key={index} className="h-1" />;
          return <div key={index} className="break-words">{parseRichContent(line)}</div>;
        })}
      </div>
    );
  };

  // --- MAIN LOGIC ---
  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userText = inputValue;
    const lowerText = userText.toLowerCase();
    setInputValue(""); 

    const userMessage: Message = { id: Date.now().toString(), text: userText, sender: 'user', timestamp: new Date(), type: 'text' };
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    if (lowerText.includes("book") || lowerText.includes("appointment") || lowerText.includes("schedule") || lowerText.includes("meet")) {
      setTimeout(() => {
        const appointmentMessage: Message = {
          id: (Date.now() + 1).toString(), text: "I'd love to connect! You can schedule a time directly on my calendar below.",
          sender: 'bot', timestamp: new Date(), type: 'appointment' 
        };
        setMessages(prev => [...prev, appointmentMessage]);
        setIsTyping(false);
      }, 800); 
      return; 
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: userText }),
      });
      const data = await response.json();
      const botMessage: Message = {
        id: (Date.now() + 1).toString(), text: data.reply || "I received an empty response.",
        sender: 'bot', timestamp: new Date(), type: 'text'
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error: any) {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(), text: error.message || "Connection error.",
        sender: 'bot', timestamp: new Date(), isError: true, type: 'text'
      }]);
    } finally { setIsTyping(false); }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => { if (e.key === 'Enter') handleSend(); };

  return (
    <>
      {/* TRIGGER BUTTON */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
            className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-2xl border-2 border-white/20"
          >
            <Bot size={28} />
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-green-500 border-2 border-white"></span>
            </span>
            <AnimatePresence>
              {isHovered && (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white px-3 py-1.5 rounded-xl text-sm font-semibold text-gray-800 shadow-xl whitespace-nowrap">
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
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] md:w-[400px] h-[650px] max-h-[85vh] bg-white/95 dark:bg-[#0f1115]/95 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/20 flex flex-col overflow-hidden"
          >
            {/* HEADER */}
            <div className="px-6 py-4 bg-white/50 dark:bg-black/20 border-b border-gray-100 dark:border-white/5 flex justify-between items-center backdrop-blur-md sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg">
                        <Bot size={20} />
                    </div>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white leading-tight">Akash AI</h3>
                  <p className="text-[11px] font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    {liveVisitors} online
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors text-gray-500">
                <Minimize2 size={18} />
              </button>
            </div>

            {/* CHAT AREA */}
            <div 
              className="flex-1 overflow-y-auto p-5 space-y-6 scroll-smooth overscroll-contain bg-gray-50/50 dark:bg-black/10"
              onWheel={(e) => e.stopPropagation()} 
            >
              {messages.map((msg) => (
                <motion.div 
                    key={msg.id} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  {/* MESSAGE BUBBLE */}
                  {msg.type !== 'appointment' && (
                    <div 
                      className={`max-w-[88%] p-4 rounded-2xl shadow-sm relative group ${
                        msg.sender === 'user' 
                          ? 'bg-blue-600 text-white rounded-br-none' 
                          : msg.isError 
                            ? 'bg-red-50 text-red-600 border border-red-100 rounded-bl-none'
                            : 'bg-white dark:bg-[#1a1d24] border border-gray-100 dark:border-white/5 text-gray-800 dark:text-gray-200 rounded-bl-none'
                      }`}
                    >
                      {msg.isError && <AlertCircle size={16} className="inline-block mr-2 -mt-0.5" />}
                      {renderFormattedMessage(msg.text || "")}
                      
                      <span className={`text-[9px] opacity-40 absolute -bottom-4 ${msg.sender === 'user' ? 'right-0' : 'left-0'} text-gray-400`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  )}

                  {/* APPOINTMENT CARD */}
                  {msg.type === 'appointment' && (
                    <div className="max-w-[90%] bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 border border-indigo-100 dark:border-gray-700 rounded-2xl rounded-bl-none p-5 shadow-sm">
                       <div className="flex items-center gap-2 mb-3 text-indigo-900 dark:text-white font-bold">
                          <div className="p-1.5 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                            <Calendar className="text-indigo-600 dark:text-indigo-400" size={18} />
                          </div>
                          <span>Let's Meet!</span>
                       </div>
                       <p className="text-sm text-gray-600 dark:text-gray-300 mb-5 leading-relaxed">
                          {msg.text}
                       </p>
                       <div className="grid grid-cols-1 gap-2">
                         <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-all shadow-md">
                           <Clock size={16} /> Book via Calendly
                         </a>
                       </div>
                    </div>
                  )}
                </motion.div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-[#1a1d24] border border-gray-100 dark:border-white/5 p-4 rounded-2xl rounded-bl-none shadow-sm flex gap-1.5 items-center">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} className="h-1" />
            </div>

            {/* INPUT AREA */}
            <div className="p-4 bg-white/80 dark:bg-black/40 backdrop-blur-md border-t border-gray-100 dark:border-white/5">
              <div className="relative flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask for projects, skills, contact..."
                  className="w-full bg-gray-100 dark:bg-gray-900 border-none rounded-2xl py-3.5 pl-5 pr-12 text-sm focus:ring-2 focus:ring-blue-500/20 focus:bg-white dark:focus:bg-black transition-all placeholder-gray-400 dark:placeholder-gray-600 dark:text-white shadow-inner"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className="absolute right-2 p-2 bg-blue-600 text-white rounded-xl disabled:opacity-50 disabled:bg-gray-300 hover:bg-blue-700 transition-all shadow-md transform hover:scale-105 active:scale-95"
                >
                  <Send size={18} />
                </button>
              </div>

              {/* RESTORED SUGGESTION CHIPS */}
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-hide mask-fade">
                {["Book Meeting", "My Resume", "Projects"].map((hint) => (
                  <button
                    key={hint}
                    onClick={() => { setInputValue(hint); handleSend(); }}
                    className="whitespace-nowrap px-3 py-1.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-xs font-semibold text-gray-500 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 dark:hover:bg-white/10 transition-all"
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

// --- SUB-COMPONENTS ---

const SocialButton = ({ href, icon, label, color }: { href: string, icon: React.ReactNode, label: string, color: string }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 px-3 py-1.5 mr-2 rounded-lg text-white text-xs font-medium transition-transform hover:scale-105 ${color}`}>
        {icon} {label}
    </a>
);

const ContactPill = ({ href, icon, label, color }: { href: string, icon: React.ReactNode, label: string, color: string }) => (
    <a href={href} className={`inline-flex items-center gap-2 px-3 py-1.5 mr-2 mb-2 rounded-lg border text-xs font-semibold transition-colors hover:opacity-80 ${color}`}>
        {icon} {label}
    </a>
);