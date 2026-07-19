import avatar from "@/assets/images/profile/avatar.png";

export const information = {
  personal: {
    name: "Wassel Essalah",

    role: "Full Stack Developer",

    title: "Building Modern Web Applications",

    subtitle:
      "I'm a passionate Full Stack Developer specializing in React, TypeScript, Node.js and modern web technologies.",

    avatar,

    location: "Sousse, Tunisia",

    availability: "Available for Freelance",

    resume: "/resume.pdf",

    buttons: {
      primary: {
        text: "View Projects",
        href: "/projects",
      },

      secondary: {
        text: "Contact Me",
        href: "/contact",
      },
    },

    social: {
      github: "https://github.com/yourusername",
      linkedin: "https://linkedin.com/in/yourusername",
      twitter: "https://twitter.com/yourusername",
    },
  },

  about: {
    title: "About Me",

    description: [
      "I'm a passionate Full Stack Developer who enjoys building modern web applications.",

      "I love React, TypeScript, Node.js, Express and Cloud technologies.",

      "I'm always learning new technologies and improving my software engineering skills.",
    ],

    experience: "2+ Years",

    projects: "15+ Projects",

    technologies: [
      "React",
      "TypeScript",
      "Next.js",
      "Node.js",
      "Express",
      "MongoDB",
      "PostgreSQL",
      "Tailwind CSS",
      "Docker",
      "Git",
    ],
  },
};