import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { staggerContainer, fadeInUp, scaleIn } from '../utils/animations'
import SectionTitle from '../components/SectionTitle'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'

// ⬇️ حط بياناتك هنا
const EMAILJS_SERVICE_ID  = 'service_ig8k8el'
const EMAILJS_TEMPLATE_ID = 'template_3jgluc8'
const EMAILJS_PUBLIC_KEY  = 'L-e4EERbJiZL_VMww'

const unitOptions = [
  { value: '', label: 'اختر نوع الوحدة' },
  { value: 'studio', label: 'استوديو' },
  { value: 'one-bedroom', label: 'غرفة وصالة' },
  { value: 'two-bedroom', label: 'غرفتان وصالة' },
]

const initialForm = { name: '', phone: '', unitType: '', message: '' }
const initialErrors = {}

function validate(values) {
  const errors = {}
  if (!values.name.trim() || values.name.trim().length < 2) {
    errors.name = 'يرجى إدخال الاسم (٢ أحرف على الأقل)'
  }
  const phoneClean = values.phone.replace(/\s/g, '')
  if (!phoneClean || !/^(05|5|\+9665)\d{8}$/.test(phoneClean)) {
    errors.phone = 'يرجى إدخال رقم جوال سعودي صحيح (05xxxxxxxx)'
  }
  if (!values.unitType) {
    errors.unitType = 'يرجى اختيار نوع الوحدة'
  }
  if (!values.message.trim() || values.message.trim().length < 10) {
    errors.message = 'يرجى كتابة رسالتك (١٠ أحرف على الأقل)'
  }
  return errors
}

const inputBase = 'w-full bg-[#FFF8F0] border border-white/8 text-[#4B2E2B] placeholder-stone-600 rounded-2xl px-5 py-4 text-sm font-medium transition-all duration-200 focus:border-gold-500 focus:bg-stone-900 outline-none'
const inputError = 'border-red-500/60 focus:border-red-500'

export default function Contact() {
  const { ref, isInView } = useScrollAnimation()
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState(initialErrors)
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [touched, setTouched] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (touched[name]) {
      const newErrors = validate({ ...form, [name]: value })
      setErrors((prev) => ({ ...prev, [name]: newErrors[name] }))
    }
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    const newErrors = validate(form)
    setErrors((prev) => ({ ...prev, [name]: newErrors[name] }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setTouched({ name: true, phone: true, unitType: true, message: true })
    const validationErrors = validate(form)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setStatus('loading')
    // Simulate API call / email integration
    await new Promise((res) => setTimeout(res, 1800))
    setStatus('success')
    setForm(initialForm)
    setTouched({})
    setErrors({})
  }

  return (
    <section id="contact" className="py-24 sm:py-32 bg-[#ECE7D1] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-gold-500/4 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <SectionTitle
            eyebrow="تواصل معنا"
            title="نحن هنا لمساعدتك"
            subtitle="تواصل معنا الآن وسيتصل بك أحد مستشارينا في أقرب وقت ممكن"
          />

          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 max-w-6xl mx-auto">
            {/* Form */}
            <motion.div variants={scaleIn} className="lg:col-span-3">
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass rounded-3xl p-10 text-center"
                >
                  <CheckCircle size={56} className="text-green-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-black text-white mb-2">تم الإرسال بنجاح!</h3>
                  <p className="text-stone-400 mb-6">شكراً لتواصلك معنا. سيتصل بك أحد مستشارينا قريباً.</p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="text-gold-400 hover:text-gold-300 font-semibold text-sm"
                  >
                    إرسال رسالة أخرى
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="glass rounded-3xl p-6 sm:p-8 space-y-5">
                  {/* Name */}
                  <div>
                    <label className="text-sm font-semibold text-[#4B2E2B] mb-2 block">
                      الاسم الكامل <span className="text-[#4B2E2B]">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="أدخل اسمك الكامل"
                      className={`${inputBase} ${errors.name ? inputError : ''}`}
                    />
                    {errors.name && (
                      <p className="flex items-center gap-1.5 text-red-400 text-xs mt-1.5">
                        <AlertCircle size={12} />{errors.name}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="text-sm font-semibold text-[#4B2E2B] mb-2 block">
                      رقم الجوال <span className="text-[#4B2E2B]">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="05XXXXXXXX"
                      dir="ltr"
                      className={`${inputBase} text-right ${errors.phone ? inputError : ''}`}
                    />
                    {errors.phone && (
                      <p className="flex items-center gap-1.5 text-red-400 text-xs mt-1.5">
                        <AlertCircle size={12} />{errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Unit Type */}
                  <div>
                    <label className="text-sm font-semibold text-[#4B2E2B] mb-2 block">
                      نوع الوحدة <span className="text-[#4B2E2B]">*</span>
                    </label>
                    <select
                      name="unitType"
                      value={form.unitType}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`${inputBase} cursor-pointer appearance-none ${errors.unitType ? inputError : ''}`}
                    >
                      {unitOptions.map((opt) => (
                        <option key={opt.value} value={opt.value} disabled={opt.value === ''} className="bg-white text-[#C08552]">
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    {errors.unitType && (
                      <p className="flex items-center gap-1.5 text-red-400 text-xs mt-1.5">
                        <AlertCircle size={12} />{errors.unitType}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="text-sm font-semibold text-[#4B2E2B] mb-2 block">
                      رسالتك <span className="text-[#4B2E2B]">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      rows={4}
                      placeholder="اكتب استفساراتك أو ملاحظاتك هنا..."
                      className={`${inputBase} resize-none ${errors.message ? inputError : ''}`}
                    />
                    {errors.message && (
                      <p className="flex items-center gap-1.5 text-red-400 text-xs mt-1.5">
                        <AlertCircle size={12} />{errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full flex items-center justify-center gap-3 bg-[#4B2E2B] hover:bg-gold-400 disabled:opacity-60 disabled:cursor-not-allowed text-white font-black text-base py-4 rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-gold-500/30 hover:-translate-y-0.5 active:scale-95"
                  >
                    {status === 'loading' ? (
                      <>
                        <div className="w-5 h-5 border-2 border-stone-950/30 border-t-stone-950 rounded-full animate-spin" />
                        جاري الإرسال...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        إرسال الطلب
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={fadeInUp} className="lg:col-span-2 flex flex-col gap-5">
              <div className="glass rounded-3xl p-6">
                <h4 className="text-lg font-bold text-[#4B2E2B] mb-5">معلومات التواصل</h4>
                <div className="space-y-4">
                  {[
                    { icon: '📞', label: 'هاتف', value: '+966 53 411 8777', href: 'tel:+966500000000' },
                    { icon: '📱', label: 'واتساب', value: '+966 53 411 8777', href: 'https://wa.me/966500000000' },
                    { icon: '📍', label: 'العنوان', value: 'حي الراكة، الخبر، المنطقة الشرقية', href: null },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <span className="text-xl flex-shrink-0 mt-0.5">{item.icon}</span>
                      <div>
                        <div className="text-xs text-stone-500 mb-0.5">{item.label}</div>
                        {item.href ? (
                          <a href={item.href} className="text-sm text-stone-300 hover:text-gold-400 transition-colors font-medium" dir={item.label === 'هاتف' || item.label === 'واتساب' ? 'ltr' : 'rtl'}>
                            {item.value}
                          </a>
                        ) : (
                          <span className="text-sm text-stone-300">{item.value}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Working hours */}
              <div className="glass rounded-3xl p-6">
                <h4 className="text-base font-bold text-[#4B2E2B] mb-4">أوقات العمل</h4>
                <div className="space-y-2">
                  {[
                    { days: 'السبت – الخميس', time: '٩:٠٠ ص – ٩:٠٠ م' },
                  ].map((row) => (
                    <div key={row.days} className="flex justify-between text-sm">
                      <span className="text-stone-400">{row.days}</span>
                      <span className="text-gold-400 font-medium">{row.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* WhatsApp quick CTA */}
              <a
                href="https://wa.me/966534118777?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85+%D8%B9%D9%84%D9%8A%D9%83%D9%85"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 bg-green-600/90 hover:bg-green-500 text-white font-bold py-4 rounded-3xl transition-all duration-300 hover:shadow-lg hover:shadow-green-600/30"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                ابدأ محادثة الآن
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
