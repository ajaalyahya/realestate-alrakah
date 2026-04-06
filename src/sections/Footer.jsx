import React from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { fadeInUp, staggerContainer } from '../utils/animations'
import { useLanguage } from '../context/LanguageContext'

const getFooterLinks = (t) => [
  { label: t('nav.about'), href: '#about' },
  { label: t('nav.features'), href: '#features' },
  { label: t('nav.units'), href: '#units' },
  { label: t('nav.gallery'), href: '#gallery' },
  { label: t('nav.location'), href: '#location' },
  { label: t('nav.contact'), href: '#contact' },
]

const scrollTo = (href) => {
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function Footer() {
  const { ref, isInView } = useScrollAnimation()
  const year = new Date().getFullYear()
  const { t, language } = useLanguage()
  const footerLinks = getFooterLinks(t)

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
              <span className="text-3xl font-black text-[#C08552]">{t('footer.brand')}</span>
              <div className="text-xs text-stone-500 tracking-widest mt-1">{t('footer.sub')}</div>
            </div>
            <p className="text-stone-500 text-sm leading-relaxed mb-5">
              {t('footer.desc')}
            </p>
            
          </motion.div>

          {/* Quick links */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-sm font-bold text-[#4B2E2B] mb-5 tracking-wide">{t('footer.links_title')}</h4>
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
            <h4 className="text-sm font-bold text-[#4B2E2B] mb-5 tracking-wide">{t('footer.contact_title')}</h4>
            <ul className="space-y-3">
              <li>
                <a href="tel:+966500000000" className="text-stone-500 hover:text-gold-400 text-sm transition-colors flex items-center gap-2 w-fit" dir="ltr">
                  <span>📞</span>
                  <span>+966 53 411 8777</span>
                </a>
              </li>
              <li>
                <a href="https://wa.me/966534118777" target="_blank" rel="noopener noreferrer" className="text-stone-500 hover:text-gold-400 text-sm transition-colors flex items-center gap-2 w-fit">
                  <span>💬</span>
                  <span>{t('footer.wa')}</span>
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Address */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-sm font-bold text-[#4B2E2B] mb-5 tracking-wide">{t('footer.loc_title')}</h4>
            <address className="not-italic">
              <p className="text-stone-500 text-sm leading-relaxed mb-3">
                {t('footer.loc_p1')}<br />
                {t('footer.loc_p2')}<br />
                {t('footer.loc_p3')}<br />
                {t('footer.loc_p4')}
              </p>
              <a
                href="https://maps.app.goo.gl/jQzRZibrya6AUQGLA"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C08552] hover:text-gold-300 text-xs font-semibold transition-colors flex items-center gap-1 w-fit"
              >
                {language === 'ar' ? '📍 عرض على الخريطة ←' : '📍 View on Map →'}
              </a>
            </address>
          </motion.div>
        </motion.div>

      </div>
    </footer>
  )
}
