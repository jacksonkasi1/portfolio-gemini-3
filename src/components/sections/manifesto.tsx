// ** import core
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// ** import ui
import { ParallaxText } from '@/components/ui/velocity-text';

export const Manifesto = () => {
    return (
        <section className="relative w-full py-32 px-6 md:px-12 bg-[#EAEAEA] text-[#080808] overflow-hidden z-20">
            {/* Massive Scrolling Background Text */}
            <div className="absolute top-40 left-0 w-full opacity-[0.05] select-none pointer-events-none">
                <ParallaxText baseVelocity={3} className="text-[20vw] font-black uppercase leading-none text-[#080808]">
                    ENGINEERING DESIGN ENGINEERING DESIGN
                </ParallaxText>
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 max-w-7xl mx-auto">

                {/* Column 1: Title */}
                <div className="col-span-1 md:col-span-4 sticky top-12 self-start">
                    <h2 className="font-display text-5xl md:text-7xl mb-6">The<br />Method</h2>
                    <span className="block w-24 h-1 bg-[var(--color-accent)] mb-8"></span>
                    <p className="font-mono text-sm opacity-60 tracking-tight uppercase">
                        [ 02 / PHILOSOPHY ]
                    </p>
                </div>

                {/* Column 2: Content Density */}
                <div className="col-span-1 md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="group"
                        >
                            <span className="text-[var(--color-accent)] font-mono text-xs mb-2 block">01</span>
                            <h3 className="text-2xl font-bold mb-4 group-hover:pl-2 transition-all">Precision</h3>
                            <p className="opacity-70 leading-relaxed font-sans text-sm md:text-base">
                                In a digital landscape cluttered with templates, precision is the differentiator.
                                Every pixel is calculated, every interaction timed to the millisecond.
                                We don't just build websites; we architect experiences.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="group"
                        >
                            <span className="text-[var(--color-accent)] font-mono text-xs mb-2 block">02</span>
                            <h3 className="text-2xl font-bold mb-4 group-hover:pl-2 transition-all">Velocity</h3>
                            <p className="opacity-70 leading-relaxed font-sans text-sm md:text-base">
                                Speed is a feature, but perceived velocity is an emotion.
                                Using advanced WebGL and physics-based motion, we create interfaces that feel
                                powerful and responsive, creating a connection between user and code.
                            </p>
                        </motion.div>
                    </div>

                    <div className="space-y-8 pt-0 md:pt-24">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="group"
                        >
                            <span className="text-[var(--color-accent)] font-mono text-xs mb-2 block">03</span>
                            <h3 className="text-2xl font-bold mb-4 group-hover:pl-2 transition-all">Immersion</h3>
                            <p className="opacity-70 leading-relaxed font-sans text-sm md:text-base">
                                Depth, texture, noise, and grain. We reject the flat web.
                                By introducing cinematic qualities to the browser, we turn simple scrolling
                                into a narrative journey.
                            </p>
                        </motion.div>

                        <motion.div
                            className="p-8 border border-black/10 bg-white"
                            whileHover={{ scale: 0.98 }}
                        >
                            <h4 className="font-mono text-xs uppercase tracking-widest mb-4 opacity-50">Current Status</h4>
                            <div className="flex justify-between items-center border-b border-black/10 pb-2 mb-2">
                                <span>Design</span>
                                <span className="text-[var(--color-accent)]">Active</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-black/10 pb-2 mb-2">
                                <span>Development</span>
                                <span className="text-[var(--color-accent)]">Active</span>
                            </div>
                            <button className="mt-8 flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:gap-4 transition-all">
                                Read Full Docs <ArrowRight size={16} />
                            </button>
                        </motion.div>
                    </div>
                </div>

            </div>
        </section>
    );
};
