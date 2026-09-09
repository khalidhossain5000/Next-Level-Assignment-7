import React from 'react';

const Footer = () => {
    return (
        <footer className="border-t border-slate-200 bg-slate-50 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 sm:flex-row">
                <p>© 2026 PowerPulse. All rights reserved.</p>

                <div className="flex items-center gap-4">
                    <a href="https://gemini.google.com/" className="transition hover:text-slate-900 dark:hover:text-white">
                        About
                    </a>
                    <a href="https://gemini.google.com/" className="transition hover:text-slate-900 dark:hover:text-white">
                        Contact
                    </a>
                    <a href="https://gemini.google.com/" className="transition hover:text-slate-900 dark:hover:text-white">
                        Privacy
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;