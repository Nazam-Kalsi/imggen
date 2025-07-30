import React, { useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/components/ui/dialog";
import { Button } from '../ui/button';
import { apiReq } from '@utils/apiReq';
import { useAuth } from '@clerk/nextjs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/components/ui/select"
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useAppSelector } from 'app/store/store';

type Props = {
    src:string,
    title:string,
    id:string,
    description:string,
    className?:string,
    models:{id:string,name:string}[]
}

function Cards({description,src,title,className,id,models}: Props) {
  const router = useRouter();
  const user = useAppSelector(state=>state.authSlice.user);
  const [model,setModel] = useState<string | undefined>(undefined);
const {getToken} = useAuth();
  const generate = async () =>{
    if(!model){
      toast.warning("please select a model.");
      return;
    }
    console.log(id);
    const token = await getToken();
    const res = await apiReq('/image/generate-images-from-pack','POST',token,{modelId:model,packId:id});
    if(!res.success){
      toast.error("Error while generating images.");
      return;
    }
    console.log(res);
    router.push(`/home/${user?.data?.id}`);   
  }
  return (
    <Dialog>
  <DialogTrigger>
    <div
  className={`p-3 flex flex-col border border-muted shadow-sm hover:shadow-md transition-shadow duration-300 rounded-lg max-w-52 gap-2 overflow-hidden cursor-pointer ${className}`}
>
  <div className="w-full h-56 bg-muted/10 rounded-md overflow-hidden flex items-center justify-center">
    <img
      src={src}
      alt="Image"
      className=" object-cover w-full h-full transition-transform duration-300 hover:scale-105"
    />
  </div>

  <div className="space-y-1 px-1">
    <p className="text-base font-medium text-foreground truncate">{title}</p>
    <p className="text-xs text-muted-foreground line-clamp-2">{description}</p>
  </div>
</div>

    </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>{`You are going to generate Images from ${title} prompt`}</DialogTitle>
      <DialogDescription>
        <p>{description}</p>
        <p>This will create 5 images, as per the model training.</p>
        </DialogDescription>
    </DialogHeader>
     <DialogFooter className="sm:justify-end">
     <Select onValueChange={(value)=>setModel(value)} value={model}>
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder="Select a model" />
      </SelectTrigger>
      <SelectContent>
        {
          models.map((model,index)=>{
            return <SelectItem key={index} value={model.id}>{model.name}</SelectItem>
          })
        }
      </SelectContent>
    </Select>
          <Button onClick={generate}>Generate</Button>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default Cards