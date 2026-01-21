import React from 'react';

export const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 w-full z-40 py-6 px-6 md:px-12 flex justify-between items-start pointer-events-none mix-blend-difference text-white">
            <div className="flex flex-col gap-1 pointer-events-auto">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">Portfolio '26</span>
                <span className="font-medium text-lg leading-none tracking-tight">JACKSON KASI</span>
            </div>
            <div className="flex gap-8 pointer-events-auto">
                {['Index', 'Work', 'Contact'].map((item, i) => (
                    <a key={item} href={`#${item.toLowerCase()}`} className="group flex flex-col items-center gap-1">
                        <span className="font-mono text-[10px] text-neutral-500 tracking-widest">0{i + 1}</span>
                        <span className="text-sm uppercase tracking-widest font-light hover:text-red-500 transition-colors">{item}</span>
                    </a>
                ))}
            </div>
        </nav>
    );
};
