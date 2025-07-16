"use client"
import React from "react";
import { cn } from "@components/lib/utils";
import { Button } from "@components/components/ui/button";
import { Card, CardContent } from "@components/components/ui/card";
import { Input } from "@components/components/ui/input";
import { Label } from "@components/components/ui/label";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';
import { toast } from "sonner";

type Props = {};

function Page({}: Props) {
  const router = useRouter();
  const { isLoaded, signIn, setActive } = useSignIn();

  const handleSubmit = async (data: any) => {
    if (!isLoaded) return;

    try {
      const result = await signIn.create({
        // identifier: data.email,
        // password: data.passowrd,
        identifier: "nzamkalsi@gmail.com",
        password: "Nn@zz@mm001",
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
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <div className="flex flex-col gap-6">
          <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2">
                <Button onClick={handleSubmit}>Login</Button>
              <div className="bg-muted relative hidden md:block">
                <img
                  src="/placeholder.svg"
                  alt="Image"
                  className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
              </div>
            </CardContent>
          </Card>
          <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            By clicking continue, you agree to our{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
