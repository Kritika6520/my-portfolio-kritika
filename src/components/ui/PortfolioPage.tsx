import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Cpu, 
  FolderGit2, 
  Mail, 
  ExternalLink, 
  Eye, 
  Sparkles, 
  ChevronRight, 
  Compass, 
  Github, 
  Linkedin,
  MessageSquare
} from 'lucide-react';

interface PortfolioProps {
  onEnter3dMode: () => void;
  gridColor: string;
}

export default function PortfolioPage({ onEnter3dMode, gridColor }: PortfolioProps) {
  const [activeTab, setActiveTab] = useState<'about' | 'skills' | 'projects' | 'contact'>('about');
  
  // Projects Dataset
  const projects = [
    {
      title: "ADAPTIVE LEARNING PLATFORM",
      category: "AI PROTOCOLS",
      desc: "An AI-powered prototype that adapts educational content based on students' unique learning styles.",
      tech: ["Python", "ML", "LLM Basics"],
      link: "#",
      glow: "rgba(0, 243, 255, 0.4)"
    },
    {
      title: "CAMPUS SYNC",
      category: "COLLEGE SYSTEMS",
      desc: "A college ecosystem platform for students and clubs, featuring event management and role-based dashboards.",
      tech: ["React.js", "REST APIs"],
      link: "#",
      glow: "rgba(57, 255, 20, 0.4)"
    },
    {
      title: "INTERACTIVE BOT",
      category: "CONVERSATIONAL INTEGRATION",
      desc: "Gives basic information by conversation.",
      tech: ["Python", "NLP"],
      link: "#",
      glow: "rgba(236, 72, 153, 0.4)"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
      className="absolute inset-0 z-50 bg-[#030712]/75 backdrop-blur-md overflow-y-auto overflow-x-hidden text-white font-sans scroll-smooth"
    >
      {/* Immersive Scanlines */}
      <div className="absolute inset-0 scanline-overlay pointer-events-none opacity-20 mix-blend-color-burn" />

      {/* Cybernetic Accent lines */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00f3ff]/40 to-transparent" />
      
      {/* 1. Header Section */}
      <header className="border-b border-cyan-500/20 bg-black/40 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-8 h-8 rounded border border-neon-blue/60 flex items-center justify-center bg-neon-blue/10 animate-pulse shadow-[0_0_10px_rgba(0,243,255,0.2)]">
                <Compass className="text-neon-blue w-4.5 h-4.5" />
              </div>
              <div className="absolute inset-0 rounded border border-neon-blue/20 scale-125 animate-ping opacity-30" />
            </div>
            <div>
              <div className="text-[9px] font-mono tracking-widest text-[#00f3ff] font-bold">KRITIKA_OS // COMPILER_ONLINE</div>
              <h1 className="font-mono text-sm tracking-wider font-bold uppercase text-white leading-none">
                KRITIKA PRABHU PENTA
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="flex items-center gap-5 font-mono text-[10px] sm:text-xs">
            {['about', 'skills', 'projects', 'contact'].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab as any);
                  const el = document.getElementById(tab);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`tracking-widest uppercase hover:text-neon-blue transition cursor-pointer font-bold relative py-1 px-1.5 ${
                  activeTab === tab ? 'text-[#00f3ff]' : 'text-slate-200'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div 
                    layoutId="active-underline" 
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-neon-blue shadow-[0_0_8px_#00f3ff]" 
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Epic Interactive Bypass CTA */}
          <button
            onClick={onEnter3dMode}
            className="flex items-center gap-2 px-3 py-1.5 bg-neon-blue/10 hover:bg-neon-blue/25 border border-neon-blue/50 rounded-md font-mono text-[10px] tracking-widest text-[#00f3ff] transition-all duration-300 shadow-[0_0_12px_rgba(0,243,255,0.15)] cursor-pointer hover:scale-105"
          >
            <Eye size={12} className="animate-pulse" />
            <span>ACTIVATE 3D CITY ORBIT</span>
          </button>

        </div>
      </header>

      {/* 2. Hero Interactive Space */}
      <section className="relative overflow-hidden pt-20 pb-16 px-4 border-b border-cyan-500/10">
        <div className="max-w-4xl mx-auto text-center relative z-10 w-full">
          
          {/* Cybernetic badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-black/60 border border-[#00f3ff]/35 rounded-full font-mono text-[9px] tracking-widest text-neon-blue mb-6 shadow-[0_0_15px_rgba(0,243,255,0.15)]"
          >
            <Sparkles size={10} className="animate-spin-slow text-neon-blue" />
            <span>PORTFOLIO TERMINAL // SECURE LINKED</span>
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-sans font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight leading-tight uppercase heading-shadow"
          >
            KRITIKA PRABHU PENTA
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-sm sm:text-base text-[#00f3ff] max-w-2xl mx-auto tracking-widest leading-relaxed font-mono font-bold uppercase transition duration-300"
          >
            BCA Student | Web Developer | AI & ML Enthusiast
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-8 flex flex-wrap justify-center gap-4"
          >
            <button
              onClick={() => {
                const el = document.getElementById('projects');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                setActiveTab('projects');
              }}
              className="px-6 py-3 bg-gradient-to-r from-neon-blue to-cyan-500 hover:from-cyan-400 hover:to-neon-blue text-black font-mono font-bold text-xs tracking-wider rounded-lg transition-transform cursor-pointer shadow-[0_0_20px_rgba(0,243,255,0.4)] flex items-center gap-2 hover:scale-105"
            >
              <span>EXPLORE EXPEDITION</span>
              <ChevronRight size={13} className="text-black font-bold" />
            </button>

            <button
              onClick={onEnter3dMode}
              className="px-6 py-3 bg-black/40 hover:bg-black/60 border border-cyan-500/30 hover:border-neon-blue/60 font-mono text-xs tracking-widest text-[#00f3ff] hover:text-white rounded-lg transition-all duration-350 cursor-pointer flex items-center gap-2 shadow-inner"
            >
              <Compass size={13} className="animate-spin-slow" />
              <span>MINIMIZE SHELL (3D FLYBY)</span>
            </button>
          </motion.div>

        </div>
      </section>

      {/* Main Core Columns */}
      <main className="max-w-7xl mx-auto p-6 md:p-12 flex flex-col gap-24">

        {/* 3. About Section */}
        <section id="about" className="scroll-mt-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            <div className="md:col-span-4 sticky top-28">
              <div className="flex items-center gap-2 mb-2 font-mono text-[9px] uppercase tracking-widest text-neon-blue">
                <User size={12} />
                <span>USER_METRICS // CORE</span>
              </div>
              <h3 className="font-mono text-xl sm:text-2xl font-bold tracking-widest uppercase">
                ABOUT ME
              </h3>
              <p className="mt-2 text-xs font-mono text-slate-350 font-medium leading-relaxed uppercase">
                BCA student specializing in Web Development and AI/ML fundamentals, with hands-on experience building interactive web applications, data analysis projects, and AI-based systems. Seeking a Web Development Internship to apply skills in full-stack development, UI/UX implementation, and intelligent system design while contributing to real-world projects.
              </p>
            </div>

            <div className="md:col-span-8 flex flex-col gap-6">
              
              {/* Profile Bio block (glowing glassmorphism node) */}
              <div className="bg-slate-950/75 backdrop-blur-md border border-cyan-500/30 rounded-xl p-6 sm:p-8 hover:border-cyan-400 transition-colors duration-500 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 p-1 bg-[#00f3ff]/10 text-[#00f3ff] font-mono text-[7px] border-b border-l border-cyan-500/30 tracking-widest uppercase rounded-bl">
                  VERIFIED PROTOCOLS
                </div>
                <h4 className="font-mono text-xs font-bold text-neon-blue uppercase tracking-widest mb-4">
                  Adaptive Systems Designer // Club Lead Node
                </h4>
                <div className="text-xs sm:text-sm text-gray-300 leading-relaxed space-y-4">
                  <p>
                    Second-year BCA student at KC College specializing in Web Development and AI/ML. Vice President of the BitCA v2.4 Club and Event Head for Fiestron. I build adaptive systems, interactive web applications, and thrive at the intersection of clean code and creative UI.
                  </p>
                </div>
              </div>

              {/* Quick Info Grid Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-slate-950/75 backdrop-blur-md border border-cyan-500/30 rounded-xl p-5">
                  <h5 className="font-mono text-xs text-[#00f3ff] tracking-widest uppercase mb-1 font-bold">CLUB DEPUTY NODES</h5>
                  <p className="text-xs text-white uppercase font-bold tracking-wide">VICE PRESIDENT // BitCA CLUB</p>
                  <p className="text-[10px] font-mono text-cyan-400 mt-1 uppercase font-semibold">Leading BitCA v2.4 Tech Synergy</p>
                </div>
                <div className="bg-slate-950/75 backdrop-blur-md border border-cyan-500/30 rounded-xl p-5">
                  <h5 className="font-mono text-xs text-[#00f3ff] tracking-widest uppercase mb-1 font-bold">EVENT COORDINATES</h5>
                  <p className="text-xs text-white uppercase font-bold tracking-wide">HACKATHON EVENT HEAD // FIESTRON</p>
                  <p className="text-[10px] font-mono text-cyan-400 mt-1 uppercase font-semibold">Directing premium tech challenges</p>
                </div>
                 <div className="bg-slate-950/75 backdrop-blur-md border border-cyan-500/30 rounded-xl p-5">
                  <h5 className="font-mono text-xs text-[#00f3ff] tracking-widest uppercase mb-1 font-bold">MARKETING CO-HEAD </h5>
                  <p className="text-xs text-white uppercase font-bold tracking-wide"> MARKETING & NEGOTIATIONS// KIRAN & SINDHIYAT JE VAASTE</p>
                  <p className="text-[10px] font-mono text-cyan-400 mt-1 uppercase font-semibold">Getting brands onboard for sponsorships</p>
                </div>
              </div>

            </div>

          </div>
        </section>


        {/* 4. Skills Section */}
        <section id="skills" className="scroll-mt-24 border-t border-cyan-500/10 pt-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            <div className="md:col-span-4 sticky top-28">
              <div className="flex items-center gap-2 mb-2 font-mono text-[9px] uppercase tracking-widest text-[#39ff14]">
                <Cpu size={12} className="text-[#39ff14]" />
                <span>TECH_STACK // ELECTRONIC</span>
              </div>
              <h3 className="font-mono text-xl sm:text-2xl font-bold tracking-widest uppercase">
                SKILLS & EXPERTISE
              </h3>
              <p className="mt-2 text-xs font-mono text-slate-350 font-medium leading-relaxed uppercase">
                Premium multi-layer stack frameworks, artificial neural datasets, and components interaction coordinates.
              </p>
            </div>

            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Web Dev Glowing tag glassmorphic block */}
              <div className="bg-slate-950/75 backdrop-blur-md border border-cyan-500/30 rounded-xl p-6 sm:p-8 hover:border-cyan-400 transition-colors duration-500">
                <h4 className="font-mono text-xs text-[#00f3ff] uppercase tracking-widest mb-4 font-bold flex items-center justify-between">
                  <span>// WEB DEVELOPMENT</span>
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {["React.js", "Next.js", "HTML5", "CSS3", "JavaScript (ES6+)", "Three.js (Basics)", "UI Component Design"].map((skill) => (
                    <span 
                      key={skill}
                      className="px-3 py-2 bg-cyan-500/10 hover:bg-cyan-500/25 text-[#00f3ff] border border-cyan-500/30 hover:border-[#00f3ff] rounded-lg font-mono text-[10px] uppercase tracking-wider transition-all duration-300 shadow-[0_0_12px_rgba(0,243,255,0.1)] block"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* AI & Data Glowing tag glassmorphic block */}
              <div className="bg-slate-950/75 backdrop-blur-md border border-cyan-500/30 rounded-xl p-6 sm:p-8 hover:border-green-400 transition-colors duration-500">
                <h4 className="font-mono text-xs text-[#39ff14] uppercase tracking-widest mb-4 font-bold flex items-center justify-between">
                  <span>// AI & DATA</span>
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {["Python", "Pandas", "Scikit-learn", "TensorFlow Basics", "NLP Basics", "EDA"].map((skill) => (
                    <span 
                      key={skill}
                      className="px-3 py-2 bg-green-500/10 hover:bg-green-500/25 text-[#39ff14] border border-green-500/30 hover:border-[#39ff14] rounded-lg font-mono text-[10px] uppercase tracking-wider transition-all duration-300 shadow-[0_0_12px_rgba(57,255,20,0.1)] block font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Tools Glowing tag glassmorphic block */}
              <div className="bg-slate-950/75 backdrop-blur-md border border-cyan-500/30 rounded-xl p-6 sm:p-8 hover:border-cyan-400 transition-colors duration-500 font-medium">
                <h4 className="font-mono text-xs text-[#00f3ff] uppercase tracking-widest mb-4 font-bold flex items-center justify-between">
                  <span>// TOOLS</span>
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {["VS Code", "Git & GitHub", "MySQL", "Jupyter Notebook", "Google Colab", "Anaconda", "Code::Blocks"].map((skill) => (
                    <span 
                      key={skill}
                      className="px-3 py-2 bg-cyan-500/10 hover:bg-cyan-500/25 text-[#00f3ff] border border-cyan-500/30 hover:border-[#00f3ff] rounded-lg font-mono text-[10px] uppercase tracking-wider transition-all duration-300 shadow-[0_0_12px_rgba(0,243,255,0.1)] block"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </section>


        {/* 5. Projects Section */}
        <section id="projects" className="scroll-mt-24 border-t border-cyan-500/10 pt-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            <div className="md:col-span-4 sticky top-28">
              <div className="flex items-center gap-2 mb-2 font-mono text-[9px] uppercase tracking-widest text-[#ec4899]">
                <FolderGit2 size={12} className="text-[#ec4899]" />
                <span>ARCHIVE // EXPEDITIONS</span>
              </div>
              <h3 className="font-mono text-xl sm:text-2xl font-bold tracking-widest uppercase">
                FEATURED LABS
              </h3>
              <p className="mt-2 text-xs font-mono text-slate-350 font-medium leading-relaxed uppercase">
                Explore custom built, highly functional responsive architectures and artificial intelligence modules.
              </p>
            </div>

            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">

              {projects.map((proj, idx) => (
                <div 
                  key={idx} 
                  className="bg-slate-950/75 backdrop-blur-md border border-cyan-500/30 hover:border-cyan-400 rounded-xl p-6 sm:p-8 relative overflow-hidden transition-all duration-300 hover:scale-[1.02] flex flex-col gap-4 shadow-xl shadow-[0_0_20px_rgba(0,243,255,0.05)] hover:bg-white/10"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <span className="font-mono text-[9px] text-[#00f3ff] tracking-widest uppercase px-2 py-0.5 bg-cyan-500/10 rounded border border-[#00f3ff]/40 font-bold">
                        {proj.category}
                      </span>
                      <h4 className="font-mono text-sm sm:text-base font-bold tracking-widest mt-2 uppercase text-white hover:text-neon-blue transition duration-300">
                        {proj.title}
                      </h4>
                    </div>
                    <button className="p-2 bg-slate-900 hover:bg-neon-blue/20 border border-white/10 hover:border-[#00f3ff] rounded text-gray-200 hover:text-white transition duration-300 cursor-pointer">
                      <ExternalLink size={13} />
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans font-medium">
                    {proj.desc}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.tech.map((t, tIdx) => (
                      <span key={tIdx} className="font-mono text-[9px] text-gray-300 px-2 py-0.5 bg-cyan-500/5 rounded border border-cyan-500/10">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}

            </div>

          </div>
        </section>


        {/* 6. Contact Section */}
        <section id="contact" className="scroll-mt-24 border-t border-cyan-500/10 pt-16 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            <div className="md:col-span-4 sticky top-28">
              <div className="flex items-center gap-2 mb-2 font-mono text-[9px] uppercase tracking-widest text-[#f59e0b]">
                <Mail size={12} className="text-[#f59e0b]" />
                <span>BROADCAST // CHANNELS</span>
              </div>
              <h3 className="font-mono text-xl sm:text-2xl font-bold tracking-widest uppercase">
                CONTACT ME
              </h3>
              <p className="mt-2 text-xs font-mono text-slate-350 font-medium leading-relaxed uppercase">
                Explore channels and get in touch with me directly. Let's form epic coordinates!
              </p>
              
              <div className="mt-8 flex flex-col gap-4 font-mono text-xs text-slate-300">
                <a href="mailto:kritikapenta15@gmail.com" className="flex items-center gap-2 hover:text-[#00f3ff] transition group font-bold">
                  <Mail size={13} className="text-neon-blue group-hover:scale-110 transition-transform" />
                  <span>kritikapenta15@gmail.com</span>
                </a>
                <div className="flex gap-3 mt-2 pr-4 text-slate-350">
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-900 hover:bg-neon-blue/15 border border-white/10 hover:border-cyan-400 rounded text-slate-200 hover:text-white transition cursor-pointer">
                    <Github size={14} />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-900 hover:bg-neon-blue/15 border border-white/10 hover:border-cyan-400 rounded text-slate-200 hover:text-white transition cursor-pointer">
                    <Linkedin size={14} />
                  </a>
                </div>
              </div>
            </div>

            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-5">
              
              {/* Email Button/Card */}
              <a 
                href="mailto:kritikapenta15@gmail.com"
                className="bg-slate-950/75 backdrop-blur-md border border-cyan-500/30 hover:border-cyan-400 rounded-xl p-6 sm:p-8 flex flex-col items-center justify-center text-center gap-4 transition-all duration-300 hover:scale-[1.03] hover:bg-slate-950/90 hover:shadow-[0_0_20px_rgba(0,243,255,0.4)] group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-[#00f3ff] group-hover:bg-cyan-500/20 group-hover:border-[#00f3ff] transition-colors duration-300 shadow-[0_0_15px_rgba(0,243,255,0.15)]">
                  <Mail size={20} className="animate-pulse" />
                </div>
                <div>
                  <h4 className="font-mono text-xs font-bold text-[#00f3ff] uppercase tracking-widest">
                    EMAIL CHANNEL
                  </h4>
                  <p className="text-[10px] sm:text-xs text-gray-400 mt-1 uppercase tracking-wider block break-all font-mono">
                    kritikapenta15@gmail.com
                  </p>
                </div>
              </a>

              {/* LinkedIn Button/Card */}
              <a 
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-950/75 backdrop-blur-md border border-cyan-500/30 hover:border-cyan-400 rounded-xl p-6 sm:p-8 flex flex-col items-center justify-center text-center gap-4 transition-all duration-300 hover:scale-[1.03] hover:bg-slate-950/90 hover:shadow-[0_0_20px_rgba(0,243,255,0.4)] group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-[#00f3ff] group-hover:bg-cyan-500/20 group-hover:border-[#00f3ff] transition-colors duration-300 shadow-[0_0_15px_rgba(0,243,255,0.15)]">
                  <Linkedin size={20} />
                </div>
                <div>
                  <h4 className="font-mono text-xs font-bold text-[#00f3ff] uppercase tracking-widest">
                    LINKEDIN PORTAL
                  </h4>
                  <p className="text-[10px] sm:text-xs text-[#00f3ff] mt-1 uppercase tracking-wider block font-mono font-semibold">
                    Connect Professionally
                  </p>
                </div>
              </a>

              {/* GitHub Button/Card */}
              <a 
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-950/75 backdrop-blur-md border border-cyan-500/30 hover:border-cyan-400 rounded-xl p-6 sm:p-8 flex flex-col items-center justify-center text-center gap-4 transition-all duration-300 hover:scale-[1.03] hover:bg-slate-950/90 hover:shadow-[0_0_20px_rgba(0,243,255,0.4)] group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-[#00f3ff] group-hover:bg-cyan-500/20 group-hover:border-[#00f3ff] transition-colors duration-300 shadow-[0_0_15px_rgba(0,243,255,0.15)]">
                  <Github size={20} />
                </div>
                <div>
                  <h4 className="font-mono text-xs font-bold text-[#00f3ff] uppercase tracking-widest">
                    GITHUB CORE
                  </h4>
                  <p className="text-[10px] sm:text-xs text-[#00f3ff] mt-1 uppercase tracking-wider block font-mono font-semibold">
                    Explore Code Labs
                  </p>
                </div>
              </a>

            </div>

          </div>
        </section>

      </main>

      {/* Footer copyright */}
      <footer className="border-t border-cyan-500/10 py-8 text-center bg-black/60 backdrop-blur-md">
        <p className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">
          COPYRIGHT © {new Date().getFullYear()} KRITIKA PENTA // ACADEMY COORDINATES
        </p>
      </footer>

    </motion.div>
  );
}
