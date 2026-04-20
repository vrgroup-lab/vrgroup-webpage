# vrgroup-web

Sitio de marketing estático para VR Group construido con Next.js App Router y `output: "export"`. Se entrega como carpeta `out/` (o ZIP) para subir a un host básico por FTP/panel; no requiere Node ni servidor dinámico.

## Estado del repo

- El árbol activo contiene el sitio público y el flujo de vacantes (`/trabaja-con-nosotros`).
- El admin fullstack vive en el mismo monorepo bajo `../admin`.

## Stack

- Next.js + TypeScript
- Tailwind CSS
- Lucide React
- Supabase público (anon key) para leer vacantes desde el browser; Edge Functions externas para el formulario de contacto

## Flujo de vacantes

`/trabaja-con-nosotros` es una página **estática** que, al cargar en el browser, consulta la tabla `jobs` de Supabase con la anon key. La lista de vacantes y el detalle `?job=<slug>` se renderizan client-side — publicar/archivar ofertas en el admin **no requiere rebuild del ZIP**.

Requisitos en Supabase:

- Tabla `jobs` con las columnas usadas en `packages/domain` (ver `JOB_COLUMNS`).
- RLS activo con policy `SELECT` pública sobre `status = 'published'`, p. ej.:
  ```sql
  create policy "public can read published jobs"
    on public.jobs for select
    to anon
    using (status = 'published');
  ```
- CORS que permita el dominio final donde se sube el ZIP.

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

Crear `apps/web/.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=https://vrgroup.cl
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_SUPABASE_FUNCTIONS_BASE=https://<PROJECT_REF>.functions.supabase.co
```

> Las variables `NEXT_PUBLIC_*` se **inlinean al bundle del browser durante `next build`**. Si cambias las credenciales, hay que re-empaquetar el ZIP. Para rotar la anon key sin rebuild, usa la misma URL/key en el ambiente productivo y apunta a otro proyecto sólo cambiando estos valores y rebuildeando.

## Scripts

```bash
npm install
npm run optimize-images
npm run dev
npm run build
npm run package        # build + ZIP listo para entregar (out/ → vrgroup-web.zip)
npm run package:zip    # solo empaquetar un out/ existente
npm run typecheck
npm run lint
npm run perf
```

`npm run build` ejecuta `prebuild`, que convierte PNG/JPG/JPEG a WebP bajo `public/images/optimized/`. El sitio usa `images.unoptimized` en Next.js porque los assets ya llegan preoptimizados para `output: "export"`.

`npm run typecheck` usa `next typegen` antes de `tsc --noEmit`, para que la validación no dependa de haber corrido un build completo previamente.

## Deploy a host básico (ZIP)

1. Asegurar que `apps/web/.env.local` tiene las `NEXT_PUBLIC_*` de producción.
2. `npm run package` desde `apps/web/` → genera `apps/web/vrgroup-web.zip` a partir de `out/`.
3. Subir el contenido del ZIP (no el ZIP mismo) a la raíz web del host.
4. Verificar que el host sirve extensiones `.html` para rutas sin extensión (casi todos lo hacen por defecto). Las rutas quedan en archivos `.html` al lado de cada carpeta.
5. Para actualizar solo vacantes: **no** rebuildear. Basta con publicar/archivar en el admin — la página `/trabaja-con-nosotros` las lee en vivo desde Supabase en el browser.
6. Para cualquier otro cambio (copy, imágenes, servicios), repetir el flujo 1–3.

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
