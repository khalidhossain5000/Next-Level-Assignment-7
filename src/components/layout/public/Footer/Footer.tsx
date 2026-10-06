"use client";

import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { FiArrowUp, FiArrowUpRight, FiHeart, FiZap } from "react-icons/fi";
import { FaGithub, FaGlobe, FaLinkedin, FaTwitter } from "react-icons/fa";
import type { FooterLink, FooterProps } from "@/types";




const isExternalLink = (href: string) =>
  href.startsWith("http://") || href.startsWith("https://");


const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};



const FooterNavLink = ({ link }: { link: FooterLink }) => {
  const classes =
    "group relative inline-flex w-fit items-center gap-1.5 text-sm text-slate-600 transition-colors duration-300 hover:text-primary dark:text-slate-400 dark:hover:text-primary";

  const inner = (
    <>
      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
      <span>{link.label}</span>
      <FiArrowUpRight className="text-xs opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
    </>
  );

  return isExternalLink(link.href) ? (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className={classes}
    >
      {inner}
    </a>
  ) : (
    <Link href={link.href} className={classes}>
      {inner}
    </Link>
  );
};



const Footer = ({
  brandName = "PowerPulse",
  description = "A smarter way to monitor, manage, and understand power services with confidence.",
  quickLinks = [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  resourceLinks = [
    { label: "Load Shedding Schedule", href: "/schedule" },
    { label: "Documentation", href: "/docs" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
  socialLinks = [
    {
      label: "GitHub",
      href: "https://github.com/khalidhossain5000",
      icon: <FaGithub />,
    },
    {
      label: "Portfolio",
      href: "https://khalid-hossain-self.vercel.app",
      icon: <FaGlobe />,
    },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/md-khalid-hossain-s", icon: <FaLinkedin /> },
    { label: "Twitter", href: "https://twitter.com", icon: <FaTwitter /> },
  ],
  stats = [
    { value: "24/7", label: "Monitoring" },
    { value: "50", label: "Zones" },
    { value: "99.9%", label: "Uptime" },
  ],
  copyrightText = "All rights reserved.",
}: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-slate-200/70 bg-slate-50 text-slate-600 dark:border-white/10 dark:bg-[#060b16] dark:text-slate-300">
     
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <motion.div
          animate={{
            y: [0, -26, 0],
            x: [0, 18, 0],
            opacity: [0.35, 0.6, 0.35],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-40 top-0 h-80 w-80 rounded-full bg-primary/20 blur-3xl dark:bg-primary/25"
        />

        <motion.div
          animate={{
            y: [0, 30, 0],
            x: [0, -20, 0],
            opacity: [0.25, 0.5, 0.25],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl"
        />

        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            maskImage:
              "radial-gradient(ellipse at 50% 0%, black 40%, transparent 78%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at 50% 0%, black 40%, transparent 78%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
       
        <div className="h-px w-full bg-linear-to-r from-transparent via-primary/70 to-transparent" />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid gap-8 pt-14 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-14"
        >
    
          <motion.div variants={item}>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs font-medium text-primary dark:bg-primary/10">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Power management, simplified
            </div>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              Stay ahead of every{" "}
              <span className="bg-linear-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                outage.
              </span>
            </h2>

            <p className="mt-4 max-w-lg text-sm leading-7 text-slate-600 dark:text-slate-400">
              Real-time load-shedding schedules, outage reports and smart power
              insights — all in one clean dashboard.
            </p>
          </motion.div>

          {/*  Right- glass status card */}
          <motion.div
            variants={item}
            className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/70 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-xl dark:border-white/10 dark:bg-white/4 dark:shadow-black/30"
          >
            {/* soft inner glow */}
            <div className="pointer-events-none absolute -top-20 right-0 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 left-0 h-40 w-40 rounded-full bg-blue-500/15 blur-3xl" />

            {/* header row */}
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-200">
                  Live platform status
                </p>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Online
              </span>
            </div>

            {/* stats grid */}
            <div className="relative mt-6 grid grid-cols-3 gap-3">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
                  className="rounded-2xl border border-slate-200/80 bg-white/60 px-3 py-4 text-center dark:border-white/10 dark:bg-white/3"
                >
                  <p className="bg-linear-to-br from-primary to-blue-600 bg-clip-text text-lg font-extrabold text-transparent sm:text-xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[10px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* divider */}
            <div className="relative my-6 h-px w-full bg-linear-to-r from-transparent via-slate-300/60 to-transparent dark:via-white/10" />

            {/* CTA buttons */}
            <div className="relative flex flex-col gap-3 sm:flex-row">
              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
                className="flex-1"
              >
                <Link
                  href="/dashboard"
                  className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-primary to-blue-600 px-5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-shadow hover:shadow-xl hover:shadow-primary/40"
                >
                  Open Dashboard
                  <FiArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
                className="flex-1"
              >
                <Link
                  href="/schedule"
                  className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white/60 px-5 text-sm font-semibold text-slate-700 backdrop-blur-sm transition-colors hover:border-primary/30 hover:text-primary dark:border-white/10 dark:bg-white/3 dark:text-slate-200 dark:hover:text-primary"
                >
                  View Schedule
                  <FiArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/*  Main Grid  */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid gap-12 py-14 lg:grid-cols-[1.4fr_0.7fr_0.75fr_1fr] lg:gap-10 lg:py-16"
        >
          {/* Brand */}
          <motion.div variants={item} className="max-w-sm">
            <Link href="/" className="group inline-flex items-center gap-3">
              <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-blue-600 text-white shadow-lg shadow-primary/25 transition duration-300 group-hover:scale-105 group-hover:shadow-primary/40">
                <FiZap className="text-xl" />
                <span className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 blur-md transition duration-300 group-hover:opacity-100" />
              </div>

              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                {brandName}
              </span>
            </Link>

            <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-400">
              {description}
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3.5 py-2 text-xs font-medium text-primary dark:border-primary/20 dark:bg-primary/10">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              All systems operational
            </div>
          </motion.div>

          {/* Explore  */}
          <motion.div variants={item}>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              Explore
            </p>
            <div className="mt-5 flex flex-col gap-3.5">
              {quickLinks.map((link) => (
                <FooterNavLink key={link.href} link={link} />
              ))}
            </div>
          </motion.div>

          {/* Resources */}
          <motion.div variants={item}>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              Resources
            </p>
            <div className="mt-5 flex flex-col gap-3.5">
              {resourceLinks.map((link) => (
                <FooterNavLink key={link.href} link={link} />
              ))}
            </div>
          </motion.div>

          {/*  Social*/}
          <motion.div variants={item}>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              Connect
            </p>

            <p className="mt-3 max-w-xs text-xs leading-6 text-slate-500 dark:text-slate-500">
              Follow the project and explore more of my work.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ y: -5, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="group relative flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-lg text-slate-600 shadow-sm transition-colors duration-300 hover:border-primary/30 hover:text-white dark:border-white/10 dark:bg-white/3 dark:text-slate-400 dark:hover:border-primary/40"
                >
                  {/* gradient fill on hover */}
                  <span className="absolute inset-0 rounded-2xl bg-linear-to-br from-primary to-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <span className="relative z-10">{social.icon}</span>

                  {/* tooltip */}
                  <span className="pointer-events-none absolute -top-9 left-1/2 z-20 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-lg bg-slate-900 px-2.5 py-1 text-[10px] font-medium text-white opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 dark:bg-white dark:text-slate-900">
                    {social.label}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar  */}
        <div className="relative border-t border-slate-200/70 py-6 dark:border-white/10">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <p className="text-xs text-slate-500 dark:text-slate-500">
              © {currentYear} {brandName}. {copyrightText}
            </p>

            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-500">
                Built with <FiHeart className="text-red-500" /> for a better
                power experience
              </span>

              <motion.button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                aria-label="Back to top"
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="group flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition-colors duration-300 hover:border-primary/30 hover:bg-primary hover:text-white dark:border-white/10 dark:bg-white/3 dark:text-slate-400 dark:hover:bg-primary"
              >
                <FiArrowUp className="transition-transform duration-300 group-hover:-translate-y-0.5" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/*  Brand Watermark  */}
      <div
        aria-hidden="true"
        className="pointer-events-none relative select-none overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <p className="translate-y-[22%] bg-linear-to-b from-slate-900/10 to-transparent bg-clip-text text-center text-[13vw] font-black leading-none tracking-tighter whitespace-nowrap text-transparent dark:from-white/10">
            {brandName}
          </p>
        </motion.div>
      </div>

      {/* Bottom Glow  */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 h-20 w-1/2 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
      />
    </footer>
  );
};

export default Footer;
