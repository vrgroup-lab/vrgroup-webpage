# vrgroup-web

Sitio de marketing estático para VR Group construido con Next.js App Router y `output: "export"`.

## Estado del repo

- El árbol activo contiene solo el sitio público.
- El snapshot histórico completo quedó en `_legacy/` como referencia local.
- El admin fullstack y las API routes se separarán en un repo independiente: `vrgroup-admin`.

## Stack

- Next.js + TypeScript
- Tailwind CSS
- Lucide React
- Supabase público para contenido estático y Edge Functions externas para formularios

## Estructura activa

```text
app/
  page.tsx
  clientes/
  contacto/
  equipo/
  nosotros/
  partners/
  servicios/
  trabaja-con-nosotros/
components/
  contact/
  layout/
  ui/
lib/
  hero-images.ts
  logos.ts
  site-config.ts
  team.ts
  utils.ts
  supabase/public.ts
public/
  images/
  logos/
  videos/
```

## Variables de entorno

Crear `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=https://vrgroup.cl
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_SUPABASE_FUNCTIONS_BASE=https://<PROJECT_REF>.functions.supabase.co
```

## Scripts

```bash
npm install
npm run optimize-images
npm run dev
npm run build
```

`npm run build` ejecuta `prebuild`, que convierte PNG/JPG/JPEG a WebP bajo `public/images/optimized/`. El sitio usa `images.unoptimized` en Next.js porque los assets ya llegan preoptimizados para `output: "export"`.
