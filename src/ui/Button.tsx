import * as React from 'react'
import { styleJoiner } from '@/helpers/styling'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg' | 'icon'
  loading?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'
    
    const variantStyles = {
      primary: 'bg-black text-white hover:bg-black/90 shadow-sm',
      secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 shadow-sm',
      outline: 'border border-gray-200 bg-white hover:bg-gray-50 text-gray-900 shadow-sm',
      ghost: 'hover:bg-gray-100 text-gray-900',
    }
    
    const sizeStyles = {
      sm: 'h-8 px-3 text-xs',
      md: 'h-10 px-4 py-2 text-sm',
      lg: 'h-11 px-8 text-base',
      icon: 'h-10 w-10',
    }

    return (
      <button
        className={styleJoiner(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        ref={ref}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading ? (
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
