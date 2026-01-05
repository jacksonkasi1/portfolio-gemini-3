import { useState } from 'react';
import { AnimatePresence, LayoutGroup } from 'framer-motion';

// Hooks


// Components - UI
import { CustomCursor } from './components/ui/custom-cursor';

// Components - Layout
import { Navbar } from './components/layout/navbar';
import { Footer } from './components/layout/footer';
import { Loader } from './components/layout/loader';

// Components - Sections
import { Hero } from './components/sections/hero';
import { ProjectGallery } from './components/sections/project-gallery';
import { AboutSpecs } from './components/sections/about-specs';

const App = () => {
    // Phase Control
    // 0: Initial (+)
    // 1: Rotate (+) -> (x)
    // 2: Reveal (*) + Text
    // 3: Zoom In (White bg expands)
    // 4: Land (Hero text settles)
    const [loading, setLoading] = useState(true);

    const handleLoaderComplete = () => {
        setLoading(false);
    };

    // Needed for CustomCursor to have access to mouse position if it was passed down, 
    // but CustomCursor uses the hook internally now.
    // However, we might want to keep useMousePosition usage here if we had other global needs.
    // const mousePosition = useMousePosition();

    return (
        <div className="bg-black min-h-screen text-white font-sans overflow-x-hidden relative cursor-none">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;900&family=JetBrains+Mono:wght@300;400&display=swap');
                :root { --font-sans: 'Inter', sans-serif; --font-mono: 'JetBrains Mono', monospace; }
                body { font-family: var(--font-sans); background: #000; }
                .font-mono { font-family: var(--font-mono); }
                .text-outline { -webkit-text-stroke: 1px rgba(255,255,255,0.5); color: transparent; }
                .text-outline:hover { -webkit-text-stroke: 1px rgba(255,255,255,1); }
            `}</style>

            <div className="noise-overlay" />
            <CustomCursor />

            <LayoutGroup>
                <AnimatePresence>
                    {loading && <Loader key="loader" onComplete={handleLoaderComplete} />}
                </AnimatePresence>

                {!loading && (
                    <div key="content">
                        <Navbar />
                        <div className="fixed left-6 top-1/2 -translate-y-1/2 h-[40vh] w-[1px] bg-neutral-900 hidden md:block" />
                        <div className="fixed right-6 top-1/2 -translate-y-1/2 h-[40vh] w-[1px] bg-neutral-900 hidden md:block" />

                        <main>
                            <Hero />
                            <ProjectGallery />
                            <AboutSpecs />
                            <Footer />
                        </main>
                    </div>
                )}
            </LayoutGroup>
        </div>
    );
};

export default App;
