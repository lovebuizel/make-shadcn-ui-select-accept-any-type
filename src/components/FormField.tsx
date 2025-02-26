import { createContext, ReactNode, useContext } from "react"
import {
  useFormContext,
  useController,
  FieldValues,
  UseControllerReturn,
} from "react-hook-form"
import isEmpty from "lodash/isEmpty"

interface FormFieldContextValue
  extends UseControllerReturn<FieldValues, string> {
  name: string
}

const FormFieldContext = createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

export const FormField = ({
  name,
  children,
}: {
  name: string
  children: ReactNode
}) => {
  if (!name) {
    throw new Error("Form Field require name  !!!")
  }

  const formContext = useFormContext()

  const field = useController({
    control: formContext.control,
    name,
  })

  return (
    <FormFieldContext.Provider
      value={{
        ...field,
        name,
      }}
    >
      {children}
    </FormFieldContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useFormField = () => {
  const fieldContext = useContext(FormFieldContext)

  if (isEmpty(fieldContext)) {
    throw new Error("useFormField should be used within <FormField>")
  }

  return fieldContext
}
