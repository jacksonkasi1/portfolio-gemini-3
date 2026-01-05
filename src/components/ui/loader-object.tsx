
import React from 'react';

interface LoaderObjectProps {
    size?: number;
    thickness?: number;
    className?: string;
    color?: string;
}

export default function LoaderObject({
    size = 80,
    thickness = 16,
    className = '',
}: LoaderObjectProps) {

    // Helper to create a 3D Box (Prism)
    // Added centering styles (left: 50%, top: 50%, margins) so it centers within the relative container
    const Bar3D = ({ rotateX = 0, rotateY = 0, rotateZ = 0 }) => (
        <div
            style={{
                position: 'absolute',
                width: thickness,
                height: size * 2,
                left: '50%',
                top: '50%',
                marginLeft: -thickness / 2,
                marginTop: -size, // Height is size * 2, so half is size
                transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`,
                transformStyle: 'preserve-3d',
            }}
        >
            {/* Front Face */}
            <div className="absolute inset-0 bg-black" style={{ transform: `translateZ(${thickness / 2}px)` }} />
            {/* Back Face */}
            <div className="absolute inset-0 bg-zinc-800" style={{ transform: `translateZ(-${thickness / 2}px) rotateY(180deg)` }} />
            {/* Left Face */}
            <div className="absolute bg-zinc-900" style={{ width: thickness, height: size * 2, transform: `translateX(-${thickness / 2}px) rotateY(-90deg)` }} />
            {/* Right Face */}
            <div className="absolute bg-zinc-700" style={{ width: thickness, height: size * 2, transform: `translateX(${thickness / 2}px) rotateY(90deg)` }} />
            {/* Top Face */}
            <div className="absolute bg-zinc-600" style={{ width: thickness, height: thickness, transform: `translateY(-${thickness / 2}px) rotateX(90deg)` }} />
            {/* Bottom Face */}
            <div className="absolute bg-zinc-600" style={{ width: thickness, height: thickness, top: 'auto', bottom: 0, transform: `translateY(${thickness / 2}px) rotateX(-90deg)` }} />
        </div>
    );

    return (
        <div className={`relative preserve-3d ${className}`} style={{ width: 0, height: 0 }}>
            {/* Vertical Bar */}
            <Bar3D rotateZ={0} />

            {/* Horizontal Bar */}
            <Bar3D rotateZ={90} />

            {/* Depth Bar */}
            <Bar3D rotateX={90} />
        </div>
    );
}
