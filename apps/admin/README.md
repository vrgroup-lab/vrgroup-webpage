# @vrgroup/admin

App dinámica de VR Group.

Responsabilidades actuales:

- `/trabaja-con-nosotros` público sobre `jobs`
- `/login` como puerta de entrada del panel
- `/admin/ofertas` protegido
- `/admin/contactos` protegido
- `/admin/usuarios` protegido

Modelo actual asumido:

- `jobs`
- `contact_submissions`
- `user_profiles`

Variables locales requeridas en `apps/admin/.env.local`:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
