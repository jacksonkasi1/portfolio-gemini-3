import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ParallaxSection } from '../ui/parallax-section';

const testimonials = [
    {
        quote: "He doesn't just write code that works. He writes code that feels alive. A rare combination of engineering brain and artistic soul.",
        author: "Sarah Jenkins",
        role: "CTO, FinStream"
    },
    {
        quote: "We hired a developer and got a product strategist. The level of detail in the interactions elevated our entire brand perception.",
        author: "Marcus Chen",
        role: "Founder, Aperture Labs"
    }
];

export const Testimonials = () => {
    return (
        <section className="py-32 relative z-20 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-900/10 rounded-full blur-[120px] pointer-events-none" />

            <ParallaxSection offset={-20}>
                <div className="container mx-auto px-6 md:px-12 mb-20 flex items-baseline gap-4">
                    <span className="font-mono text-sm text-red-500">(05)</span>
                    <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tighter">
                        The Proof
                    </h2>
                </div>
            </ParallaxSection>

            <div className="container mx-auto px-6 md:px-12 relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2, duration: 1.0 }}
                            className="relative"
                        >
                            <span className="absolute -left-4 -top-8 font-display text-8xl text-neutral-800 opacity-50">"</span>

                            <p className="font-display text-2xl md:text-3xl leading-snug mb-8 text-neutral-200">
                                {t.quote}
                            </p>

                            <div className="flex flex-col">
                                <span className="font-bold text-white uppercase tracking-tight">{t.author}</span>
                                <span className="font-mono text-xs text-red-400 uppercase tracking-widest mt-1">{t.role}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
