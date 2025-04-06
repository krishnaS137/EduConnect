import React from "react";
import Marquee from "../container/marquee";

function TestimonialCard({ testimonial: { image, name, description } }) {
  return (
    <div
      className="flex flex-col w-full max-w-sm p-7 overflow-hidden rounded-xl border-1 bg-background shadow-lg"
      key={name}
    >
      <div className="">
        <span className=" text-2xl font-extralight">{description}</span>
      </div>
      <div className="flex items-center mt-4">
        <div className="relative h-12 w-12 rounded-full flex-shrink-0 overflow-hidden mr-4">
          <img src={image} alt={name} className="h-full w-full object-cover" />
        </div>
        <div>
          <span className="block text-lg font-bold text-foreground">{name}</span>
          <span className="block text-lg font-medium leading-loose text-muted-foreground">
            
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ScrollingTestimonials({ data }) {
  return (
    <div className=" ">
      <div className="flex flex-row gap-3 h-[65vh]">
        <Marquee
          className="[--duration:90s]"
          vertical
          pauseOnHover
          reverse
          applyMask={false}
        >
          {data.map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </Marquee>

        <Marquee
          className="[--duration:80s]"
          vertical
          pauseOnHover
          applyMask={false}
        >
          {data.map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </Marquee>

        <Marquee
        reverse
          className="[--duration:80s]"
          vertical
          pauseOnHover
          applyMask={false}
        >
          {data.map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </Marquee>
      </div>
    </div>
  );
}
