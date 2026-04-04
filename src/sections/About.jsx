import React from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { staggerContainer, fadeInUp, scaleIn } from '../utils/animations'
import SectionTitle from '../components/SectionTitle'
import ABOUT_IMG from "../assets/images/rakah1.jpeg"

const highlights = [
  { icon: '🏙️', label: 'موقع استراتيجي', desc: 'في قلب الرقة بالخبر' },
  { icon: '🏥', label: 'قريب من مستشفى دلة', desc: 'مباشرة أمام المستشفى، بموقع مميز وسهل الوصول.' },
  { icon: '🌿', label: 'بيئة هادئة', desc: 'مناطق خضراء ومريحة' },
  { icon: '✨', label: 'تشطيب فاخر', desc: 'مواد عالية الجودة' },
]

export default function About() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section id="about" className="py-24 sm:py-32 bg-[#FFF8F0] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gold-500/3 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gold-500/3 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Image side */}
          <motion.div variants={scaleIn} className="relative order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/60">
              <img
                src={ABOUT_IMG}
                alt="برج الراقي - المشروع"
                loading="lazy"
                className="w-full h-[420px] sm:h-[520px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 to-transparent" />
            </div>
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5, type: 'spring' }}
              className="absolute -bottom-6 -right-4 sm:-right-8 glass-dark rounded-2xl p-5 shadow-2xl"
            >
              <div className="text-3xl font-black text-gold-400">100%</div>
              <div className="text-sm text-stone-400 mt-1">تشطيب فاخر </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.65, type: 'spring' }}
              className="absolute -top-4 -left-4 sm:-left-8 glass-dark rounded-2xl p-4 shadow-2xl"
            >
              <div className="text-2xl font-black text-gold-400">20</div>
              <div className="text-xs text-stone-400">وحدة سكنية</div>
            </motion.div>
          </motion.div>

          {/* Text side */}
          <div className="order-1 lg:order-2">
            <SectionTitle
              eyebrow="عن المشروع"
              title="شقق اليحيى"
              subtitle={null}
              className="text-blue"
            />
            <motion.p variants={fadeInUp} className="text-[#4B2E2B] text-base sm:text-lg leading-relaxed mb-6">
              شقق اليحيى مشروع سكني فاخر يقع في حي الراكة بمدينة الخبر، واحد من أكثر الأحياء حيوية وتطوراً في المنطقة الشرقية. يجمع المشروع بين التصميم العصري والتشطيبات الراقية، ليوفر لسكانه تجربة معيشية استثنائية.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-stone-400 text-base leading-relaxed mb-10">
              يتميز المشروع بموقعه الاستراتيجي قرب المراكز التجارية والخدمية، مع سهولة الوصول إلى الطرق الرئيسية. كل وحدة مصممة بعناية لتوفر أقصى درجات الراحة والخصوصية.
            </motion.p>

            {/* Highlights grid */}
            <motion.div variants={staggerContainer} className="grid grid-cols-2 gap-4">
              {highlights.map((item) => (
                <motion.div
                  key={item.label}
                  variants={fadeInUp}
                  className="glass rounded-2xl p-4 hover:border-gold-500/30 transition-colors group"
                >
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <div className="text-sm font-bold text-[#4B2E2B] group-hover:text-gold-400 transition-colors">{item.label}</div>
                  <div className="text-xs text-stone-500 mt-1">{item.desc}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
