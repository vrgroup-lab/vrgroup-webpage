# VR Group Website

A modern, bilingual (ES/EN) website for VR Group, a boutique consultancy specializing in digital transformation, process automation, and AI solutions.

## 🚀 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Fonts**: Poppins (headings), Inter (body)
- **Icons**: Lucide React
- **Analytics**: Vercel Analytics
- **Deployment**: Vercel

## 📁 Project Structure

\`\`\`
src/
├── app/
│   ├── page.tsx                 # Home page
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles & design tokens
│   ├── servicios/
│   │   ├── page.tsx             # Services overview
│   │   └── [slug]/page.tsx      # Service detail pages
│   ├── nosotros/page.tsx        # About us
│   ├── trabaja-con-nosotros/    # Careers
│   ├── contacto/page.tsx        # Contact
│   ├── portafolio/page.tsx      # Portfolio
│   ├── blog/page.tsx            # Blog listing
│   └── api/
│       ├── contact/route.ts     # Contact form API
│       └── jobs/route.ts        # Job application API
├── components/
│   ├── layout/
│   │   ├── navbar.tsx           # Navigation bar
│   │   └── footer.tsx           # Footer
│   ├── ui/
│   │   ├── hero.tsx             # Hero section
│   │   └── section.tsx          # Section wrapper
│   └── forms/
│       ├── contact-form.tsx     # Contact form
│       └── job-application-form.tsx
├── lib/
│   └── i18n.ts                  # Internationalization utilities
└── public/
    ├── locales/
    │   ├── es.json              # Spanish translations
    │   └── en.json              # English translations
    └── images/                  # Asset images
\`\`\`

## 🎨 Design System

### Colors
- **Coral**: `#FF5A5F` (Primary)
- **Coral Dark**: `#FF3C48` (Accent)
- **Blue Dark**: `#0B1B33` (Secondary)
- **Neutral Light**: `#F8F9FA` (Background)
- **Neutral Dark**: `#1C1F26` (Text)
- **Gray Medium**: `#D0D3D8` (Borders)

### Typography
- **Headings**: Poppins (weights: 500, 600, 700)
- **Body**: Inter (weights: 400, 500, 600)

### Spacing
Uses Tailwind's default spacing scale: 4px, 8px, 12px, 16px, 24px, 32px, etc.

## 📄 Pages

1. **Home** (`/`)
   - Hero section with CTA
   - Service overview
   - Statistics
   - Client logos
   - Call-to-action

2. **Services** (`/servicios`)
   - Service overview grid
   - Service detail pages for:
     - Appian automation
     - AI & ML
     - Digital transformation
     - Tech solutions
     - Risk & compliance

3. **About** (`/nosotros`)
   - Company story
   - Core values
   - Team members
   - Key metrics

4. **Careers** (`/trabaja-con-nosotros`)
   - Benefits overview
   - Open positions
   - Application form

5. **Contact** (`/contacto`)
   - Contact information
   - Contact form with validation
   - Office details

6. **Portfolio** (`/portafolio`)
   - Project showcase
   - Project cards with details

7. **Blog** (`/blog`)
   - Article listing
   - Category filters
   - Featured content

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository
\`\`\`bash
git clone https://github.com/yourusername/vrgroup-website.git
cd vrgroup-website
\`\`\`

2. Install dependencies
\`\`\`bash
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
