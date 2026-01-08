import { useState } from 'react';
import { motion } from 'framer-motion';
import { ParallaxSection } from '../ui/parallax-section';

const steps = [
    {
        id: "01",
        title: "LISTEN",
        description: "Before touching a keyboard, I understand your problem.",
        icon: "◉"
    },
    {
        id: "02",
        title: "QUESTION",
        description: "I challenge assumptions. Politely.",
        icon: "◎"
    },
    {
        id: "03",
        title: "BUILD",
        description: "Fast iterations. Visible progress.",
        icon: "◐"
    },
    {
        id: "04",
        title: "REFINE",
        description: "Details matter. Always.",
        icon: "●"
    }
];

export const Process = () => {
    const [activeStep, setActiveStep] = useState<string | null>(null);

    return (
        <section className="py-32 relative z-20 bg-black text-[#EAEAEA]">
            <ParallaxSection offset={-20}>
                <div className="container mx-auto px-6 md:px-12 mb-16 flex items-baseline gap-4">
                    <span className="font-mono text-sm text-[var(--color-accent)]">(03)</span>
                    <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tighter text-white">
                        The Method
                    </h2>
                </div>
            </ParallaxSection>

            {/* Bento-Grid Style Layout */}
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            onMouseEnter={() => setActiveStep(step.id)}
                            onMouseLeave={() => setActiveStep(null)}
                            className={`
                                relative p-8 md:p-12 border border-neutral-800 bg-neutral-900/30 
                                transition-all duration-500 cursor-crosshair group
                                ${index === 0 ? 'md:row-span-2' : ''}
                                ${activeStep === step.id ? 'bg-neutral-900 border-red-500/50' : 'hover:bg-neutral-900/50'}
                            `}
                        >
                            {/* Step Number - Top Left */}
                            <div className="absolute top-4 left-4 font-mono text-[10px] text-neutral-600 uppercase tracking-widest">
                                Step {step.id}
                            </div>

                            {/* Icon - Top Right */}
                            <div className={`
                                absolute top-4 right-4 text-2xl transition-colors duration-300
                                ${activeStep === step.id ? 'text-red-500' : 'text-neutral-700'}
                            `}>
                                {step.icon}
                            </div>

                            {/* Content */}
                            <div className={`mt-8 ${index === 0 ? 'md:mt-24' : ''}`}>
                                <h3 className={`
                                    font-display text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-4
                                    transition-colors duration-300
                                    ${activeStep === step.id ? 'text-red-500' : 'text-white group-hover:text-red-400'}
                                `}>
                                    {step.title}
                                </h3>

                                <p className="text-neutral-400 max-w-sm leading-relaxed">
                                    {step.description}
                                </p>
                            </div>

                            {/* Decorative Corner */}
                            <div className={`
                                absolute bottom-4 right-4 w-8 h-8 border-r border-b transition-colors duration-300
                                ${activeStep === step.id ? 'border-red-500' : 'border-neutral-800'}
                            `} />
                        </motion.div>
                    ))}
                </div>

                {/* Decorative Line */}
                <div className="mt-8 flex justify-between font-mono text-[10px] text-neutral-700 uppercase tracking-widest">
                    <span>Process.init()</span>
                    <span>Avg. Project Duration: 4-8 weeks</span>
                </div>
            </div>
        </section>
    );
};
