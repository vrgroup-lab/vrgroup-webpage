export const colors = {
  coral: "#ff5a5f",
  coralLight: "#ff7a7f",
  coralDark: "#ff3c48",
  blueDark: "#0b1b33",
  neutralDark: "#1c1f26",
  neutralLight: "#f8f9fa",
  grayMedium: "#d0d3d8",
  surface: "#ffffff",
  surfaceMuted: "#f3f4f6",
  surfaceAlt: "#f5f7fb",
  border: "#d8e0ea",
  borderSoft: "#e5e7eb",
  textMuted: "#4f5d75",
  textSubtle: "#5b6b82",
  danger: "#be123c",
  dangerSurface: "#fef2f2",
  dangerBorder: "#fecaca",
} as const

export type BrandColor = keyof typeof colors

export const radii = {
  sm: 14,
  md: 20,
  lg: 24,
  xl: 28,
  pill: 999,
} as const

export const shadows = {
  card: "0 18px 45px rgba(15, 23, 42, 0.05)",
  cardHover: "0 12px 30px rgba(15, 23, 42, 0.05)",
  modal: "0 24px 60px rgba(15, 23, 42, 0.14)",
} as const
