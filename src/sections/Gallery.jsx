import React, { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { staggerContainer, fadeInUp } from '../utils/animations'
import SectionTitle from '../components/SectionTitle'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'

import rakSal from '../../src/assets/images/rakSal.png'
import rakBed from '../../src/assets/images/rakBed.png'
import rakKit from '../../src/assets/images/rakKit.png'
import rakTol from '../../src/assets/images/rakTol.png'
import rakEnt from '../../src/assets/images/rakEnt.png'
import HERO_IMG from '../assets/images/rakah1.jpeg'

const galleryImages = [
  {
    id: 1,
    src: HERO_IMG,
    thumb: HERO_IMG,
    caption: 'الواجهة الخارجية للمشروع',
    span: 'col-span-2 row-span-2',
  },
  {
    id: 2,
    src: rakSal,
    thumb: rakSal,
    caption: 'غرفة المعيشة',
    span: '',
  },
  {
    id: 3,
    src: rakKit,
    thumb: rakKit,
    caption: 'المطبخ المجهز',
    span: '',
  },
  {
    id: 4,
    src: rakBed,
    thumb: rakBed,
    caption: 'غرفة النوم الرئيسية',
    span: '',
  },
  {
    id: 5,
    src: rakTol,
    thumb: rakTol,
    caption: 'الحمام الفاخر',
    span: '',
  },
  {
    id: 6,
    src: rakEnt,
    thumb: rakEnt,
    caption: 'المدخل الرئيسي',
    span: 'col-span-2',
  },
]

function Lightbox({ images, currentIndex, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onNext()
      if (e.key === 'ArrowRight') onPrev()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onPrev, onNext])

  const image = images[currentIndex]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] lightbox-overlay bg-black/90 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/70 hover:text-white transition-colors z-10 glass rounded-full p-2"
        aria-label="إغلاق"
      >
        <X size={22} />
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/60 text-sm glass px-4 py-1.5 rounded-full">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors glass rounded-full p-3 z-10"
        aria-label="السابق"
      >
        <ChevronRight size={22} />
      </button>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext() }}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors glass rounded-full p-3 z-10"
        aria-label="التالي"
      >
        <ChevronLeft size={22} />
      </button>

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.3 }}
          className="relative max-w-5xl max-h-[85vh] w-full mx-16 sm:mx-24"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={image.src}
            alt={image.caption}
            className="w-full h-full object-contain max-h-[80vh] rounded-xl"
          />
          {image.caption && (
            <div className="absolute bottom-0 left-0 right-0 text-center py-3 text-white/80 text-sm glass rounded-b-xl">
              {image.caption}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Thumbnails strip */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((img, i) => (
          <button
            key={img.id}
            onClick={(e) => { e.stopPropagation(); /* jump to index */ }}
            className={`w-10 h-10 rounded-lg overflow-hidden border-2 transition-all ${
              i === currentIndex ? 'border-gold-400 scale-110' : 'border-white/20 opacity-60'
            }`}
          >
            <img src={img.thumb} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </motion.div>
  )
}

export default function Gallery() {
  const { ref, isInView } = useScrollAnimation()
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const openLightbox = useCallback((i) => setLightboxIndex(i), [])
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])
  const prev = useCallback(() => setLightboxIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length), [])
  const next = useCallback(() => setLightboxIndex((i) => (i + 1) % galleryImages.length), [])

  return (
    <section id="gallery" className="py-24 sm:py-32 bg-[#ECE7D1] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <SectionTitle
            eyebrow="معرض الصور"
            title="شاهد المشروع بنفسك"
            subtitle="استعرض صور المشروع بكل تفاصيله الجمالية والمعمارية"
          />

          {/* Masonry-style grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 auto-rows-[180px] sm:auto-rows-[220px]">
            {galleryImages.map((img, i) => (
              <motion.div
                key={img.id}
                variants={fadeInUp}
                className={`relative overflow-hidden rounded-2xl cursor-pointer group ${img.span}`}
                onClick={() => openLightbox(i)}
              >
                <img
                  src={img.thumb}
                  alt={img.caption}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  style={{ transform: 'scale(1)' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Zoom icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="glass-dark rounded-full p-3">
                    <ZoomIn size={20} className="text-gold-400" />
                  </div>
                </div>

                {/* Caption */}
                {img.caption && (
                  <div className="absolute bottom-0 left-0 right-0 px-4 py-3 text-white text-sm font-medium translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    {img.caption}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={galleryImages}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
