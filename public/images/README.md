# Imágenes del sitio

Estructura sugerida para las imágenes reales que usaremos en la landing.

```
public/images/
├── hero/          # Imágenes de cabecera/banner
├── sections/      # Fondos o fotos para secciones internas
└── team/          # Retratos o fotos de equipo
```

Recomendaciones de hero (banner principal)
- Formato: `webp` (preferido) o `jpg` optimizado.
- Tamaño recomendado: 1920 x 1080 o 2400 x 1200 (mínimo 1600 px de ancho).
- Peso objetivo: < 300 KB si es posible.
- Nombra en kebab-case, ejemplo: `hero-oficina-colaborativa.webp`.

Sobres/overlays
- El componente `Hero` ya aplica un gradiente, así que la imagen debe ser relativamente neutra; evita textos en la foto.
- Si quieres cambiar la imagen, pásala como `backgroundImage` al `Hero` (ej. `/images/hero/hero-oficina-colaborativa.webp`).

Guarda aquí los archivos y luego ajustamos las referencias en los componentes.
