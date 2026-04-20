import type { ReactNode } from "react"

export function WindowFrame({
  title,
  children,
  className = "",
}: {
  title?: string
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`relative h-full w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm ${className}`}
    >
      <div className="flex h-9 items-center gap-2 border-b border-gray-200 bg-gray-50 px-4">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        {title && (
          <div className="ml-3 truncate text-[11px] font-medium text-gray-500">{title}</div>
        )}
      </div>
      <div className="h-[calc(100%-2.25rem)] w-full">{children}</div>
    </div>
  )
}
