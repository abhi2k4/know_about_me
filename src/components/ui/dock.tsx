import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const dockVariants = cva(
  "mx-auto flex h-full items-center gap-1 rounded-full border border-white/10 bg-gradient-to-br from-white/5 to-white/10 px-6 py-3 backdrop-blur-2xl dark:border-black/10 dark:from-black/5 dark:to-black/10 supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10",
  {
    variants: {
      orientation: {
        top: "flex-row",
        bottom: "flex-row",
        left: "flex-col",
        right: "flex-col",
      },
    },
    defaultVariants: {
      orientation: "bottom",
    },
  }
)

interface DockProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof dockVariants> {
  orientation?: "top" | "bottom" | "left" | "right"
}

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  ({ className, orientation = "bottom", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(dockVariants({ orientation }), className)}
      {...props}
    />
  )
)
Dock.displayName = "Dock"

const dockIconVariants = cva(
  "relative inline-flex items-center justify-center rounded-full transition-all duration-200 ease-out cursor-pointer",
  {
    variants: {
      size: {
        icon: "h-10 w-10",
        sm: "h-9 w-9",
        default: "h-12 w-12",
        lg: "h-16 w-16",
      },
    },
    defaultVariants: {
      size: "icon",
    },
  }
)

interface DockIconProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof dockIconVariants> {}

const DockIcon = React.forwardRef<HTMLButtonElement, DockIconProps>(
  ({ className, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(dockIconVariants({ size, className }))}
      {...props}
    />
  )
)
DockIcon.displayName = "DockIcon"

export { Dock, DockIcon, dockVariants, dockIconVariants }
