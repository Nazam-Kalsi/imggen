import Noise from "@components/components/customComponents/noise";
import { Button } from "@components/components/ui/button";

export default function Home() {
  return (
    <div className='w-full'>
    <img
        src={`./grad1.svg`}
        alt="svg"
        width={500}
        height={500}
        className="absolute object-cover inset-0 size-full opacity-40 hidden dark:block"
      />
     <Noise/>
      <div className="h-[84vh] flex justify-center items-center">
        <div className="w-3/4 text-center">
          <h2 className="text-8xl text-center font-bold leading-28">
            <span className="text-violet-600 relative z-[99]">Reimage&nbsp;</span>
            you <br />Images and Videos
          </h2>
          <p className="mt-3">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum
            placeat aliquam, debitis rem adipisci accusantium, quos deleniti
          </p>
        </div>
        <div>

        </div>
      </div>
    </div>
  );
}
