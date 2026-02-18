export default function PlaceholderPage({ title, description }) {
  return (
    <section className="page">
      <div className="container">
        <h1 className="page-title">{title}</h1>
        {description ? <p className="page-description">{description}</p> : null}
      </div>
    </section>
  )
}
