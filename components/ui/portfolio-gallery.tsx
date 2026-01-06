"use client"

import { useState } from "react"
import { X } from "lucide-react"

type Media = {
  url: string
  alt_text?: string | null
  caption?: string | null
  is_primary?: boolean
  order_index?: number | null
}

export function PortfolioGallery({ media }: { media: Media[] }) {
  const [selected, setSelected] = useState<Media | null>(null)
  const gallery = media.filter((m) => !m.is_primary)

  if (!gallery.length) return null

  return (
    <div className="space-y-3">
      <h3 className="font-display text-xl font-semibold text-[#0b1b33]">Galería</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {gallery.map((item, idx) => (
          <button
            key={idx}
            onClick={() => setSelected(item)}
            className="rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md transition"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.url} alt={item.alt_text || item.caption || "media"} className="w-full h-48 object-cover" />
          </button>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
          <div className="relative max-w-5xl w-full">
            <button
              onClick={() => setSelected(null)}
              className="absolute -top-10 right-0 text-white bg-black/60 p-2 rounded-full hover:bg-black/80"
              aria-label="Cerrar"
            >
              <X size={18} />
            </button>
            <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={selected.url} alt={selected.alt_text || selected.caption || "media"} className="w-full h-full object-contain" />
              {selected.caption && <div className="p-3 text-sm text-gray-700">{selected.caption}</div>}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
