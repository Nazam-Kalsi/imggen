"use client"
import { Button } from "@components/components/ui/button";
import { Input } from "@components/components/ui/input";
import { Label } from "@components/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { GalleryVerticalEnd } from "lucide-react";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import {z} from "zod";
import { useSignUp } from "@clerk/nextjs";
import { toast } from "sonner";
import { Form } from "@components/components/ui/form";
import { useRouter } from 'next/navigation';


type Props = {};

function Page({}: Props) {
  const { isLoaded, signUp, setActive } = useSignUp();
    const router = useRouter();

    // const form = useForm<z.infer<typeof signUpSchema>>({
    const form = useForm<FieldValues>({
        // resolve:zodResolver(signUpSchema),
        defaultValues:{
            email:"",
            password:"",
            userName:""
        }
    });

    // const onSubmit = async(data:z.infer<typeof signUpSchema>)=>{
    const onSubmit = async(data:any)=>{
        try {
      if (!signUp) {
        toast.error('Sign up service is not loaded');
        return;
      }
      const signUpUser = await signUp.create({
        emailAddress:'nzamkalsi@gmail.com',
        password:"ChangeMe",
        username:'nazamkalsi'
      });
      console.log(signUpUser);
      //? need to figure out if somehow halts in-between, then what?
    //   if(signUpUser.status!=='complete'){
    //     toast.error('Something went wrong missing');
    //     return;
    //   }
      router.push('/otp-verification');     

    } catch (err: any) {
        console.log("err: ",err)
        toast.error('something went wrong')
      console.error(JSON.stringify(err, null, 2));
    }
  };


  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
            <Button onClick={onSubmit}>Submit</Button>
            {/* <Form {...form}> 
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                </form> 
             </Form> */}
                     <div id="clerk-captcha"></div>

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
