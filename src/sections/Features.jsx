import React from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { staggerContainer, fadeInUp } from '../utils/animations'
import SectionTitle from '../components/SectionTitle'

const features = [
  { icon: '🅿️', title: 'مواقف سيارات', desc: 'مواقف مغطاة وآمنة لجميع السكان مع خاصية الدخول الآلي' },
  { icon: '🛗', title: 'مصاعد حديثة', desc: 'مصاعدان عالي الجودة يعملان على مدار الساعة بأعلى معايير الأمان' },
  { icon: '📷', title: 'كاميرات مراقبة', desc: 'منظومة مراقبة متكاملة تغطي جميع المداخل والمناطق المشتركة' },
  { icon: '📍', title: 'موقع مميز', desc: 'قلب حي الرقة بالخبر بالقرب من كافة الخدمات والمرافق العامة' },
  { icon: '⚡', title: 'مولد كهربائي', desc: 'مولد احتياطي يضمن استمرارية الكهرباء دون انقطاع' },
  { icon: '💧', title: 'خزانات مياه', desc: 'نظام تخزين مياه متطور يضمن إمداداً مستمراً وآمناً' },
  { icon: '🌡️', title: 'تكييف مركزي', desc: 'نظام تبريد مركزي موفر للطاقة بكفاءة عالية' },
  { icon: '🏋️', title: 'صالة رياضية', desc: 'صالة مجهزة بأحدث الأجهزة الرياضية للسكان' },
  { icon: '🔥', title: 'نظام إطفاء', desc: 'منظومة إطفاء حريق تلقائية تلبي أعلى المعايير الدولية' },
  { icon: '📦', title: 'غرفة تخزين', desc: 'وحدات تخزين خاصة لكل شقة في البدروم' },
  { icon: '🌿', title: 'مناطق خضراء', desc: 'حدائق ومناطق جلوس خارجية لأجواء هادئة ومريحة' },
  { icon: '🏢', title: 'لوبي فاخر', desc: 'مدخل رئيسي بتصميم راقٍ يعكس مستوى المشروع' },
]

export default function Features() {
  const { ref, isInView } = useScrollAnimation()

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
            eyebrow="مميزات المشروع"
            title="كل ما تحتاجه في مكان واحد"
            subtitle="وفرنا لك كل التسهيلات والمرافق التي تجعل حياتك اليومية أكثر راحة وأماناً"
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
