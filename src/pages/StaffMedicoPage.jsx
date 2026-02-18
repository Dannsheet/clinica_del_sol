import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient.js'

export default function StaffMedicoPage() {
  const [searchParams] = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])

  const filters = useMemo(() => {
    const especialidad = (searchParams.get('especialidad') ?? '').trim()
    const q = (searchParams.get('q') ?? '').trim()
    return {
      especialidad,
      q,
    }
  }, [searchParams])

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      setLoading(true)

      const p_especialidad_slug = filters.especialidad || null
      const p_q = filters.q || null

      const rpc = await supabase.rpc('search_medicos', {
        p_especialidad_slug,
        p_q,
        p_limit: 60,
        p_offset: 0,
      })

      if (!cancelled && !rpc.error) {
        setItems(rpc.data ?? [])
        setLoading(false)
        return
      }

      const query = supabase
        .from('medicos')
        .select('id,nombres,apellidos,slug,foto_url')
        .eq('activo', true)
        .order('apellidos', { ascending: true })
        .order('nombres', { ascending: true })
        .limit(60)

      if (p_q) {
        query.ilike('nombre_completo', `%${p_q}%`)
      }

      if (p_especialidad_slug) {
        const esp = await supabase.from('especialidades').select('id').eq('slug', p_especialidad_slug).maybeSingle()
        if (esp.error || !esp.data?.id) {
          if (cancelled) return
          setItems([])
          setLoading(false)
          return
        }

        const rel = await supabase
          .from('medico_especialidades')
          .select('medico_id')
          .eq('especialidad_id', esp.data.id)
          .limit(600)

        if (rel.error) {
          if (cancelled) return
          setItems([])
          setLoading(false)
          return
        }

        const ids = (rel.data ?? []).map((r) => r.medico_id)
        if (!ids.length) {
          if (cancelled) return
          setItems([])
          setLoading(false)
          return
        }

        query.in('id', ids)
      }

      const res = await query
      if (cancelled) return
      setItems(res.data ?? [])
      setLoading(false)
    }

    Promise.resolve().then(load)

    return () => {
      cancelled = true
    }
  }, [filters.especialidad, filters.q])

  return (
    <section className="page">
      <div className="container">
        <h1 className="page-title">Staff Médico</h1>
        <p className="page-description">
          {filters.especialidad || filters.q
            ? 'Resultados filtrados.'
            : 'Presentación de especialistas. Selecciona una especialidad o busca por nombre.'}
        </p>

        {loading ? (
          <p className="page-description">Cargando…</p>
        ) : items.length ? (
          <div className="staffResults" role="list">
            {items.map((m) => (
              <article key={m.id} className="staffCard" role="listitem">
                {m.foto_url ? <img className="staffAvatar" src={m.foto_url} alt="" loading="lazy" /> : null}
                <div className="staffCardBody">
                  <div className="staffName">
                    {m.nombres} {m.apellidos}
                  </div>
                  {Array.isArray(m.especialidades) && m.especialidades.length ? (
                    <div className="staffMeta">{m.especialidades.join(' · ')}</div>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="page-description">No se encontraron médicos con esos criterios.</p>
        )}
      </div>
    </section>
  )
}
