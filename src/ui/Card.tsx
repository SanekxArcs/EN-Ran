import * as React from 'react'
import { styleJoiner } from '@/helpers/styling'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={styleJoiner(
          'rounded-2xl bg-white shadow-xl border border-gray-100',
          className
        )}
        {...props}
      />
    )
  }
)
Card.displayName = 'Card'

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={styleJoiner('flex flex-col space-y-1.5 p-6', className)}
        {...props}
      />
    )
  }
)
CardHeader.displayName = 'CardHeader'

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export const CardTitle = React.forwardRef<HTMLParagraphElement, CardTitleProps>(
  ({ className, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={styleJoiner('text-2xl font-bold leading-none tracking-tight', className)}
        {...props}
      />
    )
  }
)
CardTitle.displayName = 'CardTitle'

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={styleJoiner('p-6 pt-0', className)} {...props} />
    )
  }
)
CardContent.displayName = 'CardContent'
