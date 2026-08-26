import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import axios from 'axios'

interface BusinessFormData {
  businessName: string
  contactPerson: string
  email: string
  phone: string
  address: string
  city: string
  logisticsNeedType: 'staff-transport' | 'goods-delivery' | 'regular-dispatch'
  expectedUsageFrequency: string
}

const nigerianCities = [
  'Lagos',
  'Abuja',
  'Ibadan',
  'Kano',
  'Port Harcourt',
  'Enugu',
  'Benin City',
  'Kaduna',
  'Ilorin',
  'Abeokuta',
  'Maiduguri',
  'Calabar',
  'Akure',
  'Owerri',
]

export default function BusinessRegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<BusinessFormData>()
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: BusinessFormData) => {
    setLoading(true)
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/business/register`,
        data
      )
      toast.success('✅ Business registration submitted! We will contact you soon.')
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Registration failed')
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

      {/* Form Section */}
      <section className="py-12 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 border-l-4 border-primary-500">
          <h1 className="font-serif text-4xl font-bold mb-2 text-primary-600">Business Registration</h1>
          <p className="text-gray-600 mb-8">Scale your logistics operations with Motion</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Business Name */}
            <div>
              <label className="block font-semibold text-primary-600 mb-2">Business Name *</label>
              <input
                {...register('businessName', { required: 'Business name is required' })}
                className="form-input"
                placeholder="Your business name"
              />
              {errors.businessName && <span className="text-red-600 text-sm mt-1 block">{errors.businessName.message}</span>}
            </div>

            {/* Contact Person */}
            <div>
              <label className="block font-semibold text-primary-600 mb-2">Contact Person *</label>
              <input
                {...register('contactPerson', { required: 'Contact person is required' })}
                className="form-input"
                placeholder="Name of contact person"
              />
              {errors.contactPerson && <span className="text-red-600 text-sm mt-1 block">{errors.contactPerson.message}</span>}
            </div>

            {/* Email */}
            <div>
              <label className="block font-semibold text-primary-600 mb-2">Email Address *</label>
              <input
                {...register('email', { required: 'Email is required' })}
                className="form-input"
                type="email"
                placeholder="business@example.com"
              />
              {errors.email && <span className="text-red-600 text-sm mt-1 block">{errors.email.message}</span>}
            </div>

            {/* Phone */}
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

            {/* Address */}
            <div>
              <label className="block font-semibold text-primary-600 mb-2">Business Address *</label>
              <input
                {...register('address', { required: 'Address is required' })}
                className="form-input"
                placeholder="Street address"
              />
              {errors.address && <span className="text-red-600 text-sm mt-1 block">{errors.address.message}</span>}
            </div>

            {/* City */}
            <div>
              <label className="block font-semibold text-primary-600 mb-2">City *</label>
              <select
                {...register('city', { required: 'City is required' })}
                className="form-input"
              >
                <option value="">Select your city</option>
                {nigerianCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              {errors.city && <span className="text-red-600 text-sm mt-1 block">{errors.city.message}</span>}
            </div>

            {/* Logistics Need Type */}
            <div>
              <label className="block font-semibold text-primary-600 mb-2">Logistics Need Type *</label>
              <select
                {...register('logisticsNeedType', { required: 'Please select a logistics type' })}
                className="form-input"
              >
                <option value="">Select need type</option>
                <option value="staff-transport">Staff Transport</option>
                <option value="goods-delivery">Goods Delivery</option>
                <option value="regular-dispatch">Regular Dispatch</option>
              </select>
              {errors.logisticsNeedType && <span className="text-red-600 text-sm mt-1 block">{errors.logisticsNeedType.message}</span>}
            </div>

            {/* Expected Usage Frequency */}
            <div>
              <label className="block font-semibold text-primary-600 mb-2">Expected Usage Frequency</label>
              <select
                {...register('expectedUsageFrequency')}
                className="form-input"
              >
                <option value="DAILY">Daily</option>
                <option value="WEEKLY">Weekly</option>
                <option value="MONTHLY">Monthly</option>
                <option value="AS_NEEDED">As Needed</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Registering...' : 'Register Business'}
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
