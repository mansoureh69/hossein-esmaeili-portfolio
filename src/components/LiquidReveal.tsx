import { usePortfolio } from '../i18n/LanguageContext';
import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';
export default function LiquidReveal() {
    
    const { profile } = usePortfolio();
    const ref = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const reduced = useReducedMotion();
    useEffect(() => {
        if (reduced || !matchMedia('(hover: hover) and (pointer: fine)').matches)
            return;
        const container = ref.current!, canvas = canvasRef.current!;
        if (!canvas.getContext('2d')) return;
        const ctx = canvas.getContext('2d')!;
        const cover = document.createElement('canvas'), coverCtx = cover.getContext('2d')!;
        const brush = document.createElement('canvas'), brushCtx = brush.getContext('2d')!;
        const photo = new Image();
        let disposed = false, frame = 0, dpr = 1, radius = 143, diameter = 286, idle = 121;
        let last: {
            x: number;
            y: number;
        } | null = null;
        let points: {
            x: number;
            y: number;
        }[] = [];
        function size() {
            const rect = container.getBoundingClientRect();
            dpr = Math.min(devicePixelRatio, 2);
            canvas.width = cover.width = Math.round(rect.width * dpr);
            canvas.height = cover.height = Math.round(rect.height * dpr);
            radius = 143 * dpr;
            diameter = Math.ceil(radius * 2);
            brush.width = brush.height = diameter;
            last = null;
            points = [];
            if (!photo.naturalWidth)
                return;
            const scale = Math.max(cover.width / photo.width, cover.height / photo.height), w = photo.width * scale, h = photo.height * scale;
            coverCtx.clearRect(0, 0, cover.width, cover.height);
            coverCtx.drawImage(photo, (cover.width - w) / 2, (cover.height - h) / 2, w, h);
        }
        const move = (event: PointerEvent) => {
            if (!photo.naturalWidth || event.pointerType === 'touch')
                return;
            const rect = container.getBoundingClientRect(), x = (event.clientX - rect.left) * dpr, y = (event.clientY - rect.top) * dpr;
            if (x < -radius || y < -radius || x > canvas.width + radius || y > canvas.height + radius) {
                last = null;
                return;
            }
            if (last) {
                const n = Math.min(Math.ceil(Math.hypot(x - last.x, y - last.y) / Math.max(radius * .3, 1)), 60);
                for (let i = 1; i <= n; i++)
                    points.push({ x: last.x + (x - last.x) * i / n, y: last.y + (y - last.y) * i / n });
            }
            else
                points.push({ x, y });
            last = { x, y };
            if (!frame) frame = requestAnimationFrame(tick);
        };
        function stamp(x: number, y: number) {
            const c = diameter / 2;
            brushCtx.clearRect(0, 0, diameter, diameter);
            brushCtx.globalCompositeOperation = 'source-over';
            const gradient = brushCtx.createRadialGradient(c, c, 0, c, c, c);
            gradient.addColorStop(0, '#fff');
            gradient.addColorStop(.55, 'rgba(255,255,255,.82)');
            gradient.addColorStop(1, 'rgba(255,255,255,0)');
            brushCtx.fillStyle = gradient;
            brushCtx.fillRect(0, 0, diameter, diameter);
            brushCtx.globalCompositeOperation = 'source-in';
            brushCtx.drawImage(cover, x - c, y - c, diameter, diameter, 0, 0, diameter, diameter);
            ctx.globalCompositeOperation = 'source-over';
            ctx.drawImage(brush, x - c, y - c);
        }
        function tick() {
            frame = 0;
            const drawing = points.length > 0;
            idle = drawing ? 0 : idle + 1;
            if (idle > 120)
                return;
            const fade = drawing ? .016 : Math.min(.016 + idle * .004, .5);
            ctx.globalCompositeOperation = 'destination-out';
            ctx.fillStyle = `rgba(0,0,0,${fade})`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            points.forEach(p => stamp(p.x, p.y));
            points = [];
            if (idle === 120) ctx.clearRect(0, 0, canvas.width, canvas.height);
            else frame = requestAnimationFrame(tick);
        }
        photo.onload = () => {
            if (!disposed)
                size();
        };
        photo.src = profile.heroImage;
        const observer = new ResizeObserver(size);
        observer.observe(container);
        const hero = container.parentElement!;
        const leave = () => { last = null; };
        hero.addEventListener('pointermove', move, { passive: true });
        hero.addEventListener('pointerleave', leave);
        return () => { disposed = true; photo.onload = null; observer.disconnect(); hero.removeEventListener('pointermove', move); hero.removeEventListener('pointerleave', leave); cancelAnimationFrame(frame); };
    }, [reduced, profile.heroImage]);
    return <div className="hero-image" ref={ref}><img src={profile.heroImage} alt="" width={2200} height={1228} fetchPriority="high" decoding="async"/><div className="hero-scrim"/><canvas ref={canvasRef} aria-hidden="true"/></div>;
}
