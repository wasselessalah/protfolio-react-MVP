// src/components/sections/Skills.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiZap } from "react-icons/fi";
import { skillCategories } from "@/data/skills";
import type { Skill } from "@/data/skills";

const LEVEL_COLORS: Record<string, string> = {
  Beginner: "#64748B",
  Intermediate: "#F59E0B",
  Advanced: "#3B82F6",
  Expert: "#22C55E",
};

function ProgressRing({ percentage, color }: { percentage: number; color: string }) {
  const r = 22;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percentage / 100) * circ;

  return (
    <svg width="60" height="60" viewBox="0 0 60 60">
      <circle cx="30" cy="30" r={r} fill="none" stroke="rgba(59,130,246,0.08)" strokeWidth="4" />
      <motion.circle
        cx="30" cy="30" r={r}
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        whileInView={{ strokeDashoffset: offset }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
      />
      <text x="30" y="34" textAnchor="middle" fontSize="11" fontWeight="700" fill={color}>
        {percentage}%
      </text>
    </svg>
  );
}

function SkillCard({ skill }: { skill: Skill }) {
  const [hovered, setHovered] = useState(false);
  const levelColor = LEVEL_COLORS[skill.level];

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="glass-card p-4 cursor-default"
      style={{ borderColor: hovered ? `${skill.color}30` : "rgba(59,130,246,0.12)" }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl">{skill.icon}</span>
          <div>
            <p className="text-sm font-700 text-white">{skill.name}</p>
            <span
              className="text-[10px] font-700 px-1.5 py-0.5 rounded-full"
              style={{ color: levelColor, background: `${levelColor}18`, border: `1px solid ${levelColor}30` }}
            >
              {skill.level}
            </span>
          </div>
        </div>
        <ProgressRing percentage={skill.percentage} color={skill.color} />
      </div>

      {/* Bar */}
      <div className="skill-bar mb-2">
        <motion.div
          className="skill-bar-fill"
          style={{ background: `linear-gradient(90deg, ${skill.color}, ${skill.color}aa)` }}
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </div>

      {/* Meta */}
      <div className="flex items-center justify-between text-[10px] text-[#475569]">
        <span>{skill.years}yr{skill.years !== 1 ? "s" : ""} exp</span>
        <span>{skill.projects} projects</span>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("frontend");
  const active = skillCategories.find((c) => c.id === activeCategory)!;

  return (
    <section className="section-wrapper px-6 lg:px-10">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
          <div className="section-label"><FiZap size={12} />Skills Dashboard</div>
          <h2 className="section-title">
            My <span className="gradient-text-blue">Technology</span> Stack
          </h2>
          <p className="section-subtitle mt-3">
            An interactive dashboard of every technology in my arsenal.
          </p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-600 transition-all duration-200 ${
                activeCategory === cat.id
                  ? "text-white"
                  : "text-[#64748B] hover:text-[#94A3B8] bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.04)] border border-[rgba(59,130,246,0.08)]"
              }`}
              style={
                activeCategory === cat.id
                  ? { background: `${cat.color}20`, border: `1px solid ${cat.color}40`, color: cat.color }
                  : {}
              }
            >
              <span>{cat.icon}</span>
              {cat.category}
              <span
                className="text-[10px] font-700 px-1.5 py-0.5 rounded-full"
                style={
                  activeCategory === cat.id
                    ? { background: `${cat.color}30`, color: cat.color }
                    : { background: "rgba(59,130,246,0.08)", color: "#475569" }
                }
              >
                {cat.skills.length}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Category summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-card p-4 mb-6 flex items-center gap-4"
        >
          <span className="text-3xl">{active.icon}</span>
          <div>
            <p className="text-base font-700 text-white">{active.category}</p>
            <p className="text-sm text-[#64748B]">{active.skills.length} technologies · Avg {Math.round(active.skills.reduce((a, s) => a + s.percentage, 0) / active.skills.length)}% proficiency</p>
          </div>
          <div className="ml-auto flex gap-2">
            {active.skills.map((s) => (
              <div key={s.name} className="w-2 h-8 rounded-full" style={{ background: `${s.color}40` }}>
                <motion.div
                  className="w-full rounded-full"
                  style={{ background: s.color }}
                  initial={{ height: 0 }}
                  animate={{ height: `${s.percentage}%` }}
                  transition={{ duration: 0.8 }}
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Skill cards grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {active.skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.07 }}
              >
                <SkillCard skill={skill} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* All skills overview */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 glass-card p-6"
        >
          <p className="text-sm font-700 text-white mb-5">All Technologies at a Glance</p>
          <div className="flex flex-wrap gap-2">
            {skillCategories.flatMap((cat) =>
              cat.skills.map((s) => (
                <span
                  key={`${cat.id}-${s.name}`}
                  className="tech-chip hover:scale-105 transition-transform"
                  style={{ borderColor: `${s.color}30`, color: `${s.color}cc` }}
                >
                  {s.icon} {s.name}
                </span>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
