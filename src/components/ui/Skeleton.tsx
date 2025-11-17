import { type HTMLAttributes } from 'react'

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular'
  width?: string | number
  height?: string | number
  animation?: 'pulse' | 'wave' | 'none'
}

const getSkeletonClasses = (
  variant: SkeletonProps['variant'] = 'text',
  animation: SkeletonProps['animation'] = 'pulse',
  className?: string
): string => {
  const baseClasses = 'bg-gray-200'

  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  }

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-pulse',
    none: '',
  }

  const classes = [
    baseClasses,
    variantClasses[variant],
    animationClasses[animation],
    className || '',
  ]
    .filter(Boolean)
    .join(' ')

  return classes
}

export const Skeleton = ({
  variant = 'text',
  width,
  height,
  animation = 'pulse',
  className,
  style,
  ...props
}: SkeletonProps) => {
  const customStyle = {
    width: width || (variant === 'text' ? '100%' : undefined),
    height: height || (variant === 'circular' ? width : undefined),
    ...style,
  }

  return (
    <div
      className={getSkeletonClasses(variant, animation, className)}
      style={customStyle}
      {...props}
    />
  )
}

Skeleton.displayName = 'Skeleton'

export default Skeleton
