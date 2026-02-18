import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section className="page">
      <div className="container">
        <h1 className="page-title">Página no encontrada</h1>
        <p className="page-description">La ruta que intentas abrir no existe.</p>
        <Link className="btn btnPrimary" to="/">
          Volver al inicio
        </Link>
      </div>
    </section>
  )
}
