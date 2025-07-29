"use client";
import { useAuth } from "@clerk/nextjs";
import Cards from "@components/components/customComponents/cards";
import Loading from "@components/components/customComponents/loading";
import { apiReq } from "@utils/apiReq";
import { useAppSelector } from "app/store/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@components/components/ui/pagination"

type packT = {
  description:string,
  id:string,
  packName:string,
  imageUrl:string
}
function Page() {
  const [packs, setPacks] = useState<packT[]>([]);
  const [models, setModels] = useState<{ id: string; name: string }[]>([]);
  const [loading,setLoading] = useState<boolean>(false);
  const [page,setPage] = useState<number>(1);
  const [isPacksAvaliable,setIsPacksAvaliable ] = useState<boolean>(true);
  // const router= useRouter();
  const {getToken} = useAuth();
  const getPacks = async() =>{
        setLoading(true);
        const token = await getToken();
        const res = await apiReq(`/pack/get-packs?page=${page}`,"GET",token);
        if(!res.success){
            setLoading(false);
            return;
        }
        console.log(res.res.data.data.data);
        setPacks((prev:packT[])=>{return([...prev,...res.res.data.data.data.packs])});
        if(res.res.data.data.data.total<10)setIsPacksAvaliable(false);
        toast.success("Prompts fetched successfully");
        setLoading(false);
  }

  const getUserModels = async() =>{
    setLoading(true);
    const token = await getToken();
    const modelRes = await apiReq("/model/get-all-model", "GET", token as string);
    if (!modelRes.success) {setLoading(false);return;}
    console.log(modelRes.res.data.data.data);
    setModels(() => {
      const modelsData = (modelRes.res.data.data.data as []).map((model: any) => {
        return {id: model.id,name: model.name,};
      });
      return modelsData;
    });
    setLoading(false);
  }
  useEffect(()=>{
    getPacks();
    getUserModels();
  },[]);
    // const user = useAppSelector((state)=>state.authSlice.user);
// useEffect(()=>{
//     if(!user){
//         // router.push('/sign-in');
//     }
// },[])

  return (
    <>
    {loading && <Loading/>}
      <div className="flex w-full flex-col gap-4">
        <h2 className="text-2xl font-semibold text-center uppercase ">Prebuild Prompts</h2>
        <div className="flex w-full rounded-md overflow-hidden">
          <div className=" flex items-center justify-evenly flex-wrap w-full rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm  bg-opacity-10 gap-5 p-4">
          <div className=" flex items-center justify-evenly min-h-[80vh] flex-wrap border w-full rounded-md gap-5 p-4">
            {packs.length>0 && packs.map((x, index) => {
              return (
                <div 
                key={index}
                className="bg-[url(../public/grad2.jpg)] bg-cover rounded-md overflow-hidden"
                >
                <Cards
                id={x.id}
                  title={x.packName}
                  description={x.description}
                  models={models}
                  src={"/base.png"}
                  className="bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10"
                  />                
                  </div>
              );
            })}
          </div>
        </div>
        </div>
        <Pagination>
  <PaginationContent>
    {page>1 && 
      <PaginationItem>
      <PaginationPrevious onClick={()=>{setPage((prev)=>prev-1)}}/>
    </PaginationItem>
    }
    <PaginationItem>
      <PaginationLink>{page}</PaginationLink>
    </PaginationItem>
    {isPacksAvaliable &&
    <>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext onClick={()=>{setPage((prev)=>prev+1)}} />
    </PaginationItem>
    </>
    }
  </PaginationContent>
</Pagination>
      </div>
    </>
  );
}

export default Page;
