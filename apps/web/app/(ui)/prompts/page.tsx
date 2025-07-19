"use client";
import Cards from "@components/components/customComponents/cards";
import Loading from "@components/components/customComponents/loading";
import { apiReq } from "@utils/apiReq";
import { useAppSelector } from "app/store/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

function Page() {
  const [packs, setPacks] = useState<any>([]);
  const [loading,setLoading] = useState<boolean>(false);
  const [page,setPage] = useState<number>(1);
  const router= useRouter();
  useEffect(()=>{
    ;(async()=>{
        setLoading(true);
        const res = await apiReq(`/pack/get-packs?page=${page}`,"GET");
        if(!res.success){
            setLoading(false);
            return;
        }
        setPacks((prev:any)=>{return([...prev,...res.res.data.data.data.packs,...res.res.data.data.data.packs])});
        toast.success("Prompts fetched successfully");
        setLoading(false);
    })();},[]);
    const user = useAppSelector((state)=>state.authSlice.user);
useEffect(()=>{
    if(!user){
        // router.push('/sign-in');
    }
},[])

  return (
    <>
    {loading && <Loading/>}
      <div className="flex w-full flex-col gap-4">
        <h2 className="text-2xl font-semibold text-center uppercase ">Prebuild Prompts</h2>
        <div className="flex w-full rounded-md overflow-hidden">
          <div className=" flex items-center justify-evenly flex-wrap  w-full rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 gap-5 p-4">
          <div className=" flex items-center justify-evenly flex-wrap border w-full rounded-md gap-5 p-4">
            {packs.map((x, index) => {
              return (
                <div 
                key={index}
                className="bg-[url(../public/grad2.jpg)] bg-cover rounded-md overflow-hidden"
                >
                <Cards
                  title={x.id}
                  description={x.packName}
                  src={"/base.png"}
                  className="bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10"
                  />                
                  </div>
              );
            })}
          </div>
        </div>
        </div>
      </div>
    </>
  );
}

export default Page;
