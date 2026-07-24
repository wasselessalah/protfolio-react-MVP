// src/components/layout/Footer.tsx
import { FiGithub, FiLinkedin, FiTwitter, FiHeart } from "react-icons/fi";
import { useAbout } from "@/hooks/useAbout";
import { useSocials } from "@/hooks/useSocials";

export default function Footer() {
  const { data: aboutData } = useAbout();
  const { data: socialsData = [] } = useSocials();
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-[rgba(59,130,246,0.1)] py-8 px-6">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-[#334155] text-sm">
          <span>Made with</span>
          <FiHeart size={14} className="text-[#EF4444] fill-[#EF4444]" />
          <span>by</span>
          <span className="gradient-text-blue font-600">{aboutData?.name || "Wassel Essalah"}</span>
          <span>© {year}</span>
        </div>

        <div className="flex items-center gap-3">
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
                aria-label={social.platform}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[#334155] hover:text-[#3B82F6] hover:bg-[rgba(59,130,246,0.08)] transition-all duration-200"
              >
                <Icon size={16} />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}