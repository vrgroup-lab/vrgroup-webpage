import nextVitals from "eslint-config-next/core-web-vitals"

const config = [
  {
    ignores: ["_legacy/**", ".next/**", "out/**", "reports/lighthouse/**", "node_modules/**"],
  },
  ...nextVitals,
]

export default config
