import { Link } from 'react-router-dom'
import { Database } from 'lucide-react'

export default function Topbar() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 z-50">
      <Link to="/" className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
          <Database className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-gray-900">SQL Training</h1>
          <p className="text-xs text-gray-500">Interactive SQL Learning</p>
        </div>
      </Link>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          Interactive Learning for Placement Preparation
        </span>
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-sm font-medium text-blue-600">SQL</span>
        </div>
      </div>
    </header>
  )
}