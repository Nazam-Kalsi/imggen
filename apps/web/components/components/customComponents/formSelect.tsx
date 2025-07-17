import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/components/ui/form";
type Props = {
  placeHoder: string;
  data: string[];
  className?: string;
  form: any;
  label: string;
  name: string;
};

function FormSelect({ placeHoder, data, form, className, name, label }: Props) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="relative mb-6">
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className={`w-full  ${className}`}>
                <SelectValue placeholder={placeHoder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {data.map((x, index) => (
                <SelectItem key={index} value={x}>
                  {x}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage className="absolute -bottom-5 m-0"/>
        </FormItem>
      )}
    />
  );
}

export default FormSelect;
