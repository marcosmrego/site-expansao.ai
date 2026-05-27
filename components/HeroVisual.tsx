"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
  animate,
} from "framer-motion";

export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 72, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 72, damping: 20 });

  const rotateY = useTransform(springX, [-0.5, 0.5], [-11, 11]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);

  const [signal, setSignal] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, 42, {
      duration: 1.5,
      delay: 0.5,
      ease: "easeOut",
      onUpdate: (v) => setSignal(Math.round(v)),
    });
    return controls.stop;
  }, [isInView]);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function onMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className="hero-visual"
      aria-hidden="true"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
      }}
    >
      <div className="orb orb-main" />
      <div className="orb orb-soft" />

      <div className="node n1" />
      <div className="node n2" />
      <div className="node n3" />
      <div className="node n4" />
      <div className="node n5" />

      <div className="line l1" />
      <div className="line l2" />
      <div className="line l3" />

      <div className="visual-card visual-card-a">
        <span>Signal</span>
        <strong>+{signal}%</strong>
      </div>

      <div className="visual-card visual-card-b">
        <span>Automation</span>
        <strong>24/7</strong>
      </div>

      <div className="visual-ring" />
      <div className="visual-ring-outer" />
    </motion.div>
  );
}
