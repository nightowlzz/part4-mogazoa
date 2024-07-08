import React from 'react';
import { Controller } from 'react-hook-form';

interface FormFieldProps {
  name: string;
  control: any;
  label: string;
  type?: string;
  rules?: object;
}

export const FormField: React.FC<FormFieldProps> = ({
  name,
  control,
  label,
  type = 'text',
  rules,
}) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({ field, fieldState: { error } }) => (
      <div>
        <label htmlFor={name} className="block mb-1">
          {label}:
        </label>
        <input {...field} id={name} type={type} className="w-full px-3 py-2 border rounded" />
        {error && <span className="text-red-500 text-sm">{error.message}</span>}
      </div>
    )}
  />
);
