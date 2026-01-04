import React from 'react';
import { motion } from 'framer-motion';
import { DATA } from '../../data/portfolio';

export const Footer = () => {
    return (
        <footer id="contact" className="py-20 border-t border-neutral-900 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-10">
                <svg className="w-full h-full">
                    <pattern id="footer-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="1" fill="white" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#footer-grid)" />
                    <motion.circle
                        cx="50%"
                        cy="50%"
                        r="100"
                        stroke="white"
                        strokeWidth="1"
                        fill="none"
                        animate={{ r: [100, 300], opacity: [0.5, 0] }}
                        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                    />
                </svg>
            </div>
            <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
                <h2 className="text-[15vw] leading-[0.8] font-thin text-outline opacity-20 hover:opacity-100 transition-opacity duration-500 cursor-pointer">
                    GET IN TOUCH
                </h2>
                <div className="flex justify-center gap-8 mt-12">
                    {DATA.socials.map(social => (
                        <a key={social.label} href={social.href} className="text-sm font-mono uppercase tracking-widest text-neutral-500 hover:text-red-600 transition-colors">
                            {social.label}
                        </a>
                    ))}
                </div>
                <div className="mt-20 font-mono text-[10px] text-neutral-700 uppercase tracking-[0.2em]">
                    System Shutdown sequence initiated...
                </div>
            </div>
        </footer>
    );
};
