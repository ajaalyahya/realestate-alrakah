import React from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { staggerContainer, fadeInUp, scaleIn } from '../utils/animations'
import SectionTitle from '../components/SectionTitle'
import { MapPin } from 'lucide-react'

const nearbyServices = [
  { icon: '🛒', title: 'مراكز التسوق', desc: 'مول الخبر على بُعد 11 دقيقة' },
  { icon: '🏥', title: 'المستشفى', desc: 'مباشرة أمام المستشفى، بموقع مميز وسهل الوصول.'  },
  { icon: '🏫', title: 'المدارس', desc: 'أفضل المدارس الدولية في محيط المشروع' },
  { icon: '🕌', title: 'المساجد', desc: 'عدة مساجد داخل الحي في مسافة قريبة' },
  { icon: '🌊', title: 'الكورنيش', desc: 'كورنيش الخبر على بُعد 7 دقائق سيارة' },
  { icon: '✈️', title: 'المطار', desc: 'مطار الدمام الدولي على بُعد 40 دقيقة' },
]

// Approximate coords for Al Rakah, Al Khobar
const MAP_LAT = 26.3002
const MAP_LNG = 50.1583

export default function Location() {
  const { ref, isInView } = useScrollAnimation()

 const mapSrc = `https://maps.google.com/maps?q=26.35122785547548,50.20700881277218&z=15&output=embed`;

  return (
    <section id="location" className="py-24 sm:py-32 bg-[#FFF8F0] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(200,168,32,0.05)_0%,_transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <SectionTitle
            eyebrow="الموقع"
            title="في قلب الراكة، الخبر"
            subtitle="موقع استراتيجي يمنحك سهولة الوصول إلى كافة الخدمات والمرافق الضرورية"
          />

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Map */}
            <motion.div variants={scaleIn} className="relative">
              <div className="rounded-3xl overflow-hidden border border-white/8 shadow-2xl shadow-black/60 aspect-[4/3]">
                <iframe
                  title="موقع برج الراقي"
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
              <div className="absolute -bottom-4 right-6 glass-dark flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-xl">
                <MapPin size={16} className="text-gold-400 flex-shrink-0" />
                <div>
                  <div className="text-white text-sm font-bold leading-tight">حي الراكة، الخبر</div>
                  <div className="text-stone-400 text-xs">المنطقة الشرقية، المملكة العربية السعودية</div>
                </div>
              </div>
            </motion.div>

            {/* Nearby services */}
            <div className="pt-4">
              <motion.h3 variants={fadeInUp} className="text-xl font-bold text-[#4B2E2B] mb-6">
                الخدمات القريبة
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
                      <div className="text-sm font-bold text-[#4B2E2B] mb-0.5">{service.title}</div>
                      <div className="text-xs text-stone-500">{service.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Open in maps CTA */}
              <motion.a
                variants={fadeInUp}
                href={`https://www.google.com/maps?q=${MAP_LAT},${MAP_LNG}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-7 text-gold-400 hover:text-gold-300 font-semibold text-sm transition-colors group"
              >
                <MapPin size={16} />
                <span>افتح في خرائط جوجل</span>
                <svg className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
