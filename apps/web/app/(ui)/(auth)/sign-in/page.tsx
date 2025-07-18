"use client";
import React from "react";
import { cn } from "@components/lib/utils";
import { Button } from "@components/components/ui/button";
import { Card, CardContent } from "@components/components/ui/card";
import { Input } from "@components/components/ui/input";
import { Label } from "@components/components/ui/label";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@components/components/customComponents";
import { Form } from "@components/components/ui/form";
import { GalleryVerticalEnd } from "lucide-react";

const signInSchema = z.object({
  identifier: z.string().min(3, { message: "Username is required." }),
  password: z.string().min(8, { message: "Password is required." }),
});
type Props = {};

function Page({}: Props) {
  const router = useRouter();
  const { isLoaded, signIn, setActive } = useSignIn();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema as any),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });
  const handleSubmit = async (data: any) => {
    if (!isLoaded) return;

    try {
      const result = await signIn.create({
        identifier: data.identifier,
        password: data.password,
      });

      if (result.status === "complete") {
        console.log(result);
        await setActive({ session: result.createdSessionId });
        router.push("/");
      } else {
        /*Investigate why the sign-in hasn't completed */
        console.log(result);
      }
    } catch (err: any) {
      toast.error(err.errors[0].longMessage);
      console.error("error", err.errors[0].longMessage);
    }
  };

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-2">
                <a
                  href="#"
                  className="flex flex-col items-center gap-2 font-medium"
                >
                  <div className="flex size-8 items-center justify-center rounded-md">
                    <GalleryVerticalEnd className="size-6" />
                  </div>
                  <span className="sr-only">Acme Inc.</span>
                </a>
                <h1 className="text-xl font-bold">Welcome to Acme Inc.</h1>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <a href="#" className="underline underline-offset-4">
                    Sign up
                  </a>
                </div>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="p-6 md:p-8 "
                >
                  <div className="flex flex-col">
                    <FormInput
                      form={form}
                      name="identifier"
                      label="Username/Email"
                      placeHolder="name"
                    />
                    <FormInput
                      form={form}
                      name="password"
                      label="Password"
                      placeHolder="********"
                      type="password"
                    />
                    <Button className="w-full">Submit</Button>
                  </div>
                </form>
              </Form>
            </div>
          
          <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            By clicking continue, you agree to our{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>

    // <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
    //   <div className="w-full max-w-sm md:max-w-3xl">
    //     <div className="flex flex-col gap-6">
    //       <Card className="overflow-hidden p-0">
    //         <CardContent className="grid p-0 md:grid-cols-2">
    //           <Form {...form}>
    //           <form
    //             onSubmit={form.handleSubmit(handleSubmit)}
    //             className="p-6 md:p-8 "
    //           >
    //             <div className="flex flex-col">
    //               <div className="flex flex-col items-center text-center">
    //                 <h1 className="text-2xl font-bold">Welcome back</h1>
    //                 <p className="text-muted-foreground text-balance">
    //                   Login to your Acme Inc account
    //                 </p>
    //               </div>
    //               <FormInput
    //                 form={form}
    //                 name="identifier"
    //                 label="Username"
    //                 placeHolder="name"
    //               />
    //               <FormInput
    //                 form={form}
    //                 name="password"
    //                 label="Password"
    //                 placeHolder="********"
    //                 type="password"
    //               />
    //               <Button className="w-full">Submit</Button>
    //             </div>
    //           </form>
    //           </Form>
    //           <div className="bg-muted relative hidden md:block">
    //             <img
    //               src="/placeholder.svg"
    //               alt="Image"
    //               className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
    //             />
    //           </div>
    //         </CardContent>
    //       </Card>
    //       <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
    //         By clicking continue, you agree to our{" "}
    //         <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default Page;
