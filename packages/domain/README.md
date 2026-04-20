# @vrgroup/domain

Tipos y esquemas compartidos entre `apps/web` y `apps/admin`.

- `Job`, `JobStatus` — modelo de dominio (camelCase).
- `JobRow` — shape del row crudo de Supabase (`jobs`).

Se consume directo desde TypeScript (sin build). Los bundlers de ambas apps resuelven `./src/index.ts`.
