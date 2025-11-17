import { type HTMLAttributes } from 'react'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined' | 'elevated'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export type CardHeaderProps = HTMLAttributes<HTMLDivElement>

export type CardTitleProps = HTMLAttributes<HTMLHeadingElement>

export type CardDescriptionProps = HTMLAttributes<HTMLParagraphElement>

export type CardContentProps = HTMLAttributes<HTMLDivElement>

export type CardFooterProps = HTMLAttributes<HTMLDivElement>

const getCardClasses = (
  variant: CardProps['variant'] = 'default',
  className?: string
): string => {
  const baseClasses = 'rounded-lg'

  const variantClasses = {
    default: 'bg-white border border-gray-200',
    outlined: 'bg-transparent border-2 border-gray-300',
    elevated: 'bg-white shadow-lg',
  }

  const classes = [baseClasses, variantClasses[variant], className || '']
    .filter(Boolean)
    .join(' ')

  return classes
}

const getPaddingClasses = (padding: CardProps['padding'] = 'md'): string => {
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  }

  return paddingClasses[padding]
}

export const Card = ({
  variant = 'default',
  padding = 'md',
  className,
  children,
  ...props
}: CardProps) => {
  return (
    <div
      className={`${getCardClasses(variant, className)} ${getPaddingClasses(padding)}`}
      {...props}
    >
      {children}
    </div>
  )
}

export const CardHeader = ({
  className,
  children,
  ...props
}: CardHeaderProps) => {
  return (
    <div className={`flex flex-col space-y-1.5 ${className || ''}`} {...props}>
      {children}
    </div>
  )
}

export const CardTitle = ({
  className,
  children,
  ...props
}: CardTitleProps) => {
  return (
    <h3
      className={`text-2xl font-semibold leading-none tracking-tight ${className || ''}`}
      {...props}
    >
      {children}
    </h3>
  )
}

export const CardDescription = ({
  className,
  children,
  ...props
}: CardDescriptionProps) => {
  return (
    <p className={`text-sm text-gray-500 ${className || ''}`} {...props}>
      {children}
    </p>
  )
}

export const CardContent = ({
  className,
  children,
  ...props
}: CardContentProps) => {
  return (
    <div className={`pt-0 ${className || ''}`} {...props}>
      {children}
    </div>
  )
}

export const CardFooter = ({
  className,
  children,
  ...props
}: CardFooterProps) => {
  return (
    <div className={`flex items-center pt-0 ${className || ''}`} {...props}>
      {children}
    </div>
  )
}

Card.displayName = 'Card'
CardHeader.displayName = 'CardHeader'
CardTitle.displayName = 'CardTitle'
CardDescription.displayName = 'CardDescription'
CardContent.displayName = 'CardContent'
CardFooter.displayName = 'CardFooter'

export default Card
