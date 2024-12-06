import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Search, Globe, RefreshCw, Sparkles, Menu, X } from 'lucide-react'

export function Header() {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="bg-ocean-600/90 backdrop-blur-sm shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-2xl font-bold text-white flex items-center space-x-2">
            <span>🌊</span>
            <span>OceanMoji</span>
          </Link>
          <div className="hidden sm:flex space-x-6">
            <NavLink
              to="/"
              icon={<Home size={20} />}
              label="Home"
              active={location.pathname === '/'}
            />
            <NavLink
              to="/emoji"
              icon={<Search size={20} />}
              label="Ocean Stories"
              active={location.pathname === '/emoji'}
            />
            <NavLink
              to="/ai-translation"
              icon={<Sparkles size={20} />}
              label="Sea Translation"
              active={location.pathname === '/ai-translation'}
            />
            <NavLink
              to="/explore"
              icon={<Globe size={20} />}
              label="Deep Explore"
              active={location.pathname === '/explore'}
            />
          </div>
        </div>

        <button
          className="sm:hidden p-2 text-white hover:bg-ocean-500 rounded-lg"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {isMobileMenuOpen && (
        <div className="sm:hidden bg-ocean-600 border-t border-ocean-500">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <MobileNavLink
              to="/"
              label="Home"
              active={location.pathname === '/'}
            />
            <MobileNavLink
              to="/emoji"
              label="Ocean Stories"
              active={location.pathname === '/emoji'}
            />
            <MobileNavLink
              to="/ai-translation"
              label="Sea Translation"
              active={location.pathname === '/ai-translation'}
            />
            <MobileNavLink
              to="/explore"
              label="Deep Explore"
              active={location.pathname === '/explore'}
            />
          </div>
        </div>
      )}
    </header>
  )
}

function NavLink({ icon, label, to, active }: {
  icon: React.ReactNode
  label: string
  to: string
  active: boolean
}) {
  return (
    <Link
      to={to}
      className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
        active
          ? 'text-white bg-ocean-500'
          : 'text-ocean-100 hover:text-white hover:bg-ocean-500'
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </Link>
  )
}

function MobileNavLink({ label, to, active }: {
  label: string
  to: string
  active: boolean
}) {
  return (
    <Link
      to={to}
      className={`block px-3 py-2 rounded-lg text-base font-medium ${
        active
          ? 'text-white bg-ocean-500'
          : 'text-ocean-100 hover:text-white hover:bg-ocean-500'
      }`}
    >
      {label}
    </Link>
  )
}