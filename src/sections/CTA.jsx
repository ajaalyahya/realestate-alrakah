import React from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { staggerContainer, fadeInUp } from '../utils/animations'

const BG_IMG = 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1600&q=80'

export default function CTA({ whatsappNumber, whatsappMessage }) {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section className="relative py-28 sm:py-40 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={BG_IMG} alt="" className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-stone-950/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/40 via-stone-950/60 to-stone-950/80" />
      </div>

      {/* Decorative circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-gold-500/10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-gold-500/15 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full bg-gold-500/5 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.div variants={fadeInUp} className="flex justify-center mb-6">
            <span className="inline-block text-gold-400 text-xs font-bold tracking-[0.25em] uppercase px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/5">
              لا تفوّت الفرصة
            </span>
          </motion.div>

          <motion.h2 variants={fadeInUp} className="text-4xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6">
            <span className="text-white">ابدأ حياتك </span>
            <span className="text-[#C08552]">الفاخرة</span>
            <br />
            <span className="text-white">في شقق اليحيى </span>
          </motion.h2>

          <motion.p variants={fadeInUp} className="text-lg sm:text-xl text-stone-400 max-w-2xl mx-auto mb-4 leading-relaxed">
            الوحدات محدودة والطلب كبير — احجز وحدتك الآن وضمن مستقبلك في أرقى عقارات الخبر
          </motion.p>

          <motion.p variants={fadeInUp} className="text-[#C08552] font-bold text-base mb-10">
            ✨ عروض حصرية لحاجزي الفترة الأولى
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto bg-[#4B2E2B] hover:bg-gold-400 text-white font-black text-lg px-10 py-5 rounded-full transition-all duration-300 hover:shadow-2xl hover:shadow-gold-500/40 hover:-translate-y-1 active:scale-95"
            >
              احجز وحدتك الآن
            </button>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-3 border-2 border-white/20 hover:border-white/40 text-white font-bold text-base px-10 py-5 rounded-full transition-all duration-300 hover:bg-white/5 hover:-translate-y-1"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              تواصل واتساب
            </a>
          </motion.div>

          {/* Trust signals */}
          <motion.div variants={fadeInUp} className="mt-12 flex flex-wrap justify-center gap-6 sm:gap-10">
            {[
              { icon: '🏆', text: 'مشروع موثوق' },
              { icon: '📜', text: 'وثائق نظامية' },
              { icon: '💎', text: 'تشطيب فاخر' },
              { icon: '🤝', text: 'دعم ما بعد البيع' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-stone-400 text-sm">
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
