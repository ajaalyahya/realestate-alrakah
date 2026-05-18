import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, Globe } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { t, language, toggleLanguage } = useLanguage()

  const navLinks = [
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.units'), href: '#units' },
    { label: t('nav.gallery'), href: '#gallery' },
    { label: t('nav.location'), href: '#location' },
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass-dark shadow-2xl shadow-black/40 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="flex flex-col items-center">
            <span className="text-2xl font-black text-white leading-none">{t('nav.logo_title')}</span>
            <span className="text-[10px] text-white tracking-widest mt-0.5">{t('nav.logo_subtitle')}</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-sm text-stone-200 hover:text-gold-400 transition-colors duration-200 font-medium"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA & Lang Toggle */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 text-sm font-semibold text-stone-200 hover:text-white transition-colors bg-white/5 rounded-full px-3 py-1.5"
            >
              <Globe size={16} />
              <span className="mb-0.5">{language === 'ar' ? 'EN' : 'عربي'}</span>
            </button>
            <a
              href="tel:+966534118777"
              className="flex items-center gap-2 text-sm text-white font-semibold hover:text-gold-300 transition-colors ms-3"
            >
              <Phone size={15} />
              <span className="dir-ltr inline-block text-left whitespace-nowrap">
                0534118777
              </span>
            </a>
            <button
              onClick={() => handleNavClick('#contact')}
              className="bg-[#171717] hover:bg-gold-400 text-white font-bold text-sm px-5 py-2.5 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-gold-500/30"
            >
              {t('nav.book_now')}
            </button>
          </div>

          {/* Mobile controls */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="text-sm font-bold text-stone-300 hover:text-white transition-colors"
            >
              {language === 'ar' ? 'EN' : 'عربي'}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-stone-300 hover:text-gold-400 transition-colors p-1"
              aria-label="Toggle Menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[64px] z-40 glass-dark border-t border-gold-500/10 lg:hidden"
          >
            <nav className="flex flex-col py-4 px-6 gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-start text-base text-stone-300 hover:text-gold-400 font-medium py-3 border-b border-white/5 transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <a
                href="tel:+966534118777"
                className="flex items-center gap-2 text-base text-white font-semibold py-3 border-b border-white/5 transition-colors"
              >
                <Phone size={16} className="text-gold-400" />
                <span className="dir-ltr text-left">
                  0534118777
                </span>
              </a>
              <button
                onClick={() => handleNavClick('#contact')}
                className="mt-4 bg-gold-500 text-stone-950 font-bold text-base px-5 py-3 rounded-full w-full"
              >
                {t('nav.book_now')}
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
