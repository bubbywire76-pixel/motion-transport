import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

interface ContactFormData {
  name: string
  phone: string
  message: string
}

export default function ContactPage() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>()
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: ContactFormData) => {
    setLoading(true)
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('✅ Message sent! Our team will contact you shortly.')
      reset()
    } catch (error) {
      toast.error('Failed to send message')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-text">
      {/* Navigation */}
      <nav className="bg-primary-500 text-background py-4 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="font-serif text-3xl font-bold text-accent-500">Motion</Link>
          <Link href="/" className="hover:text-accent-500 transition">← Back Home</Link>
        </div>
      </nav>

      {/* Contact Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div>
              <h1 className="font-serif text-4xl font-bold mb-4 text-primary-600">Contact Dispatch</h1>
              <p className="text-gray-600 mb-8">Reach out to our dispatch team for assistance</p>

              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow p-6 border-l-4 border-accent-500">
                  <h3 className="font-semibold text-primary-600 mb-2">📞 Phone</h3>
                  <p className="text-2xl font-bold text-accent-500">+234 800 MOTION (668466)</p>
                </div>

                <div className="bg-white rounded-lg shadow p-6 border-l-4 border-primary-500">
                  <h3 className="font-semibold text-primary-600 mb-2">📱 WhatsApp</h3>
                  <a href="https://wa.me/2348001234567" className="text-2xl font-bold text-green-500 hover:text-green-600">
                    +234 800 MOTION
                  </a>
                </div>

                <div className="bg-white rounded-lg shadow p-6 border-l-4 border-accent-500">
                  <h3 className="font-semibold text-primary-600 mb-2">📧 Email</h3>
                  <p className="text-lg">dispatch@motionapp.ng</p>
                </div>

                <div className="bg-white rounded-lg shadow p-6 border-l-4 border-primary-500">
                  <h3 className="font-semibold text-primary-600 mb-2">🏢 Hours</h3>
                  <p>Monday - Sunday: 24/7 Operations</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-primary-500">
              <h2 className="font-serif text-2xl font-bold mb-6 text-primary-600">Send a Message</h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block font-semibold text-primary-600 mb-2">Your Name *</label>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    className="form-input"
                    placeholder="Your full name"
                  />
                  {errors.name && <span className="text-red-600 text-sm mt-1 block">{errors.name.message}</span>}
                </div>

                <div>
                  <label className="block font-semibold text-primary-600 mb-2">Phone Number *</label>
                  <input
                    {...register('phone', { required: 'Phone is required' })}
                    className="form-input"
                    type="tel"
                    placeholder="+234 812 345 6789"
                  />
                  {errors.phone && <span className="text-red-600 text-sm mt-1 block">{errors.phone.message}</span>}
                </div>

                <div>
                  <label className="block font-semibold text-primary-600 mb-2">Message *</label>
                  <textarea
                    {...register('message', { required: 'Message is required' })}
                    className="form-input h-32 resize-none"
                    placeholder="Your message..."
                  />
                  {errors.message && <span className="text-red-600 text-sm mt-1 block">{errors.message.message}</span>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
