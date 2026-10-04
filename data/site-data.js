/* =========================================================
   SITE CONTENT — edit this file only to update text/links.
   No HTML editing needed for projects/services/skills.
   ========================================================= */

const SITE_DATA = {
  name: "Sahil Pathan",

  nav: [
    { label: "Home",     href: "index.html",    icon: "home" },
    { label: "About",    href: "about.html",    icon: "about" },
    { label: "Projects", href: "projects.html", icon: "projects" },
    { label: "Services", href: "services.html", icon: "services" },
    { label: "Contact",  href: "contact.html",  icon: "contact" }
  ],

  roles: [
    "Full-Stack Developer",
    "DevOps Engineer",
    "App Developer",
    "BCA Student"
  ],

  skills: [
    { name: "JavaScript / TypeScript", level: 85 },
    { name: "React / Next.js",         level: 80 },
    { name: "Node.js / Express",       level: 78 },
    { name: "Docker / CI-CD",          level: 72 },
    { name: "AWS / Linux Servers",     level: 68 },
    { name: "Flutter / Android",       level: 70 },
    { name: "MongoDB / SQL",           level: 75 }
  ],

  marquee: [
    "JavaScript", "React", "Node.js", "Docker", "MongoDB", "Flutter",
    "AWS", "CI/CD", "Linux", "Firebase", "Git", "GitHub Actions"
  ],

  timeline: [
    {
      date: "2023 — Present",
      title: "BCA Student (NEP / SEP Scheme)",
      desc: "Studying Software Engineering, Operating Systems, Computer Networks, Data Structures and Design & Analysis of Algorithms."
    },
    {
      date: "2024",
      title: "Started Full-Stack Development",
      desc: "Learned the MERN stack and began building complete web applications end to end."
    },
    {
      date: "2025",
      title: "Moved into App Development",
      desc: "Picked up Flutter and native Android basics to ship mobile apps alongside web projects."
    },
    {
      date: "2025",
      title: "Added DevOps to the toolkit",
      desc: "Learned Docker, CI/CD pipelines and Linux server management to deploy and run what I build, not just write it."
    },
    {
      date: "Ongoing",
      title: "Freelance & Personal Projects",
      desc: "Building, deploying and maintaining full-stack, mobile and DevOps projects, open to freelance and internship work."
    }
  ],

  services: [
    {
      title: "Web Development",
      desc: "Fast, responsive websites and web apps built with modern frameworks, clean code and thoughtful UI.",
      icon: "code"
    },
    {
      title: "App Development",
      desc: "Cross-platform mobile apps with Flutter, from prototype to a working store-ready build.",
      icon: "phone"
    },
    {
      title: "Backend & APIs",
      desc: "Secure REST APIs, databases and authentication systems that power your product.",
      icon: "server"
    },
    {
      title: "DevOps & Deployment",
      desc: "Dockerized apps, CI/CD pipelines and server setup so what you build ships reliably and stays up.",
      icon: "cloud"
    }
  ],

  // category must be one of: "web", "app", "fullstack", "devops"
  projects: [
    {
      title: "Hostel Management System",
      category: "fullstack",
      tags: ["Team Project", "Biometric Auth", "Real-Time Alerts"],
      desc: "Built with a 4-person team for our college: registration and login, warden/parent permission flows, biometric gate access, geofenced alerts, and a direct warden-student chat.",
      live: "#",
      code: "#"
    },
    {
      title: "Deploy Pipeline",
      category: "devops",
      tags: ["Docker", "GitHub Actions", "AWS EC2"],
      desc: "Automated CI/CD pipeline that builds, tests and deploys containerized apps to a cloud server on every push.",
      live: "#",
      code: "#"
    },
    {
      title: "SplitEase",
      category: "web",
      tags: ["React", "Node.js", "MongoDB"],
      desc: "Browser-based expense-splitting app for groups, with real-time balance calculation.",
      live: "#",
      code: "#"
    },
    {
      title: "LUXE AI",
      category: "fullstack",
      tags: ["Next.js", "OpenAI API", "Tailwind"],
      desc: "AI-powered resume analyzer that scores resumes and suggests improvements instantly.",
      live: "#",
      code: "#"
    },
    {
      title: "Apex Motorsport",
      category: "web",
      tags: ["HTML/CSS", "JavaScript"],
      desc: "Static encyclopedia site for hypercars with filterable specs and a clean gallery view.",
      live: "#",
      code: "#"
    },
    {
      title: "Campus Connect",
      category: "app",
      tags: ["Flutter", "Firebase"],
      desc: "Mobile app for BCA students to track timetables, assignments and exam schedules.",
      live: "#",
      code: "#"
    },
    {
      title: "TaskFlow API",
      category: "fullstack",
      tags: ["Express", "PostgreSQL", "Docker"],
      desc: "Secure task-management REST API with role-based auth and rate limiting.",
      live: "#",
      code: "#"
    },
    {
      title: "EventHub",
      category: "app",
      tags: ["Flutter", "Node.js"],
      desc: "Event registration and payment app built for a college tech fest.",
      live: "#",
      code: "#"
    }
  ],

  social: {
    github: "https://github.com/",
    linkedin: "https://linkedin.com/",
    instagram: "https://instagram.com/"
  },

  email: "sahil.pathan@example.com",
  location: "Based in India"
};
