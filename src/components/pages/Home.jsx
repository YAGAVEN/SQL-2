import { Link } from 'react-router-dom'
import { navigationItems } from '../../data/navigation'
import { ArrowRight, Database, BookOpen, GraduationCap } from 'lucide-react'

export default function Home() {
  const mainTopics = navigationItems.slice(1, -1) // Exclude Home and About

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Database className="w-4 h-4" />
          Interactive SQL Learning
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Learn SQL Through Stories
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Master SQL concepts with animated explanations and real-world analogies.
          Perfect for placement preparation.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/intro"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Start Learning
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/placement"
            className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            <GraduationCap className="w-4 h-4" />
            Practice Questions
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-3 gap-6 mb-16">
        <div className="section-card">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
            <BookOpen className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Story-Based Learning</h3>
          <p className="text-gray-600">
            Every SQL concept is explained with real-world analogies and animated walkthroughs
          </p>
        </div>

        <div className="section-card">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
            <Database className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Visual Animations</h3>
          <p className="text-gray-600">
            See how SQL queries execute internally with step-by-step animations
          </p>
        </div>

        <div className="section-card">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
            <GraduationCap className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Placement Ready</h3>
          <p className="text-gray-600">
            Interview questions, practice problems, and common mistakes for each topic
          </p>
        </div>
      </section>

      {/* Topics Grid */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Explore SQL Topics
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mainTopics.map((topic) => (
            <Link
              key={topic.id}
              to={topic.path}
              className="group p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {topic.title}
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                Interactive lesson with animations
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Database Preview */}
      <section className="section-card">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Practice Database Schema
        </h2>
        <p className="text-gray-600 mb-6">
          All examples use a consistent database schema with Customers, Orders, and Shippings tables
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Customers</h4>
            <code className="text-xs text-gray-600">
              customer_id, first_name, last_name, age, country
            </code>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Orders</h4>
            <code className="text-xs text-gray-600">
              order_id, item, amount, customer_id
            </code>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Shippings</h4>
            <code className="text-xs text-gray-600">
              shipping_id, status, customer
            </code>
          </div>
        </div>
      </section>
    </div>
  )
}