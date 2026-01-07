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
import { Philosophy } from './components/sections/philosophy';
import { ProjectGallery } from './components/sections/project-gallery';
import { Process } from './components/sections/process';
import { AboutSpecs } from './components/sections/about-specs';
import { Testimonials } from './components/sections/testimonials';
// import { Contact } from './components/sections/contact';

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

    return (
        <div className="bg-black min-h-screen text-white font-sans relative cursor-none">
            <div className="overflow-x-hidden">
                <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Inter:wght@200;300;400;500&family=JetBrains+Mono:wght@300;400&display=swap');
                
                :root { 
                    --font-display: 'Syne', sans-serif;
                    --font-sans: 'Inter', sans-serif; 
                    --font-mono: 'JetBrains Mono', monospace;
                    
                    /* Color Palette - Reverted to Red */
                    --color-void: #050505;
                    --color-stark: #FAFAFA;
                    --color-accent: #FF3333; /* Bold Red */
                    --color-muted: #666666;
                }
                
                body { 
                    font-family: var(--font-sans); 
                    background: var(--color-void);
                    color: var(--color-stark);
                }
                
                h1, h2, h3, h4, .font-display { font-family: var(--font-display); }
                .font-mono { font-family: var(--font-mono); }
                
                .text-outline { -webkit-text-stroke: 1px rgba(255,255,255,0.3); color: transparent; }
                .text-outline:hover { -webkit-text-stroke: 1px var(--color-accent); }
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
                                <Philosophy />
                                <ProjectGallery />
                                <Process />
                                <AboutSpecs />
                                <Testimonials />
                                {/* <Contact /> */}
                                <Footer />
                            </main>
                        </div>
                    )}
                </LayoutGroup>
            </div>
        </div>
    );
};

export default App;
