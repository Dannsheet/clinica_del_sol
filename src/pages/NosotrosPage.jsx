export default function NosotrosPage() {
  return (
    <section className="aboutPage" aria-labelledby="nosotros-titulo">
      <div className="container">
        <header className="aboutPage-hero aboutPage-animate">
          <h1 id="nosotros-titulo" className="aboutPage-title">
            Comprometidos con tu bienestar, respaldados por la excelencia.
          </h1>
          <p className="aboutPage-lead">
            Cuidamos tu vida con el más alto estándar médico.
          </p>
          <p className="aboutPage-history">
            21 años brindando un servicio de salud integral.
          </p>
        </header>

        <div className="aboutPage-values" aria-label="Misión y visión de la clínica">
          <article className="aboutPage-card aboutPage-cardVision aboutPage-animate">
            <h2 className="aboutPage-cardTitle">Visión</h2>
            <p className="aboutPage-cardText">
              Ser una clínica referente en el sector de la salud por su amplia
              gama de especialidades médicas, integrando tecnología de
              vanguardia y sus recursos de manera efectiva, a fin de
              posicionarse como una de las primeras alternativas de salud para
              los pacientes.
            </p>
          </article>

          <article className="aboutPage-card aboutPage-cardMission aboutPage-animate">
            <h2 className="aboutPage-cardTitle">Misión</h2>
            <p className="aboutPage-cardText">
              Brindar servicios de salud integral orientado a la comunidad en
              general a través de un equipo humano cálido y calificado, que
              cumpla con las expectativas y garantice la satisfacción de
              nuestros pacientes.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}
