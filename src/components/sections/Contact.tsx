// src/components/sections/Contact.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMail, FiSend, FiMapPin, FiClock, FiGithub, FiLinkedin,
  FiTwitter, FiCheck, FiMessageCircle
} from "react-icons/fi";
import { useAbout } from "@/hooks/useAbout";
import { useSocials } from "@/hooks/useSocials";
import { useCreateMessage } from "@/hooks/useMessages";

const quickMessages = [
  "Hi Wassel! I'd love to discuss an internship opportunity.",
  "I'm interested in your freelance services.",
  "Let's collaborate on an open source project!",
  "Your portfolio impressed me, can we connect?",
];

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const { data: aboutData } = useAbout();
  const { data: socialsData = [] } = useSocials();
  const { mutateAsync: sendMessage, isPending: loading } = useCreateMessage();

  const avatar = aboutData?.avatar || "https://placehold.co/100x100";
  const authorName = aboutData?.name || "Wassel Essalah";
  const title = aboutData?.title || "Full Stack Developer";
  const location = aboutData?.location || "Sousse, Tunisia";
  const emailAddress = aboutData?.email || "wasselessalah@gmail.com";

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    
    try {
      await sendMessage({
        name,
        email,
        subject: "Portfolio Contact Form",
        message
      });
      setSent(true);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <section className="section-wrapper px-6 lg:px-10">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
          <div className="section-label"><FiMail size={12} />Contact</div>
          <h2 className="section-title">
            Send me a <span className="gradient-text-blue">Message</span>
          </h2>
          <p className="section-subtitle mt-3">
            Open to internships, freelance projects, and exciting opportunities.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6">

          {/* LEFT — Contact Card */}
          <div className="lg:col-span-2 space-y-4">

            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-5"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl overflow-hidden ring-2 ring-[rgba(59,130,246,0.3)]">
                    <img src={avatar} alt={authorName} className="w-full h-full object-cover" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 online-dot w-3 h-3" />
                </div>
                <div>
                  <p className="text-sm font-700 text-white">{authorName}</p>
                  <p className="text-xs text-[#64748B]">{title}</p>
                </div>
              </div>

              <div className="space-y-2.5 mb-4">
                {[
                  { icon: FiMail, text: emailAddress },
                  { icon: FiMapPin, text: location },
                  { icon: FiClock, text: "Response within 24 hours" },
                  { icon: FiMessageCircle, text: "Open to all opportunities" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2.5 text-xs text-[#94A3B8]">
                    <Icon size={13} className="text-[#3B82F6] flex-shrink-0" />
                    {text}
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2">
                {socialsData.filter(s => s.visible).map((social) => {
                  let Icon = FiLinkedin;
                  if (social.platform.toLowerCase() === 'github') Icon = FiGithub;
                  if (social.platform.toLowerCase() === 'twitter') Icon = FiTwitter;
                  return (
                    <a
                      key={social._id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-[#475569] hover:text-[#3B82F6] hover:bg-[rgba(59,130,246,0.08)] border border-[rgba(59,130,246,0.08)] transition-all"
                    >
                      <Icon size={14} />
                    </a>
                  );
                })}
              </div>
            </motion.div>

            {/* Availability Badge */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-card p-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="online-dot" />
                <p className="text-sm font-700 text-[#22C55E]">{aboutData?.availability === "Available" ? "Currently Available" : aboutData?.availability || "Available"}</p>
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Open to internship positions, freelance contracts, and full-time opportunities starting 2026.
              </p>
            </motion.div>

            {/* Quick messages */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-card p-4"
            >
              <p className="text-xs font-700 uppercase tracking-widest text-[#334155] mb-3">Quick Messages</p>
              <div className="space-y-2">
                {quickMessages.map((msg) => (
                  <button
                    key={msg}
                    onClick={() => setMessage(msg)}
                    className="w-full text-left text-xs text-[#64748B] hover:text-[#94A3B8] bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(59,130,246,0.05)] border border-[rgba(59,130,246,0.06)] hover:border-[rgba(59,130,246,0.15)] rounded-xl px-3 py-2.5 transition-all duration-200 line-clamp-1"
                  >
                    "{msg}"
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT — Messenger UI */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 glass-card overflow-hidden"
          >
            {/* Chat header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-[rgba(59,130,246,0.1)]">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl overflow-hidden">
                  <img src={avatar} alt={authorName} className="w-full h-full object-cover" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 online-dot w-3 h-3" />
              </div>
              <div>
                <p className="text-sm font-700 text-white">{authorName}</p>
                <p className="text-xs text-[#22C55E]">Active now</p>
              </div>
              <div className="ml-auto badge badge-green">Responding</div>
            </div>

            {/* Chat body */}
            <div className="p-5 space-y-3 min-h-[180px]">
              {/* Bot greeting */}
              <div className="flex items-end gap-2">
                <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0">
                  <img src={avatar} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="bg-[rgba(59,130,246,0.12)] border border-[rgba(59,130,246,0.2)] rounded-2xl rounded-bl-sm px-4 py-2.5 max-w-xs">
                  <p className="text-sm text-[#94A3B8]">Hey! 👋 I'm Wassel. Send me a message and I'll get back to you within 24 hours.</p>
                </div>
              </div>

              <AnimatePresence>
                {sent && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-end gap-2"
                  >
                    <div className="bg-[rgba(59,130,246,0.2)] border border-[rgba(59,130,246,0.3)] rounded-2xl rounded-br-sm px-4 py-2.5 max-w-xs">
                      <p className="text-sm text-[#94A3B8]">{message}</p>
                    </div>
                    <div className="flex items-end gap-2">
                      <div className="bg-[rgba(34,197,94,0.12)] border border-[rgba(34,197,94,0.2)] rounded-2xl rounded-bl-sm px-4 py-2.5">
                        <p className="text-sm text-[#94A3B8]">Message received! I'll be in touch soon. 🚀</p>
                      </div>
                      <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0">
                        <img src={avatar} alt="" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Form */}
            {!sent ? (
              <form onSubmit={handleSend} className="border-t border-[rgba(59,130,246,0.1)] p-5 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="messenger-input px-4 py-2.5 text-sm w-full"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="messenger-input px-4 py-2.5 text-sm w-full"
                    required
                  />
                </div>
                <textarea
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="messenger-input px-4 py-2.5 text-sm w-full resize-none"
                  required
                />
                <div className="flex justify-end">
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary flex items-center gap-2 px-6 py-2.5 text-sm disabled:opacity-60"
                  >
                    {loading ? (
                      <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
                    ) : (
                      <><FiSend size={14} /> Send Message</>
                    )}
                  </motion.button>
                </div>
              </form>
            ) : (
              <div className="border-t border-[rgba(59,130,246,0.1)] p-5 flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[rgba(34,197,94,0.15)] flex items-center justify-center">
                  <FiCheck size={18} className="text-[#22C55E]" />
                </div>
                <div>
                  <p className="text-sm font-700 text-white">Message sent!</p>
                  <p className="text-xs text-[#64748B]">I'll reply within 24 hours.</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
