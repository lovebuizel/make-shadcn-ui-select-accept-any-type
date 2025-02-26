import {
  Select as SelectUI,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { forwardRef } from "react"
import { SelectProps as SelectBaseProps } from "@radix-ui/react-select"

export interface Option<T = unknown> {
  value: T
  label: string
  disabled?: boolean
}

const valueToString = (val: Option["value"]) => {
  if (val === null) return "__null__"
  if (val === undefined) {
    console.error("option value cannot be undefined")
    return "__undefined__"
  }
  if (val === Infinity) return "__Infinity__"
  if (val === -Infinity) return "__-Infinity__"
  if (Number.isNaN(val)) return "__NaN__"
  if (typeof val === "symbol") return `__symbol__${val.description}`
  return JSON.stringify(val)
}

const stringToValue = (str: string) => {
  switch (str) {
    case "__null__":
      return null
    case "__undefined__":
      return undefined
    case "__Infinity__":
      return Infinity
    case "__-Infinity__":
      return -Infinity
    case "__NaN__":
      return NaN
    default:
      if (str.startsWith("__symbol__")) {
        return Symbol(str.slice(10))
      }
      return JSON.parse(str)
  }
}

interface SelectProps<T = unknown>
  extends Omit<SelectBaseProps, "children" | "value"> {
  options: Option<T>[]
  placeholder?: string
  onChange?: (value: T) => void
  value?: T
}

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  ({ options, placeholder, onChange, value }, ref) => {
    const handleValueChange = (value: string) => {
      if (onChange) {
        onChange(stringToValue(value))
      }
    }

    return (
      <SelectUI
        // Only show placeholder when value is initially undefined
        value={value !== undefined ? valueToString(value) : undefined}
        onValueChange={handleValueChange}
      >
        <SelectTrigger ref={ref} className="w-[180px]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem
                key={valueToString(option.value)}
                value={valueToString(option.value)}
                disabled={option.disabled}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </SelectUI>
    )
  }
)

export default Select
export type { SelectProps }
