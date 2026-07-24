// src/components/sections/About.tsx
import { motion } from "framer-motion";
import {
  FiMapPin, FiGlobe, FiBook, FiTarget, FiAward, FiCheckCircle,
  FiCode, FiBriefcase, FiHeart, FiStar
} from "react-icons/fi";
import { information } from "@/data/information";

const goals = [
  { text: "Master Cloud & DevOps", done: false },
  { text: "Build impactful products with AI", done: false },
  { text: "Contribute to Open Source", done: false },
  { text: "Grow as a Software Engineer", done: false },
];

const interests = ["Clean Code", "System Design", "AI/ML", "Cloud Computing", "Open Source", "UI/UX", "Problem Solving"];

const languages = [
  { name: "Arabic", level: "Native", flag: "🇹🇳" },
  { name: "French", level: "Intermediate", flag: "🇫🇷" },
  { name: "English", level: "Professional", flag: "🇬🇧" },
];

const achievements = [
  { icon: FiCode, label: "15+ Projects", color: "#3B82F6" },
  { icon: FiBriefcase, label: "2+ Years Exp.", color: "#8B5CF6" },
  { icon: FiStar, label: "100% Commitment", color: "#F59E0B" },
  { icon: FiAward, label: "Top Performer", color: "#22C55E" },
];

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" } }),
};

export default function About() {
  const { personal, about } = information;

  return (
    <section className="section-wrapper px-6 lg:px-10">
      <div className="max-w-5xl mx-auto">

        {/* Section Label */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
          <div className="section-label"><FiBook size={12} />About Me</div>
          <h2 className="section-title">
            The <span className="gradient-text-blue">full story</span>
          </h2>
          <p className="section-subtitle mt-3">Everything about me — LinkedIn style.</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* LEFT COLUMN */}
          <div className="space-y-4">

            {/* Profile Completion */}
            <motion.div custom={0} variants={cardVariant} initial="hidden" whileInView="visible" viewport={{ once: true }} className="glass-card p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-700 text-white">Profile Strength</p>
                <span className="text-xs font-700 text-[#22C55E]">85%</span>
              </div>
              <div className="skill-bar">
                <motion.div
                  className="skill-bar-fill"
                  initial={{ width: 0 }}
                  whileInView={{ width: "85%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
              </div>
              <p className="text-xs text-[#475569] mt-2">Add a blog post to reach 100%</p>
            </motion.div>

            {/* Quick Info */}
            <motion.div custom={1} variants={cardVariant} initial="hidden" whileInView="visible" viewport={{ once: true }} className="glass-card p-5">
              <p className="text-xs font-700 uppercase tracking-widest text-[#334155] mb-4">Info</p>
              <div className="space-y-3">
                {[
                  { icon: FiMapPin, label: personal.location },
                  { icon: FiBook, label: "Computer Science" },
                  { icon: FiGlobe, label: "Available Worldwide" },
                  { icon: FiBriefcase, label: "Open for Internship" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2.5 text-sm text-[#94A3B8]">
                    <Icon size={14} className="text-[#3B82F6] flex-shrink-0" />
                    {label}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Languages */}
            <motion.div custom={2} variants={cardVariant} initial="hidden" whileInView="visible" viewport={{ once: true }} className="glass-card p-5">
              <p className="text-xs font-700 uppercase tracking-widest text-[#334155] mb-4">Languages</p>
              <div className="space-y-3">
                {languages.map((lang) => (
                  <div key={lang.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
                      <span>{lang.flag}</span>
                      {lang.name}
                    </div>
                    <span className="badge badge-blue text-[10px]">{lang.level}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div custom={3} variants={cardVariant} initial="hidden" whileInView="visible" viewport={{ once: true }} className="glass-card p-5">
              <p className="text-xs font-700 uppercase tracking-widest text-[#334155] mb-4">Achievements</p>
              <div className="grid grid-cols-2 gap-2">
                {achievements.map(({ icon: Icon, label, color }) => (
                  <div key={label} className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] text-center hover-lift cursor-default">
                    <Icon size={18} style={{ color }} />
                    <span className="text-xs text-[#94A3B8] leading-tight">{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN (x2 wide) */}
          <div className="lg:col-span-2 space-y-4">

            {/* Bio Card */}
            <motion.div custom={4} variants={cardVariant} initial="hidden" whileInView="visible" viewport={{ once: true }} className="glass-card p-6">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl overflow-hidden ring-2 ring-[rgba(59,130,246,0.3)]">
                  <img src={personal.avatars.studio} alt={personal.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-lg font-800 text-white">{personal.name}</h3>
                  <p className="gradient-text-blue text-sm font-600">{personal.title}</p>
                </div>
              </div>
              <div className="space-y-3">
                {about.description.map((para, i) => (
                  <p key={i} className="text-sm text-[#94A3B8] leading-relaxed">{para}</p>
                ))}
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3 mt-6 pt-5 border-t border-[rgba(59,130,246,0.1)]">
                {[
                  { label: "Experience", value: about.experience },
                  { label: "Projects", value: about.projects },
                  { label: "Technologies", value: `${about.technologies.length}+` },
                ].map(({ label, value }) => (
                  <div key={label} className="text-center">
                    <p className="text-xl font-800 gradient-text-blue">{value}</p>
                    <p className="text-xs text-[#475569] mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Interests */}
            <motion.div custom={5} variants={cardVariant} initial="hidden" whileInView="visible" viewport={{ once: true }} className="glass-card p-5">
              <div className="flex items-center gap-2 mb-4">
                <FiHeart size={14} className="text-[#EC4899]" />
                <p className="text-sm font-700 text-white">Interests &amp; Passions</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {interests.map((item) => (
                  <span key={item} className="badge badge-blue hover:scale-105 transition-transform cursor-default">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Goals */}
            <motion.div custom={6} variants={cardVariant} initial="hidden" whileInView="visible" viewport={{ once: true }} className="glass-card p-5">
              <div className="flex items-center gap-2 mb-4">
                <FiTarget size={14} className="text-[#3B82F6]" />
                <p className="text-sm font-700 text-white">Current Goals</p>
              </div>
              <div className="space-y-3">
                {goals.map(({ text, done }) => (
                  <div key={text} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${done ? "bg-[#22C55E]" : "border-2 border-[rgba(59,130,246,0.3)]"}`}>
                      {done && <FiCheckCircle size={12} className="text-white" />}
                    </div>
                    <span className={`text-sm ${done ? "line-through text-[#475569]" : "text-[#94A3B8]"}`}>{text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Tech Stack */}
            <motion.div custom={7} variants={cardVariant} initial="hidden" whileInView="visible" viewport={{ once: true }} className="glass-card p-5">
              <div className="flex items-center gap-2 mb-4">
                <FiCode size={14} className="text-[#8B5CF6]" />
                <p className="text-sm font-700 text-white">Technology Stack</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {about.technologies.map((tech) => (
                  <span key={tech} className="tech-chip hover:scale-105 transition-transform">{tech}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
