"use client"

import type React from "react"

import { useState } from "react"

export function JobApplicationForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    posicion: "",
    mensaje: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSubmitted(true)
      setFormData({ nombre: "", email: "", telefono: "", posicion: "", mensaje: "" })
      setTimeout(() => setSubmitted(false), 5000)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {submitted && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 font-medium">✓ Candidatura enviada. Revisaremos tu perfil pronto.</p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
        <input
          type="tel"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Posición de Interés</label>
        <select
          name="posicion"
          value={formData.posicion}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="">Selecciona una posición</option>
          <option value="full-stack">Desarrollador Full Stack Senior</option>
          <option value="appian">Consultor Appian</option>
          <option value="ux">Diseñador UX/UI</option>
          <option value="ia">Especialista en IA</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Mensaje</label>
        <textarea
          name="mensaje"
          value={formData.mensaje}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none"
          placeholder="Cuéntanos por qué te gustaría unirte a VR Group..."
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-3 bg-coral text-white rounded-lg font-semibold hover:bg-coral-dark transition-colors disabled:opacity-50"
      >
        {loading ? "Enviando..." : "Enviar candidatura"}
      </button>
    </form>
  )
}
