import { useEffect, useRef } from "react";

export default function NosotrosPage() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const items = root.querySelectorAll(".aboutPage-animate");
    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("aboutPage-animateIn");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.16, rootMargin: "0px 0px -10% 0px" },
    );

    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={rootRef} className="aboutPage" aria-label="Nosotros">
      <div className="container">
        <header className="aboutPage-hero aboutPage-animate">
          <div className="aboutPage-heroMedia" aria-hidden="true">
            <img
              className="aboutPage-heroImage"
              src="https://liqeparockamqivsqmtv.supabase.co/storage/v1/object/public/imagenes/DSC05299_resultado.webp"
              alt=""
              loading="eager"
              decoding="async"
            />
          </div>
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
