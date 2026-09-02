import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-text">
      {/* Navigation */}
      <nav className="bg-primary-500 text-background py-4 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <h1 className="font-serif text-3xl font-bold text-accent-500">Motion</h1>
          <div className="space-x-6">
            <Link href="#" className="hover:text-accent-500 transition">About</Link>
            <Link href="/contact" className="hover:text-accent-500 transition">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-500 text-background py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="font-serif text-5xl font-bold mb-4">Book Your Ride, Move With Ease</h2>
          <p className="text-xl mb-8 text-accent-200">Nigeria's premium ride-hailing and logistics platform</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/book-ride" className="bg-accent-500 hover:bg-accent-600 text-primary-900 px-8 py-3 rounded-lg font-semibold transition shadow-lg">Book a Ride</Link>
            <Link href="/fare-estimate" className="border-2 border-accent-500 text-accent-500 hover:bg-accent-500 hover:text-primary-900 px-8 py-3 rounded-lg font-semibold transition">Fare Estimate</Link>
            <Link href="/driver-register" className="border-2 border-background text-background hover:bg-background hover:text-primary-900 px-8 py-3 rounded-lg font-semibold transition">Register as Driver</Link>
          </div>
        </div>
      </section>

      {/* Quick Access Buttons */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h3 className="font-serif text-4xl font-bold text-center mb-12">What Can We Help You With?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Book a Ride', desc: 'Travel safely across Nigeria', href: '/book-ride', icon: '🚕' },
              { title: 'Fare Estimate', desc: 'Transparent pricing', href: '/fare-estimate', icon: '💰' },
              { title: 'Driver Registration', desc: 'Join our driver network', href: '/driver-register', icon: '👨‍💼' },
              { title: 'Business Solutions', desc: 'Fleet & logistics', href: '/business-register', icon: '🏢' },
              { title: 'Contact Dispatch', desc: 'Reach our team', href: '/contact', icon: '📞' },
              { title: 'About Motion', desc: 'Our mission & vision', href: '/about', icon: 'ℹ️' },
            ].map((item, idx) => (
              <Link key={idx} href={item.href}>
                <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition p-6 cursor-pointer border-l-4 border-accent-500">
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h4 className="font-serif text-2xl mb-2 text-primary-600">{item.title}</h4>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-900 text-background py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2024 Motion Transport. All rights reserved.</p>
          <p className="text-accent-300">Connecting Nigeria, One Ride at a Time</p>
        </div>
      </footer>
    </div>
  )
}
