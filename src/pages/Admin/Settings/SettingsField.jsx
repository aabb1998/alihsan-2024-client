export default function SettingsField ({ children, label, value, error }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <p className="font-medium grow basis-0 text-md text-neutral-600">{label}</p>
      <div className="flex flex-col items-end md:items-start md:grow md:basis-0">
        <div className="flex flex-wrap gap-3 md:gap-4 grow basis-0">
          {value}
        </div>
        {error && <div className="mt-4 text-right text-red-300">{error}</div>}
      </div>
    </div>
  )
}
