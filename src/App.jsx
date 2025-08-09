import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  ExternalLink,
  FileText,
  MapPin,
  Wrench,
  Cpu,
  Database,
  Car,
  ServerCog,
  Moon,
  Sun,
} from "lucide-react";

// ---------- Helper components ----------
const Section = ({ id, title, eyebrow, children }) => (
  <section id={id} className="scroll-mt-24 py-16 sm:py-24">
    <div className="mx-auto max-w-6xl px-4">
      {eyebrow && (
        <p className="uppercase tracking-widest text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-2">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
        {title}
      </h2>
      <div className="mt-6 text-zinc-700 dark:text-zinc-300">{children}</div>
    </div>
  </section>
);

const Chip = ({ children }) => (
  <span className="inline-flex items-center rounded-2xl border border-zinc-200/70 dark:border-zinc-700/60 px-3 py-1 text-sm text-zinc-700 dark:text-zinc-200 bg-white/70 dark:bg-zinc-900/40 backdrop-blur">
    {children}
  </span>
);

const Card = ({ children, className = "" }) => (
  <div
    className={`rounded-2xl border border-zinc-200/70 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-900/40 shadow-sm hover:shadow-md transition-shadow ${className}`}
  >
    {children}
  </div>
);

const NavLink = ({ href, children, onClick }) => (
  <a
    href={href}
    onClick={onClick}
    className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white transition-colors"
  >
    {children}
  </a>
);

// ---------- Main component ----------
export default function XanderPortfolio() {
  const navItems = [
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "leadership", label: "Leadership" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ];

  const [theme, setTheme] = useState(() =>
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  );

  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [theme]);

  // Active section tracking
  const [active, setActive] = useState("about");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0% -55% 0%", threshold: 0.01 }
    );
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    document
      .querySelector(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900 text-zinc-800 dark:text-zinc-100">
      {/* Sticky Nav */}
      <div className="sticky top-0 z-50 border-b border-zinc-200/70 dark:border-zinc-800/60 backdrop-blur bg-white/75 dark:bg-zinc-950/60">
        <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
          <a
            href="#top"
            className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-white"
          >
            <div className="size-7 rounded-lg bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500" />
            Xander
          </a>
          <nav className="hidden sm:flex items-center gap-6">
            {navItems.map((n) => (
              <NavLink
                key={n.id}
                href={`#${n.id}`}
                onClick={scrollTo(`#${n.id}`)}
              >
                <span
                  className={
                    active === n.id ? "underline underline-offset-4" : undefined
                  }
                >
                  {n.label}
                </span>
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              aria-label="Toggle dark mode"
              onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
              className="inline-flex items-center justify-center rounded-xl border border-zinc-200/70 dark:border-zinc-700/60 bg-white/70 dark:bg-zinc-900/40 size-9"
            >
              {theme === "dark" ? (
                <Sun className="size-4" />
              ) : (
                <Moon className="size-4" />
              )}
            </button>
            <a
              href="https://github.com/XanderHayhoe"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-xl border border-zinc-200/70 dark:border-zinc-700/60 bg-white/70 dark:bg-zinc-900/40 size-9"
              aria-label="GitHub"
            >
              <Github className="size-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/alexander-hayhoe/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-xl border border-zinc-200/70 dark:border-zinc-700/60 bg-white/70 dark:bg-zinc-900/40 size-9"
              aria-label="LinkedIn"
            >
              <Linkedin className="size-4" />
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-xl border border-zinc-200/70 dark:border-zinc-700/60 bg-white/70 dark:bg-zinc-900/40 size-9"
              aria-label="Resume"
              title="Resume"
            >
              <FileText className="size-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Hero */}
      <header id="top" className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(1200px_600px_at_50%_-20%,black,transparent)]">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 via-fuchsia-500/10 to-emerald-500/10" />
        </div>
        <div className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
          <div className="grid gap-10 sm:grid-cols-[1.1fr_.9fr] items-center">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl sm:text-6xl font-black tracking-tight"
              >
                Xander Hayhoe
              </motion.h1>
              <p className="mt-4 text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-xl">
                Infra / Embedded / Systems. I build reliable pipelines, fast
                firmware, and clean UIs. Currently leveling up DevOps and
                hardware skills.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Chip>
                  <ServerCog className="mr-2 size-4" /> DevOps
                </Chip>
                <Chip>
                  <Cpu className="mr-2 size-4" /> Embedded
                </Chip>
                <Chip>
                  <Database className="mr-2 size-4" /> Databases
                </Chip>
                <Chip>
                  <Car className="mr-2 size-4" /> AV / ROS2
                </Chip>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#projects"
                  onClick={scrollTo("#projects")}
                  className="inline-flex items-center gap-2 rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 px-4 py-2 font-medium shadow"
                >
                  See projects <ArrowRight className="size-4" />
                </a>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl border border-zinc-300 dark:border-zinc-700 px-4 py-2 font-medium"
                >
                  <FileText className="size-4" /> Resume
                </a>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="justify-self-center"
            >
              <div className="relative size-48 sm:size-56 rounded-3xl p-1 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 shadow-lg">
                <div className="flex h-full w-full items-center justify-center rounded-2xl bg-white dark:bg-zinc-900 text-5xl font-black text-zinc-900 dark:text-white">
                  XH
                </div>
                <div className="absolute -bottom-3 -right-3 rounded-2xl border border-zinc-200/70 dark:border-zinc-700/60 bg-white/80 dark:bg-zinc-900/70 backdrop-blur px-3 py-1 flex items-center gap-2 text-sm shadow">
                  <MapPin className="size-4" /> Waterloo, ON
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* About */}
      <Section id="about" eyebrow="intro" title="About me">
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <p>
            I'm a Computer Engineering student at the University of Waterloo
            with a thing for infrastructure, embedded systems, and clean
            tooling. I've built CI/CD for large orgs, written firmware that
            talks over CAN and Ethernet, and shipped little tools that save big
            time.
          </p>
          <p>
            Recently: building XWS (Raspberry Pi self-hosted PaaS), tuning
            Verilog modules (softmax/div), and polishing TailorMe—a
            resume-tailoring tool. Previously at Ford: retention policies &
            cleanup that reclaimed <strong>2+ PB</strong> of storage, new
            Jenkins Windows node, and AOSP dev images.
          </p>
        </div>
      </Section>

      {/* Projects */}
      <Section id="projects" eyebrow="selected work" title="Projects">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: "XWS — Xander Web Services",
              desc: "Self-hosted platform on a Raspberry Pi 4 for app hosting, preview builds, and CI/CD pipelines (Dokku → custom).",
              tags: ["Dokku", "GitHub Actions", "Traefik", "Postgres"],
              links: { github: "#", live: "#" },
            },
            {
              name: "TailorMe",
              desc: "Chrome extension + Flask backend that scans job posts and selects relevant resume bullets with NLP matching.",
              tags: ["Chrome", "Flask", "NLP"],
              links: { github: "#", live: "#" },
            },
            {
              name: "XanDB",
              desc: "Toy database in Python (ex-C++) with a structured API and networked access; focus on indexing & query plan basics.",
              tags: ["Python", "Databases", "Flask"],
              links: { github: "#", live: "#" },
            },
            {
              name: "WATonomous Joystick Commander",
              desc: "Control stack publishing combined Twist+string custom ROS2 messages over gateway to vehicle CAN.",
              tags: ["ROS2", "CAN", "Realtime"],
              links: { github: "#", live: "#" },
            },
            {
              name: "Teensy 4.1 Makefile Boilerplate",
              desc: "Portable .c/.h Makefile project with OS-aware flashing via teensy_loader_cli; fast iteration loop.",
              tags: ["C", "Makefile", "Teensy"],
              links: { github: "#", live: "#" },
            },
            {
              name: "CI/CD Dashboard",
              desc: "Grafana + Prometheus board tracking runner usage, build flakiness, and latency; webhook ingestion service.",
              tags: ["Grafana", "Prometheus", "Go"],
              links: { github: "#", live: "#" },
            },
          ].map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
            >
              <Card className="h-full">
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    {p.name}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                    {p.desc}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <Chip key={t}>{t}</Chip>
                    ))}
                  </div>
                  <div className="mt-4 flex gap-3">
                    <a
                      href={p.links.github}
                      className="inline-flex items-center gap-1 text-sm font-medium hover:underline"
                    >
                      <Github className="size-4" />
                      Code
                    </a>
                    <a
                      href={p.links.live}
                      className="inline-flex items-center gap-1 text-sm font-medium hover:underline"
                    >
                      <ExternalLink className="size-4" />
                      Live
                    </a>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Experience (from resume) */}
      <Section id="experience" eyebrow="history" title="Experience">
        <div className="space-y-4">
          {[
            {
              role: "DevSecOps Engineer Intern",
              org: "Ford Motor Company",
              location: "Waterloo, Ontario",
              time: "May 2025 – Aug 2025",
              bullets: [
                "Designed retention policies and automated cleanup (Bash, Python), reducing >2 PB of waste from JFrog Artifactory across prod.",
                "Built a Dockerized AOSP development environment to migrate Ubuntu 20.04 → 22.04, improving security compliance and tooling.",
                "Engineered dynamic Jenkins Windows build nodes (PowerShell, Groovy) enabling scalable pipelines for embedded/MSBuild toolchains.",
              ],
            },
            {
              role: "Infrastructure Developer Intern",
              org: "Ford Motor Company",
              location: "Waterloo, Ontario",
              time: "Sept 2024 – Dec 2024",
              bullets: [
                "Provisioned self-hosted JFrog with Terraform + Packer; cut storage costs by 53%/TB and boosted transfer speeds ~5×.",
                "Designed GitHub Actions runners for Windows builds supporting three infotainment teams.",
                "Migrated Windows provisioners from PowerShell to Packer + Ansible; deployed GCP LBs, buckets, and build nodes.",
              ],
            },
            {
              role: "Software Developer Intern",
              org: "Ford Motor Company",
              location: "Waterloo, Ontario",
              time: "Jan 2024 – Apr 2024",
              bullets: [
                "Optimized Docker builds (-30% image size, up to 50% faster) with hardened security.",
                "Automated creation/testing/verification of 1000+ LFS PRs for GitHub Cloud → Artifactory migration.",
                "Engineered a CI/CD monorepo with GitHub Actions implementing recursive downstream builds across dev/QA/prod.",
              ],
            },
            {
              role: "Software Engineering Intern",
              org: "PRGX",
              location: "Toronto, Ontario",
              time: "May 2023 – Aug 2023",
              bullets: [
                "Partnered with auditors on data delivery optimization; ensured data integrity with VBA + Python.",
                "Improved key SQL/Python pipelines with >20% runtime reduction.",
              ],
            },
          ].map((e) => (
            <Card key={e.role}>
              <div className="p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold">
                    {e.role} ·{" "}
                    <span className="text-zinc-600 dark:text-zinc-400">
                      {e.org}
                    </span>
                  </h3>
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">
                    {e.time}
                  </span>
                </div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">
                  {e.location}
                </div>
                <ul className="mt-3 list-disc pl-5 space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
                  {e.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Leadership & Research */}
      <Section
        id="leadership"
        eyebrow="teams & research"
        title="Leadership & Research"
      >
        <div className="space-y-4">
          {[
            {
              role: "Vehicle Platform Director — Embedded & Power Systems",
              org: "WATonomous",
              location: "Waterloo, Ontario",
              time: "May 2024 – Present",
              bullets: [
                "Led embedded development transforming a KIA Soul into an autonomous platform; built computer-to-car communication.",
                "Implemented joystick tele-op and wrote arbiter + MUX nodes in ROS2/C++ for priority bus writes.",
                "Interfaced 6 FLIR cameras and a VLP-32 in C++ (PCI, PoE), ingesting ~12 GiB/s of data.",
              ],
            },
            {
              role: "Firmware Team Lead",
              org: "Waterloop",
              location: "Waterloo, Ontario",
              time: "May 2023 – Jul 2024",
              bullets: [
                "Architected STM32F7 + Raspberry Pi 4 system for high-voltage hyperloop operations.",
                "Built Node.js backend over RFCOMM and a C++ CLI for manual control/integration testing.",
                "Multithreaded RPi state machine and listeners, achieving full CPU utilization.",
              ],
            },
          ].map((e) => (
            <Card key={e.role}>
              <div className="p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold">
                    {e.role} ·{" "}
                    <span className="text-zinc-600 dark:text-zinc-400">
                      {e.org}
                    </span>
                  </h3>
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">
                    {e.time}
                  </span>
                </div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">
                  {e.location}
                </div>
                <ul className="mt-3 list-disc pl-5 space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
                  {e.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Skills */}
      <Section id="skills" eyebrow="stack" title="Skills">
        <div className="flex flex-wrap gap-2">
          {[
            "Docker",
            "Kubernetes",
            "GitHub Actions",
            "Jenkins",
            "Grafana",
            "Prometheus",
            "Ansible",
            "Terraform",
            "Packer",
            "Linux",
            "C/C++",
            "Python",
            "SystemVerilog",
            "ROS2",
            "CAN",
            "Ethernet",
            "Postgres",
            "Flask",
            "React",
            "Vite",
          ].map((s) => (
            <Chip key={s}>{s}</Chip>
          ))}
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" eyebrow="say hi" title="Get in touch">
        <Card>
          <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold">
                Open to internships & collabs
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Best way to reach me is email; DMs open on LinkedIn too.
              </p>
            </div>
            <div className="flex gap-3">
              <a
                href="mailto:xanderhayhoe@gmail.com"
                className="inline-flex items-center gap-2 rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 px-4 py-2 font-medium"
              >
                <Mail className="size-4" /> Email me
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border border-zinc-300 dark:border-zinc-700 px-4 py-2 font-medium"
              >
                <FileText className="size-4" /> Resume
              </a>
            </div>
          </div>
        </Card>
      </Section>

      <footer className="border-t border-zinc-200/70 dark:border-zinc-800/60 py-8 text-center text-sm text-zinc-500">
        © {new Date().getFullYear()} Xander Hayhoe · Built with React & Tailwind
      </footer>
    </div>
  );
}
