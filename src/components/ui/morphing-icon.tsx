import React from 'react';
import { motion } from 'framer-motion';

export const MorphingIcon = ({ phase }: { phase: number }) => {
    const plusPath = "M12 5V19M5 12H19";
    const asteriskPath = "M12 2V22M3.34 7L20.66 17M3.34 17L20.66 7";

    return (
        <motion.svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{
                rotate: phase >= 1 ? 45 : 0,
                opacity: phase >= 3 ? 0 : 1,
                scale: phase >= 3 ? 5 : 1
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        >
            <motion.path
                d={phase >= 2 ? asteriskPath : plusPath}
                animate={{ d: phase >= 2 ? asteriskPath : plusPath }}
                transition={{ duration: 0.4, ease: "circOut" }}
            />
        </motion.svg>
    );
};
