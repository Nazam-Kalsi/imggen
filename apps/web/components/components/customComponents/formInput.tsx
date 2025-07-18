import React, { useState } from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@components/components/ui/form';
import { Button } from '../ui/button';
import { EyeIcon, EyeOff } from 'lucide-react';

type Props = {
  form: any;
  name: string;
  label?: string;
  type?: string;
  placeHolder: string;
  className?: string;
};

export function FormInput({
  form,
  name,
  label,
  type = 'text',
  placeHolder,
  className = '',
}: Props) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Determine the input type dynamically
  const inputType = type === 'password' && passwordVisible ? 'text' : type;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="relative mb-6">
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <div className="w-full relative">
              <input
                {...field}
                type={inputType}
                placeholder={placeHolder}
                className={`w-full border p-2 py-1 rounded-md pr-10 focus:outline focus:outline-violet-700 ${className}`}
              />
              {type === 'password' && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setPasswordVisible((prev) => !prev)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 h-auto w-auto"
                >
                  {passwordVisible ? <EyeOff size={18} /> : <EyeIcon size={18} />}
                </Button>
              )}
            </div>
          </FormControl>
          <FormMessage className="absolute -bottom-5" />
        </FormItem>
      )}
    />
  );
}

export default FormInput;
