import { Database, BookOpen, GraduationCap, Code, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function About() {
  const features = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: 'Story-Based Learning',
      description: 'Every SQL concept explained with real-world analogies and animated walkthroughs'
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: 'Visual Animations',
      description: 'See how SQL queries execute internally with step-by-step animations'
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: 'Placement Ready',
      description: 'Interview questions, practice problems, and common mistakes for each topic'
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: 'Interactive Examples',
      description: 'Live code demonstrations with syntax highlighting and explanations'
    }
  ]

  const techStack = [
    { name: 'React', description: 'Modern UI framework' },
    { name: 'Vite', description: 'Fast build tool' },
    { name: 'Tailwind CSS', description: 'Utility-first styling' },
    { name: 'Framer Motion', description: 'Smooth animations' },
    { name: 'GSAP', description: 'Complex animations' },
    { name: 'React Router', description: 'Navigation' }
  ]

  const topics = [
    'SQL Introduction',
    'Command Types (DDL, DML, DQL, DCL, TCL)',
    'Constraints & Table Operations',
    'CRUD Operations',
    'SELECT & Filtering',
    'Aggregate Functions',
    'GROUP BY & HAVING',
    'JOIN Lab (all join types)',
    'Subqueries',
    'Window Functions & CTE',
    'SQL Execution Order',
    'Placement Practice'
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          About SQL Training
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          An interactive platform for learning SQL through storytelling and visual animations
        </p>
      </section>

      {/* Mission */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">🎯 Our Mission</h2>
        <div className="prose max-w-none">
          <p className="text-gray-600 mb-4">
            SQL Training was created to make SQL learning <strong>accessible, visual, and practical</strong>.
            We believe that everyone can master databases with the right teaching approach.
          </p>
          <p className="text-gray-600">
            Traditional SQL tutorials focus on syntax and execution. SQL Training focuses on
            <strong>understanding</strong> - what happens when you run a query, why certain
            patterns exist, and how to think like a database professional.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">What Makes SQL Training Different</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                  {feature.icon}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Learning Philosophy */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">📚 Our Learning Philosophy</h2>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-700 mb-2">Understanding Over Memorization</h3>
            <p className="text-sm text-gray-700">
              Instead of memorizing SQL syntax, we help you understand how databases think.
              Once you understand the concepts, syntax becomes intuitive.
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-700 mb-2">Visual Learning</h3>
            <p className="text-sm text-gray-700">
              Every concept is explained with animations that show what's happening inside the database.
              See rows moving, filters working, and joins connecting data.
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h3 className="font-semibold text-purple-700 mb-2">Real-World Application</h3>
            <p className="text-sm text-gray-700">
              All examples use practical scenarios you'll encounter in actual work.
              Practice with interview questions that placement examiners actually ask.
            </p>
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">📖 Complete SQL Coverage</h2>
        <p className="text-gray-600 mb-4">
          SQL Training covers everything from basics to advanced topics:
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {topics.map((topic, index) => (
            <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-600 rounded-full" />
              <span className="text-sm text-gray-700">{topic}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">⚙️ Built With Modern Technology</h2>
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
          {techStack.map((tech, index) => (
            <div key={index} className="text-center">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-lg p-3 mb-2">
                <div className="font-semibold text-sm">{tech.name}</div>
              </div>
              <p className="text-xs text-gray-600">{tech.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Design Principles */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">🎨 Design Principles</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Focused Learning</h3>
            <p className="text-sm text-gray-600">Each topic has clear learning objectives and outcomes</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🔄</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Interactive Practice</h3>
            <p className="text-sm text-gray-600">Learn by doing with hands-on examples and practice problems</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">📱</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Responsive Design</h3>
            <p className="text-sm text-gray-600">Learn on any device with our mobile-friendly interface</p>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">👥 Who SQL Training Is For</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <GraduationCap className="w-8 h-8 text-blue-600 mb-2" />
            <h3 className="font-semibold text-blue-700 mb-2">Students</h3>
            <p className="text-sm text-gray-600">
              College students preparing for placements and building database skills
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <Code className="w-8 h-8 text-green-600 mb-2" />
            <h3 className="font-semibold text-green-700 mb-2">Beginners</h3>
            <p className="text-sm text-gray-600">
              Absolute beginners starting their journey with databases and SQL
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <Heart className="w-8 h-8 text-purple-600 mb-2" />
            <h3 className="font-semibold text-purple-700 mb-2">Self-Learners</h3>
            <p className="text-sm text-gray-600">
              Anyone who wants to learn SQL at their own pace with visual explanations
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your SQL Journey?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Join thousands of learners who have mastered SQL through visual storytelling
            and interactive practice.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/intro"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              <BookOpen className="w-5 h-5" />
              Start Learning
            </Link>
            <Link
              to="/placement"
              className="inline-flex items-center gap-2 bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
            >
              <GraduationCap className="w-5 h-5" />
              Practice Questions
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="text-center text-gray-600">
        <p className="mb-2">
          Built with ❤️ for SQL learners everywhere
        </p>
        <div className="flex items-center justify-center gap-4 text-sm">
          <span>Made for placement preparation</span>
          <span>•</span>
          <span>Interactive SQL learning platform</span>
          <span>•</span>
          <span>Visual database education</span>
        </div>
      </section>
    </div>
  )
}