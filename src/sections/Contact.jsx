import React, { useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { staggerContainer, fadeInUp, scaleIn } from '../utils/animations'
import SectionTitle from '../components/SectionTitle'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const EMAILJS_SERVICE_ID  = 'service_ig8k8el'
const EMAILJS_TEMPLATE_ID = 'template_3jgluc8'
const EMAILJS_PUBLIC_KEY  = 'L-e4EERbJiZL_VMww'

const getUnitOptions = (t) => [
  { value: '', label: t('unit.select') },
  { value: 'studio', label: t('unit.studio') },
  { value: 'one-bedroom', label: t('unit.onebed') },
  { value: 'two-bedroom', label: t('unit.twobed') },
]

const initialForm = { name: '', phone: '', unitType: '', message: '' }

function validate(values, t) {
  const errors = {}
  if (!values.name.trim() || values.name.trim().length < 2)
    errors.name = t('contact.name_err')
  const phoneClean = values.phone.replace(/\s/g, '')
  if (!phoneClean || !/^(05|5|\+9665)\d{8}$/.test(phoneClean))
    errors.phone = t('contact.phone_err')
  if (!values.unitType)
    errors.unitType = t('contact.unit_err')
  if (!values.message.trim() || values.message.trim().length < 10)
    errors.message = t('contact.msg_err')
  return errors
}

const inputBase = 'w-full bg-[#F5F5F5] border border-white/8 text-[#171717] placeholder-stone-600 rounded-2xl px-5 py-4 text-sm font-medium transition-all duration-200 focus:border-gold-500 outline-none'
const inputError = 'border-red-500/60 focus:border-red-500'

export default function Contact() {
  const { ref, isInView } = useScrollAnimation()
  const { t, language } = useLanguage()
  const unitOptions = getUnitOptions(t)

  const [form, setForm]       = useState(initialForm)
  const [errors, setErrors]   = useState({})
  const [status, setStatus]   = useState('idle')
  const [touched, setTouched] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (touched[name]) {
      const newErrors = validate({ ...form, [name]: value }, t)
      setErrors(prev => ({ ...prev, [name]: newErrors[name] }))
    }
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    const newErrors = validate(form, t)
    setErrors(prev => ({ ...prev, [name]: newErrors[name] }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setTouched({ name: true, phone: true, unitType: true, message: true })
    const validationErrors = validate(form, t)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setStatus('loading')
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          phone:     form.phone,
          unit_type: unitOptions.find(o => o.value === form.unitType)?.label || form.unitType,
          message:   form.message,
        },
        EMAILJS_PUBLIC_KEY
      )
      setStatus('success')
      setForm(initialForm)
      setTouched({})
      setErrors({})
    } catch (err) {
      console.error('EmailJS Error:', err)
      setStatus('error')
    }
  }

  const contactInfos = [
    { icon: '📞', label: t('contact.phone'),    value: '+966 53 411 8777', href: 'tel:+966534118777' },
    { icon: '📱', label: t('contact.whatsapp'),   value: '+966 53 411 8777', href: 'https://wa.me/966534118777' },
    { icon: '📍', label: t('contact.address'),  value: t('contact.address_val'), href: null },
  ]

  return (
    <section id="contact" className="py-24 sm:py-32 bg-[#F5F5F5] relative overflow-hidden">
      <div className={`absolute top-0 w-[600px] h-[400px] bg-gold-500/4 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none ${language === 'en' ? 'right-auto left-0 -translate-x-1/3' : 'right-0'}`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div ref={ref} variants={staggerContainer} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          <SectionTitle eyebrow={t('contact.eyebrow')} title={t('contact.title')} subtitle={t('contact.subtitle')} />

          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 max-w-6xl mx-auto">

            {/* Form */}
            <motion.div variants={scaleIn} className="lg:col-span-3">
              {status === 'success' ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass rounded-3xl p-10 text-center">
                  <CheckCircle size={56} className="text-green-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-black text-[#171717] mb-2">{t('contact.success_title')}</h3>
                  <p className="text-stone-500 mb-6">{t('contact.success_desc')}</p>
                  <button onClick={() => setStatus('idle')} className="text-gold-500 hover:text-gold-600 font-semibold text-sm">{t('contact.send_another')}</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="glass rounded-3xl p-6 sm:p-8 space-y-5">

                  {/* Error banner */}
                  {status === 'error' && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-500 text-sm rounded-2xl px-4 py-3 text-center">
                      {t('contact.error_msg')}
                    </div>
                  )}

                  {/* Name */}
                  <div>
                    <label className="text-sm font-semibold text-[#171717] mb-2 block">{t('contact.name_lbl')} <span className="text-[#171717]">*</span></label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} onBlur={handleBlur} placeholder={t('contact.name_ph')} className={`${inputBase} ${errors.name ? inputError : ''}`} />
                    {errors.name && <p className="flex items-center gap-1.5 text-red-500 text-xs mt-1.5"><AlertCircle size={12} />{errors.name}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="text-sm font-semibold text-[#171717] mb-2 block">{t('contact.phone_lbl')} <span className="text-[#171717]">*</span></label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} onBlur={handleBlur} placeholder={t('contact.phone_ph')} dir="ltr" className={`${inputBase} ${language === 'en' ? 'text-left' : 'text-right'} ${errors.phone ? inputError : ''}`} />
                    {errors.phone && <p className="flex items-center gap-1.5 text-red-500 text-xs mt-1.5"><AlertCircle size={12} />{errors.phone}</p>}
                  </div>

                  {/* Unit Type */}
                  <div>
                    <label className="text-sm font-semibold text-[#171717] mb-2 block">{t('contact.unit_lbl')} <span className="text-[#171717]">*</span></label>
                    <select name="unitType" value={form.unitType} onChange={handleChange} onBlur={handleBlur} className={`${inputBase} cursor-pointer min-h-12 border-white/20 bg-[#F5F5F5]/50 appearance-none ${errors.unitType ? inputError : ''}`}>
                      {unitOptions.map(opt => <option key={opt.value} value={opt.value} disabled={opt.value === ''} className="bg-white text-[#525252]">{opt.label}</option>)}
                    </select>
                    {errors.unitType && <p className="flex items-center gap-1.5 text-red-500 text-xs mt-1.5"><AlertCircle size={12} />{errors.unitType}</p>}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="text-sm font-semibold text-[#171717] mb-2 block">{t('contact.msg_lbl')} <span className="text-[#171717]">*</span></label>
                    <textarea name="message" value={form.message} onChange={handleChange} onBlur={handleBlur} rows={4} placeholder={t('contact.msg_ph')} className={`${inputBase} resize-none ${errors.message ? inputError : ''}`} />
                    {errors.message && <p className="flex items-center gap-1.5 text-red-500 text-xs mt-1.5"><AlertCircle size={12} />{errors.message}</p>}
                  </div>

                  {/* Submit */}
                  <button type="submit" disabled={status === 'loading'} className="w-full flex items-center justify-center gap-3 bg-[#171717] hover:bg-gold-400 disabled:opacity-60 disabled:cursor-not-allowed text-white font-black text-base py-4 rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-gold-500/30 hover:-translate-y-0.5 active:scale-95">
                    {status === 'loading'
                      ? <><div className="w-5 h-5 border-2 border-white/30 border-t-[#525252] rounded-full animate-spin" />{t('contact.sending')}</>
                      : <><Send size={18} className={language === 'ar' ? 'rotate-180' : ''}/>{t('contact.submit_btn')}</>
                    }
                  </button>
                </form>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={fadeInUp} className="lg:col-span-2 flex flex-col gap-5">
              <div className="glass rounded-3xl p-6">
                <h4 className="text-lg font-bold text-[#171717] mb-5">{t('contact.info_title')}</h4>
                <div className="space-y-4">
                  {contactInfos.map(item => (
                    <div key={item.label} className="flex items-start gap-3">
                      <span className="text-xl flex-shrink-0 mt-0.5">{item.icon}</span>
                      <div>
                        <div className="text-xs text-stone-500 mb-0.5">{item.label}</div>
                        {item.href
                          ? <a href={item.href} className="text-sm text-[#171717] font-bold hover:text-gold-500 transition-colors" dir={item.label !== t('contact.address') ? 'ltr' : (language === 'ar' ? 'rtl' : 'ltr')}>{item.value}</a>
                          : <span className="text-sm text-[#171717] font-bold">{item.value}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass rounded-3xl p-6">
                <h4 className="text-base font-bold text-[#171717] mb-4">{t('contact.hours_title')}</h4>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">{t('contact.hours_days')}</span>
                  <span className="text-gold-500 font-bold">{t('contact.hours_time')}</span>
                </div>
              </div>

              <a href={`https://wa.me/966534118777?text=${encodeURIComponent(t('contact.wa_msg'))}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2.5 bg-green-600/90 hover:bg-green-500 text-white font-bold py-4 rounded-3xl transition-all duration-300 hover:shadow-lg hover:shadow-green-600/30">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                {t('contact.start_chat')}
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}