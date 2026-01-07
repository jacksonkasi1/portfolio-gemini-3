// ** import lib
import { useCallback, useRef } from 'react';

// ** import utils
import { getSoundPreference } from './use-sound-preference';

type AudioContextType = AudioContext | null;

/**
 * Hook for loader animation sound effects
 * PREMIUM CINEMATIC - Designed to match the 3D Jack animation
 */
export const useLoaderSound = () => {
    const audioContextRef = useRef<AudioContextType>(null);
    const hasPlayedRef = useRef(false);

    const getAudioContext = useCallback((): AudioContextType => {
        if (audioContextRef.current) return audioContextRef.current;

        try {
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
            if (!AudioContextClass) return null;
            audioContextRef.current = new AudioContextClass();
            return audioContextRef.current;
        } catch {
            return null;
        }
    }, []);

    /**
     * METAL BAR EXTEND - Sharp "Shink!" sound for bar growing
     * Like a metal rod sliding out and locking
     */
    const playBarExtend = useCallback((startTime: number) => {
        const ctx = getAudioContext();
        if (!ctx) return;

        // Friction/Slide component (fast filtered noise)
        const bufferSize = ctx.sampleRate * 0.2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = noiseBuffer;
        const noiseGain = ctx.createGain();
        const bandpass = ctx.createBiquadFilter();
        const highpass = ctx.createBiquadFilter();

        noise.connect(bandpass);
        bandpass.connect(highpass);
        highpass.connect(noiseGain);
        noiseGain.connect(ctx.destination);

        // Rising frequency = accelerating motion
        bandpass.type = 'bandpass';
        bandpass.Q.setValueAtTime(3, startTime);
        bandpass.frequency.setValueAtTime(1500, startTime);
        bandpass.frequency.exponentialRampToValueAtTime(6000, startTime + 0.15);

        highpass.type = 'highpass';
        highpass.frequency.setValueAtTime(800, startTime);

        noiseGain.gain.setValueAtTime(0.4, startTime);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.2);

        noise.start(startTime);
        noise.stop(startTime + 0.2);

        // "Lock" click at end (mechanical stop)
        const lock = ctx.createOscillator();
        const lockGain = ctx.createGain();
        lock.connect(lockGain);
        lockGain.connect(ctx.destination);

        lock.type = 'triangle';
        lock.frequency.setValueAtTime(200, startTime + 0.12);
        lock.frequency.exponentialRampToValueAtTime(80, startTime + 0.2);

        lockGain.gain.setValueAtTime(0.3, startTime + 0.12);
        lockGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.2);

        lock.start(startTime + 0.12);
        lock.stop(startTime + 0.2);

        // High metallic ping (the "ting" overtone)
        const ping = ctx.createOscillator();
        const pingGain = ctx.createGain();
        ping.connect(pingGain);
        pingGain.connect(ctx.destination);

        ping.type = 'sine';
        ping.frequency.setValueAtTime(3500, startTime + 0.1);

        pingGain.gain.setValueAtTime(0.08, startTime + 0.1);
        pingGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);

        ping.start(startTime + 0.1);
        ping.stop(startTime + 0.4);
    }, [getAudioContext]);

    /**
     * CROSS CLANG - Heavy metal impact when bars cross
     * Two metal rods hitting each other
     */
    const playCrossClang = useCallback((startTime: number) => {
        const ctx = getAudioContext();
        if (!ctx) return;

        // Impact body (low-mid thud)
        const impact = ctx.createOscillator();
        const impactGain = ctx.createGain();
        impact.connect(impactGain);
        impactGain.connect(ctx.destination);

        impact.type = 'triangle';
        impact.frequency.setValueAtTime(180, startTime);
        impact.frequency.exponentialRampToValueAtTime(60, startTime + 0.15);

        impactGain.gain.setValueAtTime(0.5, startTime);
        impactGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.2);

        impact.start(startTime);
        impact.stop(startTime + 0.2);

        // Metal ring harmonics (what makes it sound metallic)
        const metalFreqs = [1200, 2400, 3200, 4800];
        metalFreqs.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, startTime);
            osc.frequency.exponentialRampToValueAtTime(freq * 0.95, startTime + 0.5);

            const vol = 0.12 / (i + 1);
            gain.gain.setValueAtTime(vol, startTime);
            gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.5);

            osc.start(startTime);
            osc.stop(startTime + 0.5);
        });

        // Attack transient (sharp click)
        const click = ctx.createOscillator();
        const clickGain = ctx.createGain();
        click.connect(clickGain);
        clickGain.connect(ctx.destination);

        click.type = 'square';
        click.frequency.setValueAtTime(1000, startTime);

        clickGain.gain.setValueAtTime(0.3, startTime);
        clickGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.02);

        click.start(startTime);
        click.stop(startTime + 0.02);
    }, [getAudioContext]);

    /**
     * MECHANICAL ROTATION - Servo/motor sound during tumble
     */
    const playRotation = useCallback((startTime: number, duration: number = 1.0) => {
        const ctx = getAudioContext();
        if (!ctx) return;

        // Motor hum
        const motor = ctx.createOscillator();
        const motorGain = ctx.createGain();
        const motorFilter = ctx.createBiquadFilter();

        motor.connect(motorFilter);
        motorFilter.connect(motorGain);
        motorGain.connect(ctx.destination);

        motor.type = 'sawtooth';
        motor.frequency.setValueAtTime(80, startTime);
        motor.frequency.linearRampToValueAtTime(120, startTime + duration * 0.5);
        motor.frequency.linearRampToValueAtTime(60, startTime + duration);

        motorFilter.type = 'lowpass';
        motorFilter.frequency.setValueAtTime(400, startTime);

        motorGain.gain.setValueAtTime(0, startTime);
        motorGain.gain.linearRampToValueAtTime(0.08, startTime + 0.1);
        motorGain.gain.setValueAtTime(0.08, startTime + duration * 0.8);
        motorGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

        motor.start(startTime);
        motor.stop(startTime + duration);
    }, [getAudioContext]);

    /**
     * HEAVY LANDING - Deep impactful thud when jack lands
     */
    const playLanding = useCallback((startTime: number) => {
        const ctx = getAudioContext();
        if (!ctx) return;

        // Sub bass impact
        const sub = ctx.createOscillator();
        const subGain = ctx.createGain();
        sub.connect(subGain);
        subGain.connect(ctx.destination);

        sub.type = 'sine';
        sub.frequency.setValueAtTime(80, startTime);
        sub.frequency.exponentialRampToValueAtTime(30, startTime + 0.4);

        subGain.gain.setValueAtTime(0.6, startTime);
        subGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);

        sub.start(startTime);
        sub.stop(startTime + 0.4);

        // Mid punch
        const mid = ctx.createOscillator();
        const midGain = ctx.createGain();
        mid.connect(midGain);
        midGain.connect(ctx.destination);

        mid.type = 'triangle';
        mid.frequency.setValueAtTime(150, startTime);
        mid.frequency.exponentialRampToValueAtTime(50, startTime + 0.15);

        midGain.gain.setValueAtTime(0.35, startTime);
        midGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.15);

        mid.start(startTime);
        mid.stop(startTime + 0.15);

        // Resonant metal ring from impact
        const ring = ctx.createOscillator();
        const ringGain = ctx.createGain();
        ring.connect(ringGain);
        ringGain.connect(ctx.destination);

        ring.type = 'sine';
        ring.frequency.setValueAtTime(800, startTime);

        ringGain.gain.setValueAtTime(0.1, startTime);
        ringGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.6);

        ring.start(startTime);
        ring.stop(startTime + 0.6);
    }, [getAudioContext]);

    /**
     * TEXT WHOOSH - Smooth air sweep for text sliding in
     */
    const playTextWhoosh = useCallback((startTime: number) => {
        const ctx = getAudioContext();
        if (!ctx) return;

        const duration = 0.8;

        // Filtered noise sweep
        const bufferSize = ctx.sampleRate * duration;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = noiseBuffer;
        const noiseGain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(ctx.destination);

        filter.type = 'bandpass';
        filter.Q.setValueAtTime(1, startTime);
        filter.frequency.setValueAtTime(300, startTime);
        filter.frequency.exponentialRampToValueAtTime(2000, startTime + duration * 0.4);
        filter.frequency.exponentialRampToValueAtTime(500, startTime + duration);

        noiseGain.gain.setValueAtTime(0, startTime);
        noiseGain.gain.linearRampToValueAtTime(0.15, startTime + duration * 0.2);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

        noise.start(startTime);
        noise.stop(startTime + duration);
    }, [getAudioContext]);

    /**
     * ZOOM BASS DROP - Deep dramatic sweep for final zoom
     */
    const playZoomDrop = useCallback((startTime: number) => {
        const ctx = getAudioContext();
        if (!ctx) return;

        const duration = 0.8;

        // Deep bass sweep down
        const bass = ctx.createOscillator();
        const bassGain = ctx.createGain();
        const bassFilter = ctx.createBiquadFilter();

        bass.connect(bassFilter);
        bassFilter.connect(bassGain);
        bassGain.connect(ctx.destination);

        bass.type = 'sine';
        bass.frequency.setValueAtTime(100, startTime);
        bass.frequency.exponentialRampToValueAtTime(25, startTime + duration);

        bassFilter.type = 'lowpass';
        bassFilter.frequency.setValueAtTime(200, startTime);

        bassGain.gain.setValueAtTime(0.5, startTime);
        bassGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

        bass.start(startTime);
        bass.stop(startTime + duration);

        // High frequency shimmer (adds drama)
        const shimmer = ctx.createOscillator();
        const shimmerGain = ctx.createGain();
        shimmer.connect(shimmerGain);
        shimmerGain.connect(ctx.destination);

        shimmer.type = 'sine';
        shimmer.frequency.setValueAtTime(4000, startTime);
        shimmer.frequency.exponentialRampToValueAtTime(1000, startTime + duration * 0.3);

        shimmerGain.gain.setValueAtTime(0.06, startTime);
        shimmerGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration * 0.3);

        shimmer.start(startTime);
        shimmer.stop(startTime + duration * 0.3);
    }, [getAudioContext]);

    /**
     * Play the complete loader sound sequence
     * Matched to animation timeline from loader.tsx
     */
    const playLoaderSequence = useCallback(() => {
        if (hasPlayedRef.current) return;
        if (!getSoundPreference()) return;

        const ctx = getAudioContext();
        if (!ctx) return;

        hasPlayedRef.current = true;
        const now = ctx.currentTime;

        // TIMELINE MATCHING loader.tsx (5.5s total phase 1):

        // 0.0s: Rise Start (Dot -> Line)
        // Sound: Sharp extend immediately
        playBarExtend(now + 0.1);

        // 0.9s: Cross Turn (X Shape forms)
        // Sound: Clang hits exactly when shape snaps
        playCrossClang(now + 0.9);

        // 1.8s: Reversal + Jack (3rd bar appears)
        // Sound: 3rd bar extend
        playBarExtend(now + 1.8);

        // 2.8s - 4.2s: Tumble
        // Sound: Motor/Windup sound starts as it begins tumbling
        playRotation(now + 2.8, 1.4);

        // 4.1s - 4.2s: Landing Impact (Visual lands at 4.2s)
        // Sound: Hit slightly before fully stopped for weight feel
        playLanding(now + 4.15);

        // 4.2s: Text Reveal starts
        // Sound: Whoosh aligned with text slide start
        playTextWhoosh(now + 4.2);

        // 5.5s: Zoom
        // Sound: Deep bass drop on transition
        playZoomDrop(now + 5.5);

    }, [
        getAudioContext,
        playBarExtend,
        playCrossClang,
        playRotation,
        playLanding,
        playTextWhoosh,
        playZoomDrop
    ]);

    return { playLoaderSequence };
};
