import React from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { staggerContainer, fadeInUp, scaleIn } from '../utils/animations'
import SectionTitle from '../components/SectionTitle'
import { MapPin } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const getNearbyServices = (t) => [
  { icon: '🛒', title: t('loc.s1_title'), desc: t('loc.s1_desc') },
  { icon: '🏥', title: t('loc.s2_title'), desc: t('loc.s2_desc') },
  { icon: '🏫', title: t('loc.s3_title'), desc: t('loc.s3_desc') },
  { icon: '🕌', title: t('loc.s4_title'), desc: t('loc.s4_desc') },
  { icon: '🌊', title: t('loc.s5_title'), desc: t('loc.s5_desc') },
  { icon: '✈️', title: t('loc.s6_title'), desc: t('loc.s6_desc') },
]

// Approximate coords for Al Rakah, Al Khobar
const MAP_LAT = 26.3002
const MAP_LNG = 50.1583

export default function Location() {
  const { ref, isInView } = useScrollAnimation()
  const { t } = useLanguage()
  const nearbyServices = getNearbyServices(t)

  const mapSrc = `https://maps.google.com/maps?q=26.35122785547548,50.20700881277218&z=15&output=embed`;

  return (
    <section id="location" className="py-24 sm:py-32 bg-[#ECE7D1] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(200,168,32,0.05)_0%,_transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <SectionTitle
            eyebrow={t('loc.eyebrow')}
            title={t('loc.title')}
            subtitle={t('loc.subtitle')}
          />

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Map */}
            <motion.div variants={scaleIn} className="relative">
              <div className="rounded-3xl overflow-hidden border border-white/8 shadow-2xl shadow-black/60 aspect-[4/3]">
                <iframe
                  title={t('loc.title')}
                  src={mapSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              {/* Address pill */}
              <div className="absolute -bottom-4 bg-stone-900/90 backdrop-blur-md border border-white/10 flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-xl z-10" style={{ insetInlineEnd: '1.5rem', right: 'auto', insetInlineStart: 'auto' }}>
                <MapPin size={16} className="text-gold-400 flex-shrink-0" />
                <div>
                  <div className="text-white text-sm font-bold leading-tight">{t('loc.map_title')}</div>
                  <div className="text-stone-400 text-xs mt-0.5">{t('loc.map_sub')}</div>
                </div>
              </div>
            </motion.div>

            {/* Nearby services */}
            <div className="pt-4">
              <motion.h3 variants={fadeInUp} className="text-xl font-bold text-[#171717] mb-6">
                {t('loc.services_title')}
              </motion.h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {nearbyServices.map((service) => (
                  <motion.div
                    key={service.title}
                    variants={fadeInUp}
                    className="glass rounded-2xl p-4 flex items-start gap-4 hover:border-gold-500/20 transition-colors group"
                  >
                    <div className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                      {service.icon}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#171717] mb-0.5">{service.title}</div>
                      <div className="text-xs text-stone-500">{service.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Open in maps CTA */}
              <motion.a
                variants={fadeInUp}
                href={`https://maps.app.goo.gl/EDEQYFN6xjwD3kGa8`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-7 text-gold-400 hover:text-gold-300 font-semibold text-sm transition-colors group"
              >
                <MapPin size={16} />
                <span>{t('loc.open_maps')}</span>
                <svg className="w-4 h-4 rtl:-scale-x-100 group-hover:-translate-x-1  rtl:group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
