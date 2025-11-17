import { type HTMLAttributes, type ReactNode, useEffect } from 'react'

export interface DialogProps {
  open: boolean
  onClose: () => void
  children: ReactNode
  title?: string
  description?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  closeOnOverlayClick?: boolean
  closeOnEscape?: boolean
}

export type DialogContentProps = HTMLAttributes<HTMLDivElement>

export type DialogHeaderProps = HTMLAttributes<HTMLDivElement>

export type DialogTitleProps = HTMLAttributes<HTMLHeadingElement>

export type DialogDescriptionProps = HTMLAttributes<HTMLParagraphElement>

export type DialogFooterProps = HTMLAttributes<HTMLDivElement>

const getSizeClasses = (size: DialogProps['size'] = 'md'): string => {
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full mx-4',
  }

  return sizeClasses[size]
}

export const Dialog = ({
  open,
  onClose,
  children,
  title,
  description,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEscape = true,
}: DialogProps) => {
  useEffect(() => {
    if (!closeOnEscape) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [open, onClose, closeOnEscape])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={closeOnOverlayClick ? onClose : undefined}
    >
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Dialog Content */}
      <div
        className={`relative z-50 w-full ${getSizeClasses(size)} bg-white rounded-lg shadow-xl`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2"
          aria-label="Close dialog"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Header */}
        {(title || description) && (
          <div className="px-6 pt-6 pb-4">
            {title && <h2 className="text-2xl font-semibold mb-2">{title}</h2>}
            {description && (
              <p className="text-sm text-gray-500">{description}</p>
            )}
          </div>
        )}

        {/* Content */}
        <div className="px-6 py-4">{children}</div>
      </div>
    </div>
  )
}

export const DialogHeader = ({
  className,
  children,
  ...props
}: DialogHeaderProps) => {
  return (
    <div className={`flex flex-col space-y-1.5 ${className || ''}`} {...props}>
      {children}
    </div>
  )
}

export const DialogTitle = ({
  className,
  children,
  ...props
}: DialogTitleProps) => {
  return (
    <h2
      className={`text-2xl font-semibold leading-none tracking-tight ${className || ''}`}
      {...props}
    >
      {children}
    </h2>
  )
}

export const DialogDescription = ({
  className,
  children,
  ...props
}: DialogDescriptionProps) => {
  return (
    <p className={`text-sm text-gray-500 ${className || ''}`} {...props}>
      {children}
    </p>
  )
}

export const DialogFooter = ({
  className,
  children,
  ...props
}: DialogFooterProps) => {
  return (
    <div
      className={`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 pt-4 ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  )
}

Dialog.displayName = 'Dialog'
DialogHeader.displayName = 'DialogHeader'
DialogTitle.displayName = 'DialogTitle'
DialogDescription.displayName = 'DialogDescription'
DialogFooter.displayName = 'DialogFooter'

export default Dialog
