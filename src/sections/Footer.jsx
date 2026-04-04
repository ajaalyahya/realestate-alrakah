import React from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { fadeInUp, staggerContainer } from '../utils/animations'

const footerLinks = [
  { label: 'عن المشروع', href: '#about' },
  { label: 'المميزات', href: '#features' },
  { label: 'الوحدات', href: '#units' },
  { label: 'معرض الصور', href: '#gallery' },
  { label: 'الموقع', href: '#location' },
  { label: 'تواصل معنا', href: '#contact' },
]

const scrollTo = (href) => {
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function Footer() {
  const { ref, isInView } = useScrollAnimation()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#FFF8F0] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14"
        >
          {/* Brand */}
          <motion.div variants={fadeInUp} className="lg:col-span-1">
            <div className="mb-4">
              <span className="text-3xl font-black text-[#C08552]">شقق اليحيى</span>
              <div className="text-xs text-stone-500 tracking-widest mt-1">الراكة • الخبر</div>
            </div>
            <p className="text-stone-500 text-sm leading-relaxed mb-5">
              مشروع سكني فاخر يجمع بين التصميم العصري والموقع الاستراتيجي في قلب الراكة بالخبر.
            </p>
            {/* Social links placeholder */}
            <div className="flex gap-3">
              {['twitter', 'instagram', 'snapchat'].map((platform) => (
                <a
                  key={platform}
                  href={`https://${platform}.com/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={platform}
                  className="w-9 h-9 rounded-full glass flex items-center justify-center text-stone-400 hover:text-gold-400 hover:border-gold-500/30 transition-all text-xs font-bold"
                >
                  {platform === 'twitter' ? 'X' : platform === 'instagram' ? 'IG' : 'SC'}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-sm font-bold text-[#4B2E2B] mb-5 tracking-wide">روابط سريعة</h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-stone-500 hover:text-gold-400 text-sm transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-sm font-bold text-[#4B2E2B] mb-5 tracking-wide">تواصل معنا</h4>
            <ul className="space-y-3">
              <li>
                <a href="tel:+966500000000" className="text-stone-500 hover:text-gold-400 text-sm transition-colors flex items-center gap-2">
                  <span>📞</span>
                  <span dir="ltr">+966 53 411 8777</span>
                </a>
              </li>
              <li>
                <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer" className="text-stone-500 hover:text-gold-400 text-sm transition-colors flex items-center gap-2">
                  <span>💬</span>
                  <span>واتساب</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@alraki-tower.sa" className="text-stone-500 hover:text-gold-400 text-sm transition-colors flex items-center gap-2">
                  <span>📧</span>
                  <span>info@alraki-tower.sa</span>
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Address */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-sm font-bold text-[#4B2E2B] mb-5 tracking-wide">الموقع</h4>
            <address className="not-italic">
              <p className="text-stone-500 text-sm leading-relaxed mb-3">
                حي الراكة<br />
                مدينة الخبر<br />
                المنطقة الشرقية<br />
                المملكة العربية السعودية
              </p>
              <a
                href="https://maps.google.com/?q=26.3002,50.1583"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C08552] hover:text-gold-300 text-xs font-semibold transition-colors"
              >
                📍 عرض على الخريطة ←
              </a>
            </address>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="section-divider mb-6" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-stone-600 text-xs">
          <p>جميع الحقوق محفوظة © {year} برج الراقي</p>
          <p>
            تم التطوير بـ ❤️ من تَكِن
          </p>
        </div>
      </div>
    </footer>
  )
}
