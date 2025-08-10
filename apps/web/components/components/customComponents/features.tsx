import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Brain, FolderOpen, PenSquare } from "lucide-react";
import { Highlighter } from "@components/components/ui/highlighter";

const featureData = [
  {
    title: "Text Transformation",
    description:
      "Effortlessly convert text descriptions into stunning, high-quality images with just a few clicks.",
    icon: <PenSquare className="w-12 h-12 text-indigo-600" />,
    color:"bg-indigo-600"
  },
  {
    title: "Custom Model Training",
    description:
      "Train your own AI models to generate personalized images tailored to your unique style and preferences.",
    icon: <Brain className="w-12 h-12 text-green-600" />,
    color:"bg-green-600"
  },
  {
    title: "Curated Prompt Packs",
    description:
      "Access pre-built prompt collections to inspire your creativity and generate amazing images instantly.",
    icon: <FolderOpen className="w-12 h-12 text-purple-600" />,
    color:"bg-purple-600"
  },
];

function Pricing() {
  gsap.registerPlugin(ScrollTrigger);
  const pricingRef = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (!pricingRef.current) return;
      const container = pricingRef.current.querySelector(".pricing-container");
      gsap.fromTo(
        container,
        { yPercent: 0 },
        {
          yPercent: -100,
          ease: "none",
          scrollTrigger: {
            trigger: pricingRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    },
    { scope: pricingRef }
  );
  return (
    <div
      ref={pricingRef}
      className="relative z-[100] flex w-full justify-center items-center"
    >
      
      <div className="absolute pt-10 top-0 pricing-container w-full h-screen p-4 dark:bg-gradient-to-tl dark:from-gray-700 dark:via-gray-900 dark:to-black bg-gradient-to-b from-orange-100 via-orange-100 to-orange-200">
         <img
        src={`./frame2.png`}
        alt="svg"
        width={500}
        height={500}
        className="bg-image absolute object-cover inset-0 size-full -z-2 opacity-30 blur-sm block"
      />
        <h2 className="font-black text-center text-5xl pb-2">
          Anything you can imagine
        </h2>
        <h6 className="font-mono text-center text-xs">anything, we mean it!</h6>
        <div className="flex flex-col md:flex-row justify-evenly items-start gap-4 mt-4 h-1/2">
          {featureData.map((feature, index) => (
            <div
              className={`group flex flex-col items-center p-4 border rounded-lg hover:shadow-md hover:scale-105 transition-all max-w-xs ${[0, 2].includes(index) ? "skew-2" : ""}`}
              key={index}
            >
              {feature.icon}
              <h3 className="text-lg font-semibold group-hover:text-xl transition-all ">{feature.title}</h3>
              <p className="text-sm ">{feature.description}</p>
            </div>
          ))}
        </div>
        <h2 className="font-black text-center text-5xl pb-2">Your &nbsp;
          <Highlighter action="highlight" color="#87CEFA">Imagination,</Highlighter>
           Painted by&nbsp;          
           <Highlighter action="underline" color="#FF9800">AI.</Highlighter>
           </h2>
      </div>
    </div>
  );
}

export default Pricing;
