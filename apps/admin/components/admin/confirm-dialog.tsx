"use client"

type ConfirmDialogProps = {
  open: boolean
  title?: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  loading?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDialog({
  open,
  title = "Confirmar accion",
  description = "Esta accion no se puede deshacer.",
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) return null

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(11, 27, 51, 0.48)",
        display: "grid",
        placeItems: "center",
        padding: 20,
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        style={{
          width: "100%",
          maxWidth: 480,
          background: "#fff",
          borderRadius: 24,
          border: "1px solid #d8e0ea",
          padding: 24,
          boxShadow: "0 24px 60px rgba(11, 27, 51, 0.18)",
        }}
      >
        <h3 style={{ margin: 0, fontSize: 24 }}>{title}</h3>
        <p style={{ margin: "12px 0 0", lineHeight: 1.6, color: "#4f5d75" }}>{description}</p>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 22 }}>
          <button
            type="button"
            onClick={onCancel}
            style={{
              borderRadius: 999,
              border: "1px solid #d8e0ea",
              background: "#fff",
              color: "#0b1b33",
              padding: "10px 14px",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            style={{
              borderRadius: 999,
              border: "1px solid #ff5a5f",
              background: "#ff5a5f",
              color: "#fff",
              padding: "10px 14px",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Procesando..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
