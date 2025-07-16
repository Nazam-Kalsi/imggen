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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/components/ui/select";
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
import {trainModel} from "commontypes/types"
import { UploadFile } from "@components/components/customComponents/fileUpload";

export default function Page() {
const form = useForm<FieldValues>({
  // resolver: zodResolver(trainModel as any),
  defaultValues:{
    name: "",
    type:'',
    ethinicity:'',
    eyeColor:'',
    bald:'',
    images:[]
  }
})

console.log(form.formState.errors);

  function onSubmit(values: z.infer<typeof trainModel>) {
    console.log(values);
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Train Model</CardTitle>
          <CardDescription>
            Fill in the details and hit train
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload Images</FormLabel>
                    <FormControl>
                      <UploadFile {...field} onChange={field.onChange} value={field.value}/>
                    </FormControl>
                    <FormDescription>
                    </FormDescription>
                    <FormMessage />
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
