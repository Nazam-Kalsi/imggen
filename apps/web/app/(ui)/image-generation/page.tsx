"use client";
import { useAuth } from "@clerk/nextjs";
import { FormInput } from "@components/components/customComponents";
import Loading from "@components/components/customComponents/loading";
import { Button } from "@components/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiReq } from "@utils/apiReq";
import { ArrowBigRightIcon, LucideCog } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem
} from "@components/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@components/components/ui/tooltip"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/components/ui/form"

const promptInput = z.object({
  prompt: z.string().min(2, { message: "Prompt must be alteast 20 character long" }).trim(),
  model: z.string().min(2,{message:"Plese select a model"})
});

function Page() {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [position, setPosition] = useState("bottom")
  const [model, setModel] = useState<{id:string,name:string}[]>([]);
  const form = useForm<z.infer<typeof promptInput>>({
    resolver: zodResolver(promptInput as any),
    defaultValues: {
      prompt: "",
      model:""
    },
  });

  const { getToken } = useAuth();

  const submit = async (data: z.infer<typeof promptInput>) => {
    setLoading(true);
    const token = await getToken();
    console.log(data);
    // const res = await apiReq("/image/generate-image","POST",token as string,data);
    // if (!res.success) {
    //   setLoading(false);
    //   return;
    // }
    // console.log(res.res);
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      const token = await getToken();
      const res = await apiReq("/model/get-all-model", "GET", token as string);
      if (!res.success) {
        return;
      }
      console.log(res.res.data.data.data);
      setModel(()=>{
    const modelsData = (res.res.data.data.data as []).map((model: any) =>{
    return {
      id: model.id,
      name: model.name
    }
  })
  return modelsData;
});
    })();
  }, []);

  return (
    <>
      {loading && <Loading />}
      <Image
        src="/grad2.jpg"
        alt="svg"
        width={500}
        height={500}
        className="absolute object-cover inset-0 size-full opacity-40 z-[1] hidden dark:block"
      />
      <div className="relative flex flex-col min-h-[80vh] w-full items-center justify-around z-[2]">
        <h3 className="text-4xl font-semibold text-center max-w-4/12">
          Enter prompt to generate an image
        </h3>
        <div className="flex w-6/12 mx-auto flex-col items-center justify-end p-4 rounded-2xl border">
          <Form {...form}>
            <form className="w-full" onSubmit={form.handleSubmit(submit)}>
              <div className="relative">
                 <FormField
                  control={form.control}
                  name="model"
                  render={({field}) => (
                    <FormItem className="absolute top-1/2 z-12 left-4 flex flex-col  items-start">
                        <FormControl>
                          <DropdownMenu>
                            <Tooltip delayDuration={0} >
                              <TooltipTrigger>
                                <DropdownMenuTrigger >
                                  <button type="button" ><LucideCog/></button>
                                </DropdownMenuTrigger>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Select Model</p>
                              </TooltipContent>
                            </Tooltip>                  
                              <DropdownMenuContent className = "h-full">
                                <DropdownMenuLabel>Models</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                              <DropdownMenuRadioGroup value={field.value} defaultValue={model[0]?.id} onValueChange={field.onChange}>
                                {
                                  model.map((model) => (
                                    <DropdownMenuRadioItem key={model.id} value={model.id}>
                                      {model.name}
                                    </DropdownMenuRadioItem>
                                  ))
                                }
                              </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </FormControl>
                      <FormMessage className = "relative -top-14"/>
                    </FormItem>
                  )}
                />
                <FormInput
                  name="prompt"
                  form={form}
                  label="Enter prompt to generate an image"
                  placeHolder="Enter your prompt here..."
                  className="w-full px-12 py-4 bg-transparent"
                />
                <Tooltip>
                  <TooltipTrigger className="absolute right-4 top-1/2 hover:translate-x-2 hover:scale-120 transition-all">
                    <button >
                      <ArrowBigRightIcon />
                    </button>                    
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Generate</p>
                  </TooltipContent>
                </Tooltip>

              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Page;
