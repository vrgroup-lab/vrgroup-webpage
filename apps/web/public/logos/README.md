# Logos directory

Estructura sugerida para organizar todos los logos usados en el sitio (VR Group + clientes + partners + servicios/proveedores). Añade aquí los SVG/PNG y luego actualiza las referencias en los componentes.

```
public/logos/
├── brand/          # Variantes oficiales de VR Group (light/dark, favicon, horizontal)
├── clients/        # Clientes (para "Confían en nosotros")
├── partners/       # Partners/tecnologías/proveedores
└── services/       # Íconos o insignias de servicios específicos
```

Convenciones sugeridas
- Usa SVG cuando sea posible. PNG solo si es necesario (ideal fondo transparente).
- Nombra en minúsculas-kebab: `vrgroup-light.svg`, `vrgroup-dark.svg`, `banco-estado.svg`, `appian.svg`, `aws.svg`, `ia-agentes.svg`, etc.
- Incluye versiones monocromo si aplica: `clienteX-mono.svg`.

Pasos rápidos
1) Coloca los archivos en la carpeta correspondiente (ej.: `public/logos/brand/vrgroup-dark.svg`).
2) Referencia en Next.js con rutas absolutas: `<Image src="/logos/brand/vrgroup-dark.svg" ... />`.
3) Si agregas nuevas rutas/nombres, ajusta los componentes que renderizan logos de clientes/partners.

Lugar para drop rápido
- `brand/` para las variantes oficiales (light/dark + favicon/horizontal).
- `clients/` para logos que irán en "Confían en nosotros".
- `partners/` para marcas tecnológicas o proveedores.
- `services/` para marcas o badges de servicios específicos.

Checklist de uploads
- [ ] VR Group light
- [ ] VR Group dark
- [ ] VR Group favicon (32/64)
- [ ] Clientes principales (BancoEstado, Puerto de Ideas, BICE Vida, Unicard, etc.)
- [ ] Partners (Appian, AWS, Azure, etc.)
- [ ] Servicios (si se usan íconos de marca)
