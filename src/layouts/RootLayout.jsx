import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar.jsx'
import { useEffect } from 'react'

export default function RootLayout() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return

    const id = location.hash.replace('#', '')
    const el = document.getElementById(id)
    if (!el) return

    const t = window.setTimeout(() => {
      const raw = getComputedStyle(document.documentElement).getPropertyValue('--navbar-height')
      const navH = Number.isFinite(Number.parseFloat(raw)) ? Number.parseFloat(raw) : 76
      const top = el.getBoundingClientRect().top + window.scrollY - navH
      window.scrollTo({ top, behavior: 'smooth' })
    }, 0)

    return () => window.clearTimeout(t)
  }, [location.hash, location.pathname])

  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-main" id="main">
        <Outlet />
      </main>
    </div>
  )
}
