import React from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { staggerContainer, fadeInUp, scaleIn } from '../utils/animations'
import SectionTitle from '../components/SectionTitle'

const units = [
  {
    id: 'studio',
    type: 'استوديو',
    area: '٤٥ م²',
    price: 'ابتداءً من ٢٨٠,٠٠٠ ر.س',
    badge: 'مناسب للعزاب',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    desc: 'وحدة عصرية مدمجة بتصميم ذكي يستغل المساحة بشكل أمثل، مثالية للأفراد والمهنيين.',
    features: ['تشطيب كامل', 'مطبخ مجهز', 'حمام فاخر', 'نافذة بانورامية'],
    img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=700&q=75',
    available: 8,
  },
  {
    id: 'one-bedroom',
    type: 'غرفة وصالة',
    area: '٧٥ م²',
    price: 'ابتداءً من ٤٢٠,٠٠٠ ر.س',
    badge: 'الأكثر طلباً',
    badgeColor: 'bg-gold-500/20 text-gold-300 border-gold-500/30',
    desc: 'تصميم عائلي مريح يمنحك الخصوصية والرحابة في نفس الوقت، مناسب للأزواج.',
    features: ['غرفة نوم رئيسية', 'صالة واسعة', 'مطبخ مفتوح', 'تراس خاص'],
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=700&q=75',
    available: 12,
  },
  {
    id: 'two-bedroom',
    type: 'غرفتان وصالة',
    area: '١١٠ م²',
    price: 'ابتداءً من ٥٩٠,٠٠٠ ر.س',
    badge: 'مساحة عائلية',
    badgeColor: 'bg-green-500/20 text-green-300 border-green-500/30',
    desc: 'وحدة فسيحة ومثالية للعائلات الصغيرة، توفر مساحة كافية للراحة والخصوصية.',
    features: ['غرفتا نوم', 'صالة كبيرة', 'غرفة خادمة', 'مطبخ مستقل'],
    img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=700&q=75',
    available: 6,
  },
]

function UnitCard({ unit, index }) {
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
        <div className={`absolute top-4 right-4 text-xs font-bold px-3 py-1.5 rounded-full border backdrop-blur-sm ${unit.badgeColor}`}>
          {unit.badge}
        </div>

        {/* Available units */}
        <div className="absolute bottom-4 left-4 glass-dark text-xs text-stone-300 px-3 py-1.5 rounded-full">
          متاح: <span className="text-gold-400 font-bold">{unit.available}</span> وحدة
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-black text-white group-hover:text-gold-400 transition-colors">
              {unit.type}
            </h3>
            <p className="text-gold-400 font-bold text-base mt-0.5">{unit.area}</p>
          </div>
          <div className="text-right">
            <div className="text-xs text-stone-500 mb-0.5">السعر</div>
            <div className="text-sm font-bold text-white leading-tight">{unit.price}</div>
          </div>
        </div>

        <p className="text-stone-400 text-sm leading-relaxed mb-5">{unit.desc}</p>

        {/* Features list */}
        <div className="grid grid-cols-2 gap-2 mb-6 flex-1">
          {unit.features.map((f) => (
            <div key={f} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-gold-500 flex-shrink-0" />
              <span className="text-xs text-stone-400">{f}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
          className="w-full bg-gold-500/10 hover:bg-gold-500 text-gold-400 hover:text-stone-950 border border-gold-500/30 hover:border-gold-500 font-bold text-sm py-3 rounded-2xl transition-all duration-300"
        >
          استفسر عن هذه الوحدة
        </button>
      </div>
    </motion.div>
  )
}

export default function Units() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section id="units" className="py-24 sm:py-32 bg-[#FFF8F0] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gold-500/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <SectionTitle
            eyebrow="الوحدات السكنية"
            title="اختر وحدتك المثالية"
            subtitle="نوفر تشكيلة متنوعة من الوحدات السكنية تناسب مختلف الاحتياجات والميزانيات"
          />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {units.map((unit, i) => (
            <UnitCard key={unit.id} unit={unit} index={i} />
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-stone-500 text-sm mt-10"
        >
          * الأسعار قابلة للتفاوض • تواصل معنا للحصول على أفضل عرض
        </motion.p>
      </div>
    </section>
  )
}
