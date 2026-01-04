import React from 'react';
import { DATA } from '../../data/portfolio';
import { SectionTitle } from '../ui/section-title';
import { ParallaxSection } from '../ui/parallax-section';

export const AboutSpecs = () => {
    return (
        <section id="about" className="py-32 border-t border-neutral-900 bg-[#080808]">
            <ParallaxSection offset={30}>
                <div className="container mx-auto px-6 md:px-12">
                    <SectionTitle title="System Specs" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-16 font-light">
                        <div className="text-xl leading-relaxed text-neutral-300">
                            <p className="mb-8">
                                <span className="text-red-500 font-mono text-xs block mb-2">// PHILOSOPHY</span>
                                I believe in the beauty of raw data and bare-metal performance.
                                Design should reveal the structure, not conceal it.
                            </p>
                            <p>
                                My work strips away the superfluous, leaving only what is essential:
                                <span className="text-white border-b border-white pb-1 mx-2">speed</span>
                                and
                                <span className="text-white border-b border-white pb-1 mx-2">precision</span>.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                            {DATA.skills.map(skill => (
                                <div key={skill.category}>
                                    <h4 className="font-mono text-xs text-neutral-600 uppercase tracking-widest mb-4">{skill.category}</h4>
                                    <ul className="space-y-2">
                                        {skill.items.map(item => (
                                            <li key={item} className="text-sm text-neutral-400 hover:text-white transition-colors cursor-crosshair">
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </ParallaxSection>
        </section>
    );
};
