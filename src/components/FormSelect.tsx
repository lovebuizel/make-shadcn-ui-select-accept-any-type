import { Select, SelectProps } from "./Select"
import { useFormField } from "./FormField"

export const FormSelect = ({
  options,
  placeholder,
}: Pick<SelectProps, "options" | "placeholder">) => {
  const fieldInfo = useFormField()
  const { field } = fieldInfo

  return (
    <Select
      value={field.value}
      options={options}
      placeholder={placeholder}
      onChange={field.onChange}
    />
  )
}
