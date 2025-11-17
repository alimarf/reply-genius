import { type HTMLAttributes, useState, type ReactNode } from 'react'

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  children: ReactNode
}

export type TabsListProps = HTMLAttributes<HTMLDivElement>

export interface TabsTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  value: string
  disabled?: boolean
}

export interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  value: string
}

export const Tabs = ({
  defaultValue,
  value: controlledValue,
  onValueChange,
  children,
  className,
  ...props
}: TabsProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue || '')
  const isControlled = controlledValue !== undefined
  const currentValue = isControlled ? controlledValue : internalValue

  const handleValueChange = (newValue: string) => {
    if (!isControlled) {
      setInternalValue(newValue)
    }
    onValueChange?.(newValue)
  }

  return (
    <div className={className || ''} {...props}>
      {typeof children === 'function'
        ? children({ value: currentValue, onValueChange: handleValueChange })
        : children}
    </div>
  )
}

export const TabsList = ({ className, children, ...props }: TabsListProps) => {
  return (
    <div
      className={`inline-flex h-10 items-center justify-center rounded-lg bg-gray-100 p-1 ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  )
}

export const TabsTrigger = ({
  value,
  disabled = false,
  className,
  children,
  onClick,
  ...props
}: TabsTriggerProps) => {
  // This will be set by parent Tabs component via context or props
  // For simplicity, we'll use data attributes
  return (
    <button
      type="button"
      disabled={disabled}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow ${className || ''}`}
      data-value={value}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

export const TabsContent = ({
  value,
  className,
  children,
  ...props
}: TabsContentProps) => {
  return (
    <div
      className={`mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${className || ''}`}
      data-value={value}
      {...props}
    >
      {children}
    </div>
  )
}

// Enhanced Tabs with context for better state management
export const TabsWithContext = ({
  defaultValue,
  value: controlledValue,
  onValueChange,
  children,
  className,
  ...props
}: TabsProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue || '')
  const isControlled = controlledValue !== undefined
  const currentValue = isControlled ? controlledValue : internalValue

  const handleValueChange = (newValue: string) => {
    if (!isControlled) {
      setInternalValue(newValue)
    }
    onValueChange?.(newValue)
  }

  // Clone children and inject props
  const enhancedChildren = Array.isArray(children)
    ? children.map((child) => {
        if (typeof child === 'object' && child !== null && 'type' in child) {
          if (child.type === TabsList) {
            return (
              <TabsList key="tabs-list" {...child.props}>
                {Array.isArray(child.props.children)
                  ? child.props.children.map((trigger: React.ReactElement) => {
                      if (
                        trigger &&
                        typeof trigger === 'object' &&
                        'type' in trigger &&
                        trigger.type === TabsTrigger
                      ) {
                        const isActive = trigger.props.value === currentValue
                        return (
                          <TabsTrigger
                            key={trigger.props.value}
                            {...trigger.props}
                            data-state={isActive ? 'active' : 'inactive'}
                            onClick={(e) => {
                              handleValueChange(trigger.props.value)
                              trigger.props.onClick?.(e)
                            }}
                          />
                        )
                      }
                      return trigger
                    })
                  : child.props.children}
              </TabsList>
            )
          }
          if (child.type === TabsContent) {
            const isActive = child.props.value === currentValue
            if (!isActive) return null
            return child
          }
        }
        return child
      })
    : children

  return (
    <div className={className || ''} {...props}>
      {enhancedChildren}
    </div>
  )
}

Tabs.displayName = 'Tabs'
TabsList.displayName = 'TabsList'
TabsTrigger.displayName = 'TabsTrigger'
TabsContent.displayName = 'TabsContent'

export default Tabs
