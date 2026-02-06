import * as React from 'react'
import { styleJoiner } from '@/helpers/styling'

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'info' | 'warning'
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variantStyles = {
      default: 'border-transparent bg-gray-900 text-gray-50 hover:bg-gray-900/80',
      success: 'border-transparent bg-green-100 text-green-800 hover:bg-green-100/80',
      info: 'border-transparent bg-blue-100 text-blue-800 hover:bg-blue-100/80',
      warning: 'border-transparent bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80',
    }

    return (
      <div
        ref={ref}
        className={styleJoiner(
          'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2',
          variantStyles[variant],
          className
        )}
        {...props}
      />
    )
  }
)
Badge.displayName = 'Badge'
