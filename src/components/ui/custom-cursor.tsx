import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useMousePosition } from '../../hooks/use-mouse-position';

export const CustomCursor = () => {
    const { x, y } = useMousePosition();
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const handleMouseOver = (e: MouseEvent) => {
            if ((e.target as HTMLElement).closest('a, button, .cursor-pointer')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };
        document.addEventListener('mouseover', handleMouseOver);
        return () => document.removeEventListener('mouseover', handleMouseOver);
    }, []);

    return (
        <motion.div
            className={`custom-cursor ${isHovering ? 'hovering' : ''}`}
            animate={{ x, y }}
            transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
        />
    );
};
