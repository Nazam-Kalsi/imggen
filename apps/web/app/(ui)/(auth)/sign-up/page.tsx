"use client";
import { Button } from "@components/components/ui/button";
// import { Input } from "@components/components/ui/input";
// import { Label } from "@components/components/ui/label";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { GalleryVerticalEnd } from "lucide-react";
import React from "react";
import Image from "next/image";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { useSignUp } from "@clerk/nextjs";
import { toast } from "sonner";
import { Form } from "@components/components/ui/form";
import { useRouter } from "next/navigation";
import { FormInput } from "@components/components/customComponents";
import { Card, CardContent } from "@components/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
type Props = {};

const signUpSchema = z.object({
  userName:z.string().min(3, { message: "Username is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long." }),
})

function Page({}: Props) {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver:zodResolver(signUpSchema as any),
    defaultValues: {
      email: "",
      password: "",
      userName: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    try {
      if (!signUp) {
        toast.error("Sign up service is not loaded");
        return;
      }
      const signUpUser = await signUp.create({
        emailAddress: data.email,
        password: data.password,
        username: data.userName,
      });
      console.log(signUpUser);
      //? need to figure out if somehow halts in-between, then what?
      //   if(signUpUser.status!=='complete'){
      //     toast.error('Something went wrong missing');
      //     return;
      //   }
      router.push("/otp-verification");
    } catch (err: any) {
      console.log("err: ", err);
      toast.error("something went wrong");
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <div className="flex flex-col gap-6">
          <Card className="overflow-hidden p-0 ">
            <CardContent className="relative grid p-0 md:grid-cols-2 ">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="p-6 md:p-8 "
                >
                  <div className="flex flex-col">
                    <div className="flex flex-col items-center text-center">
                      <h1 className="text-2xl font-bold">Welcome back</h1>
                      <p className="text-muted-foreground text-balance">
                        Login to your Acme Inc account
                      </p>
                    </div>
                    <FormInput
                      form={form}
                      name="userName"
                      label="Username"
                      placeHolder="name"
                    />
                    <FormInput
                      form={form}
                      name="email"
                      label="Email"
                      placeHolder="mail"
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
              <div className="bg-red-900 relative md:block">
                <Image
                  src="/placeholder.svg"
                  alt="Image"
                  fill
                  className=" absolute top-0 right-0 inset-0 h-full object-cover dark:brightness-[0.2] dark:grayscale"
                  sizes="100vw"
                  priority
                />
              </div>
            </CardContent>
          </Card>
          <div id="clerk-captcha"></div>
        </div>
        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </div>
  );
}

export default Page;
