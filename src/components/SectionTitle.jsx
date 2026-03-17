import React from 'react'
import { motion } from 'framer-motion'
import { fadeInUp } from '../utils/animations'

export default function SectionTitle({ eyebrow, title, subtitle, light = false }) {
  return (
    <motion.div variants={fadeInUp} className="text-center mb-14 sm:mb-20">
      {eyebrow && (
        <span className="inline-block text-gold-400 text-xs font-bold tracking-[0.25em] uppercase mb-4 px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/5">
          {eyebrow}
        </span>
      )}
      <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-4 ${light ? 'text-[#4B2E2B]' : 'text-[#4B2E2B]'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-base sm:text-lg max-w-2xl mx-auto leading-relaxed ${light ? 'text-[#C08552]' : 'text-[#C08552]'}`}>
          {subtitle}
        </p>
      )}
      <div className="mt-6 flex justify-center">
        <div className="h-px w-16 bg-gold-500/60 rounded-full" />
        <div className="h-px w-4 bg-gold-500 rounded-full mx-1" />
        <div className="h-px w-16 bg-gold-500/60 rounded-full" />
      </div>
    </motion.div>
  )
}
