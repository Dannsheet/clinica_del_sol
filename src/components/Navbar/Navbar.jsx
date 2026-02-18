import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import './Navbar.css'

function IconFacebook(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...props}>
      <path d="M13.5 21v-7h2.3l.4-2.7h-2.7V9.6c0-.8.2-1.3 1.3-1.3h1.5V5.9c-.7-.1-1.6-.2-2.6-.2-2.6 0-4.4 1.6-4.4 4.6v1.9H6.8V14h2.5v7h4.2z" />
    </svg>
  )
}

function IconInstagram(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...props}>
      <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9z" />
      <path d="M12 7.3A4.7 4.7 0 1 1 7.3 12 4.7 4.7 0 0 1 12 7.3zm0 2A2.7 2.7 0 1 0 14.7 12 2.7 2.7 0 0 0 12 9.3z" />
      <path d="M17.6 6.6a1.1 1.1 0 1 1-1.1-1.1 1.1 1.1 0 0 1 1.1 1.1z" />
    </svg>
  )
}

function IconTikTok(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...props}>
      <path d="M15.7 3c.4 2.5 2.2 4.5 4.6 4.9v3.2c-1.6 0-3.1-.5-4.4-1.4v6.2c0 3.3-2.7 6.1-6.1 6.1S3.7 19.3 3.7 16s2.7-6.1 6.1-6.1c.4 0 .8 0 1.2.1v3.4c-.4-.2-.8-.3-1.2-.3-1.5 0-2.8 1.3-2.8 2.8s1.3 2.8 2.8 2.8 2.8-1.3 2.8-2.8V3h3.1z" />
    </svg>
  )
}

function IconWhatsApp(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...props}>
      <path d="M12 2a9.7 9.7 0 0 0-8.3 14.8L2.7 22l5.3-1.7A9.7 9.7 0 1 0 12 2zm0 2a7.7 7.7 0 0 1 0 15.4 7.7 7.7 0 0 1-3.8-1l-.5-.3-3.1 1 .9-3-.3-.5A7.7 7.7 0 0 1 12 4zm4.6 10.7c-.2-.1-1.2-.6-1.4-.7s-.4-.1-.6.1-.7.7-.8.8-.3.2-.5.1a6.3 6.3 0 0 1-1.9-1.2 7.1 7.1 0 0 1-1.3-1.6c-.1-.2 0-.4.1-.5l.4-.4c.1-.1.2-.3.3-.4a.5.5 0 0 0 0-.5c-.1-.1-.6-1.4-.8-1.9s-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3s-1 1-1 2.4 1 2.8 1.2 3 .2.3.3.5a10.7 10.7 0 0 0 4.1 3.7c.5.2.9.4 1.3.5.5.2 1 .1 1.3.1.4-.1 1.2-.5 1.4-1s.2-1 .1-1.1-.2-.2-.4-.3z" />
    </svg>
  )
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('')

  const sectionItems = useMemo(
    () => [
      { label: 'INICIO', sectionId: 'inicio' },
      { label: 'QUIENES SOMOS', sectionId: 'quienes-somos' },
      { label: 'STAFF MÉDICO', sectionId: 'staff-medico' },
      { label: 'SERVICIOS HOSPITALARIOS', sectionId: 'servicios-hospitalarios' },
    ],
    [],
  )

  const navItems = useMemo(
    () => [
      { label: 'CUERPO MÉDICO EXTERNO', to: '/otros-servicios' },
      { label: 'SEGUROS PRIVADOS', to: '/contacto' },
    ],
    [],
  )

  useEffect(() => {
    if (location.pathname !== '/') return

    let rafId = 0

    const getNavbarHeight = () => {
      const raw = getComputedStyle(document.documentElement).getPropertyValue('--navbar-height')
      const value = Number.parseFloat(raw)
      return Number.isFinite(value) ? value : 76
    }

    const update = () => {
      rafId = 0
      const inicio = document.getElementById('inicio')
      const quienes = document.getElementById('quienes-somos')
      const staff = document.getElementById('staff-medico')
      const servicios = document.getElementById('servicios-hospitalarios')
      if (!inicio || !quienes || !staff || !servicios) return

      const navH = getNavbarHeight()
      const y = window.scrollY + navH + 1
      const quienesTop = quienes.offsetTop
      const staffTop = staff.offsetTop
      const serviciosTop = servicios.offsetTop

      setActiveSection(
        y >= serviciosTop
          ? 'servicios-hospitalarios'
          : y >= staffTop
            ? 'staff-medico'
            : y >= quienesTop
              ? 'quienes-somos'
              : 'inicio',
      )
    }

    const onScroll = () => {
      if (rafId) return
      rafId = window.requestAnimationFrame(update)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (rafId) window.cancelAnimationFrame(rafId)
    }
  }, [location.pathname])

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`)
      return
    }

    const el = document.getElementById(sectionId)
    if (!el) return

    const raw = getComputedStyle(document.documentElement).getPropertyValue('--navbar-height')
    const navH = Number.isFinite(Number.parseFloat(raw)) ? Number.parseFloat(raw) : 76
    const top = el.getBoundingClientRect().top + window.scrollY - navH
    window.scrollTo({ top, behavior: 'smooth' })

    if (window.location.hash !== `#${sectionId}`) {
      window.history.pushState(null, '', `#${sectionId}`)
    }
  }

  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="navbar-left">
          <NavLink className="navbar-logo" to="/" aria-label="Ir a Inicio">
            <img
              className="navbar-logoImage"
              src="/clinica.png"
              alt="Clínica del Sol"
              loading="eager"
            />
          </NavLink>
        </div>

        <nav className="navbar-center" aria-label="Navegación principal">
          <ul className="navbar-links">
            {sectionItems.map((item) => (
              <li key={item.sectionId}>
                <a
                  href={`/#${item.sectionId}`}
                  className={
                    location.pathname === '/' && activeSection === item.sectionId
                      ? 'navbar-link navbar-linkActive'
                      : 'navbar-link'
                  }
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(item.sectionId)
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    isActive ? 'navbar-link navbar-linkActive' : 'navbar-link'
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li className="navbar-socialItem">
              <div className="navbar-social" aria-label="Redes sociales">
                <a
                  className="social-btn"
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                >
                  <IconFacebook className="social-icon" />
                </a>
                <a
                  className="social-btn"
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                >
                  <IconInstagram className="social-icon" />
                </a>
                <a
                  className="social-btn"
                  href="https://wa.me/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                >
                  <IconWhatsApp className="social-icon" />
                </a>
              </div>
            </li>
          </ul>
        </nav>

        <div className="navbar-right">
          <button
            className={isOpen ? 'hamburger hamburgerOpen' : 'hamburger'}
            type="button"
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-controls="mobile-nav"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((v) => !v)}
          >
            <span className="hamburger-icon" aria-hidden="true">
              <span className="hamburger-line" />
              <span className="hamburger-line" />
              <span className="hamburger-line" />
            </span>
          </button>
        </div>
      </div>

      <div
        className={isOpen ? 'mobileNav mobileNavOpen' : 'mobileNav'}
        id="mobile-nav"
        role="dialog"
        aria-label="Menú"
      >
        <div className="mobileNav-backdrop" onClick={() => setIsOpen(false)} />
        <div className="mobileNav-panel">
          <div className="mobileNav-header">
            <div className="mobileNav-brand">
              <img
                className="mobileNav-logo"
                src="/clinica.png"
                alt="Clínica del Sol"
                loading="lazy"
              />
            </div>
            <button className="mobileNav-close" type="button" onClick={() => setIsOpen(false)} aria-label="Cerrar">
              ✕
            </button>
          </div>

          <ul className="mobileNav-links">
            {sectionItems.map((item) => (
              <li key={item.sectionId}>
                <a
                  href={`/#${item.sectionId}`}
                  className={
                    location.pathname === '/' && activeSection === item.sectionId
                      ? 'mobileNav-link mobileNav-linkActive'
                      : 'mobileNav-link'
                  }
                  onClick={(e) => {
                    e.preventDefault()
                    setIsOpen(false)
                    scrollToSection(item.sectionId)
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}

            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    isActive ? 'mobileNav-link mobileNav-linkActive' : 'mobileNav-link'
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mobileNav-social">
            <a className="social-btn" href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
              <IconFacebook className="social-icon" />
            </a>
            <a className="social-btn" href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <IconInstagram className="social-icon" />
            </a>
            <a className="social-btn" href="https://wa.me/" target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <IconWhatsApp className="social-icon" />
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
