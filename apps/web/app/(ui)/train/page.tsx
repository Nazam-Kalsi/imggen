"use client";

import { Button } from "@components/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/components/ui/card";

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"


import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/components/ui/form";

import { z } from "zod";
import {model,trainModel} from "commontypes/types"

import { UploadFile } from "@components/components/customComponents/fileUpload";
import { FormInput } from "@components/components/customComponents";
import FormSelect from "@components/components/customComponents/formSelect";
import { apiReq } from "@utils/apiReq";
import { useEffect, useState } from "react";
import { useAppDispatch } from "app/store/store";
import { useAuth } from "@clerk/nextjs";
import { logedIn } from "app/store/user.slice";
import { toast } from "sonner";
import Loading from "@components/components/customComponents/loading";
import {modelTypes} from "commontypes/inferTypes";
import Image from "next/image";


export default function Page() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [polling, setPolling] = useState<boolean>(false);
  const [models, setModels] = useState<any[]>([]);
  const { getToken } = useAuth();
  const form = useForm<modelTypes>({
    resolver: zodResolver(trainModel as any),
    defaultValues: {
      name: "",
      type: undefined,
      ethinicity: undefined,
      eyeColor: undefined,
      bald: undefined,
      images: [],
    },
  });
  useEffect(() => {
    (async () => {
      let token = await getToken();
      if (!token) {
        token = "";
      }
      const res = await apiReq("/auth/get-current-user", "GET", token);
      if (!res.success) return;
      dispatch(logedIn(res.res.data));

      const modelsRes = await apiReq("/model/get-all-model", "GET", token);
      if (!res.success) return;
      setModels(modelsRes.res.data);
    })();
  }, []);

  useEffect(() => {
    if (!polling) return;
    let isCancelled = false;
    ;( async()=>{
    while (!isCancelled) {
      await new Promise((resolve) => setTimeout(resolve, 4000));     
        const token = await getToken();
        const res = await apiReq("/model/get-models", "GET", token as string);
        if (!res.success) return;
        if (res.res.data.length > 0) {
          setPolling(false);
          toast.success("Model trained successfully");
          setModels((prev) => {
            const x = res.res.data.data;
            const exists = prev.find((m) => m.id === x.id);
            if (exists) {
              return prev.map((m) =>
                m.id === x.id ? { ...m, status: x.status } : m
              );
            }
            return prev.concat(x);
          });
          break;
        }
    }})();
     return () => {
      isCancelled = true;
    };
  }, [polling]);

  async function onSubmit(values: modelTypes) {
    setLoading(true);
    const token = await getToken();
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("type", values.type);
    formData.append("ethinicity", values.ethinicity);
    formData.append("eyeColor", values.eyeColor);
    formData.append("bald", values.bald);
    (values.images as File[])
      .filter((file) => file instanceof File)
      .forEach((file) => {
        formData.append("images", file);
      });

    const res = await apiReq(
      "/model/train-model",
      "POST",
      token as string,
      formData
    );
    console.log("res: ", res);
    if (!res.success) {
      setLoading(false);
      return;
    }
    setPolling(true);
    toast.success("Model trained successfully");
    setLoading(false);
  }

  return (

    <div className='relative w-full'>
      {loading && <Loading/>}
      <Image
       src="/grad6.jpeg"
        alt="svg"
        width={500}
        height={500}
        className="fixed inset-0 h-full w-full object-cover blur-lg hidden dark:block z-[-9] opacity-30"
      />
    <div className="flex justify-center items-center min-h-screen w-full p-6">
      <Card className="w-full max-w-1/2 dark:bg-zinc-900/50 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Train Model</CardTitle>
          <CardDescription className="">
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
                <FormItem className='flex flex-col justify-center items-center relative mb-6'>
                  <FormLabel className='self-start'>Images</FormLabel>
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

    </div>
  );
}
