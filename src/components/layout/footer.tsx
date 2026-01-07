import React from 'react';
import { motion } from 'framer-motion';
import { DATA } from '../../data/portfolio';

export const Footer = () => {
    return (
        <footer className="py-8 border-t border-neutral-900 bg-neutral-950">
            <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span className="font-mono text-[10px] text-neutral-600 uppercase tracking-widest">
                        System Standby
                    </span>
                </div>

                <div className="font-mono text-[10px] text-neutral-700 uppercase tracking-widest">
                    © 2026 Jackson Kasi · V2.4.0
                </div>
            </div>
        </footer>
    );
};
