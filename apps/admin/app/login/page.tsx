"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Eye, EyeOff, LogIn, ShieldCheck } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Ingresá tu contraseña"),
})

type LoginValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  })

  async function onSubmit(values: LoginValues) {
    setSubmitting(true)
    setFormError(null)
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
      const payload = await res.json()
      if (!res.ok) throw new Error(payload.error || "No se pudo iniciar sesión")
      toast.success("Bienvenido")
      router.push("/admin")
      router.refresh()
    } catch (err) {
      const msg = err instanceof Error ? err.message : "No se pudo iniciar sesión"
      setFormError(msg)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--blue-dark)] p-6">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(circle at 15% 20%, rgba(255,90,95,0.25) 0%, transparent 40%), radial-gradient(circle at 85% 80%, rgba(59,130,246,0.18) 0%, transparent 45%)",
        }}
      />
      <div className="relative z-10 w-full max-w-md">
        <div className="mb-6 flex items-center justify-center gap-3">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-white p-1.5 shadow-lg">
            <Image
              src="/logos/brand/logo_vrgroup_cuadrado.png"
              alt="VR Group"
              fill
              sizes="48px"
              className="object-contain p-1.5"
            />
          </div>
          <div className="text-left">
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/60">VR Group</p>
            <p className="font-display text-base font-semibold text-white">Backoffice</p>
          </div>
        </div>

        <Card className="border-white/10 bg-white shadow-2xl">
          <CardContent className="p-8">
            <div className="mb-6 flex flex-col gap-1">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[var(--coral)]/10 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--coral-dark)]">
                <ShieldCheck className="h-3 w-3" /> Acceso privado
              </span>
              <h1 className="mt-3 font-display text-2xl font-semibold tracking-tight">Iniciá sesión</h1>
              <p className="text-sm text-muted-foreground">
                Ingresá con tu cuenta corporativa para gestionar el sitio.
              </p>
            </div>

            {formError && (
              <div className="mb-4 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email" className={cn("text-xs font-medium", errors.email && "text-destructive")}>
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="tu@vrgroup.cl"
                  autoFocus
                  {...register("email")}
                />
                {errors.email && <p className="text-[11px] text-destructive">{errors.email.message}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="password"
                  className={cn("text-xs font-medium", errors.password && "text-destructive")}
                >
                  Contraseña
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className="pr-10"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-[11px] text-destructive">{errors.password.message}</p>}
              </div>

              <Button type="submit" variant="coral" className="mt-2 w-full" disabled={submitting}>
                {submitting ? (
                  "Ingresando..."
                ) : (
                  <>
                    <LogIn /> Ingresar
                  </>
                )}
              </Button>

              <p className="text-center text-[11px] text-muted-foreground">
                ¿Olvidaste tu contraseña? Pedile a un admin que la restablezca.
              </p>
            </form>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-[11px] text-white/40">
          © {new Date().getFullYear()} VR Group · Uso interno
        </p>
      </div>
    </main>
  )
}
