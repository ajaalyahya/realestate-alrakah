import React from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { staggerContainer, fadeInUp, scaleIn } from '../utils/animations'
import SectionTitle from '../components/SectionTitle'
import rakSal from '../../src/assets/images/rakSal.png'
import rakBed from '../../src/assets/images/rakBed.png'
import rakKat from '../../src/assets/images/rakKit.png'
import { useLanguage } from '../context/LanguageContext'

const getUnits = (t) => [
  {
    id: 'studio',
    type: t('units.studio_type'),
    badge: t('units.studio_badge'),
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    desc: t('units.studio_desc'),
    features: [t('units.studio_f1'), t('units.studio_f2'), t('units.studio_f3'), t('units.studio_f4')],
    img: rakSal,
    available: 8,
  },
  {
    id: 'one-bedroom',
    type: t('units.onebed_type'),
    badge: t('units.onebed_badge'),
    badgeColor: 'bg-gold-500/20 text-gold-300 border-gold-500/30',
    desc: t('units.onebed_desc'),
    features: [t('units.onebed_f1'), t('units.onebed_f2'), t('units.onebed_f3'), t('units.onebed_f4')],
    img: rakKat,
    available: 12,
  },
  {
    id: 'two-bedroom',
    type: t('units.twobed_type'),
    badge: t('units.twobed_badge'),
    badgeColor: 'bg-green-500/20 text-green-300 border-green-500/30',
    desc: t('units.twobed_desc'),
    features: [t('units.twobed_f1'), t('units.twobed_f2'), t('units.twobed_f3')],
    img: rakBed,
    available: 6,
  },
]

function UnitCard({ unit, index, t }) {
  const { ref, isInView } = useScrollAnimation(0.1)

  return (
    <motion.div
      ref={ref}
      variants={scaleIn}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ delay: index * 0.12 }}
      whileHover={{ y: -8 }}
      className="glass rounded-3xl overflow-hidden group hover:border-gold-500/30 transition-all duration-500 flex flex-col"
    >
      {/* Image */}
      <div className="relative h-56 sm:h-64 overflow-hidden">
        <img
          src={unit.img}
          alt={unit.type}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />

        {/* Badge */}
        <div className={`absolute top-4 right-4 text-xs font-bold px-3 py-1.5 rounded-full border backdrop-blur-sm ${unit.badgeColor}`} style={{ insetInlineEnd: '1rem', right: 'auto', insetInlineStart: 'auto' }}>
          {unit.badge}
        </div>

      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-black text-[#4B2E2B] group-hover:text-gold-400 transition-colors">
              {unit.type}
            </h3>
            {unit.area && <p className="text-gold-400 font-bold text-base mt-0.5">{unit.area}</p>}
          </div>
        </div>

        <p className="text-stone-400 text-sm leading-relaxed mb-5">{unit.desc}</p>

        {/* Features list */}
        <div className="grid grid-cols-2 gap-2 mb-6 flex-1">
          {unit.features.map((f) => (
            <div key={f} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-gold-500 flex-shrink-0" />
              <span className="text-xs text-stone-400 text-start">{f}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Units() {
  const { ref, isInView } = useScrollAnimation()
  const { t } = useLanguage()
  const units = getUnits(t)

  return (
    <section id="units" className="py-24 sm:py-32 bg-[#ECE7D1] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gold-500/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <SectionTitle
            eyebrow={t('units.eyebrow')}
            title={t('units.title')}
            subtitle={t('units.subtitle')}
          />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-12">
          {units.map((unit, i) => (
            <UnitCard key={unit.id} unit={unit} index={i} t={t} />
          ))}
        </div>

        {/* Bottom note */}
        <button
          onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
          className="block mx-auto mt-12 px-6 py-3 bg-gold-500/10 hover:bg-gold-500 text-gold-400 hover:text-stone-950 border border-gold-500/30 hover:border-gold-500 font-bold text-sm rounded-2xl transition-all duration-300"
        >
          {t('units.inquire_btn')}
        </button>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-stone-500 text-sm mt-6"
        >
          {t('units.note')}
        </motion.p>
      </div>
    </section>
  )
}
