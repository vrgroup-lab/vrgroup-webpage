# vrgroup-platform

Monorepo de VR Group con dos aplicaciones separadas por responsabilidad:

- `apps/web`: sitio de marketing estático con `output: "export"`
- `apps/admin`: app fullstack para empleos, leads y backoffice

## Estado actual

- `apps/web` contiene el sitio público activo y funcional.
- `migration/legacy-snapshot` conserva el snapshot histórico para migrar capacidades al admin.
- `apps/admin` es un scaffold inicial para comenzar la migración controlada sin contaminar `web`.

## Scripts raíz

```bash
npm run dev:web
npm run dev:admin
npm run build:web
npm run build:admin
npm run lint:web
npm run typecheck:web
```
