# VR Group Website

Sitio web para VR Group, consultora boutique en automatización, software e IA aplicada.

## 🚀 Tech Stack

- **Framework**: Next.js (App Router) + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Backend**: Supabase (Postgres, Auth, Storage, Edge Functions)

## 📁 Estructura

```
app/
  page.tsx                      # Home
  servicios/                    # Landing + detalle por servicio
  nosotros/                     # About + equipo
  contacto/                     # Formulario de contacto
  portafolio/                   # Portafolio
  admin/(panel)/                # Panel de administración
  api/admin/                    # CRUD admin (jobs, portafolio, contactos, settings)
components/
  admin/                        # UI admin (header, dialogos)
  contact/                      # Formulario de contacto
  layout/                       # Navbar, footer
  ui/                           # Secciones, heroes, highlights
lib/
  supabase/                     # Clientes Supabase (server/browser/public)
public/
  images/                       # Imágenes y gifs
  logos/                        # Logos de marca, partners, clientes
```

## 🔧 Configuración

Crear `.env.local`:

```
NEXT_PUBLIC_SITE_URL=https://vrgroup.cl
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
NEXT_PUBLIC_SUPABASE_FUNCTIONS_BASE=https://<PROJECT_REF>.functions.supabase.co
```

## 📧 Formulario de contacto

- El frontend **no usa Formspree**.
- El envío apunta a **Supabase Edge Function** `POST /contact_form`.
- Endpoint configurado con `NEXT_PUBLIC_SUPABASE_FUNCTIONS_BASE`.
- El lead se guarda en la tabla `contact_submissions`.

Payload enviado:
```
{
  "nombre": "string",
  "empresa": "string | null",
  "email": "string",
  "telefono": "string | null",
  "industria": "string | null",
  "asunto": "string | null",
  "mensaje": "string"
}
```

## 🧭 Admin Panel

Módulos disponibles:

- **Overview**: métricas rápidas (leads por contactar, ofertas publicadas, proyectos públicos).
- **Contactos**: tablero Kanban de leads (`contact_submissions`) con drag & drop y modal de detalle.
- **Ofertas**: CRUD de `jobs`.
- **Portafolio**: CRUD de `portfolio_projects` + `portfolio_media`.
- **Configuración**: toggles de visibilidad del sitio + acceso a **Usuarios**.

Usuarios:
- Gestión de usuarios en `/admin/usuarios` (acceso desde Configuración).

## 🗃️ Supabase (tablas clave)

- `contact_submissions` (leads del formulario)
- `jobs`
- `portfolio_projects`
- `portfolio_media`
- `service_lines`
- `user_profiles`
- `site_settings`

## ▶️ Scripts

```bash
npm install
npm run dev
```

Abrir `http://localhost:3000`.
