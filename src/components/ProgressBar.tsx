type Props = { value: number; }

export default function ProgressBar({ value }: Props){
  return (
    <div
      className="relative h-2 w-full overflow-hidden rounded-full bg-slate-800/70"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
    >
      <span
        className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary to-success transition-all"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  )
}
