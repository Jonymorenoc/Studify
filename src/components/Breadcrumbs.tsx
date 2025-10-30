import { Link } from 'react-router-dom'

type Crumb = { label: string; to?: string }

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  if (!items.length) return null

  return (
    <nav className="flex flex-wrap items-center gap-2 text-xs font-semibold text-muted" aria-label="Ruta de navegación">
      {items.map((crumb, index) => (
        <span key={`${crumb.label}-${index}`} className="flex items-center gap-2">
          {crumb.to ? (
            <Link
              to={crumb.to}
              className="inline-flex items-center gap-1 rounded-full bg-white/70 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-primary transition hover:bg-primary/15 hover:text-primary-dark"
            >
              {crumb.label}
            </Link>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-primary">
              {crumb.label}
            </span>
          )}
          {index < items.length - 1 && <span aria-hidden className="text-muted/60">/</span>}
        </span>
      ))}
    </nav>
  )
}

