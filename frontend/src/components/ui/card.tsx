import * as React from "react"

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className="rounded-xl border bg-white p-4 shadow-sm" {...props} />
  )
)
Card.displayName = "Card"

export const CardHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-2">{children}</div>
)

export const CardContent = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
)

export const CardTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-lg font-semibold">{children}</h3>
)

export { Card }
