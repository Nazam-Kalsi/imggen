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
  DropdownMenuRadioItem,
} from "@components/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@components/components/ui/tooltip";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/components/ui/form";
import { toast } from "sonner";

const promptInput = z.object({
  prompt: z
    .string()
    .min(2, { message: "Prompt must be alteast 20 character long" })
    .trim(),
  modelId: z.string().min(2, { message: "Plese select a model" }),
});

function Page() {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [skelton, setSkelton] = useState<boolean>(false);
  const [imageId, setImageId] = useState<string | null>(null);
  const [model, setModel] = useState<{ id: string; name: string }[]>([]);
  const [pooling, setPooling] = useState<boolean>(false);
  const [generatedImage, setGeneratedImage] = useState<any>(null);
  const form = useForm<z.infer<typeof promptInput>>({
    resolver: zodResolver(promptInput as any),
    defaultValues: {
      prompt: "",
      modelId: "",
    },
  });

  const { getToken } = useAuth();

  const submit = async (data: z.infer<typeof promptInput>) => {
    setLoading(true);
    setSkelton(true);
    const token = await getToken();
    console.log(data);
    const res = await apiReq("/image/generate-image/", "POST", token, data);
    if (!res.success) {
      setLoading(false);
      return;
    }
    // console.log(res.res.data.data.imageId);
    setImageId(res.res.data.data.imageId);
    setPooling(true);
    setLoading(false);
  };

  useEffect(() => {
    if (!pooling) return;
    let isCancelled = false;

    (async () => {
      while (!isCancelled) {
        await new Promise((resolve) => setTimeout(resolve, 4000));
        const token = await getToken();
        const res = await apiReq(`/image/get-image/${imageId}`, "GET", token);
        if (!res.success) {
          setPooling(false);
          break;
        }
        if (res.res.data.data?.image?.isGeneratedSuccessfully) {
          setGeneratedImage(res.res.data.data.image.imageUrl);
          setPooling(false);
          setSkelton(false);
          setGeneratedImage('https://picsum.photos/300/400')
          toast.success("Image generated successfully");
          break;
        }
      }
    })();

    return () => {
      isCancelled = true;
    };
  }, [pooling]);

  useEffect(() => {
    (async () => {
      const token = await getToken();
      const res = await apiReq("/model/get-all-model", "GET", token as string);
      if (!res.success) {
        return;
      }
      console.log(res.res.data.data.data);
      setModel(() => {
        const modelsData = (res.res.data.data.data as []).map((model: any) => {
          return {
            id: model.id,
            name: model.name,
          };
        });
        return [{id:"qwerty",name:"Random"},...modelsData];
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
      <h3
        className={`text-4xl font-semibold uppercase text-center ${generatedImage ? "hidden" : "block"}`}
      >
        Generate Image
      </h3>
      <div className="relative flex flex-row-reverse min-h-[70vh] w-full items-center justify-center gap-4 z-[2]">
        {!skelton || !generatedImage && (
          <div className="bg-gradient-to-tr from-[#ea5a0c3b] via-[#572e0c85] to-[#78360f79] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 w-[300px] h-[400px] border rounded-xl animate-pulse flex justify-center items-center">
            <p>✨</p>Generating...
          </div>
        )}
        {generatedImage && (
          <div className="flex justify-center items-end overflow-hidden">
            <img
              src={generatedImage}              
              alt="svg"
              width={300}
              height={400}
              className="relative z-[33] rounded-xl"
            />
          </div>
        )}

        <div className="w-6/12 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 ">
          <div className="flex w-full mx-auto flex-col items-center justify-end p-4 rounded-2xl border">
            <Form {...form}>
              <form className="w-full" onSubmit={form.handleSubmit(submit)}>
                <div className="relative">
                  <FormField
                    control={form.control}
                    name="modelId"
                    render={({ field }) => (
                      <FormItem className="absolute top-1/2 z-12 left-4 flex flex-col  items-start">
                        <FormControl>
                          <DropdownMenu>
                            <Tooltip delayDuration={0}>
                              <TooltipTrigger>
                                <DropdownMenuTrigger>
                                  <button type="button">
                                    <LucideCog />
                                  </button>
                                </DropdownMenuTrigger>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Select Model</p>
                              </TooltipContent>
                            </Tooltip>
                            <DropdownMenuContent className="h-full">
                              <DropdownMenuLabel>Models</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuRadioGroup
                                value={field.value}
                                defaultValue={model[0]?.id}
                                onValueChange={field.onChange}
                              >
                                {model.map((model) => (
                                  <DropdownMenuRadioItem
                                    key={model.id}
                                    value={model.id}
                                  >
                                    {model.name}
                                  </DropdownMenuRadioItem>
                                ))}
                              </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </FormControl>
                        <FormMessage className="relative -top-14" />
                      </FormItem>
                    )}
                  />
                  <FormInput
                    name="prompt"
                    form={form}
                    label="Describe your image"
                    placeHolder="Enter your prompt here..."
                    className="w-full px-12 py-4 bg-transparent"
                  />
                  <Tooltip>
                    <TooltipTrigger className="absolute right-4 top-1/2 hover:translate-x-2 hover:scale-120 transition-all">
                      <button>
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
      </div>
    </>
  );
}

export default Page;
