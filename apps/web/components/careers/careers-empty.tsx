export function CareersEmpty({ message }: { message?: string }) {
  return (
    <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-10 text-center">
      <p className="text-blue-dark font-display font-semibold text-xl mb-2">
        Sin vacantes abiertas por ahora
      </p>
      <p className="text-gray-600 max-w-lg mx-auto">
        {message ??
          "No hay posiciones publicadas en este momento. Vuelve pronto o escríbenos a contacto@vrgroup.cl para postular de forma espontánea."}
      </p>
    </div>
  )
}
