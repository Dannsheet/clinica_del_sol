import { Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "../lib/supabaseClient.js";
import * as LucideIcons from "lucide-react";

const hospitalServicesBg =
  "https://liqeparockamqivsqmtv.supabase.co/storage/v1/object/public/imagenes/team-surgeons-is-fighting-life-real-operation-real-emotions-intensive-care-team-is-fighting-life-patient-saving-life-struggle-life_resultado.webp";

const resolveIcon = (name) => {
  const Icon = LucideIcons?.[name];
  return Icon ? Icon : LucideIcons.Plus;
};

const hospitalServices = [
  {
    title: "Hospitalización",
    description:
      "Atención integral con monitoreo continuo, seguridad y comodidad durante tu recuperación.",
    Icon: resolveIcon("Hospital"),
  },
  {
    title: "UCI",
    description:
      "Cuidados intensivos con equipamiento especializado y personal altamente capacitado.",
    Icon: resolveIcon("HeartPulse"),
  },
  {
    title: "Emergencias",
    description:
      "Respuesta oportuna 24/7 con protocolos claros para una atención rápida y eficaz.",
    Icon: resolveIcon("Ambulance"),
  },
  {
    title: "UCI Pediátrico",
    description:
      "Cuidados intensivos para niños con enfoque humano y soporte especializado.",
    Icon: resolveIcon("Stethoscope"),
  },
  {
    title: "Neonatología",
    description:
      "Atención para recién nacidos con monitoreo y cuidados dedicados en cada etapa.",
    Icon: resolveIcon("Baby"),
  },
  {
    title: "Quirófano",
    description:
      "Salas equipadas para procedimientos seguros, con estándares de esterilidad y control.",
    Icon: resolveIcon("Scalpel"),
  },
  {
    title: "Gineco - Obstetricia",
    description:
      "Acompañamiento en salud femenina, control prenatal y atención del parto.",
    Icon: resolveIcon("Syringe"),
  },
  {
    title: "Traumatología",
    description:
      "Diagnóstico y tratamiento de lesiones con apoyo clínico, imagen y rehabilitación.",
    Icon: resolveIcon("Bandage"),
  },
  {
    title: "Laboratorio",
    description:
      "Exámenes clínicos con procesos confiables para apoyar decisiones médicas precisas.",
    Icon: resolveIcon("FlaskConical"),
  },
  {
    title: "Servicios Prehospitalarios",
    description:
      "Atención y traslado asistido para estabilización temprana y coordinación con emergencias.",
    Icon: resolveIcon("PhoneCall"),
  },
];

function readSpecialtiesCache() {
  try {
    const raw = window.sessionStorage.getItem("clinica_especialidades_v1");
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function chunkArray(items, chunkSize) {
  if (!Array.isArray(items) || chunkSize <= 0) return [];
  const out = [];
  for (let i = 0; i < items.length; i += chunkSize) {
    out.push(items.slice(i, i + chunkSize));
  }
  return out;
}

export default function HomePage() {
  const videoSrc =
    "https://liqeparockamqivsqmtv.supabase.co/storage/v1/object/public/videos/0129.mp4";
  const navigate = useNavigate();
  const [sloganIn, setSloganIn] = useState(false);
  const [galleryIn, setGalleryIn] = useState(false);
  const [specialties, setSpecialties] = useState(
    () => readSpecialtiesCache() ?? [],
  );
  const [specialtiesLoading, setSpecialtiesLoading] = useState(
    () => !readSpecialtiesCache()?.length,
  );
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [doctorQuery, setDoctorQuery] = useState("");
  const sloganRef = useRef(null);
  const galleryRef = useRef(null);
  const [servicesIsMobile, setServicesIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(max-width: 720px)")?.matches ?? false;
  });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return (
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
    );
  });
  const [servicesIndex, setServicesIndex] = useState(0);
  const [servicesNoTransition, setServicesNoTransition] = useState(false);
  const [servicesPaused, setServicesPaused] = useState(false);

  const servicesPerPage = servicesIsMobile ? 4 : 6;
  const servicesSlides = useMemo(
    () => chunkArray(hospitalServices, servicesPerPage),
    [servicesPerPage],
  );
  const servicesSlideCount = servicesSlides.length;
  const servicesRenderSlides = useMemo(() => {
    if (servicesSlideCount <= 1) return servicesSlides;
    return [...servicesSlides, servicesSlides[0]];
  }, [servicesSlideCount, servicesSlides]);

  const aboutGalleryImages = [
    "https://liqeparockamqivsqmtv.supabase.co/storage/v1/object/public/imagenes/doctores1_resultado.webp",
    "https://liqeparockamqivsqmtv.supabase.co/storage/v1/object/public/imagenes/doctores2_resultado.webp",
    "https://liqeparockamqivsqmtv.supabase.co/storage/v1/object/public/imagenes/doctores3_resultado.webp",
    "https://liqeparockamqivsqmtv.supabase.co/storage/v1/object/public/imagenes/doctores4_resultado.webp",
    "https://liqeparockamqivsqmtv.supabase.co/storage/v1/object/public/imagenes/doctores5_resultado.webp",
    "https://liqeparockamqivsqmtv.supabase.co/storage/v1/object/public/imagenes/cirujia1_resultado.webp",
    "https://liqeparockamqivsqmtv.supabase.co/storage/v1/object/public/imagenes/cirujia2_resultado.webp",
    "https://liqeparockamqivsqmtv.supabase.co/storage/v1/object/public/imagenes/cirujia3_resultado.webp",
    "https://liqeparockamqivsqmtv.supabase.co/storage/v1/object/public/imagenes/cirujia4_resultado.webp",
    "https://liqeparockamqivsqmtv.supabase.co/storage/v1/object/public/imagenes/cirujia5_resultado.webp",
    "https://liqeparockamqivsqmtv.supabase.co/storage/v1/object/public/imagenes/cirujia6_resultado.webp",
    "https://liqeparockamqivsqmtv.supabase.co/storage/v1/object/public/imagenes/cirujia7_resultado.webp",
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia?.("(max-width: 720px)");
    if (!mql) return;

    const onChange = (e) => {
      setServicesIsMobile(e.matches);
      setServicesNoTransition(true);
      setServicesIndex(0);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setServicesNoTransition(false));
      });
    };

    if (mql.addEventListener) mql.addEventListener("change", onChange);
    else mql.addListener(onChange);

    return () => {
      if (mql.removeEventListener) mql.removeEventListener("change", onChange);
      else mql.removeListener(onChange);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mql) return;

    const onChange = (e) => setPrefersReducedMotion(e.matches);

    if (mql.addEventListener) mql.addEventListener("change", onChange);
    else mql.addListener(onChange);

    return () => {
      if (mql.removeEventListener) mql.removeEventListener("change", onChange);
      else mql.removeListener(onChange);
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (servicesSlideCount <= 1) return;
    if (servicesPaused) return;

    const id = window.setInterval(() => {
      setServicesIndex((idx) => idx + 1);
    }, 3500);

    return () => window.clearInterval(id);
  }, [prefersReducedMotion, servicesPaused, servicesSlideCount]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (prefersReducedMotion) return;

    const el = sloganRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry) return;
        if (entry.isIntersecting) {
          setSloganIn(true);
          return;
        }

        if (entry.intersectionRatio === 0) {
          setSloganIn(false);
        }
      },
      { threshold: [0, 0.25], rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  useEffect(() => {
    let cancelled = false;

    supabase
      .from("especialidades")
      .select("id,nombre,slug,orden")
      .eq("activo", true)
      .order("orden", { ascending: true })
      .order("nombre", { ascending: true })
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          setSpecialtiesLoading(false);
          return;
        }

        const list = (data ?? []).map((row) => ({
          id: row.id,
          nombre: row.nombre,
          slug: row.slug,
        }));

        setSpecialties(list);
        setSpecialtiesLoading(false);

        try {
          window.sessionStorage.setItem(
            "clinica_especialidades_v1",
            JSON.stringify(list),
          );
        } catch {
          // ignore
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (prefersReducedMotion) return;

    const el = galleryRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry) return;

        if (!entry.isIntersecting) return;
        setGalleryIn(true);
        observer.disconnect();
      },
      { threshold: [0, 0.2], rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <>
      <section className="homeHero" id="inicio" aria-label="Inicio">
        <div className="homeHero-media" aria-hidden="true">
          <video
            className="homeHero-video"
            src={videoSrc}
            autoPlay
            muted
            playsInline
            loop
            preload="metadata"
          />
        </div>

        <div className="homeHero-content">
          <div className="container" />
        </div>
      </section>

      <section
        className="homeAbout"
        id="quienes-somos"
        aria-label="Quienes somos"
      >
        <div className="container">
          <div className="homeAbout-inner">
            <img
              ref={sloganRef}
              className={
                sloganIn
                  ? "homeAbout-slogan homeAbout-sloganIn"
                  : "homeAbout-slogan"
              }
              src="/Slogan_resultado.webp"
              alt="Clínica del Sol"
              loading="lazy"
            />

            <p className="homeAbout-text">
              En Clínica del Sol buscamos satisfacer en forma integral las
              necesidades del cuidado de la salud de nuestros pacientes,
              facilitándoles una infraestructura adecuada, equipamiento médico
              de alta calidad y un equipo de profesionales capacitados en
              ejercicio de su vocación.
            </p>

            <Link className="homeAbout-cta" to="/nosotros">
              Conócenos
            </Link>

            <div
              ref={galleryRef}
              className={
                galleryIn
                  ? "homeAbout-gallery homeAbout-galleryIn"
                  : "homeAbout-gallery"
              }
              aria-hidden="true"
            >
              {aboutGalleryImages.map((src) => (
                <img
                  key={src}
                  className="homeAbout-img"
                  src={src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="homeStaff"
        id="staff-medico"
        aria-label="Staff médico"
      >
        <div className="container">
          <h2 className="homeStaff-title">STAFF MÉDICO</h2>

          <div className="homeStaff-panels">
            <div className="homeStaff-panel">
              <div className="homeStaff-panelHeader">
                <div className="homeStaff-panelTitle">
                  Elige una especialidad
                </div>
                <div className="homeStaff-panelSub">
                  Más de 40 especialidades médicas a tu servicio
                </div>
              </div>

              <div className="homeStaff-selectRow">
                <select
                  className="homeStaff-select"
                  value={selectedSpecialty}
                  onChange={(e) => {
                    const slug = e.target.value;
                    setSelectedSpecialty(slug);
                    if (!slug) return;
                    navigate(
                      `/staff-medico?especialidad=${encodeURIComponent(slug)}`,
                    );
                  }}
                  disabled={specialtiesLoading}
                  aria-label="Seleccionar especialidad"
                >
                  <option value="">
                    {specialtiesLoading ? "Cargando…" : "Selecciona…"}
                  </option>
                  {specialties.map((s) => (
                    <option key={s.id} value={s.slug}>
                      {s.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="homeStaff-panel">
              <div className="homeStaff-panelHeader">
                <div className="homeStaff-panelTitle">Encuentra tu médico</div>
                <div className="homeStaff-panelSub">
                  Más de 400 médicos especialistas al cuidado de tu salud
                </div>
              </div>

              <form
                className="homeStaff-searchRow"
                onSubmit={(e) => {
                  e.preventDefault();
                  const q = doctorQuery.trim();
                  if (!q) return;
                  navigate(`/staff-medico?q=${encodeURIComponent(q)}`);
                }}
              >
                <input
                  className="homeStaff-searchInput"
                  type="search"
                  value={doctorQuery}
                  onChange={(e) => setDoctorQuery(e.target.value)}
                  placeholder="Nombre o Apellido"
                  aria-label="Buscar médico por nombre"
                />
                <button className="homeStaff-searchBtn" type="submit">
                  Buscar
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section
        className="homeServices"
        id="servicios-hospitalarios"
        aria-label="Servicios hospitalarios"
        style={{ '--home-services-bg': `url(${hospitalServicesBg})` }}
      >
        <div className="container">
          <h2 className="homeServices-title">SERVICIOS HOSPITALARIOS</h2>

          <div
            className="homeServices-grid"
            role="list"
            onMouseEnter={() => setServicesPaused(true)}
            onMouseLeave={() => setServicesPaused(false)}
            onFocusCapture={() => setServicesPaused(true)}
            onBlurCapture={() => setServicesPaused(false)}
            onTouchStart={() => setServicesPaused(true)}
            onTouchEnd={() => setServicesPaused(false)}
            onTouchCancel={() => setServicesPaused(false)}
          >
            <div
              className={
                servicesNoTransition
                  ? "homeServices-track homeServices-trackNoAnim"
                  : "homeServices-track"
              }
              style={{
                transform: `translateX(-${servicesIndex * 100}%)`,
              }}
              onTransitionEnd={() => {
                if (servicesSlideCount <= 1) return;
                if (servicesIndex !== servicesSlideCount) return;

                setServicesNoTransition(true);
                setServicesIndex(0);
                window.requestAnimationFrame(() => {
                  window.requestAnimationFrame(() => setServicesNoTransition(false));
                });
              }}
              aria-roledescription="carousel"
              aria-label="Carrusel de servicios hospitalarios"
            >
              {servicesRenderSlides.map((slide, slideIdx) => (
                <div className="homeServices-slide" key={slideIdx}>
                  <div className="homeServices-slideGrid">
                    {slide.map((s) => (
                      <article
                        key={s.title}
                        className="homeServices-card"
                        role="listitem"
                      >
                        <div className="homeServices-iconWrap" aria-hidden="true">
                          <s.Icon className="homeServices-icon" />
                        </div>
                        <h3 className="homeServices-cardTitle">{s.title}</h3>
                        <p className="homeServices-cardText">{s.description}</p>
                      </article>
                    ))}
                    {Array.from({
                      length: Math.max(0, servicesPerPage - slide.length),
                    }).map((_, idx) => (
                      <div
                        key={`placeholder-${slideIdx}-${idx}`}
                        className="homeServices-card homeServices-cardPlaceholder"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
