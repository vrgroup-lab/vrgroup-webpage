# vrgroup-platform

Monorepo de VR Group con dos aplicaciones separadas por responsabilidad:

- `apps/web`: sitio de marketing estático con `output: "export"`
- `apps/admin`: app fullstack para empleos, leads y backoffice

Packages compartidos:

- `packages/domain`: tipos de dominio (`Job`, `JobRow`, etc).
- `packages/brand`: tokens de marca (colores, radios, sombras) + CSS custom properties.
- `packages/config`: espacio reservado para configuración compartida de lint/TS.

## Scripts raíz

```bash
npm run dev:web        # http://localhost:3000 (marketing estático)
npm run dev:admin      # http://localhost:3001 (admin dinámico)
npm run build:web
npm run build:admin
npm run lint:web
npm run lint:admin
npm run typecheck:web
npm run typecheck:admin
```

Ver `COMMANDS.md` para la referencia completa.
