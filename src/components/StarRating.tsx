type Props = { value: number }

export default function StarRating({ value }: Props) {
  return (
    <span className="inline-flex items-center gap-1 text-accent" aria-label={`${value} estrellas`}>
      {[0, 1, 2].map(index => (
        <span
          key={index}
          className={`text-lg leading-none ${index < value ? 'opacity-100' : 'opacity-40'}`}
        >
          {'\u2605'}
        </span>
      ))}
    </span>
  )
}
