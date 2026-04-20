"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import type { JobRow } from "@vrgroup/domain"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const jobSchema = z.object({
  title: z.string().min(1, "El título es obligatorio"),
  slug: z
    .string()
    .min(1, "El slug es obligatorio")
    .regex(/^[a-z0-9-]+$/, "Solo minúsculas, números y guiones"),
  status: z.enum(["draft", "published", "archived"]),
  summary: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
  modality: z.string().optional(),
  seniority: z.string().optional(),
  employment_type: z.string().optional(),
  currency: z.string().optional(),
  salary_min: z.string().optional(),
  salary_max: z.string().optional(),
  tags: z.string().optional(),
  apply_url: z.string().url("URL inválida").or(z.literal("")).optional(),
  apply_email: z.string().email("Email inválido").or(z.literal("")).optional(),
  apply_linkedin_url: z.string().url("URL inválida").or(z.literal("")).optional(),
  apply_notion_url: z.string().url("URL inválida").or(z.literal("")).optional(),
  responsibilities: z.string().optional(),
  benefits: z.string().optional(),
  requirements: z.string().optional(),
})

export type JobFormValues = z.infer<typeof jobSchema>

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function jobToFormValues(job: JobRow | null): JobFormValues {
  return {
    title: job?.title ?? "",
    slug: job?.slug ?? "",
    status: ((job?.status as "draft" | "published" | "archived") ?? "draft"),
    summary: job?.summary ?? "",
    description: job?.description ?? "",
    location: job?.location ?? "",
    modality: job?.modality ?? "",
    seniority: job?.seniority ?? "",
    employment_type: job?.employment_type ?? "",
    currency: job?.currency ?? "USD",
    salary_min: job?.salary_min != null ? String(job.salary_min) : "",
    salary_max: job?.salary_max != null ? String(job.salary_max) : "",
    tags: job?.tags?.join(", ") ?? "",
    apply_url: job?.apply_url ?? "",
    apply_email: job?.apply_email ?? "",
    apply_linkedin_url: job?.apply_linkedin_url ?? "",
    apply_notion_url: job?.apply_notion_url ?? "",
    responsibilities: job?.responsibilities ?? "",
    benefits: job?.benefits ?? "",
    requirements: job?.requirements ?? "",
  }
}

type Props = {
  job: JobRow | null
  submitting: boolean
  onSubmit: (values: JobFormValues) => Promise<void> | void
  onCancel: () => void
}

export function JobForm({ job, submitting, onSubmit, onCancel }: Props) {
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: jobToFormValues(job),
  })

  const { register, handleSubmit, formState: { errors }, watch, setValue, reset } = form

  useEffect(() => {
    reset(jobToFormValues(job))
  }, [job, reset])

  const titleValue = watch("title")
  const slugValue = watch("slug")
  const isNew = !job

  useEffect(() => {
    if (isNew && titleValue && !slugValue) {
      setValue("slug", slugify(titleValue))
    }
  }, [titleValue, slugValue, isNew, setValue])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 pb-4">
      <Section title="Información básica">
        <Field label="Título" error={errors.title?.message} required>
          <Input {...register("title")} placeholder="Senior Backend Engineer" />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Slug" error={errors.slug?.message} required hint="Se usa en la URL pública">
            <Input {...register("slug")} placeholder="senior-backend-engineer" />
          </Field>
          <Field label="Estado" error={errors.status?.message} required>
            <Select value={watch("status")} onValueChange={(v) => setValue("status", v as JobFormValues["status"], { shouldValidate: true })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Borrador</SelectItem>
                <SelectItem value="published">Publicada</SelectItem>
                <SelectItem value="archived">Archivada</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </div>
        <Field label="Resumen" hint="1–2 líneas que se muestran en la lista pública">
          <Textarea rows={2} {...register("summary")} />
        </Field>
      </Section>

      <Section title="Detalle">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Field label="Ubicación"><Input {...register("location")} placeholder="Santiago, CL" /></Field>
          <Field label="Modalidad"><Input {...register("modality")} placeholder="Remoto" /></Field>
          <Field label="Seniority"><Input {...register("seniority")} placeholder="Senior" /></Field>
          <Field label="Tipo"><Input {...register("employment_type")} placeholder="Full time" /></Field>
        </div>
        <Field label="Tags" hint="Separados por coma">
          <Input {...register("tags")} placeholder="backend, python, aws" />
        </Field>
        <Field label="Descripción"><Textarea rows={5} {...register("description")} /></Field>
        <Field label="Responsabilidades" hint="Una por línea">
          <Textarea rows={4} {...register("responsibilities")} />
        </Field>
        <Field label="Requisitos" hint="Uno por línea">
          <Textarea rows={4} {...register("requirements")} />
        </Field>
        <Field label="Beneficios" hint="Uno por línea">
          <Textarea rows={3} {...register("benefits")} />
        </Field>
      </Section>

      <Section title="Compensación">
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Moneda"><Input {...register("currency")} placeholder="USD" /></Field>
          <Field label="Mínimo" error={errors.salary_min?.message}>
            <Input type="number" inputMode="numeric" {...register("salary_min")} />
          </Field>
          <Field label="Máximo" error={errors.salary_max?.message}>
            <Input type="number" inputMode="numeric" {...register("salary_max")} />
          </Field>
        </div>
      </Section>

      <Section title="Postulación">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="URL de postulación" error={errors.apply_url?.message}>
            <Input type="url" placeholder="https://..." {...register("apply_url")} />
          </Field>
          <Field label="Email" error={errors.apply_email?.message}>
            <Input type="email" placeholder="trabaja@vrgroup.cl" {...register("apply_email")} />
          </Field>
          <Field label="LinkedIn" error={errors.apply_linkedin_url?.message}>
            <Input type="url" {...register("apply_linkedin_url")} />
          </Field>
          <Field label="Notion" error={errors.apply_notion_url?.message}>
            <Input type="url" {...register("apply_notion_url")} />
          </Field>
        </div>
      </Section>

      <div className="sticky bottom-0 -mx-6 flex justify-end gap-2 border-t bg-background px-6 py-3">
        <Button type="button" variant="outline" onClick={onCancel} disabled={submitting}>
          Cancelar
        </Button>
        <Button type="submit" variant="coral" disabled={submitting}>
          {submitting ? "Guardando..." : isNew ? "Crear oferta" : "Guardar cambios"}
        </Button>
      </div>
    </form>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground">{title}</h3>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  )
}

function Field({
  label,
  error,
  hint,
  required,
  children,
}: {
  label: string
  error?: string
  hint?: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label className={cn("text-xs font-medium", error && "text-destructive")}>
        {label}
        {required && <span className="ml-0.5 text-destructive">*</span>}
      </Label>
      {children}
      {hint && !error && <p className="text-[11px] text-muted-foreground">{hint}</p>}
      {error && <p className="text-[11px] text-destructive">{error}</p>}
    </div>
  )
}
