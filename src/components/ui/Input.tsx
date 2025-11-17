import { forwardRef, type InputHTMLAttributes, useId } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  fullWidth?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

// Helper function untuk generate Tailwind classes
const getInputClasses = (error?: string, className?: string): string => {
  const baseClasses =
    'block w-full rounded-lg border px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50'

  const stateClasses = error
    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'

  const classes = [baseClasses, stateClasses, className || '']
    .filter(Boolean)
    .join(' ')

  return classes
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      fullWidth = false,
      leftIcon,
      rightIcon,
      className,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    // Generate unique ID jika tidak ada
    const generatedId = useId()
    const inputId = id || generatedId
    const hasIcons = leftIcon || rightIcon
    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {/* Left Icon */}
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}

          {/* Input element */}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={getInputClasses(
              error,
              `${hasIcons ? (leftIcon ? 'pl-10' : '') + (rightIcon ? 'pr-10' : '') : ''} ${className || ''}`
            )}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={
              error || helperText
                ? `${inputId}-${error ? 'error' : 'helper'}`
                : undefined
            }
            {...props}
          />

          {/* Right Icon */}
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              {rightIcon}
            </div>
          )}

          {/* Error message */}
          {error && (
            <p
              id={`${inputId}-error`}
              className="mt-1 text-sm text-red-600"
              role="alert"
            >
              {error}
            </p>
          )}

          {/* Helper text */}
          {helperText && !error && (
            <p id={`${inputId}-helper`} className="mt-1 text-sm text-gray-500">
              {helperText}
            </p>
          )}
        </div>
      </div>
    )
  }
)

Input.displayName = 'Input'
export default Input
