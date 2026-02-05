import * as React from 'react'
import { styleJoiner } from '@/helpers/styling'

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'info' | 'warning'
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variantStyles = {
      default: 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white',
      success: 'bg-green-100 text-green-800 border border-green-300',
      info: 'bg-blue-100 text-blue-800 border border-blue-300',
      warning: 'bg-yellow-100 text-yellow-800 border border-yellow-300',
    }

    return (
      <div
        ref={ref}
        className={styleJoiner(
          'inline-flex items-center rounded-md px-3 py-1 text-sm font-medium',
          variantStyles[variant],
          className
        )}
        {...props}
      />
    )
  }
)
Badge.displayName = 'Badge'
