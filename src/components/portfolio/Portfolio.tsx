import { useEffect, useRef, useState } from "react";
import {
  Menu, X, Download, Mail, Github, Linkedin, Instagram, ArrowUp,
  Code2, Database, Cloud, Server, Wrench, Layers,
  Briefcase, Rocket, Sparkles, MapPin, Phone, Send, ExternalLink,
  Bot, Globe, Workflow, ShieldCheck, LineChart, Container,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import profilePic from "@/assets/images/profile_pic_website.png";


/* ---------------- Data ---------------- */

const NAV = [
  ["Home", "home"], ["About", "about"], ["Skills", "skills"], ["Experience", "experience"],
  ["Projects", "projects"], ["Services", "services"], ["Clients", "clients"], ["Testimonials", "testimonials"], ["Contact", "contact"],
] as const;

const ROLES = ["Python Full Stack Developer", "AI & RAG Specialist", "Backend Architect", "Cloud & DevOps Expert"];

const STATS = [
  { label: "Years Experience", value: 3, suffix: "+" },
  { label: "Projects Completed", value: 15, suffix: "+" },
  { label: "Lines of Code", value: 100, suffix: "K+" },
  { label: "Technologies", value: 25, suffix: "+" },
];

const SKILL_GROUPS = [
  { icon: Server, title: "Backend", skills: [["Python", 95], ["Django / DRF", 95], ["FastAPI", 90], ["Flask", 85], ["Celery / Redis", 88]] },
  { icon: Code2, title: "Frontend", skills: [["React.js", 85], ["JavaScript", 90], ["HTML5 / CSS3", 95], ["Bootstrap", 90]] },
  { icon: Bot, title: "Generative AI", skills: [["RAG Systems", 85], ["Vector DBs", 80], ["Prompt Engineering", 90], ["OpenAI API", 92]] },
  { icon: Database, title: "Databases", skills: [["PostgreSQL", 90], ["MySQL / SQLite", 85], ["MongoDB", 80]] },
  { icon: Cloud, title: "Cloud & DevOps", skills: [["AWS (EC2, ECS, S3)", 85], ["Docker", 88], ["Nginx / Gunicorn", 85], ["Git / GitHub", 95]] },
  { icon: Wrench, title: "Others", skills: [["RESTful APIs", 95], ["Microservices", 85], ["WebSockets", 80], ["System Design", 82]] },
] as const;

const EXPERIENCE = [
  {
    role: "Software Developer", company: "Cyber Infrastructure (P) Ltd", time: "Feb 2023 - Present",
    points: ["Developing scalable backend services using Python, Django, DRF, and FastAPI.", "Implementing microservices architectures and RESTful APIs for web/mobile apps.", "Building secure auth systems with JWT, OAuth2, and RBAC.", "Managing async task processing with Celery and Redis.", "Optimizing PostgreSQL schemas and queries for high performance."],
  },
  {
    role: "Bachelor of Technology (CSE)", company: "RGPV, Bhopal", time: "2019 — 2023",
    points: ["Specialized in Computer Science and Engineering.", "Focused on Software Development, Data Structures, and Algorithms.", "Built foundations in Python and web technologies."],
  },
];

const PROJECTS = [
  { title: "Hands-Free Trading", desc: "Algorithmic trading platform with microservices, secure authentication and real-time execution.", tech: ["Django", "React", "AWS", "Kafka", "Docker"] },
  { title: "United Instantly", desc: "Real-time human connection platform with instant matching and location tracking.", tech: ["Django", "WebSockets", "AWS", "PostGIS", "Redis"] },
  { title: "Starlight (AI Quiz)", desc: "RAG-based AI chatbot using OpenAI APIs, embeddings, and vector search for quiz management.", tech: ["Python", "OpenAI", "RAG", "PostgreSQL", "Docker"] },
];

const SERVICES = [
  { icon: Code2, title: "Full Stack Development", desc: "End-to-end web apps from architecture to deployment using React and Django." },
  { icon: Server, title: "Backend Systems", desc: "Scalable APIs and microservices in Python, Django, FastAPI." },
  { icon: Bot, title: "AI & RAG Solutions", desc: "LLM applications, RAG pipelines and intelligent AI integrations." },
  { icon: Cloud, title: "Cloud & DevOps", desc: "AWS infrastructure (EC2, ECS, S3), Docker, and Nginx deployment." },
  { icon: Workflow, title: "Automation", desc: "Async task processing using Celery, Redis, and Kafka." },
  { icon: Database, title: "Database Architecture", desc: "PostgreSQL optimization, query tuning, and schema design." },
];

const TESTIMONIALS = [
  { name: "Alex Johnson", role: "CTO, Nimbus Labs", text: "Delivered our platform ahead of schedule with rock-solid architecture. A true engineering partner." },
  { name: "Priya Sharma", role: "Founder, Datalytic", text: "Their data pipelines transformed our analytics. Clean code, clear thinking, exceptional results." },
  { name: "Marco Rossi", role: "Product Lead, Finstack", text: "From design to deployment, every detail was considered. Communication was outstanding." },
  { name: "Sara Lee", role: "VP Engineering, ShopGrid", text: "One of the best full-stack developers we've worked with. Reliable, fast and thoughtful." },
];

/* ---------------- Hooks ---------------- */

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useTypewriter(words: string[], speed = 90, pause = 1400) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = words[i % words.length];
    const t = setTimeout(() => {
      if (!del) {
        const next = word.slice(0, text.length + 1);
        setText(next);
        if (next === word) setTimeout(() => setDel(true), pause);
      } else {
        const next = word.slice(0, text.length - 1);
        setText(next);
        if (next === "") { setDel(false); setI((v) => v + 1); }
      }
    }, del ? speed / 2 : speed);
    return () => clearTimeout(t);
  }, [text, del, i, words, speed, pause]);
  return text;
}

function useCounter(target: number, start: boolean, duration = 1500) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0; const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      setV(Math.floor(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);
  return v;
}

/* ---------------- Pieces ---------------- */

function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-transparent">
      <div className="h-full origin-left bg-gradient-to-r from-primary to-[color:var(--primary-glow)] transition-[width] duration-100" style={{ width: `${p}%` }} />
    </div>
  );
}

function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let rx = 0, ry = 0, x = 0, y = 0;
    const move = (e: MouseEvent) => { x = e.clientX; y = e.clientY; if (dot.current) dot.current.style.transform = `translate3d(${x - 4}px,${y - 4}px,0)`; };
    const loop = () => {
      rx += (x - rx) * 0.18; ry += (y - ry) * 0.18;
      if (ring.current) ring.current.style.transform = `translate3d(${rx - 18}px,${ry - 18}px,0)`;
      requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", move);
    const id = requestAnimationFrame(loop);
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(id); };
  }, []);
  return (<><div ref={ring} className="cursor-ring" /><div ref={dot} className="cursor-dot" /></>);
}

function Loader({ done }: { done: boolean }) {
  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-700 ${done ? "pointer-events-none opacity-0" : "opacity-100"}`}>
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 animate-spin-slow rounded-full border-2 border-primary/30 border-t-primary" />
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-primary to-[color:var(--primary-glow)]" />
        </div>
        <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground">LOADING PORTFOLIO</p>
      </div>
    </div>
  );
}

function BackgroundFX() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-32 -left-32 h-96 w-96 animate-blob bg-primary/20 blur-3xl" />
      <div className="absolute top-1/3 -right-40 h-[28rem] w-[28rem] animate-blob bg-[color:var(--primary-glow)]/15 blur-3xl" style={{ animationDelay: "3s" }} />
      <div className="absolute bottom-0 left-1/3 h-96 w-96 animate-blob bg-primary/10 blur-3xl" style={{ animationDelay: "6s" }} />
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
    </div>
  );
}

function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: React.ReactNode; children: React.ReactNode }) {
  return (
    <section id={id} className="relative scroll-mt-24 px-6 py-24 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="reveal mb-14 flex flex-col items-center text-center">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
            <Sparkles className="h-3 w-3" /> {eyebrow}
          </span>
          <h2 className="text-4xl font-bold sm:text-5xl">{title}</h2>
          <div className="mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-primary to-transparent" />
        </div>
        {children}
      </div>
    </section>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const go = (id: string) => { setOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "border-b border-border bg-background/80 backdrop-blur-xl" : "bg-transparent"}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <a href="#home" onClick={(e) => { e.preventDefault(); go("home"); }} className="group flex items-center gap-2 font-display text-xl font-bold">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-[color:var(--primary-glow)] text-primary-foreground shadow-glow">AP</span>
          <span className="hidden sm:inline">Anurag<span className="text-primary">Prajapati</span></span>
        </a>
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV.map(([label, id]) => (
            <li key={id}>
              <button onClick={() => go(id)} className="relative rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
                <span className="story-link">{label}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="hidden lg:block">
          <Button onClick={() => go("contact")} className="rounded-full bg-gradient-to-r from-primary to-[color:var(--primary-glow)] text-primary-foreground shadow-glow hover:opacity-90">
            Hire Me
          </Button>
        </div>
        <button className="rounded-md border border-border bg-surface p-2 lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl lg:hidden">
          <ul className="mx-auto max-w-7xl px-6 py-4">
            {NAV.map(([label, id]) => (
              <li key={id}>
                <button onClick={() => go(id)} className="block w-full rounded-md px-3 py-3 text-left text-sm hover:bg-accent">{label}</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

function Hero() {
  const typed = useTypewriter(ROLES);
  return (
    <section id="home" className="relative flex min-h-screen items-center px-6 pt-28 md:px-10">
      <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
        <div className="reveal order-2 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs text-primary">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-primary" /></span>
            Available for new projects
          </span>
          <h1 className="mt-6 text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
            Hi, I'm <span className="text-gradient">Anurag Prajapati</span>
          </h1>
          <p className="mt-5 font-mono text-lg text-primary caret">{typed || "\u00A0"}</p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Building scalable, secure and modern digital products with clean architecture and exceptional user experiences.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <Button size="lg" className="rounded-full bg-gradient-to-r from-primary to-[color:var(--primary-glow)] text-primary-foreground shadow-glow hover:opacity-90">
              <Download className="mr-2 h-4 w-4" /> Download Resume
            </Button>
            <Button size="lg" variant="outline" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} className="rounded-full border-primary/40 bg-transparent hover:bg-primary/10 hover:text-primary">
              <Mail className="mr-2 h-4 w-4" /> Contact Me
            </Button>
          </div>
          <div className="mt-8 flex items-center justify-center gap-3 lg:justify-start">
            {[Linkedin, Github, Mail, Instagram].map((Icon, i) => (
              <a key={i} href="#" aria-label="social" className="grid h-11 w-11 place-items-center rounded-full border border-border bg-surface text-muted-foreground transition-all hover:-translate-y-1 hover:border-primary/50 hover:text-primary hover:shadow-glow">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div className="reveal order-1 flex justify-center lg:order-2">
          <div className="relative h-64 w-64 sm:h-80 lg:h-96 lg:w-96">
            <div className="absolute inset-0 animate-spin-slow rounded-full border-2 border-dashed border-primary/40" />
            <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-primary/30 via-transparent to-[color:var(--primary-glow)]/30 blur-2xl" />
            <div className="absolute inset-4 overflow-hidden rounded-full border border-border bg-gradient-to-br from-surface to-background shadow-glow">
              <img
                src={profilePic}
                alt="Anurag Prajapati"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -right-2 top-8 animate-float rounded-2xl border border-border glass px-2 py-1 text-[10px] font-mono sm:-right-4 sm:top-10 sm:px-3 sm:py-2 sm:text-xs">
              <span className="text-primary">{`</>`}</span> Python
            </div>
            <div className="absolute -left-4 bottom-12 animate-float rounded-2xl border border-border glass px-2 py-1 text-[10px] font-mono sm:-left-6 sm:bottom-16 sm:px-3 sm:py-2 sm:text-xs" style={{ animationDelay: "1.5s" }}>
              <Cloud className="mr-1 inline h-3 w-3 text-primary" /> AWS
            </div>
            <div className="absolute bottom-[-10px] right-2 animate-float rounded-2xl border border-border glass px-2 py-1 text-[10px] font-mono sm:bottom-0 sm:right-4 sm:px-3 sm:py-2 sm:text-xs" style={{ animationDelay: "0.8s" }}>
              <Container className="mr-1 inline h-3 w-3 text-primary" /> Docker
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ s, idx }: { s: typeof STATS[number]; idx: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setVis(true), { threshold: 0.4 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  const v = useCounter(s.value, vis);
  return (
    <div ref={ref} className="reveal rounded-2xl border border-border glass p-6 text-center transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow" style={{ animationDelay: `${idx * 80}ms` }}>
      <p className="text-4xl font-bold text-gradient">{v}{s.suffix}</p>
      <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
    </div>
  );
}

function About() {
  const groups = [
    ["Backend", ["Python", "Django", "DRF", "FastAPI", "Flask"]],
    ["Frontend", ["React.js", "Angular", "TypeScript", "JavaScript", "HTML5", "CSS3"]],
    ["Cloud & DevOps", ["AWS", "Docker", "Kubernetes", "CI/CD"]],
    ["Databases", ["PostgreSQL", "MySQL", "MongoDB", "Redis"]],
    ["Data Engineering", ["PySpark", "Databricks", "Airflow", "ETL"]],
    ["Other", ["REST", "GraphQL", "Microservices", "System Design", "GIS", "AI"]],
  ] as const;
  return (
    <Section id="about" eyebrow="About Me" title={<>The <span className="text-gradient">Engineer</span> Behind The Code</>}>
      <div className="grid gap-10 lg:grid-cols-5">
        <div className="reveal lg:col-span-2">
          <div className="relative mx-auto max-w-[280px] overflow-hidden rounded-3xl border border-border glass p-1 lg:max-w-none">
            <div className="aspect-[4/5] overflow-hidden rounded-[22px] bg-gradient-to-br from-primary/15 via-surface to-background">
              <img
                src={profilePic}
                alt="About Anurag"
                className="h-full w-full object-cover object-top"
              />
            </div>
          </div>
        </div>
        <div className="reveal lg:col-span-3">
          <h3 className="text-2xl font-semibold">Full Stack Developer & AI Enthusiast</h3>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            I'm a Python Full Stack Developer with 3+ years of experience building scalable applications.
            I specialize in Django, FastAPI, and RAG-based AI systems, delivering production-ready
            microservices and cloud-based solutions on AWS.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {groups.map(([title, items]) => (
              <div key={title} className="rounded-2xl border border-border bg-surface/60 p-4">
                <p className="mb-2 text-sm font-semibold text-primary">{title}</p>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((t) => (
                    <span key={t} className="rounded-md bg-background px-2 py-1 font-mono text-[11px] text-muted-foreground">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {STATS.map((s, i) => <StatCard key={s.label} s={s} idx={i} />)}
          </div>
        </div>
      </div>
    </Section>
  );
}

function SkillBar({ name, value, delay }: { name: string; value: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setVis(true), { threshold: 0.3 });
    io.observe(ref.current); return () => io.disconnect();
  }, []);
  return (
    <div ref={ref}>
      <div className="mb-1 flex justify-between text-sm">
        <span className="text-foreground">{name}</span>
        <span className="font-mono text-primary">{value}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-background">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary to-[color:var(--primary-glow)] transition-[width] duration-1000 ease-out"
          style={{ width: vis ? `${value}%` : "0%", transitionDelay: `${delay}ms` }}
        />
      </div>
    </div>
  );
}

function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title={<>My <span className="text-gradient">Technical</span> Toolkit</>}>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {SKILL_GROUPS.map(({ icon: Icon, title, skills }) => (
          <div key={title} className="reveal group rounded-3xl border border-border glass p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow">
            <div className="mb-5 flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/15 text-primary transition-transform group-hover:scale-110">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="text-lg font-semibold">{title}</h3>
            </div>
            <div className="space-y-4">
              {skills.map(([n, v], i) => <SkillBar key={n as string} name={n as string} value={v as number} delay={i * 100} />)}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title={<>Career <span className="text-gradient">Timeline</span></>}>
      <div className="relative mx-auto max-w-4xl">
        <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-primary/60 via-border to-transparent md:left-1/2" />
        <div className="space-y-12">
          {EXPERIENCE.map((e, i) => (
            <div key={e.role} className={`reveal relative grid gap-6 md:grid-cols-2 md:gap-12 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
              <div className={`pl-12 md:pl-0 ${i % 2 ? "md:pl-12 md:text-left" : "md:pr-12 md:text-right"}`}>
                <div className="rounded-2xl border border-border glass p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow">
                  <p className="font-mono text-xs uppercase tracking-widest text-primary">{e.time}</p>
                  <h3 className="mt-2 text-xl font-semibold">{e.role}</h3>
                  <p className="text-sm text-muted-foreground">{e.company}</p>
                  <ul className={`mt-3 space-y-1.5 text-sm text-muted-foreground ${i % 2 ? "md:text-left" : "md:text-right"}`}>
                    {e.points.map((p) => <li key={p}>• {p}</li>)}
                  </ul>
                </div>
              </div>
              <div className="hidden md:block" />
              <span className="absolute left-4 top-6 grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full border-4 border-background bg-gradient-to-br from-primary to-[color:var(--primary-glow)] text-primary-foreground md:left-1/2">
                <Briefcase className="h-4 w-4" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Projects() {
  return (
    <Section id="projects" eyebrow="Projects" title={<>Featured <span className="text-gradient">Work</span></>}>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p, i) => (
          <article key={p.title} className="reveal group relative overflow-hidden rounded-3xl border border-border glass transition-all hover:-translate-y-2 hover:border-primary/50 hover:shadow-glow" style={{ animationDelay: `${i * 60}ms` }}>
            <div className="relative aspect-[16/10] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-surface to-background transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 grid place-items-center text-muted-foreground">
                <div className="text-center">
                  <Rocket className="mx-auto h-10 w-10 text-primary/70" />
                  <p className="mt-2 font-mono text-xs">Project image</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.tech.map((t) => (
                  <span key={t} className="rounded-md bg-primary/10 px-2 py-1 font-mono text-[11px] text-primary">{t}</span>
                ))}
              </div>
              <div className="mt-5 flex gap-2">
                <Button size="sm" className="flex-1 rounded-full bg-gradient-to-r from-primary to-[color:var(--primary-glow)] text-primary-foreground hover:opacity-90">
                  <ExternalLink className="mr-1.5 h-3.5 w-3.5" /> Live
                </Button>
                <Button size="sm" variant="outline" className="flex-1 rounded-full border-border bg-transparent hover:bg-primary/10 hover:text-primary">
                  <Github className="mr-1.5 h-3.5 w-3.5" /> Code
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

function Services() {
  return (
    <Section id="services" eyebrow="Services" title={<>What I <span className="text-gradient">Offer</span></>}>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map(({ icon: Icon, title, desc }, i) => (
          <div key={title} className="reveal group relative overflow-hidden rounded-2xl border border-border glass p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow" style={{ animationDelay: `${i * 50}ms` }}>
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl transition-all group-hover:bg-primary/20" />
            <span className="relative mb-4 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-[color:var(--primary-glow)]/10 text-primary transition-transform group-hover:scale-110 group-hover:rotate-6">
              <Icon className="h-6 w-6" />
            </span>
            <h3 className="relative text-base font-semibold">{title}</h3>
            <p className="relative mt-2 text-sm text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Clients() {
  const clients = Array.from({ length: 10 }, (_, i) => `Client ${i + 1}`);
  const loop = [...clients, ...clients];
  return (
    <Section id="clients" eyebrow="Clients" title={<>Trusted By <span className="text-gradient">Great Teams</span></>}>
      <div className="reveal relative overflow-hidden rounded-3xl border border-border glass py-8">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        <div className="flex w-max animate-marquee gap-8 px-8">
          {loop.map((c, i) => (
            <div key={i} className="grid h-20 w-44 shrink-0 place-items-center rounded-xl border border-border bg-surface/60 font-mono text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary">
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" />{c}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Testimonials() {
  return (
    <Section id="testimonials" eyebrow="Testimonials" title={<>What Clients <span className="text-gradient">Say</span></>}>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <div key={t.name} className="reveal rounded-3xl border border-border glass p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow" style={{ animationDelay: `${i * 60}ms` }}>
            <div className="mb-4 text-4xl leading-none text-primary/60">"</div>
            <p className="text-sm leading-relaxed text-muted-foreground">{t.text}</p>
            <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-primary/30 to-[color:var(--primary-glow)]/20 font-semibold text-primary">
                {t.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function FloatingInput({ id, type = "text", label, value, onChange, required, as }: { id: string; type?: string; label: string; value: string; onChange: (v: string) => void; required?: boolean; as?: "textarea" }) {
  const Cmp: any = as === "textarea" ? Textarea : Input;
  return (
    <div className="relative">
      <Cmp
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(e: any) => onChange(e.target.value)}
        placeholder=" "
        className="peer h-14 rounded-xl border-border bg-surface/60 px-4 pt-5 text-foreground placeholder-transparent focus-visible:ring-primary"
        {...(as === "textarea" ? { rows: 4, className: "peer min-h-32 rounded-xl border-border bg-surface/60 px-4 pt-6 text-foreground placeholder-transparent focus-visible:ring-primary" } : {})}
      />
      <label htmlFor={id} className="pointer-events-none absolute left-4 top-2 text-[11px] uppercase tracking-wider text-muted-foreground transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-focus:top-2 peer-focus:text-[11px] peer-focus:uppercase peer-focus:text-primary">
        {label}
      </label>
    </div>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in the required fields.");
      return;
    }
    toast.success("Message sent! I'll get back to you shortly.");
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };
  return (
    <Section id="contact" eyebrow="Contact" title={<>Let's <span className="text-gradient">Build</span> Together</>}>
      <div className="grid gap-8 lg:grid-cols-5">
        <div className="reveal space-y-4 lg:col-span-2">
          {[
            { icon: Mail, label: "Email", value: "anurag.prajapatiktn@gmail.com" },
            { icon: Phone, label: "Phone", value: "+91 7049596472" },
            { icon: MapPin, label: "Location", value: "Indore, India" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-4 rounded-2xl border border-border glass p-5 transition-all hover:-translate-y-1 hover:border-primary/40">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/15 text-primary"><Icon className="h-5 w-5" /></span>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
                <p className="font-medium">{value}</p>
              </div>
            </div>
          ))}
          <div className="rounded-2xl border border-border glass p-5">
            <p className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">Follow</p>
            <div className="flex gap-2">
              {[Linkedin, Github, Mail, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background text-muted-foreground transition-all hover:-translate-y-1 hover:border-primary/50 hover:text-primary">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <form onSubmit={onSubmit} className="reveal space-y-4 rounded-3xl border border-border glass p-6 lg:col-span-3">
          <div className="grid gap-4 sm:grid-cols-2">
            <FloatingInput id="name" label="Full Name *" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
            <FloatingInput id="email" type="email" label="Email *" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
            <FloatingInput id="phone" label="Phone Number" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
            <FloatingInput id="subject" label="Subject" value={form.subject} onChange={(v) => setForm({ ...form, subject: v })} />
          </div>
          <FloatingInput id="message" as="textarea" label="Message *" value={form.message} onChange={(v) => setForm({ ...form, message: v })} required />
          <Button type="submit" size="lg" className="w-full rounded-full bg-gradient-to-r from-primary to-[color:var(--primary-glow)] text-primary-foreground shadow-glow hover:opacity-90">
            <Send className="mr-2 h-4 w-4" /> Send Message
          </Button>
        </form>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-surface/40 px-6 py-12 md:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-display text-xl font-bold">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-[color:var(--primary-glow)] text-primary-foreground">AP</span>
            Anurag<span className="text-primary">Prajapati</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">Python Full Stack Developer & AI/RAG Specialist.</p>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold">Quick Links</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {NAV.slice(0, 5).map(([l, id]) => (
              <li key={id}><a href={`#${id}`} className="hover:text-primary">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold">Services</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {SERVICES.slice(0, 5).map((s) => (<li key={s.title}><a href="#services" className="hover:text-primary">{s.title}</a></li>))}
          </ul>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold">Connect</p>
          <div className="flex gap-2">
            {[Linkedin, Github, Mail, Instagram].map((Icon, i) => (
              <a key={i} href="#" className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background text-muted-foreground transition-all hover:-translate-y-1 hover:border-primary/50 hover:text-primary">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
        <p>© 2026 Anurag Prajapati. All Rights Reserved.</p>
        <p>Crafted with <span className="text-primary">♥</span> and clean code.</p>
      </div>
    </footer>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-primary to-[color:var(--primary-glow)] text-primary-foreground shadow-glow transition-all ${show ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
      aria-label="Back to top"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}

/* ---------------- Root ---------------- */

export function Portfolio() {
  useScrollReveal();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 900);
    return () => clearTimeout(t);
  }, []);
  return (
    <>
      <Loader done={loaded} />
      <CustomCursor />
      <ScrollProgress />
      <BackgroundFX />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Services />
        <Clients />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}