import { Link, useLocation } from 'react-router-dom'
import { navigationItems } from '../../data/navigation'
import * as Icons from 'lucide-react'

export default function Sidebar() {
  const location = useLocation()

  const getIconComponent = (iconName) => {
    const Icon = Icons[iconName]
    return Icon ? <Icon className="w-5 h-5" /> : null
  }

  return (
    <aside className="fixed left-0 top-16 h-full w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <nav className="p-4">
        <ul className="space-y-1">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <li key={item.id}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {getIconComponent(item.icon)}
                  <span className="text-sm">{item.title}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}