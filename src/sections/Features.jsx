import React from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { staggerContainer, fadeInUp } from '../utils/animations'
import SectionTitle from '../components/SectionTitle'
import { useLanguage } from '../context/LanguageContext'

export default function Features() {
  const { ref, isInView } = useScrollAnimation()
  const { t } = useLanguage()

  const features = [
    { icon: '📍', title: t('features.f1_title'), desc: t('features.f1_desc') },
    { icon: '🏥', title: t('features.f2_title'), desc: t('features.f2_desc') },
    { icon: '🅿️', title: t('features.f3_title'), desc: t('features.f3_desc') },
    { icon: '🛗', title: t('features.f4_title'), desc: t('features.f4_desc') },
    { icon: '💧', title: t('features.f5_title'), desc: t('features.f5_desc') },
    { icon: '🌡️', title: t('features.f6_title'), desc: t('features.f6_desc') },
  ]

  return (
    <section id="features" className="py-24 sm:py-32 bg-[#ECE7D1] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(200,168,32,0.04)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <SectionTitle
            eyebrow={t('features.eyebrow')}
            title={t('features.title')}
            subtitle={t('features.subtitle')}
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                whileHover={{ y: -4, scale: 1.02 }}
                className="glass rounded-2xl p-5 sm:p-6 hover:border-gold-500/25 transition-all duration-300 group cursor-default"
              >
                <div className="text-3xl sm:text-4xl mb-3 group-hover:scale-110 transition-transform duration-300 inline-block">
                  {feature.icon}
                </div>
                <h3 className="text-sm sm:text-base font-bold text-[#4B2E2B] mb-1.5 group-hover:text-gold-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
