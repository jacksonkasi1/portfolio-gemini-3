// ** import core
import { motion } from 'framer-motion';
import { DATA } from '../../data/portfolio';
import { ParallaxSection } from '../ui/parallax-section';

export const AboutSpecs = () => {
    // Group skills for the grid layout
    const categories = {
        core: DATA.skills.find(s => s.category.includes('Languages') || s.category.includes('Core'))?.items || [],
        frontend: DATA.skills.find(s => s.category.includes('Frontend') || s.category.includes('Style'))?.items || [],
        backend: DATA.skills.find(s => s.category.includes('Backend'))?.items || [],
        infra: DATA.skills.find(s => s.category.includes('Tools') || s.category.includes('Infra'))?.items || []
    };

    return (
        <section id="about" className="py-32 bg-[#EAEAEA] text-[#080808] relative overflow-hidden">

            {/* Background Grid - faint */}
            {/* Background Grid - Animated Moving Pattern */}
            <motion.div
                className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
                animate={{
                    backgroundPosition: ["0px 0px", "40px 40px"]
                }}
                transition={{
                    duration: 4,
                    ease: "linear",
                    repeat: Infinity
                }}
            />

            {/* Grid Meteors ("Dark Sparks") */}
            {/* Generating 6 random meteors that travel along the vertical grid lines */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute z-0 w-[1px] h-[160px] pointer-events-none opacity-20"
                    style={{
                        background: 'linear-gradient(to bottom, transparent, #000, transparent)',
                        left: `${Math.floor(Math.random() * 20) * 80 + 40}px`, // Random grid column
                    }}
                    initial={{ y: -200 }}
                    animate={{ y: 2000 }} // Move well past the bottom
                    transition={{
                        duration: Math.random() * 3 + 2, // 2-5s
                        ease: "linear",
                        repeat: Infinity,
                        repeatDelay: Math.random() * 5, // Random wait
                        delay: Math.random() * 5
                    }}
                />
            ))}

            {/* Reverse Meteors (Bottom to Top) */}
            {[...Array(4)].map((_, i) => (
                <motion.div
                    key={`rev-${i}`}
                    className="absolute z-0 w-[1px] h-[160px] pointer-events-none opacity-20"
                    style={{
                        background: 'linear-gradient(to top, transparent, #000, transparent)',
                        left: `${Math.floor(Math.random() * 20) * 120 + 20}px`, // Different random columns
                    }}
                    initial={{ y: 1500 }}
                    animate={{ y: -200 }}
                    transition={{
                        duration: Math.random() * 4 + 3,
                        ease: "linear",
                        repeat: Infinity,
                        repeatDelay: Math.random() * 5,
                        delay: Math.random() * 5
                    }}
                />
            ))}

            {/* Scanning Line (Kept subtle) */}
            <motion.div
                className="absolute inset-0 z-0 pointer-events-none hidden md:block"
                style={{
                    background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.02) 50%, transparent)',
                    height: '100%',
                    width: '100%'
                }}
                initial={{ y: "-100%" }}
                animate={{ y: "100%" }}
                transition={{
                    duration: 10,
                    ease: "linear",
                    repeat: Infinity,
                    repeatDelay: 0
                }}
            />

            <ParallaxSection offset={20}>
                {/* Header Row */}
                <div className="container mx-auto px-6 md:px-12 mb-20 flex items-baseline justify-between">
                    <div className="flex items-baseline gap-4">
                        <span className="font-mono text-sm text-[var(--color-accent)]">(04)</span>
                        <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tighter text-[#080808]">
                            The Workbench
                        </h2>
                    </div>
                </div>

                {/* The Grid */}
                <div className="container mx-auto px-6 md:px-12 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-px bg-[#CCC] border border-[#CCC]">

                        {/* [01] CORE */}
                        <motion.div
                            whileHover={{ backgroundColor: '#F5F5F5' }}
                            style={{ backgroundColor: '#EAEAEA' }}
                            className="col-span-1 lg:col-span-4 p-8 md:p-12 min-h-[300px] flex flex-col justify-between group"
                        >
                            <div className="flex justify-between items-start">
                                <h4 className="font-mono text-xs text-[var(--color-accent)] uppercase tracking-widest">[01] Core</h4>
                                <div className="w-1.5 h-1.5 rounded-full bg-[#CCC] group-hover:bg-[var(--color-accent)] transition-colors" />
                            </div>
                            <ul className="grid grid-cols-1 gap-3">
                                {categories.core.slice(0, 5).map(item => (
                                    <li key={item} className="font-mono text-sm text-[#444] group-hover:text-black transition-colors">
                                        - {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* [02] STYLE / FRONTEND */}
                        <motion.div
                            whileHover={{ backgroundColor: '#F5F5F5' }}
                            style={{ backgroundColor: '#EAEAEA' }}
                            className="col-span-1 lg:col-span-4 p-8 md:p-12 min-h-[300px] flex flex-col justify-between group relative overflow-hidden"
                        >
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[var(--color-accent)] blur-[100px] opacity-0 group-hover:opacity-10 transition-opacity duration-700" />

                            <div className="flex justify-between items-start relative z-10">
                                <h4 className="font-mono text-xs text-[var(--color-accent)] uppercase tracking-widest">[02] Style</h4>
                                <div className="w-2 h-2 rounded-full border border-[var(--color-accent)] animate-pulse" />
                            </div>
                            <ul className="grid grid-cols-1 gap-3 relative z-10">
                                {categories.frontend.slice(0, 5).map(item => (
                                    <li key={item} className="font-mono text-sm text-[#444] group-hover:text-black transition-colors">
                                        - {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* [03] BACKEND */}
                        <motion.div
                            whileHover={{ backgroundColor: '#F5F5F5' }}
                            style={{ backgroundColor: '#EAEAEA' }}
                            className="col-span-1 lg:col-span-4 p-8 md:p-12 min-h-[300px] flex flex-col justify-between group"
                        >
                            <div className="flex justify-between items-start">
                                <h4 className="font-mono text-xs text-[var(--color-accent)] uppercase tracking-widest">[03] Backend</h4>
                                <div className="w-1.5 h-1.5 rounded-full bg-[#CCC] group-hover:bg-[var(--color-accent)] transition-colors" />
                            </div>
                            <ul className="grid grid-cols-1 gap-3">
                                {categories.backend.slice(0, 5).map(item => (
                                    <li key={item} className="font-mono text-sm text-[#444] group-hover:text-black transition-colors">
                                        - {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* [04] INFRA / TOOLS - Wide Bottom Block */}
                        <motion.div
                            whileHover={{ backgroundColor: '#F5F5F5' }}
                            style={{ backgroundColor: '#EAEAEA' }}
                            className="col-span-1 md:col-span-2 lg:col-span-8 p-8 md:p-12 min-h-[240px] flex flex-col justify-between group"
                        >
                            <div className="flex justify-between items-start">
                                <h4 className="font-mono text-xs text-[var(--color-accent)] uppercase tracking-widest">[04] Infra & Tools</h4>
                                <div className="w-1.5 h-1.5 rounded-full bg-[#CCC] group-hover:bg-[var(--color-accent)] transition-colors" />
                            </div>
                            <ul className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {categories.infra.map(item => (
                                    <li key={item} className="font-mono text-sm text-[#444] group-hover:text-black transition-colors">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* [05] DECORATIVE BLOCK */}
                        <motion.div
                            style={{ backgroundColor: '#EAEAEA' }}
                            className="col-span-1 md:col-span-2 lg:col-span-4 p-8 md:p-12 min-h-[240px] flex flex-col justify-center items-center text-center group border-l border-[#CCC]"
                        >
                            <div className="w-full h-full border border-dashed border-[#AAA] flex items-center justify-center relative">
                                <div className="absolute inset-0 bg-[var(--color-accent)] opacity-0 group-hover:opacity-5 transition-opacity" />
                                <span className="font-mono text-xs text-[#666] uppercase tracking-widest group-hover:text-[var(--color-accent)] transition-colors">
                                    System Optimal
                                </span>
                            </div>
                        </motion.div>

                    </div>

                    {/* Footer Data */}
                    <div className="flex justify-between mt-6 border-t border-[#CCC] pt-6 opacity-60 font-mono text-[10px] uppercase tracking-[0.2em] text-[#080808]">
                        <span>Sys.Status: Optimal</span>
                        <span>Memory: 98% Freelance</span>
                    </div>
                </div>
            </ParallaxSection>
        </section>
    );
};
