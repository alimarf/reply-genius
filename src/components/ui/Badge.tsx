import { type HTMLAttributes } from 'react'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

const getBadgeClasses = (
  variant: BadgeProps['variant'] = 'default',
  size: BadgeProps['size'] = 'md',
  className?: string
): string => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full'

  const variantClasses = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-blue-100 text-blue-800',
    secondary: 'bg-gray-200 text-gray-900',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    outline: 'border border-gray-300 text-gray-700',
  }

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-base',
  }

  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className || '',
  ]
    .filter(Boolean)
    .join(' ')

  return classes
}

export const Badge = ({
  variant = 'default',
  size = 'md',
  className,
  children,
  ...props
}: BadgeProps) => {
  return (
    <span className={getBadgeClasses(variant, size, className)} {...props}>
      {children}
    </span>
  )
}

Badge.displayName = 'Badge'

export default Badge
