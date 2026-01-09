"use client"

import { useEffect, useState } from "react"
import { Settings } from "lucide-react"

type SiteSettings = {
  show_portfolio_in_header: boolean
  show_portfolio_in_services: boolean
  show_careers_in_header: boolean
  show_team_in_about: boolean
}

const defaultSettings: SiteSettings = {
  show_portfolio_in_header: true,
  show_portfolio_in_services: true,
  show_careers_in_header: false,
  show_team_in_about: true,
}

export default function AdminConfigPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [warning, setWarning] = useState<string | null>(null)

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const res = await fetch("/api/admin/site-settings", { cache: "no-store" })
        const json = await res.json()
        if (json?.warning) setWarning(json.warning)
        setSettings({ ...defaultSettings, ...(json?.data || {}) })
      } catch (err: any) {
        setError(err?.message || "No se pudieron cargar los ajustes")
      } finally {
        setLoading(false)
      }
    }
    loadSettings()
  }, [])

  const save = async (nextSettings: SiteSettings) => {
    setSaving(true)
    setError(null)
    setMessage(null)
    try {
      const res = await fetch("/api/admin/site-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nextSettings),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || "No se pudieron guardar los ajustes")
      const resolved = { ...defaultSettings, ...(json?.data || nextSettings) }
      setSettings(resolved)
      setMessage("Ajustes guardados correctamente.")
      return true
    } catch (err: any) {
      setError(err?.message || "No se pudieron guardar los ajustes")
      return false
    } finally {
      setSaving(false)
    }
  }

  const toggle = async (key: keyof SiteSettings) => {
    if (!settings) return
    const previous = settings
    const next = { ...settings, [key]: !settings[key] }
    setSettings(next)
    const ok = await save(next)
    if (!ok) setSettings(previous)
  }

  return (
    <div className="space-y-6">
      <header className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Configuración</p>
          <h1 className="font-display text-3xl font-bold text-gray-900">Ajustes del sitio</h1>
          <p className="text-gray-600">Define qué módulos aparecen en el header y en los servicios. Los cambios se guardan automáticamente.</p>
        </div>
      </header>

      {saving && <div className="text-xs text-gray-500 uppercase tracking-[0.24em]">Guardando...</div>}
      {warning && !error && (
        <div className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg p-3">{warning}</div>
      )}
      {error && <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">{error}</div>}
      {message && <div className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg p-3">{message}</div>}

      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-6">
        <div className="flex items-center gap-2 text-gray-900 font-semibold">
          <Settings size={18} />
          Módulos visibles
        </div>

        {loading || !settings ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-pulse">
            {[1, 2, 3].map((item) => (
              <div key={item} className="rounded-xl border border-gray-200 bg-gray-50 p-4 space-y-2">
                <div className="h-4 w-40 bg-gray-200 rounded"></div>
                <div className="h-3 w-56 bg-gray-100 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.24em] text-gray-500">Header</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    key: "show_portfolio_in_header",
                    title: "Portafolio en el header",
                    description: "Muestra u oculta el link de Portafolio en la navegación principal.",
                  },
                  {
                    key: "show_careers_in_header",
                    title: "Trabaja con nosotros en el header",
                    description: "Agrega el link al listado de trabajos en la barra superior.",
                  },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => toggle(item.key as keyof SiteSettings)}
                    className={`text-left rounded-xl border px-4 py-4 transition shadow-sm ${
                      settings[item.key as keyof SiteSettings] ? "border-blue-200 bg-blue-50" : "border-gray-200 bg-white"
                    }`}
                    disabled={saving}
                    role="switch"
                    aria-checked={settings[item.key as keyof SiteSettings]}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                        <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                      </div>
                      <div
                        className={`w-12 h-7 rounded-full border transition ${
                          settings[item.key as keyof SiteSettings]
                            ? "bg-blue-600 border-blue-600"
                            : "bg-gray-200 border-gray-200"
                        }`}
                      >
                        <span
                          className={`block w-5 h-5 bg-white rounded-full shadow-sm transition translate-y-0.5 ${
                            settings[item.key as keyof SiteSettings] ? "translate-x-6" : "translate-x-1"
                          }`}
                        ></span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.24em] text-gray-500">Servicios</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    key: "show_portfolio_in_services",
                    title: "Portafolio en servicios",
                    description: "Muestra u oculta los proyectos relacionados dentro de cada servicio.",
                  },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => toggle(item.key as keyof SiteSettings)}
                    className={`text-left rounded-xl border px-4 py-4 transition shadow-sm ${
                      settings[item.key as keyof SiteSettings] ? "border-blue-200 bg-blue-50" : "border-gray-200 bg-white"
                    }`}
                    disabled={saving}
                    role="switch"
                    aria-checked={settings[item.key as keyof SiteSettings]}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                        <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                      </div>
                      <div
                        className={`w-12 h-7 rounded-full border transition ${
                          settings[item.key as keyof SiteSettings]
                            ? "bg-blue-600 border-blue-600"
                            : "bg-gray-200 border-gray-200"
                        }`}
                      >
                        <span
                          className={`block w-5 h-5 bg-white rounded-full shadow-sm transition translate-y-0.5 ${
                            settings[item.key as keyof SiteSettings] ? "translate-x-6" : "translate-x-1"
                          }`}
                        ></span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.24em] text-gray-500">Nosotros</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    key: "show_team_in_about",
                    title: "Equipo directivo",
                    description: "Muestra u oculta el bloque de equipo en la página Nosotros.",
                  },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => toggle(item.key as keyof SiteSettings)}
                    className={`text-left rounded-xl border px-4 py-4 transition shadow-sm ${
                      settings[item.key as keyof SiteSettings] ? "border-blue-200 bg-blue-50" : "border-gray-200 bg-white"
                    }`}
                    disabled={saving}
                    role="switch"
                    aria-checked={settings[item.key as keyof SiteSettings]}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                        <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                      </div>
                      <div
                        className={`w-12 h-7 rounded-full border transition ${
                          settings[item.key as keyof SiteSettings]
                            ? "bg-blue-600 border-blue-600"
                            : "bg-gray-200 border-gray-200"
                        }`}
                      >
                        <span
                          className={`block w-5 h-5 bg-white rounded-full shadow-sm transition translate-y-0.5 ${
                            settings[item.key as keyof SiteSettings] ? "translate-x-6" : "translate-x-1"
                          }`}
                        ></span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
