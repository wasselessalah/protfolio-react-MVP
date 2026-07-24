// src/components/sections/Experience.tsx
import { motion } from "framer-motion";
import { FiBriefcase, FiCalendar } from "react-icons/fi";
import { useExperiences } from "@/hooks/useExperiences";

const TYPE_CONFIG = {
  "Full-time":  { label: "Full-time",    color: "#3B82F6" },
  "Part-time":  { label: "Part-time",      color: "#8B5CF6" },
  "Freelance":  { label: "Freelance",    color: "#F59E0B" },
  "Internship": { label: "Internship",  color: "#22C55E" },
  "Contract":   { label: "Contract", color: "#06B6D4" },
};

export default function Experience() {
  const { data: experiences = [], isLoading } = useExperiences();

  if (isLoading) {
    return <div className="text-center py-20 text-[#64748B]">Loading experiences...</div>;
  }

  return (
    <section className="section-wrapper px-6 lg:px-10">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <div className="section-label"><FiBriefcase size={12} />Experience</div>
          <h2 className="section-title">
            My <span className="gradient-text-blue">Journey</span>
          </h2>
          <p className="section-subtitle mt-3">Professional experience and roles on a LinkedIn-style timeline.</p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="timeline-line ml-4" />

          <div className="space-y-6">
            {experiences.map((exp, i) => {
              const cfg = TYPE_CONFIG[exp.type] || { label: exp.type, color: "#3B82F6" };
              return (
                <motion.div
                  key={exp._id}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="flex gap-5"
                >
                  {/* Timeline dot */}
                  <div
                    className="timeline-dot mt-1 flex-shrink-0"
                    style={{
                      background: `${cfg.color}18`,
                      borderColor: `${cfg.color}50`,
                      width: 40,
                      height: 40,
                      fontSize: 18,
                    }}
                  >
                    💼
                  </div>

                  {/* Card */}
                  <div className="flex-1 glass-card p-5 mb-1">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-sm font-700 text-white">{exp.position}</h3>
                          {exp.current && (
                            <span className="badge badge-green text-[9px]">Current</span>
                          )}
                        </div>
                        <p className="text-sm text-[#64748B]">{exp.company}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span
                          className="text-[10px] font-700 px-2 py-0.5 rounded-full"
                          style={{ color: cfg.color, background: `${cfg.color}15`, border: `1px solid ${cfg.color}30` }}
                        >
                          {cfg.label}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-[#475569]">
                          <FiCalendar size={10} />
                          {new Date(exp.startDate).getFullYear()}{exp.endDate ? ` – ${new Date(exp.endDate).getFullYear()}` : exp.current ? " – Present" : ""}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-[#94A3B8] leading-relaxed mb-3">{exp.description}</p>

                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {exp.technologies.map((skill) => (
                          <span key={skill} className="tech-chip text-[10px]">{skill}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
