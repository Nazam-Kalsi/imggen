import { useGSAP } from '@gsap/react';
import React, { useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const pricingPlans = [
  {
    name: "Basic",
    price: "$9",
    period: "/month",
    description: "Perfect for individuals exploring AI-generated images.",
    features: [
      "50 image generations per month",
      "Standard resolution exports",
      "Access to basic prompt packs",
      "Email support",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Advance",
    price: "$29",
    period: "/month",
    description: "Ideal for creators and professionals needing more power.",
    features: [
      "500 image generations per month",
      "High-resolution exports",
      "Access to premium prompt packs",
      "Priority email & chat support",
      "Batch image generation",
      "Multi-style rendering",
    ],
    cta: "Upgrade Now",
    highlighted: true,
  },
  {
    name: "Custom",
    price: "Contact Us",
    period: "",
    description: "Tailored plans for enterprises, agencies, and large-scale projects.",
    features: [
      "Unlimited generations",
      "Ultra-high resolution exports",
      "Dedicated account manager",
      "Custom AI model training",
      "Private deployment options",
      "Full API access",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

function Features() {
  const featuresRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!featuresRef.current) return;

    ScrollTrigger.create({
      trigger: featuresRef.current,
      start: 'top top',
      end: '+=10%',
      pin: true,
      scrub: true,
    });
  }, { scope: featuresRef });

  return (
    <div ref={featuresRef} className='w-full h-screen bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r flex flex-col items-center justify-center'>
        <section className="">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight  sm:text-4xl">
          Pricing Plans
        </h2>
        <p className="mt-4 text-lg ">
          Choose the perfect plan for your creative needs.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`flex flex-col rounded-2xl shadow-lg border text-black p-8 ${
                plan.highlighted ? "bg-gradient-to-b from-gray-900 via-purple-900 to-violet-600 text-white" : "bg-gradient-to-r from-gray-100 to-gray-300"
              }`}
            >
              <h3 className="text-xl font-semibold ">{plan.name}</h3>
              <p className="mt-2 ">{plan.description}</p>

              <div className="mt-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-lg ">{plan.period}</span>
              </div>

              <ul className="mt-6 space-y-3 text-left">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                    <span className="ml-2 ">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`mt-8 w-full rounded-lg py-3 text-white font-medium transition-colors ${
                  plan.highlighted
                    ? "bg-indigo-600 hover:bg-indigo-700"
                    : "bg-gray-900 hover:bg-gray-800"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
    </div>
  );
}

export default Features;
