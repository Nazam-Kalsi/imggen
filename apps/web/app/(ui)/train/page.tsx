"use client"

import { Button } from "@components/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/components/ui/card";

import { useForm, FieldValues } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/components/ui/form";

import { z } from "zod";
import Input from "@components/components/customComponents/input";
import {model, trainModel} from "commontypes/types"
import { UploadFile } from "@components/components/customComponents/fileUpload";
import { FormInput } from "@components/components/customComponents";
import FormSelect from "@components/components/customComponents/formSelect";

export default function Page() {
const form = useForm<FieldValues>({
  // resolver: zodResolver(trainModel as any),
  defaultValues:{
    name: '',
    type:'',
    ethinicity:'',
    eyeColor:'',
    bald:'',
    images:[]
  }
})

  function onSubmit(values: z.infer<typeof trainModel>) {
    console.log(values);
  }

  return (
    <div className="flex justify-center items-center min-h-screen w-full p-6">
      {/* <Card className="w-full max-w-1/2">
        <CardHeader>
          <CardTitle>Train Model</CardTitle>
          <CardDescription>
            Fill in the details and hit train
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Train
          </Button>
        </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card> */}
      <Card className="w-full max-w-1/2">
        <CardHeader>
          <CardTitle>Train Model</CardTitle>
          <CardDescription>
            Fill in the details and hit train
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="">
              <FormInput form={form} name="name" label="Model name" placeHolder="model name"/>
              <FormSelect form={form} name='type' label="Select model type" data={(model.type) as any} placeHoder="Select Type"/>
              <FormSelect form={form} name='ethinicity' label="Select model Ethinicity" data={(model.ethinicity) as any} placeHoder="Select Ethinicity"/>
              <FormSelect form={form} name='eyeColor' label="Select model eyeColor" data={(model.eyeColor) as any} placeHoder="Select Eye Color"/>
              <FormSelect form={form} name='bald' label="Is Bald" data={['true','false']} placeHoder="Is model bald"/>
              <FormField
              control={form.control}
              name='images'
              render={({ field }) => (
                <FormItem className='relative mb-6'>
                  <FormLabel>Images</FormLabel>
                  <FormControl>
                  <UploadFile onChange={field.onChange} value={field.value}  />                     
                  </FormControl>
                  <FormMessage className="absolute -bottom-5"/>
                </FormItem>
              )}
              />
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Train
          </Button>
        </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
