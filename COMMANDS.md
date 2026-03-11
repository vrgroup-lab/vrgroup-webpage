# Commands

Comandos principales del monorepo `vrgroup-platform` y para que sirve cada uno.

## Monorepo

```bash
npm install
```

Instala dependencias del monorepo y sincroniza workspaces.

```bash
npm run dev:web
```

Levanta el sitio publico estatico en modo desarrollo desde `apps/web`.

```bash
npm run dev:admin
```

Levanta la app dinamica en modo desarrollo desde `apps/admin`, por defecto en `http://localhost:3001`.
La ruta `/` redirige automaticamente a `/login` o `/admin` segun la sesion.

Antes de correrlo, `apps/admin/.env.local` debe existir con:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3001
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

```bash
npm run build:web
```

Construye el sitio estatico de `apps/web`. Ejecuta optimizacion de imagenes antes del build.

```bash
npm run build:admin
```

Construye la app dinamica de `apps/admin`.

```bash
npm run lint:web
```

Ejecuta ESLint sobre la app publica.

```bash
npm run lint:admin
```

Ejecuta ESLint sobre la app dinamica.

```bash
npm run typecheck:web
```

Corre `next typegen` y `tsc --noEmit` sobre `apps/web`.

```bash
npm run typecheck:admin
```

Corre `next typegen` y `tsc --noEmit` sobre `apps/admin`.

## App publica

```bash
npm --workspace apps/web run optimize-images
```

Convierte y actualiza imagenes optimizadas para el sitio estatico.

```bash
npm --workspace apps/web run perf
```

Construye `apps/web`, levanta el export local y ejecuta Lighthouse sobre las paginas auditadas.

```bash
npm --workspace apps/web run perf:lighthouse
```

Repite solo la auditoria Lighthouse usando el build/export ya generado.

## App admin

```bash
npm --workspace apps/admin run dev
```

Equivalente directo a `npm run dev:admin`.

```bash
npm --workspace apps/admin run build
```

Equivalente directo a `npm run build:admin`.

## Orden recomendado de validacion

```bash
npm run lint:web
npm run typecheck:web
npm run build:web
```

Valida la capa publica.

```bash
npm run lint:admin
npm run typecheck:admin
npm run build:admin
```

Valida la capa dinamica.
