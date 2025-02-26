import "./App.css"
import { Button } from "./components/ui/button"

import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"
import { FormField } from "./components/FormField"
import { FormSelect as BasicFormSelect } from "./components/FormSelect"
import { FormSelect as AdvancedFormSelect } from "./components/AdvancedFormSelect"

const defaultValues = {
  // undefined only allow in defaultValues to show placeholder
  myValue: undefined,
}

function App() {
  const form = useForm({
    defaultValues,
    resolver: zodResolver(
      z.object({
        myValue: z.any(),
      })
    ),
  })

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <FormProvider {...form}>
          <FormField name="myValue">
            {/* Note: Radix UI Select only accepts non-empty string values */}
            {/* If use empty string as value, will get error: Error: A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder. */}
            {/* <BasicFormSelect
              placeholder="Select anyType"
              options={[
                { label: "string", value: "string" },
                { label: "empty string", value: "" },
                { label: "number", value: 1 },
                { label: "number - string", value: "1" },
                { label: "boolean", value: true },
                { label: "boolean - string", value: "true" },
                { label: "object", value: { a: 1, b: 2 } },
                { label: "array", value: [1, 2, 3] },
                { label: "null", value: null },
                { label: "NaN", value: NaN },
                { label: "Infinity", value: Infinity },
                { label: "-Infinity", value: -Infinity },
              ]}
            /> */}
            {/* Note: Our advanced Select accepts all types except undefined*/}
            <AdvancedFormSelect
              placeholder="Select any type"
              options={[
                { label: "string", value: "string" },
                { label: "empty string", value: "" },
                { label: "number", value: 1 },
                { label: "number - string", value: "1" },
                { label: "boolean", value: true },
                { label: "boolean - string", value: "true" },
                { label: "object", value: { a: 1, b: 2 } },
                { label: "array", value: [1, 2, 3] },
                { label: "null", value: null },
                { label: "NaN", value: NaN },
                { label: "Infinity", value: Infinity },
                { label: "-Infinity", value: -Infinity },
              ]}
            />
          </FormField>
          <span className="text-sm text-gray-500">
            submit and see the form data in console
          </span>
          <Button
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
            disabled={!form.formState.isValid}
          >
            Submit
          </Button>
        </FormProvider>
      </div>
    </>
  )
}

export default App
