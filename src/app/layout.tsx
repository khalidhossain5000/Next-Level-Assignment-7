import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner"
import Providers from "@/providers";

const manropeHeading = Manrope({ subsets: ['latin'], variable: '--font-manrope' });

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });



export const metadata: Metadata = {
  title: {
    default: "Power Pulse | Load Shedding and Outage Updates",
    template: "%s | Power Pulse",
  },
  description: "Track load-shedding schedules, planned outages, and power supply updates for your zone with Power Pulse.",
  openGraph: {
    title: "Power Pulse | Load Shedding and Outage Updates",
    description: "Track load-shedding schedules, planned outages, and power supply updates for your zone with Power Pulse.",
    siteName: "Power Pulse",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Power Pulse | Load Shedding and Outage Updates",
    description: "Track load-shedding schedules, planned outages, and power supply updates for your zone with Power Pulse.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("h-full", "antialiased", inter.variable, manropeHeading.variable)}
    >
      <Providers>
        <body className="">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster richColors position="top-center"/>
          </ThemeProvider>
        </body>
      </Providers>
    </html>
  );
}
