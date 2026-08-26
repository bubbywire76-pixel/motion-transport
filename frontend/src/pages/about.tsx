import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-text">
      {/* Navigation */}
      <nav className="bg-primary-500 text-background py-4 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="font-serif text-3xl font-bold text-accent-500">Motion</Link>
          <Link href="/" className="hover:text-accent-500 transition">← Back Home</Link>
        </div>
      </nav>

      {/* Mission Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-500 text-background py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-5xl font-bold mb-6">About Motion</h1>
          <p className="text-xl mb-8 text-accent-200">
            Connecting business owners, dispatchers, and motorists nationwide to make transportation and logistics in Nigeria easy and reliable.
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-accent-500">
            <h2 className="font-serif text-3xl font-bold mb-4 text-primary-600">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              To revolutionize transportation and logistics across Nigeria by providing a reliable, transparent, and efficient platform that connects riders, drivers, and businesses. We believe every journey should be safe, affordable, and accessible.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-primary-500">
            <h2 className="font-serif text-3xl font-bold mb-4 text-primary-600">Our Vision</h2>
            <p className="text-gray-700 leading-relaxed">
              To become Nigeria's most trusted ride-hailing and logistics platform, enabling seamless movement of people and goods across all regions. We envision a Nigeria where quality transportation is accessible to everyone, everywhere.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl font-bold text-center mb-12 text-primary-600">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Reliability', desc: 'Every service delivered with excellence and consistency' },
              { title: 'Transparency', desc: 'Clear pricing, honest communication, no hidden charges' },
              { title: 'Safety', desc: 'Passenger and driver safety is our top priority' },
              { title: 'Inclusivity', desc: 'Available nationwide across all Nigerian regions' },
              { title: 'Innovation', desc: 'Continuous improvement of our services and technology' },
              { title: 'Community', desc: 'Supporting drivers and businesses to thrive' },
            ].map((value, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow p-6 text-center">
                <h3 className="font-serif text-xl font-bold text-primary-600 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Motion */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl font-bold text-center mb-12 text-primary-600">Why Choose Motion?</h2>
          <div className="space-y-4">
            {[
              '✅ Nationwide coverage - All major Nigerian cities',
              '✅ Transparent pricing - No surprises or hidden fees',
              '✅ Verified drivers - All motorists undergo thorough verification',
              '✅ 24/7 support - Our dispatch team available round the clock',
              '✅ Multiple ride types - Within-city, within-state, and interstate options',
              '✅ Flexible vehicles - Keke, Cars, and Buses to suit your needs',
              '✅ Business solutions - Special programs for corporate and logistics partners',
              '✅ Easy registration - Simple onboarding for riders, drivers, and businesses',
            ].map((item, idx) => (
              <p key={idx} className="text-lg text-gray-700 bg-white p-4 rounded-lg shadow">{item}</p>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
