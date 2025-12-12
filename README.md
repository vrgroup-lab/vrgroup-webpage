# VR Group Website

Sitio ES/EN para VR Group, consultora boutique en transformación digital, automatización de procesos e IA aplicada.

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router) · TypeScript
- **Styling**: Tailwind CSS v4
- **Fonts**: Poppins (headings) · Inter (body)
- **Icons**: Lucide React
- **Analytics/Deploy**: Vercel

## 📁 Estructura

```
app/
  layout.tsx                  # Root layout + metadata/icon
  page.tsx                    # Home
  servicios/page.tsx          # Grid de servicios
  servicios/[slug]/page.tsx   # Detalle por servicio
  nosotros/page.tsx           # Sobre VR Group (hero rotatorio, historia, principios, equipo)
  contacto/page.tsx           # Form glass, industria select, CTA
  portafolio/page.tsx         # Portafolio
  blog/page.tsx               # Blog
  equipo/[slug]/page.tsx      # Perfil individual de cada miembro
  api/contact/route.ts        # Mock contacto
  api/jobs/route.ts           # Mock jobs
components/
  layout/ (navbar con dropdown de servicios, footer)
  ui/ (hero, hero-rotator, section, highlights Appian/IA)
  forms/ (job application)
lib/
  logos.ts         # Lee logos en /public/logos/*
  hero-images.ts   # Lee imágenes para héroes rotatorios
  team.ts          # Datos de equipo y slugs
public/
  logos/brand|clients|partners|services|ai-providers/
  images/hero/nosotros/*      # Imágenes hero rotatorio “Nosotros”
  images/appian/*             # Gifs/imágenes Appian
  locales/es.json, en.json
```

## 🎨 Design System

- **Colores**: Coral `#FF5A5F`, Coral Dark `#FF3C48`, Blue Dark `#0B1B33`, Neutral Light `#F8F9FA`, Neutral Dark `#1C1F26`, Gray Medium `#D0D3D8`.
- **Tipografía**: Poppins (500/600/700) para headings; Inter (400/500/600) para body.
- **Espaciado**: escala Tailwind (4px, 8px, 12px, 16px, 24px, 32px…).

## 📄 Páginas clave

- **Home**: hero con rotador de imágenes (carpeta `public/images/hero/nosotros`), highlights Appian/IA, métricas, carrusel de clientes.
- **Servicios**: grid y dropdown con títulos cortos; detalle por slug:
  - Transformación Digital: bloques de “Qué ofrecemos”, “¿Qué incluye?”, “Tecnologías”, “Capacidades técnicas”, “Casos de uso” + CTA al portafolio.
  - Automatización/Appian, IA & Agentes, Soluciones TI, Gestión y Riesgo, Analítica & ML con variantes en el mismo template.
- **Nosotros**: hero rotatorio + stats, historia, principios, especializaciones, equipo (cards) y páginas individuales en `/equipo/[slug]`.
- **Contacto**: formulario estilo glass con campos ampliados (empresa, industria select, teléfono), pasos y chips de contacto directo.
- **Portafolio**, **Blog**, **Careers**: listos para contenido.

## 🔧 Configuración

- `.env.local`: `NEXT_PUBLIC_SITE_URL`, IDs de analytics si aplica.
- Favicon/Apple: `public/logos/brand/logo_vrgroup_cuadrado.png` definido en `app/layout.tsx`.
- Hero rotatorio: colocar imágenes en `public/images/hero/nosotros/` (se detectan automáticamente).

## 📧 Formularios

- `/api/contact` y `/api/jobs` son mocks; integrar SendGrid/Resend/EmailJS añadiendo credenciales y lógica.
- Form de contacto: empresa, industria (select), email corporativo, teléfono/WhatsApp, asunto, mensaje; feedback de envío.

## 🌍 Internacionalización

- Locales en `public/locales/es.json` y `en.json`. Para i18n avanzado, considerar `next-intl` o `next-i18next`.

## 📱 Responsive & Accesibilidad

- Mobile-first (320px+), tablet (768px+), desktop (1024px+).
- Semántica, contrastes y focus visibles; usa componentes controlados y ARIA donde corresponde.

## ▶️ Scripts

```bash
npm install
\`\`\`

3. Run the development server
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production
\`\`\`bash
npm run build
npm start
\`\`\`

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file with:
\`\`\`
NEXT_PUBLIC_SITE_URL=https://vrgroup.cl
NEXT_PUBLIC_GA_ID=your-ga-id
\`\`\`

### Add Analytics
Update `app/layout.tsx` with your Google Analytics ID for GA4 tracking.

## 📧 Form Integration

The contact and job application forms currently have mock API routes. To enable email sending:

1. Choose an email service (SendGrid, EmailJS, Resend, etc.)
2. Update `app/api/contact/route.ts` and `app/api/jobs/route.ts`
3. Add service credentials to environment variables

Example with SendGrid:
\`\`\`typescript
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

await sgMail.send({
  to: 'contacto@vrgroup.cl',
  from: 'noreply@vrgroup.cl',
  subject: `Nuevo contacto: ${subject}`,
  html: `<p>${message}</p><p>De: ${email}</p>`
})
\`\`\`

## 🌍 Internationalization

The site supports Spanish (ES) and English (EN) with locale files in `public/locales/`.

To extend translations:
1. Add new keys to `es.json` and `en.json`
2. Use the `t()` function from `lib/i18n.ts`

Current locale setup uses static JSON files. For more advanced i18n, consider migrating to:
- `next-intl`
- `next-i18next`

## 📱 Responsive Design

The site is built mobile-first and is fully responsive:
- Mobile: 320px+
- Tablet: 768px+
- Desktop: 1024px+

## ♿ Accessibility

- Semantic HTML elements
- ARIA labels where needed
- Color contrast meets WCAG AA standards
- Keyboard navigation support
- Focus indicators on interactive elements

## 📊 SEO

- Meta tags on all pages
- OpenGraph tags for social sharing
- Sitemap support (ready for next-sitemap)
- Structured data with schema.org
- Image optimization with next/image

## 🎯 Performance Targets

- Lighthouse Score: ≥90
- LCP: <2.5s
- CLS: <0.1
- FID: <100ms

Check performance with:
\`\`\`bash
npm run build
npm start
# Use Chrome DevTools Lighthouse
\`\`\`

## 📦 Deployment

### Deploy to Vercel (Recommended)

1. Push to GitHub
2. Connect repository to Vercel
3. Deploy automatically on push to main
4. Set environment variables in Vercel dashboard

\`\`\`bash
vercel deploy
\`\`\`

## 🔄 CI/CD

GitHub Actions workflows can be added for:
- Linting and formatting
- Type checking
- Tests
- Build verification

## 🐛 Troubleshooting

### Port already in use
\`\`\`bash
lsof -i :3000
kill -9 <PID>
\`\`\`

### Clear cache and rebuild
\`\`\`bash
rm -rf .next
npm run dev
\`\`\`

### TypeScript errors
\`\`\`bash
npm run type-check
\`\`\`

## 📝 License

This project is proprietary to VR Group.

## 📞 Support

For issues or questions, contact: contacto@vrgroup.cl

## 🎓 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)

---

Built with ❤️ by VR Group
```
