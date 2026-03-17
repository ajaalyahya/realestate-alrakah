import React, { useState } from 'react'

export default function LazyImage({ src, alt, className = '', placeholder = '#1a1810' }) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ background: placeholder }}>
      {!error && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-stone-900">
          <span className="text-stone-600 text-sm">صورة غير متاحة</span>
        </div>
      )}
      {!loaded && !error && (
        <div className="absolute inset-0 bg-stone-900/60 animate-pulse" />
      )}
    </div>
  )
}
