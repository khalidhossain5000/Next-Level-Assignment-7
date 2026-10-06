"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";
import {
    FiActivity,
    FiArrowRight,
    FiCalendar,
    FiMapPin,
    FiRadio,
    FiUsers,
    FiZap,
} from "react-icons/fi";

const reveal: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: "easeOut" },
    },
};

const capabilities = [
    {
        number: "01",
        title: "Plan around the schedule",
        description:
            "Check load-shedding times by zone and review planned interruptions before they affect your day.",
        href: "/load-shedding-schedule",
        linkLabel: "Explore schedules",
        Icon: FiCalendar,
    },
    {
        number: "02",
        title: "Understand your local network",
        description:
            "Browse zones and explore the substations and power infrastructure connected to each area.",
        href: "/zones",
        linkLabel: "Browse power zones",
        Icon: FiMapPin,
    },
    {
        number: "03",
        title: "Bring service work together",
        description:
            "Customer reports, technician coordination, and outage management share one service platform.",
        href: "/planned-outage",
        linkLabel: "View outage information",
        Icon: FiActivity,
    },
];

const workflow = [
    {
        number: "01",
        title: "See what is planned",
        description:
            "Find published load-shedding schedules and planned outages in one public place.",
    },
    {
        number: "02",
        title: "Know where it matters",
        description:
            "Use zones and infrastructure details to understand which areas and facilities are connected.",
    },
    {
        number: "03",
        title: "Keep response connected",
        description:
            "Customers can report unexpected outages while service teams coordinate follow-up and assignment.",
    },
];

const audiences = [
    {
        title: "Customers",
        description:
            "Check schedules, understand local service areas, and report unexpected outages.",
        image: "/images/auth/service-1.png",
        imageAlt: "Illustration representing a PowerPulse customer",
    },
    {
        title: "Technicians",
        description:
            "Keep technician profiles and service coordination connected to reported work.",
        image: "/images/auth/service-2.png",
        imageAlt: "Illustration representing a field technician",
    },
    {
        title: "Service administrators",
        description:
            "Manage outage schedules, network infrastructure, reports, and technician assignments.",
        Icon: FiRadio,
    },
];

export default function AboutUsPage() {
    const reduceMotion = useReducedMotion();
    const initial = reduceMotion ? false : "hidden";

    return (
        <main className="overflow-hidden bg-background text-foreground">
            <section className="relative isolate border-b border-border">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage:
                            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
                        backgroundSize: "44px 44px",
                    }}
                />
                <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-28">
                    <motion.div
                        initial={initial}
                        animate="visible"
                        variants={reveal}
                        className="max-w-2xl"
                    >
                        <p className="mb-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                            <FiZap aria-hidden="true" className="size-4" />
                            About PowerPulse
                        </p>
                        <h1 className="font-manrope text-4xl font-extrabold leading-[1.08] sm:text-5xl lg:text-6xl">
                            Power is complex.
                            <span className="mt-2 block text-primary">Understanding it shouldn’t be.</span>
                        </h1>
                        <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
                            PowerPulse brings schedules, outage reporting, local infrastructure, and service coordination into one connected platform, so people can find the information and tools relevant to their role.
                        </p>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Link
                                href="/load-shedding-schedule"
                                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                            >
                                Explore power schedules
                                <FiArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                            <Link
                                href="/zones"
                                className="inline-flex min-h-12 items-center justify-center rounded-lg border border-border px-5 py-3 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                            >
                                Explore zones
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={reduceMotion ? false : { opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : 0.12, ease: "easeOut" }}
                        className="relative mx-auto w-full max-w-lg"
                    >
                        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-primary/10">
                            <div className="flex items-center justify-between border-b border-border px-5 py-4">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">The PowerPulse view</p>
                                    <p className="mt-1 font-manrope text-lg font-bold">One network, connected</p>
                                </div>
                                <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                    <FiActivity aria-hidden="true" className="size-5" />
                                </span>
                            </div>
                            <div className="divide-y divide-border">
                                {[
                                    { Icon: FiCalendar, label: "Schedules", detail: "Load shedding and planned outages", color: "text-primary" },
                                    { Icon: FiMapPin, label: "Power zones", detail: "Areas, substations, and infrastructure", color: "text-cyan-600 dark:text-cyan-400" },
                                    { Icon: FiUsers, label: "Service teams", detail: "Reports, technicians, and coordination", color: "text-emerald-600 dark:text-emerald-400" },
                                ].map(({ Icon, label, detail, color }, index) => (
                                    <motion.div
                                        key={label}
                                        initial={reduceMotion ? false : { opacity: 0, x: 12 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : 0.24 + index * 0.12 }}
                                        className="flex items-center gap-4 px-5 py-5"
                                    >
                                        <span className={`flex size-11 shrink-0 items-center justify-center rounded-xl bg-muted ${color}`}>
                                            <Icon aria-hidden="true" className="size-5" />
                                        </span>
                                        <div>
                                            <p className="font-semibold">{label}</p>
                                            <p className="mt-1 text-sm leading-5 text-muted-foreground">{detail}</p>
                                        </div>
                                        <span className="relative ml-auto hidden size-2 sm:block">
                                            <motion.span
                                                className="absolute inset-0 rounded-full bg-primary/70"
                                                animate={reduceMotion ? undefined : { scale: [1, 2.4, 1], opacity: [0.7, 0, 0.7] }}
                                                transition={{ duration: 2.2, repeat: Infinity, delay: index * 0.35, ease: "easeInOut" }}
                                            />
                                            <span className="relative block size-2 rounded-full bg-primary" />
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                            <div className="flex items-center gap-3 bg-primary px-5 py-4 text-primary-foreground">
                                <FiZap aria-hidden="true" className="size-4 shrink-0" />
                                <p className="text-xs font-medium sm:text-sm">Information for the people who keep power moving.</p>
                            </div>
                        </div>
                        <div aria-hidden="true" className="absolute -bottom-5 -right-3 -z-10 h-28 w-28 border-b-2 border-r-2 border-cyan-500/50 sm:-right-5" />
                    </motion.div>
                </div>
            </section>

            <motion.section
                initial={initial}
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
                variants={reveal}
                className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 sm:py-20 md:grid-cols-[0.7fr_1.3fr] lg:px-8 lg:py-24"
            >
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Why PowerPulse exists</p>
                <div>
                    <h2 className="max-w-3xl font-manrope text-3xl font-bold leading-tight sm:text-4xl">
                        Power information should connect people to action.
                    </h2>
                    <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">
                        Schedules, service areas, and outage response are often handled in separate places. PowerPulse is designed to bring these parts of the power-service experience together: public information helps customers plan, while role-based tools support reporting and service coordination behind the scenes.
                    </p>
                    <div className="mt-8 h-1 w-28 overflow-hidden rounded-full bg-muted">
                        <motion.div
                            initial={{ width: "0%" }}
                            whileInView={{ width: "100%" }}
                            viewport={{ once: true }}
                            transition={{ duration: reduceMotion ? 0 : 0.8, ease: "easeOut" }}
                            className="h-full rounded-full bg-primary"
                        />
                    </div>
                </div>
            </motion.section>

            <section className="border-y border-border bg-muted/35">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
                    <motion.div
                        initial={initial}
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={reveal}
                        className="mb-10 flex flex-col justify-between gap-4 sm:mb-12 sm:flex-row sm:items-end"
                    >
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">What the platform connects</p>
                            <h2 className="mt-3 max-w-2xl font-manrope text-3xl font-bold sm:text-4xl">The power picture, from plan to response.</h2>
                        </div>
                        <p className="max-w-sm text-sm leading-6 text-muted-foreground">Explore the public information and service tools that make up PowerPulse.</p>
                    </motion.div>

                    <div className="grid gap-0 md:grid-cols-3 md:divide-x md:divide-border">
                        {capabilities.map(({ number, title, description, href, linkLabel, Icon }, index) => (
                            <motion.article
                                key={number}
                                initial={initial}
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.25 }}
                                variants={reveal}
                                transition={{ delay: reduceMotion ? 0 : index * 0.1 }}
                                whileHover={reduceMotion ? undefined : { y: -5 }}
                                whileTap={reduceMotion ? undefined : { scale: 0.99 }}
                                className="group border-t border-border py-7 md:border-t-0 md:px-7 md:first:pl-0 md:last:pr-0"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="font-mono text-sm font-semibold text-primary">{number}</span>
                                    <Icon aria-hidden="true" className="size-5 text-muted-foreground transition duration-300 group-hover:rotate-6 group-hover:scale-110 group-hover:text-primary" />
                                </div>
                                <h3 className="mt-7 font-manrope text-xl font-bold">{title}</h3>
                                <p className="mt-3 min-h-20 text-sm leading-6 text-muted-foreground">{description}</p>
                                <Link href={href} className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
                                    {linkLabel}
                                    <FiArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-foreground text-background">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
                    <motion.div
                        initial={initial}
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={reveal}
                        className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16"
                    >
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">How it works</p>
                            <h2 className="mt-3 font-manrope text-3xl font-bold leading-tight sm:text-4xl">From knowing to doing.</h2>
                            <p className="mt-5 max-w-sm text-sm leading-7 text-background/65">
                                A clearer path through everyday power information and service response.
                            </p>
                        </div>
                        <div className="divide-y divide-background/15 border-y border-background/15">
                            {workflow.map(({ number, title, description }, index) => (
                                <motion.div
                                    key={number}
                                    initial={initial}
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.3 }}
                                    variants={reveal}
                                    transition={{ delay: reduceMotion ? 0 : index * 0.1 }}
                                    className="grid gap-3 py-5 sm:grid-cols-[4rem_1fr] sm:gap-5 sm:py-6"
                                >
                                    <span className="font-mono text-sm font-semibold text-cyan-300">{number}</span>
                                    <div>
                                        <h3 className="font-manrope text-lg font-bold">{title}</h3>
                                        <p className="mt-2 max-w-xl text-sm leading-6 text-background/65">{description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
                <motion.div
                    initial={initial}
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={reveal}
                >
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Designed around real roles</p>
                    <h2 className="mt-3 max-w-2xl font-manrope text-3xl font-bold sm:text-4xl">One service network. Different needs.</h2>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
                        PowerPulse brings the people who depend on electricity and the teams who support its delivery into one coordinated service experience.
                    </p>
                </motion.div>

                <div className="mt-10 grid gap-0 md:grid-cols-3 md:divide-x md:divide-border">
                    {audiences.map(({ title, description, image, imageAlt, Icon }, index) => (
                        <motion.article
                            key={title}
                            initial={initial}
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.25 }}
                            variants={reveal}
                            transition={{ delay: reduceMotion ? 0 : index * 0.1 }}
                            whileHover={reduceMotion ? undefined : { y: -5 }}
                            whileTap={reduceMotion ? undefined : { scale: 0.99 }}
                            className="group border-t border-border py-6 md:px-7 md:first:pl-0 md:last:pr-0"
                        >
                            <div className="flex size-14 items-center justify-center overflow-hidden rounded-full bg-primary/10 text-primary ring-1 ring-primary/15 transition-shadow duration-300 group-hover:shadow-lg group-hover:shadow-primary/20">
                                {image ? (
                                    <Image src={image} alt={imageAlt ?? ""} width={56} height={56} className="size-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                ) : Icon ? (
                                    <Icon aria-hidden="true" className="size-6 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110" />
                                ) : null}
                            </div>
                            <h3 className="mt-5 font-manrope text-xl font-bold">{title}</h3>
                            <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
                        </motion.article>
                    ))}
                </div>
            </section>

            <section className="relative overflow-hidden border-t border-border bg-primary text-primary-foreground">
                <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-14 sm:px-6 sm:py-16 md:flex-row md:items-center md:justify-between lg:px-8">
                    <motion.div
                        initial={initial}
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={reveal}
                    >
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/70">Explore PowerPulse</p>
                        <h2 className="mt-3 max-w-2xl font-manrope text-3xl font-bold leading-tight text-white sm:text-4xl">Start with the information you need.</h2>
                        <p className="mt-3 max-w-xl text-sm leading-6 text-white/75">Browse schedules, planned outages, and power zones whenever you’re ready.</p>
                    </motion.div>
                    <motion.div
                        initial={initial}
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={reveal}
                        className="flex shrink-0 flex-col gap-3 sm:flex-row"
                    >
                        <Link href="/planned-outage" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-bold text-primary transition hover:-translate-y-0.5 hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                            Planned outages
                            <FiArrowRight aria-hidden="true" className="size-4" />
                        </Link>
                        <Link href="/zones" className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/40 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                            Browse zones
                        </Link>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}