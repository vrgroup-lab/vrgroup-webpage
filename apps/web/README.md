# vrgroup-web

Sitio de marketing estático para VR Group construido con Next.js App Router y `output: "export"`.

## Estado del repo

- El árbol activo contiene solo el sitio público.
- El snapshot histórico completo quedó en `../../migration/legacy-snapshot/` como referencia local.
- El admin fullstack vive en el mismo monorepo bajo `../admin`.

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
npm run typecheck
npm run lint
npm run perf
```

`npm run build` ejecuta `prebuild`, que convierte PNG/JPG/JPEG a WebP bajo `public/images/optimized/`. El sitio usa `images.unoptimized` en Next.js porque los assets ya llegan preoptimizados para `output: "export"`.

`npm run typecheck` usa `next typegen` antes de `tsc --noEmit`, para que la validación no dependa de haber corrido un build completo previamente.

## Medición de performance

Hay un runner automático de Lighthouse para auditar el export estático local y sobrescribir reportes en cada ejecución.

Instalación:

```bash
npm install
```

Ejecución completa:

```bash
npm run perf
```

Ese comando:

- ejecuta `npm run build`
- levanta un servidor local sobre `out/`
- corre Lighthouse sobre rutas principales del sitio
- reemplaza el contenido de `reports/lighthouse/`

Si ya tienes `out/` generado y solo quieres rerun de auditoría:

```bash
npm run perf:lighthouse
```

Archivos generados:

- `reports/lighthouse/index.html`
- `reports/lighthouse/index.json`
- `reports/lighthouse/clientes.html`
- `reports/lighthouse/clientes.json`
- `reports/lighthouse/contacto.html`
- `reports/lighthouse/contacto.json`
- `reports/lighthouse/nosotros.html`
- `reports/lighthouse/nosotros.json`
- `reports/lighthouse/partners.html`
- `reports/lighthouse/partners.json`
- `reports/lighthouse/servicios.html`
- `reports/lighthouse/servicios.json`
- `reports/lighthouse/equipo-marco-bertolini.html`
- `reports/lighthouse/equipo-marco-bertolini.json`
- `reports/lighthouse/servicios-experiencia-digital.html`
- `reports/lighthouse/servicios-experiencia-digital.json`
- `reports/lighthouse/summary.json`

El resumen en consola y `summary.json` incluye scores y métricas clave como `FCP`, `LCP`, `Speed Index`, `TBT` y `CLS`.
