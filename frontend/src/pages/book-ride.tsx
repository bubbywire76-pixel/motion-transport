import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import axios from 'axios'

interface BookRideFormData {
  riderName: string
  phone: string
  pickupLocation: string
  destination: string
  rideType: 'within-city' | 'within-state' | 'interstate'
  passengers: number
  dateTime: string
  notes?: string
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

export default function BookRidePage() {
  const { register, handleSubmit, formState: { errors } } = useForm<BookRideFormData>()
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: BookRideFormData) => {
    setLoading(true)
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/rides/book`,
        data
      )
      toast.success('✅ Ride request submitted! Dispatcher will contact you shortly.')
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to book ride')
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
          <h1 className="font-serif text-4xl font-bold mb-2 text-primary-600">Book Your Ride</h1>
          <p className="text-gray-600 mb-8">Fill in the details below to request a ride across Nigeria</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Rider Name */}
            <div>
              <label className="block font-semibold text-primary-600 mb-2">Full Name *</label>
              <input
                {...register('riderName', { required: 'Name is required' })}
                className="form-input"
                placeholder="Your full name"
              />
              {errors.riderName && <span className="text-red-600 text-sm mt-1 block">{errors.riderName.message}</span>}
            </div>

            {/* Phone */}
            <div>
              <label className="block font-semibold text-primary-600 mb-2">Phone Number *</label>
              <input
                {...register('phone', { required: 'Phone is required' })}
                className="form-input"
                placeholder="+234 812 345 6789"
                type="tel"
              />
              {errors.phone && <span className="text-red-600 text-sm mt-1 block">{errors.phone.message}</span>}
            </div>

            {/* Pickup Location */}
            <div>
              <label className="block font-semibold text-primary-600 mb-2">Pickup Location *</label>
              <select
                {...register('pickupLocation', { required: 'Pickup location is required' })}
                className="form-input"
              >
                <option value="">Select a city</option>
                {nigerianCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              {errors.pickupLocation && <span className="text-red-600 text-sm mt-1 block">{errors.pickupLocation.message}</span>}
            </div>

            {/* Destination */}
            <div>
              <label className="block font-semibold text-primary-600 mb-2">Destination *</label>
              <select
                {...register('destination', { required: 'Destination is required' })}
                className="form-input"
              >
                <option value="">Select a city</option>
                {nigerianCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              {errors.destination && <span className="text-red-600 text-sm mt-1 block">{errors.destination.message}</span>}
            </div>

            {/* Ride Type */}
            <div>
              <label className="block font-semibold text-primary-600 mb-2">Ride Type *</label>
              <select
                {...register('rideType', { required: 'Ride type is required' })}
                className="form-input"
              >
                <option value="within-city">Within City</option>
                <option value="within-state">Within State</option>
                <option value="interstate">Interstate</option>
              </select>
              {errors.rideType && <span className="text-red-600 text-sm mt-1 block">{errors.rideType.message}</span>}
            </div>

            {/* Passengers */}
            <div>
              <label className="block font-semibold text-primary-600 mb-2">Number of Passengers *</label>
              <input
                {...register('passengers', { required: 'Passengers required', min: 1 })}
                className="form-input"
                type="number"
                min="1"
                max="8"
              />
              {errors.passengers && <span className="text-red-600 text-sm mt-1 block">{errors.passengers.message}</span>}
            </div>

            {/* Date & Time */}
            <div>
              <label className="block font-semibold text-primary-600 mb-2">Date & Time *</label>
              <input
                {...register('dateTime', { required: 'Date and time required' })}
                className="form-input"
                type="datetime-local"
              />
              {errors.dateTime && <span className="text-red-600 text-sm mt-1 block">{errors.dateTime.message}</span>}
            </div>

            {/* Notes */}
            <div>
              <label className="block font-semibold text-primary-600 mb-2">Additional Notes (Optional)</label>
              <textarea
                {...register('notes')}
                className="form-input h-24 resize-none"
                placeholder="Any special requests or luggage details..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Booking...' : 'Request Ride'}
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
