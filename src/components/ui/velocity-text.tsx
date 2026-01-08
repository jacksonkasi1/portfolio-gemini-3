// ** import core
import { useRef, ReactNode } from "react";
import {
    motion,
    useScroll,
    useVelocity,
    useTransform,
    useSpring,
    useMotionValue,
    useAnimationFrame
} from "framer-motion";

// Helper for wrapping
const wrap = (min: number, max: number, v: number) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

interface ParallaxProps {
    children: string;
    baseVelocity: number;
    className?: string; // Add className prop for styling flexibility
}

export function ParallaxText({ children, baseVelocity = 100, className = "" }: ParallaxProps) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });

    // Transform scroll velocity to skew/velocity
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false
    });

    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

    const directionFactor = useRef<number>(1);

    useAnimationFrame((_, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

        // Dynamic velocity change based on scroll
        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();

        baseX.set(baseX.get() + moveBy);
    });

    return (
        <div className={`parallax flex whitespace-nowrap overflow-hidden letter-spacing-[-2px] leading-[0.8] m-0 ${className}`}>
            {/* Repeating text for seamless loop */}
            <motion.div className="scroller flex whitespace-nowrap flex-nowrap" style={{ x }}>
                <span className="block mr-8">{children}</span>
                <span className="block mr-8">{children}</span>
                <span className="block mr-8">{children}</span>
                <span className="block mr-8">{children}</span>
            </motion.div>
        </div>
    );
}

// ** skew text component
interface VelocityTextProps {
    children: ReactNode;
    className?: string;
    skewIntensity?: number;
}

export const VelocityText = ({ children, className = "", skewIntensity = 0.5 }: VelocityTextProps) => {
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 300
    });

    const skewX = useTransform(smoothVelocity, [-1000, 1000], [-10 * skewIntensity, 10 * skewIntensity]);
    const scaleY = useTransform(smoothVelocity, [-1000, 0, 1000], [1.1, 1, 1.1]);

    return (
        <motion.div style={{ skewX, scaleY }} className={`origin-bottom ${className}`}>
            {children}
        </motion.div>
    );
};
