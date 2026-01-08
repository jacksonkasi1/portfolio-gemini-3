import { useState } from 'react';
import { AnimatePresence, LayoutGroup } from 'framer-motion';

// Hooks


// Components - UI
import { CustomCursor } from './components/ui/custom-cursor';

// Components - Layout
import { Navbar } from './components/layout/navbar';
import { Footer } from './components/layout/footer';
import { Loader } from './components/layout/loader';
import { SmoothScroll } from './components/layout/smooth-scroll';

// Components - Sections
import { Hero } from './components/sections/hero';
import { Manifesto } from './components/sections/manifesto';
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
        <div className="min-h-screen relative selection:bg-[var(--color-accent)] selection:text-[var(--color-bg)]">
            <div className="overflow-x-hidden">
                {/* Global styles are now handled in styles.css */}
                <div className="noise-overlay" />
                <CustomCursor />
                <SmoothScroll />

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
                                <Manifesto />
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
