'use client';
import Link from 'next/link';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import SmartImage from './SmartImage';

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  return (
    <section ref={ref} className="relative min-h-[92vh] flex items-end overflow-hidden pt-16">
      <motion.div style={reduce ? undefined : { y }} className="absolute inset-0 -z-10">
        <SmartImage
          src="https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=2000&q=85"
          alt="A premium minimalist workspace with a wooden desk, ergonomic chair and warm lighting"
          className="h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/40 to-ink/10" />
      </motion.div>

      <motion.div style={reduce ? undefined : { opacity }} className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pb-16 md:pb-24 text-cream">
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="uppercase tracking-[0.3em] text-xs text-cream/70 mb-6"
        >
          Design your space · Elevate your productivity
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.95] max-w-4xl"
        >
          Your Workspace.<br />
          Your Productivity.<br />
          <span className="text-sage">Your Zen.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 max-w-xl text-cream/80 text-base sm:text-lg leading-relaxed"
        >
          Discover thoughtfully designed workspace essentials that bring comfort, organisation and productivity into your everyday life.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-10 flex flex-wrap gap-3"
        >
          <Link href="/shop" className="group inline-flex items-center gap-2 bg-cream text-ink px-7 py-3.5 rounded-full font-medium hover:bg-sage hover:text-cream transition-all">
            Explore Collection <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/shop?sort=popularity" className="inline-flex items-center gap-2 border border-cream/40 text-cream px-7 py-3.5 rounded-full font-medium hover:bg-cream/10 transition-colors">
            Shop Bestsellers
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}