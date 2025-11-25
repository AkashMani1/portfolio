"use client";
import { motion } from "framer-motion";
import { portfolioData } from "@/app/data/portfolio";
import { Mail, Phone } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-[#0f0f0f]">
      <div className="container-custom max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Currently looking for internship opportunities. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info Card */}
            <div className="space-y-6">
                <div className="flex items-center p-4 bg-white dark:bg-card rounded-lg shadow-sm">
                    <div className="bg-primary/10 p-3 rounded-full mr-4 text-primary">
                        <Mail size={20} />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase font-bold">Email</p>
                        <a href={`mailto:${portfolioData.personalInfo.email}`} className="text-sm font-medium hover:text-primary">
                            {portfolioData.personalInfo.email}
                        </a>
                    </div>
                </div>
                
                <div className="flex items-center p-4 bg-white dark:bg-card rounded-lg shadow-sm">
                    <div className="bg-primary/10 p-3 rounded-full mr-4 text-primary">
                        <Phone size={20} />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase font-bold">Phone</p>
                        <p className="text-sm font-medium">{portfolioData.personalInfo.phone}</p>
                    </div>
                </div>
            </div>

            {/* Simple Form */}
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <input 
                    type="text" 
                    placeholder="Your Name" 
                    className="w-full p-3 rounded-lg bg-white dark:bg-card border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary outline-none transition"
                />
                <input 
                    type="email" 
                    placeholder="Your Email" 
                    className="w-full p-3 rounded-lg bg-white dark:bg-card border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary outline-none transition"
                />
                <textarea 
                    rows={4} 
                    placeholder="Message" 
                    className="w-full p-3 rounded-lg bg-white dark:bg-card border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary outline-none transition"
                ></textarea>
                <button className="w-full py-3 bg-primary text-white rounded-lg font-bold hover:bg-blue-600 transition">
                    Send Message
                </button>
            </form>
        </div>
      </div>
    </section>
  );
}