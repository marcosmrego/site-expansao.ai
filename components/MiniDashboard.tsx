"use client";

import { useEffect, useRef, useState } from "react";
import { motion, animate } from "framer-motion";

const mainPath = "M20 174 L80 148 L140 160 L200 108 L260 122 L320 72 L400 50";
const areaPath = `${mainPath} L400 210 L20 210 Z`;
const secondaryPath =
  "M20 190 L80 170 L140 178 L200 145 L260 152 L320 110 L400 88";
const secondaryArea = `${secondaryPath} L400 210 L20 210 Z`;

const dotPoints = [
  { cx: 80, cy: 148 },
  { cx: 140, cy: 160 },
  { cx: 200, cy: 108 },
  { cx: 260, cy: 122 },
  { cx: 320, cy: 72 },
  { cx: 400, cy: 50 },
];

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

function useLiveMetric(initial: number, min: number, max: number) {
  const [display, setDisplay] = useState(initial);
  const current = useRef(initial);
  const stopRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      const next = Math.round(
        clamp(current.current + (Math.random() - 0.46) * 2.5, min, max)
      );
      if (next === current.current) return;

      stopRef.current?.();
      const prev = current.current;
      current.current = next;

      const controls = animate(prev, next, {
        duration: 0.9,
        ease: "easeOut",
        onUpdate: (v) => setDisplay(Math.round(v)),
      });
      stopRef.current = controls.stop;
    }, 3200);

    return () => {
      clearInterval(id);
      stopRef.current?.();
    };
  }, [min, max]);

  return display;
}

export function MiniDashboard() {
  const automation = useLiveMetric(92, 86, 97);
  const efficiency = useLiveMetric(38, 32, 45);

  return (
    <motion.div
      className="mini-dashboard"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.72 }}
    >
      <div className="mini-dashboard-header">
        <div>
          <span>Live intelligence</span>
          <strong>Operational Pulse</strong>
        </div>

        <div className="mini-dashboard-live">
          <i />
          Ao vivo
        </div>
      </div>

      <svg viewBox="0 0 420 220" className="mini-dashboard-chart">
        <defs>
          <linearGradient id="dashLine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7A5CFF" />
            <stop offset="100%" stopColor="#5BA8FF" />
          </linearGradient>
          <linearGradient id="dashArea" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(122,92,255,.3)" />
            <stop offset="100%" stopColor="rgba(122,92,255,0)" />
          </linearGradient>
          <linearGradient id="secLine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5BA8FF" />
            <stop offset="100%" stopColor="#9a78ff" />
          </linearGradient>
          <linearGradient id="secArea" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(91,168,255,.13)" />
            <stop offset="100%" stopColor="rgba(91,168,255,0)" />
          </linearGradient>
        </defs>

        <path d={secondaryArea} fill="url(#secArea)" />
        <motion.path
          d={secondaryPath}
          fill="none"
          stroke="url(#secLine)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="4 3"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 0.3 }}
        />

        <path d={areaPath} fill="url(#dashArea)" />
        <motion.path
          d={mainPath}
          fill="none"
          stroke="url(#dashLine)"
          strokeWidth="3.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8 }}
        />

        {dotPoints.map((pt, i) => (
          <motion.circle
            key={pt.cx}
            cx={pt.cx}
            cy={pt.cy}
            r="5"
            fill="#B09AFF"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 + i * 0.08 }}
          />
        ))}
      </svg>

      <div className="mini-dashboard-metrics">
        <div>
          <strong>{automation}%</strong>
          <span>automação</span>
        </div>
        <div>
          <strong>+{efficiency}%</strong>
          <span>eficiência</span>
        </div>
        <div>
          <strong>24/7</strong>
          <span>fluxos IA</span>
        </div>
      </div>
    </motion.div>
  );
}
