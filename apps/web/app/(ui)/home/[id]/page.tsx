"use client"
import { useAuth } from '@clerk/nextjs';
import { apiReq } from '@utils/apiReq';
import React, { useEffect, useState } from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@components/components/ui/pagination"
import Loading from '@components/components/customComponents/loading';
import { ImageCard } from '@components/components/customComponents/userImageCard';
type Props = {}

function Page({}: Props) {
  const [ loading,setLoading] = useState<boolean>(false);
  const [ userImages,setUserImages] = useState<any[]>([]);
  const [ page,setPage] = useState<number>(1);
    const [isImagesAvaliable,setIsImagesAvaliable ] = useState<boolean>(true);
  
  const {getToken} = useAuth();
  const fetchUserImages = async()=>{
    setLoading(true);
    const token = await getToken();
    const res = await apiReq(`/image/get-user-images?page=${page}`,"GET",token);
    if(!res.success){
      setLoading(false);
      return;
    }
    console.log(res.res.data.data);
    setUserImages(res.res.data.data.data.images);
    if(res.res.data.data.data.currentCount<10)setIsImagesAvaliable(false);
    else{
      setIsImagesAvaliable(true);
    }
    setLoading(false);    
  }

  useEffect(()=>{
    fetchUserImages();
  },[page])
  return (
    <div>
      {loading && <Loading/>}
      <div className='flex w-full flex-col gap-2 items-center justify-center p-4'>
        <h2 className='font-black text-3xl'>User Images</h2>
        <div className='flex justify-center items-center gap-4 flex-wrap min-h-[80vh] border w-full rounded-md'>
          {
            userImages && userImages.map((x,index)=>{
              return(
                <>
                <ImageCard
                key={index}
                  imageUrl={x.imageUrl}
                  description={x.prompt}
                  fileName="sample-image.jpg"
                />
                </>
              )
            })
          }
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
    {isImagesAvaliable &&
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
  )
}

export default Page