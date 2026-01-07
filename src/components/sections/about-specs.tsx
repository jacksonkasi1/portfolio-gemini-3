import React from 'react';
import { DATA } from '../../data/portfolio';
import { SectionTitle } from '../ui/section-title';
import { ParallaxSection } from '../ui/parallax-section';

export const AboutSpecs = () => {
    return (
        <section id="about" className="py-32 border-t border-neutral-900 bg-[#050505]">
            <ParallaxSection offset={30}>
                <div className="container mx-auto px-6 md:px-12 flex items-baseline gap-4 mb-20">
                    <span className="font-mono text-sm text-red-500">(04)</span>
                    <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tighter">
                        The Workbench
                    </h2>
                </div>

                <div className="container mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-neutral-900 border border-neutral-900">
                        {DATA.skills.map((skill, i) => (
                            <div key={skill.category} className="bg-[#050505] p-8 md:p-12 hover:bg-[#080808] transition-colors group">
                                <div className="flex justify-between items-start mb-8">
                                    <h4 className="font-mono text-xs text-red-500 uppercase tracking-widest">
                                        [0{i + 1}] {skill.category}
                                    </h4>
                                    <div className="w-2 h-2 rounded-full bg-neutral-800 group-hover:bg-red-500 transition-colors" />
                                </div>
                                <ul className="space-y-4">
                                    {skill.items.map(item => (
                                        <li key={item} className="font-mono text-sm text-neutral-500 flex items-center gap-3 group-hover:text-neutral-300 transition-colors">
                                            <span className="w-1 h-px bg-neutral-800 group-hover:w-3 group-hover:bg-red-500 transition-all" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Decorative HUD Elements */}
                    <div className="flex justify-between mt-4 font-mono text-[10px] text-neutral-700 uppercase tracking-widest">
                        <span>Sys.Status: Optimal</span>
                        <span>Memory: 98% Freelance</span>
                    </div>
                </div>
            </ParallaxSection>
        </section>
    );
};
