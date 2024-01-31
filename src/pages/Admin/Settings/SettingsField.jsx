export default function SettingsField ({ children, label, value, error }) {
  return (
    <div className="flex items-center gap-2">
      <p className="font-medium grow basis-0 text-md text-neutral-600">{label}</p>
      <div className="flex flex-col items-end">
        <div className="flex flex-wrap gap-4 grow basis-0">
          {value}
        </div>
        {error && <div className="text-red-300 text-right mt-4">{error}</div>}
      </div>
    </div>
  )
}
