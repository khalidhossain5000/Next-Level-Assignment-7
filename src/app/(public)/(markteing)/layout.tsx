
import type { ReactNode } from "react";
import Footer from "@/components/layout/public/Footer/Footer";
import NavBar from "@/components/layout/public/Header/NavBar";

export default function PublicLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col">
            <NavBar />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
}