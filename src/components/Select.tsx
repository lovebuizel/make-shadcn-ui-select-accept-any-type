import {
  Select as SelectUI,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { forwardRef } from "react"

export type Option = {
  label: string
  value: string
}

export type SelectProps = {
  options: Option[]
  placeholder?: string
  onChange?: (value: string) => void
  value?: string
}

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  ({ options, placeholder, onChange, value }, ref) => {
    return (
      <SelectUI onValueChange={onChange} value={value}>
        <SelectTrigger ref={ref} className="w-[180px]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
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
