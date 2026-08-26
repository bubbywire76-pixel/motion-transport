import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import axios from 'axios'

interface DriverFormData {
  name: string
  email: string
  phone: string
  vehicleType: 'Keke' | 'Car' | 'Bus'
  plateNumber: string
  licenseNumber: string
  yearsExperience: number
  homeBaseCity: string
  interstateAvailability: boolean
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

export default function DriverRegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<DriverFormData>()
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: DriverFormData) => {
    setLoading(true)
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/drivers/register`,
        data
      )
      toast.success('✅ Registration submitted! Our team will verify your details.')
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
          <h1 className="font-serif text-4xl font-bold mb-2 text-primary-600">Register as a Driver</h1>
          <p className="text-gray-600 mb-8">Join Motion's network of professional motorists across Nigeria</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block font-semibold text-primary-600 mb-2">Full Name *</label>
              <input
                {...register('name', { required: 'Name is required' })}
                className="form-input"
                placeholder="Your full name"
              />
              {errors.name && <span className="text-red-600 text-sm mt-1 block">{errors.name.message}</span>}
            </div>

            {/* Email */}
            <div>
              <label className="block font-semibold text-primary-600 mb-2">Email Address *</label>
              <input
                {...register('email', { required: 'Email is required' })}
                className="form-input"
                type="email"
                placeholder="your.email@example.com"
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

            {/* Vehicle Type */}
            <div>
              <label className="block font-semibold text-primary-600 mb-2">Vehicle Type *</label>
              <select
                {...register('vehicleType', { required: 'Vehicle type is required' })}
                className="form-input"
              >
                <option value="">Select vehicle type</option>
                <option value="Keke">Keke (Tricycle)</option>
                <option value="Car">Car (Sedan/SUV)</option>
                <option value="Bus">Bus (Passenger)</option>
              </select>
              {errors.vehicleType && <span className="text-red-600 text-sm mt-1 block">{errors.vehicleType.message}</span>}
            </div>

            {/* Plate Number */}
            <div>
              <label className="block font-semibold text-primary-600 mb-2">Vehicle Plate Number *</label>
              <input
                {...register('plateNumber', { required: 'Plate number is required' })}
                className="form-input"
                placeholder="ABC 123 XYZ"
                maxLength={10}
              />
              {errors.plateNumber && <span className="text-red-600 text-sm mt-1 block">{errors.plateNumber.message}</span>}
            </div>

            {/* License Number */}
            <div>
              <label className="block font-semibold text-primary-600 mb-2">License Number *</label>
              <input
                {...register('licenseNumber', { required: 'License number is required' })}
                className="form-input"
                placeholder="DL123456"
              />
              {errors.licenseNumber && <span className="text-red-600 text-sm mt-1 block">{errors.licenseNumber.message}</span>}
            </div>

            {/* Years Experience */}
            <div>
              <label className="block font-semibold text-primary-600 mb-2">Years of Driving Experience *</label>
              <input
                {...register('yearsExperience', { required: 'Experience required', min: 0 })}
                className="form-input"
                type="number"
                min="0"
                max="50"
              />
              {errors.yearsExperience && <span className="text-red-600 text-sm mt-1 block">{errors.yearsExperience.message}</span>}
            </div>

            {/* Home Base City */}
            <div>
              <label className="block font-semibold text-primary-600 mb-2">Home Base City *</label>
              <select
                {...register('homeBaseCity', { required: 'City is required' })}
                className="form-input"
              >
                <option value="">Select your city</option>
                {nigerianCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              {errors.homeBaseCity && <span className="text-red-600 text-sm mt-1 block">{errors.homeBaseCity.message}</span>}
            </div>

            {/* Interstate Availability */}
            <div className="flex items-center">
              <input
                {...register('interstateAvailability')}
                type="checkbox"
                className="w-4 h-4 text-accent-500 rounded"
              />
              <label className="ml-3 text-gray-700">
                I'm available for interstate trips
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Registering...' : 'Register as Driver'}
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
