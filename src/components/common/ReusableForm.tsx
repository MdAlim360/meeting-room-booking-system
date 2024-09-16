/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/ReusableForm.tsx

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Button } from "../ui/button";

// interface Option {
//   label: string;
//   value: string;
// }

// type Field = {
//   name: string;
//   label: string;
//   type: string;
//   placeholder?: string | undefined;
//   validation: { required: string };
//   options?: { label: string; value: string }[] | undefined; // Only for multiselect type
// };

interface ReusableFormProps {
  fields: any;
  onSubmit: SubmitHandler<Record<string, any>>;
  onCancel: () => void;
}

const ReusableForm: React.FC<ReusableFormProps> = ({
  fields,
  onSubmit,
  onCancel,
}) => {
  const { control, handleSubmit } = useForm<Record<string, any>>();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 mb-8 px-4 mt-4"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map(
          (
            { name, label, type, placeholder, validation, options }: any,
            index: any
          ) => (
            <div key={index} className="flex flex-col">
              <label className="mb-2 font-semibold text-gray-700">
                {label}
              </label>
              <Controller
                name={name}
                control={control}
                defaultValue={type === "multiselect" ? [] : ""} // Ensure correct default value type
                rules={validation}
                render={({ field: { onChange, value } }) =>
                  type === "multiselect" ? (
                    // Render checkboxes for multi-select
                    <div className="flex flex-wrap gap-2">
                      {options?.map((option: any, optIndex: any) => (
                        <label
                          key={optIndex}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            value={option.value}
                            checked={value.includes(option.value)} // Check if the value is selected
                            onChange={() => {
                              const selectedValues = value.includes(
                                option.value
                              )
                                ? value.filter((v: any) => v !== option.value) // Remove if already selected
                                : [...value, option.value]; // Add if not selected
                              onChange(selectedValues);
                            }}
                            className="form-checkbox"
                          />
                          <span>{option.label}</span>
                        </label>
                      ))}
                    </div>
                  ) : (
                    // Render default input field
                    <input
                      value={value}
                      onChange={onChange}
                      type={type || "text"}
                      placeholder={placeholder || ""}
                      className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  )
                }
              />
            </div>
          )
        )}
      </div>
      <div className="flex justify-end space-x-2">
        <Button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 text-white"
        >
          Cancel
        </Button>
        <Button type="submit" className="bg-green-500 text-white">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default ReusableForm;
