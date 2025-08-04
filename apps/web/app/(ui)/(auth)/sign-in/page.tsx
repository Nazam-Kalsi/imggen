"use client";
import React, { useEffect, useState } from "react";
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
import { useAppDispatch, useAppSelector } from "app/store/store";
import { logedIn } from "app/store/user.slice";
import Link from "next/link";
import Loading from "@components/components/customComponents/loading";
import Image from "next/image";

const signInSchema = z.object({
  identifier: z.string().min(3, { message: "Username is required." }),
  password: z.string().min(8, { message: "Password is required." }),
});
type Props = {};

function Page({}: Props) {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      const result = await signIn.create({
        identifier: data.identifier,
        password: data.password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        console.log("logedIn: ", result);
        dispatch(logedIn({ id: result.id as string }));
        router.push("/image-generation");
      } else {
        /*Investigate why the sign-in hasn't completed */
        console.log(result);
        console.log();
      }
    } catch (err: any) {
      toast.error(err.errors[0].longMessage);
      console.error("error", err.errors[0].longMessage);
    }finally{
      setLoading(false);
    }
  };

  const user = useAppSelector((state) => state.authSlice.user);
  useEffect(() => {
    if (user) router.push("/train");
  }, [user]);


  return (
    <>
    {loading&& <Loading/>}
    <div className="flex flex-col items-center justify-center ">
      <Image
        src="/grad2.jpg"
        alt="svg"
        width={500}
        height={500}
        className="absolute object-cover inset-0 size-full opacity-40 z-[1] hidden dark:block"
      />
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6 relative z-[2]">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2">
              <Link href={'/'} className="flex flex-col items-center gap-2 font-medium">
                <div className="flex size-8 items-center justify-center rounded-md">
                  <GalleryVerticalEnd className="size-6" />
                </div>
                <span className="sr-only">Acme Inc.</span>
              </Link>
              <h1 className="text-xl font-bold">Welcome to Acme Inc.</h1>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/sign-up" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="p-6 md:p-8"
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
    </>
  );
}

export default Page;
