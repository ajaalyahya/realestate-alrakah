import React, { Suspense, lazy } from 'react'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import LoadingSpinner from './components/LoadingSpinner'

// Lazy load below-fold sections for performance
const About     = lazy(() => import('./sections/About'))
const Features  = lazy(() => import('./sections/Features'))
const Units     = lazy(() => import('./sections/Units'))
const Gallery   = lazy(() => import('./sections/Gallery'))
const Location  = lazy(() => import('./sections/Location'))
const Contact   = lazy(() => import('./sections/Contact'))
const CTA       = lazy(() => import('./sections/CTA'))
const Footer    = lazy(() => import('./sections/Footer'))

const WHATSAPP_NUMBER = '966500000000'
const WHATSAPP_MESSAGE = encodeURIComponent('السلام عليكم، أود الاستفسار عن وحدات برج الراقي في الرقة، الخبر.')

export default function App() {
  return (
    <div className="min-h-screen font-cairo" dir="rtl">
      <Navbar />
      <Hero whatsappNumber={WHATSAPP_NUMBER} whatsappMessage={WHATSAPP_MESSAGE} />
      <Suspense fallback={<LoadingSpinner />}>
        <About />
        <Features />
        <Units />
        <Gallery />
        <Location />
        <Contact />
        <CTA whatsappNumber={WHATSAPP_NUMBER} whatsappMessage={WHATSAPP_MESSAGE} />
        <Footer />
      </Suspense>
      <FloatingWhatsApp number={WHATSAPP_NUMBER} message={WHATSAPP_MESSAGE} />
    </div>
  )
}
