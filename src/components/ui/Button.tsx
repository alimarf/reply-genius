import { forwardRef, type ButtonHTMLAttributes } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

// Helper function untuk generate Tailwind classes
const getButtonClasses = (
  variant: ButtonProps['variant'] = 'primary',
  size: ButtonProps['size'] = 'md',
  disabled?: boolean,
  loading?: boolean,
  className?: string
): string => {
  // Base classes yang selalu ada
  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

  // Classes untuk setiap variant
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary:
      'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
    outline:
      'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
    link: 'text-blue-600 hover:text-blue-700 underline-offset-4 hover:underline focus:ring-blue-500 p-0',
  }

  // Classes untuk setiap size
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  // Gabungkan semua classes
  const classes = [
    baseClasses,
    variantClasses[variant],
    variant === 'link' ? '' : sizeClasses[size], // Link tidak pakai size
    disabled || loading ? 'cursor-not-allowed' : '',
    className || '', // Custom className dari props
  ]
    .filter(Boolean) // Hapus empty strings
    .join(' ') // Gabungkan dengan space

  return classes
}

// Component Button dengan forwardRef
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      disabled = false,
      loading = false,
      children,
      onClick,
      type = 'button',
      className,
      ...props // Spread semua props HTML button lainnya
    },
    ref
  ) => {
    // Disabled jika loading atau disabled
    const isDisabled = disabled || loading

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        onClick={onClick}
        className={getButtonClasses(
          variant,
          size,
          disabled,
          loading,
          className
        )}
        {...props}
      >
        {/* Loading spinner */}
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    )
  }
)

// Set displayName untuk debugging di React DevTools
Button.displayName = 'Button'

// Export default (optional, tapi baik untuk konsistensi)
export default Button
