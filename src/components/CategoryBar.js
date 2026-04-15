const tags = [
  'Înființări de firme',
  'Expertiză contabilă',
  'Asistență ANAF & ITM',
  'Salarizare & personal',
  'Consultanță fiscală',
]

export default function CategoryBar() {
  return (
    <div className="bg-base border-y border-slate-100 py-6 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-[11px] font-bold tracking-[0.25em] uppercase text-text-muted/60">
        <span className="text-primary-blue/40 font-black">Trusted Expertise:</span>
        {tags.map((t) => (
          <span key={t} className="whitespace-nowrap hover:text-primary-blue transition-colors cursor-default flex items-center gap-3">
            <span className="size-1 bg-accent-mustard rounded-full" />
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}
