import * as React from 'react'
import { styleJoiner } from '@/helpers/styling'

type CardProps = React.HTMLAttributes<HTMLDivElement>

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={styleJoiner(
          'rounded-xl border border-gray-200 bg-white text-gray-950 shadow-sm',
          className
        )}
        {...props}
      />
    )
  }
)
Card.displayName = 'Card'

type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>

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

type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement>

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={styleJoiner('text-2xl font-semibold leading-none tracking-tight', className)}
        {...props}
      />
    )
  }
)
CardTitle.displayName = 'CardTitle'

type CardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>

export const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={styleJoiner('text-sm text-gray-500', className)}
      {...props}
    />
  )
)
CardDescription.displayName = 'CardDescription'

type CardContentProps = React.HTMLAttributes<HTMLDivElement>

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={styleJoiner('p-6 pt-0', className)}
        {...props}
      />
    )
  }
)
CardContent.displayName = 'CardContent'

type CardFooterProps = React.HTMLAttributes<HTMLDivElement>

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={styleJoiner('flex items-center p-6 pt-0', className)}
      {...props}
    />
  )
)
CardFooter.displayName = 'CardFooter'
