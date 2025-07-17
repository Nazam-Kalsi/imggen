import React from 'react'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/components/ui/form";
import Input from "@components/components/customComponents/input";
type Props = {
    form:any,
    name:string,
    label?:string,
    type?:string,
    placeHolder:string,
    className?:string,

}

export function FormInput({form,name,label,type='text',placeHolder,className}: Props) {
  return (    
    <FormField
                control={form.control}
                name={name}
                render={({ field }) => (
                  <FormItem className='relative mb-6'>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      {/* <Input {...field} /> */}
                       <input                        
                        type={type}          
                        placeholder={placeHolder}
                        className={`${className} w-full focus:outline focus:outline-violet-700  border p-2 py-1 rounded-md`}
                        {...field}
                        />
                    </FormControl>
                    <FormMessage className="absolute -bottom-5"/>
                  </FormItem>
                )}
              />
  )
}

export default FormInput