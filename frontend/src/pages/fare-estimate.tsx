import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import axios from 'axios'

interface FareEstimateData {
  rideType: 'within-city' | 'within-state' | 'interstate'
  vehicleType: 'Keke' | 'Car' | 'Bus'
}

interface FareResult {
  rideType: string
  vehicleType: string
  estimatedFareRange: string
  minFare: number
  maxFare: number
  disclaimer: string
}

export default function FareEstimatePage() {
  const { register, handleSubmit } = useForm<FareEstimateData>({
    defaultValues: {
      rideType: 'within-city',
      vehicleType: 'Car',
    },
  })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<FareResult | null>(null)

  const onSubmit = async (data: FareEstimateData) => {
    setLoading(true)
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/fares/estimate`,
        data
      )
      setResult(response.data)
      toast.success('✅ Fare estimate calculated!')
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to calculate fare')
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

      {/* Main Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Form */}
            <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-accent-500">
              <h1 className="font-serif text-4xl font-bold mb-2 text-primary-600">Fare Estimate</h1>
              <p className="text-gray-600 mb-8">Get a transparent price range for your ride</p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Ride Type */}
                <div>
                  <label className="block font-semibold text-primary-600 mb-3">Trip Type</label>
                  <div className="space-y-2">
                    {['within-city', 'within-state', 'interstate'].map((type) => (
                      <label key={type} className="flex items-center">
                        <input
                          {...register('rideType')}
                          type="radio"
                          value={type}
                          className="w-4 h-4 text-accent-500"
                        />
                        <span className="ml-2 text-gray-700 capitalize">
                          {type.replace('-', ' ')}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Vehicle Type */}
                <div>
                  <label className="block font-semibold text-primary-600 mb-3">Vehicle Type</label>
                  <div className="space-y-2">
                    {['Keke', 'Car', 'Bus'].map((type) => (
                      <label key={type} className="flex items-center">
                        <input
                          {...register('vehicleType')}
                          type="radio"
                          value={type}
                          className="w-4 h-4 text-accent-500"
                        />
                        <span className="ml-2 text-gray-700">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Calculate Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Calculating...' : 'Calculate Fare'}
                </button>
              </form>
            </div>

            {/* Result */}
            <div>
              {result && (
                <div className="bg-gradient-to-br from-accent-50 to-primary-50 rounded-lg shadow-lg p-8 border-2 border-accent-500">
                  <h2 className="font-serif text-3xl font-bold text-primary-600 mb-6">Estimated Fare</h2>

                  <div className="bg-white rounded-lg p-6 mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-600">Trip Type:</span>
                      <span className="font-semibold text-primary-600 capitalize">{result.rideType}</span>
                    </div>
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-gray-600">Vehicle:</span>
                      <span className="font-semibold text-primary-600">{result.vehicleType}</span>
                    </div>
                    <div className="border-t-2 border-accent-300 pt-6">
                      <p className="text-gray-600 text-sm mb-2">Price Range</p>
                      <p className="font-serif text-4xl font-bold text-accent-500">
                        {result.estimatedFareRange}
                      </p>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-gray-700">
                      <strong>⚠️ Note:</strong> {result.disclaimer}
                    </p>
                  </div>

                  <Link href="/book-ride" className="block w-full bg-accent-500 hover:bg-accent-600 text-primary-900 text-center px-6 py-3 rounded-lg font-semibold transition shadow-lg">
                    Proceed to Book
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
