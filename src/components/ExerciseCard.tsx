import StarRating from './StarRating'

type Props = {
  title: string
  subtitle?: string
  stars?: number
  children: React.ReactNode
}

export default function ExerciseCard({ title, subtitle, stars, children }: Props) {
  return (
    <section className="flex flex-col gap-5 rounded-[26px] border border-white/70 bg-white px-6 py-6 shadow-[0_24px_55px_-48px_rgba(127,107,255,0.8)]">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-ink">{title}</h3>
          {subtitle && <p className="text-sm text-muted">{subtitle}</p>}
        </div>
        {typeof stars === 'number' && <StarRating value={stars} />}
      </header>
      <div className="space-y-4 text-ink">{children}</div>
    </section>
  )
}
