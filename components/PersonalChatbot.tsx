"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, Bot, Minimize2, Users, AlertCircle, Calendar, Clock, 
  FileText, Download, ExternalLink, Phone, Mail, Linkedin, Github 
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

  // --- PARSING ENGINE ---

  // 1. Simple Bold Parser
  const parseBold = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-bold text-gray-900 dark:text-gray-100">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  // 2. Advanced Content Parser (Links, Emails, Phones, Socials)
  const parseRichContent = (text: string) => {
    // REGEX for splitting text into actionable parts:
    // 1. Markdown Links [ ]( )
    // 2. URLs (http...)
    // 3. Local PDFs (/.pdf)
    // 4. Emails
    // 5. Phone Numbers (Simple international format)
    const splitRegex = /(\[[^\]]+\]\([^)]+\)|https?:\/\/[^\s]+|\/[\w-]+\.pdf|[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+|\+?\d[\d -]{8,15}\d)/g;
    
    const parts = text.split(splitRegex).filter(Boolean);

    return parts.map((part, i) => {
      // A. CHECK FOR MARKDOWN LINKS OR URLS
      const mdMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      const urlMatch = part.match(/^(https?:\/\/[^\s]+|\/[\w-]+\.pdf)$/);

      if (mdMatch || urlMatch) {
        const url = mdMatch ? mdMatch[2] : part;
        const label = mdMatch ? mdMatch[1] : (url.startsWith('/') ? "Download File" : url);

        // A1. PDF Files
        if (url.toLowerCase().endsWith('.pdf') || url.includes("drive.google.com")) {
          return (
            <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 my-2 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all group no-underline">
              <div className="flex-shrink-0 w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center text-red-500 dark:text-red-400 group-hover:scale-110 transition-transform">
                <FileText size={20} />
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="font-bold text-gray-800 dark:text-gray-100 text-sm truncate">{label === url || label === "Download File" ? "Resume.pdf" : label}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1"><Download size={10} /> Click to download</span>
              </div>
            </a>
          );
        }

        // A2. Social Links (LinkedIn / GitHub) - Custom Styling
        if (url.includes("linkedin.com")) {
            return (
                <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-2 my-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors w-fit">
                    <Linkedin size={16} /> <span className="text-sm font-semibold">LinkedIn Profile</span>
                </a>
            );
        }
        if (url.includes("github.com")) {
            return (
                <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-2 my-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors w-fit">
                    <Github size={16} /> <span className="text-sm font-semibold">GitHub Profile</span>
                </a>
            );
        }

        // A3. Standard Links
        return (
          <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium hover:underline break-all">
            {label} <ExternalLink size={12} className="inline" />
          </a>
        );
      }

      // B. CHECK FOR EMAILS (mailto:)
      if (part.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+$/)) {
          return (
            <a key={i} href={`mailto:${part}`} className="flex items-center gap-2 p-2 my-1 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/40 transition-colors w-fit">
                <Mail size={16} /> <span className="text-sm font-semibold">{part}</span>
            </a>
          );
      }

      // C. CHECK FOR PHONE NUMBERS (tel:)
      if (part.match(/^\+?\d[\d -]{8,15}\d$/)) {
          return (
            <a key={i} href={`tel:${part.replace(/\D/g, '')}`} className="flex items-center gap-2 p-2 my-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors w-fit">
                <Phone size={16} /> <span className="text-sm font-semibold">{part}</span>
            </a>
          );
      }

      // D. REGULAR TEXT (Parse Bold)
      const cleanPart = part.replace(/^\[|\]$/g, ''); 
      if (!cleanPart.trim()) return <span key={i}> </span>; // Keep spaces
      return <span key={i}>{parseBold(cleanPart)}</span>;
    });
  };

  // 3. Render Message Block
  const renderFormattedMessage = (text: string) => {
    // Clean up bullets and newlines
    const formattedText = text.replace(/([^\n])\s(\*|-)\s/g, '$1\n$2 ');
    const lines = formattedText.split('\n');

    return (
      <div className="space-y-1">
        {lines.map((line, index) => {
          // Detect Bullet Points
          const isBullet = line.trim().match(/^[\*-]\s/);
          
          if (isBullet) {
             const content = line.trim().substring(2); 
             return (
               <div key={index} className="flex gap-2 items-start ml-1">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  <div className="flex-1 break-words">
                    {parseRichContent(content)}
                  </div>
               </div>
             );
          }
          
          // Detect Labels (e.g., "Email:") to force a new line for the interactive element
          const hasLabel = line.match(/^(Email|Phone|LinkedIn|GitHub|Website):/i);
          if (hasLabel) {
              const label = line.split(':')[0];
              const content = line.substring(label.length + 1).trim();
              return (
                  <div key={index} className="mb-1">
                      <span className="font-bold text-gray-700 dark:text-gray-300 block text-xs uppercase tracking-wider mb-0.5">{label}</span>
                      {parseRichContent(content)}
                  </div>
              )
          }

          if (line.trim() === "") return <div key={index} className="h-2" />;
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

    const userMessage: Message = {
      id: Date.now().toString(),
      text: userText,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Appointment Intercept
    if (lowerText.includes("book") || lowerText.includes("appointment") || lowerText.includes("schedule") || lowerText.includes("meet")) {
      setTimeout(() => {
        const appointmentMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "I'd love to connect! You can schedule a time directly on my calendar below.",
          sender: 'bot',
          timestamp: new Date(),
          type: 'appointment' 
        };
        setMessages(prev => [...prev, appointmentMessage]);
        setIsTyping(false);
      }, 800); 
      return; 
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || data.reply);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.reply || "I received an empty response.",
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, botMessage]);

    } catch (error: any) {
      console.error("Chat Error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: error.message || "I'm having trouble connecting to the AI brain right now.",
        sender: 'bot',
        timestamp: new Date(),
        isError: true,
        type: 'text'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
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
            <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
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
                  <div className="flex items-center gap-3 mt-0.5">
                    <p className="text-[10px] text-green-500 font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                      Online
                    </p>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium flex items-center gap-1">
                      <Users size={10} />
                      {liveVisitors} Viewers
                    </p>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors text-gray-500">
                <Minimize2 size={18} />
              </button>
            </div>

            {/* Chat Area */}
            <div 
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 dark:bg-black/20 scroll-smooth overscroll-contain"
              onWheel={(e) => e.stopPropagation()} 
            >
              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  
                  {msg.type !== 'appointment' && (
                    <div 
                      className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                        msg.sender === 'user' 
                          ? 'bg-primary text-white rounded-br-none' 
                          : msg.isError 
                            ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-300 rounded-bl-none'
                            : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-bl-none'
                      }`}
                    >
                      {msg.isError && <AlertCircle size={16} className="inline-block mr-2 -mt-0.5" />}
                      {renderFormattedMessage(msg.text || "")}
                    </div>
                  )}

                  {msg.type === 'appointment' && (
                    <div className="max-w-[85%] bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl rounded-bl-none p-4 shadow-sm">
                       <div className="flex items-center gap-2 mb-2 text-gray-900 dark:text-white font-semibold">
                          <Calendar className="text-primary" size={18} />
                          <span>Schedule a Meeting</span>
                       </div>
                       <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                          {msg.text}
                       </p>
                       <div className="space-y-2">
                         <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-2 bg-primary text-white text-sm font-medium rounded-xl hover:bg-blue-600 transition-colors">
                           <Clock size={16} /> Book via Calendly
                         </a>
                         <a href={`mailto:${EMAIL_ADDRESS}`} className="flex items-center justify-center gap-2 w-full py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm font-medium rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                           <Send size={16} /> Send Email Instead
                         </a>
                       </div>
                    </div>
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
              <div ref={messagesEndRef} className="h-1" />
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
                  placeholder="Ask for resume, booking, etc..."
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
              
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {["Book Appointment", "Resume", "Skills"].map((hint) => (
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