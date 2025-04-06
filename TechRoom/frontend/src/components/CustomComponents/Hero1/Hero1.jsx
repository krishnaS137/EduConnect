import { Button } from "../../ui/button";
import React, { useRef, useState } from "react";
import Tile from "./Tile";
import Landing from "../../../assets/landing.png";
import { MapPin } from "lucide-react";
import TextAnimation from "../../ui/TextAnimation";
import {
  motion,
  useInView,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

function Hero1() {
  const [scroll, setScroll] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScroll(y > 50);
  });

  const viewRef = useRef(null);
  const isInView = useInView(viewRef, { amount: 0.5 });

  return (
    <>
      <div className="hero1-container w-full relative top-0 " id="home">
        <div className="w-full h-fit grid grid-cols-12 gap-1 ">
          {Array.from(Array(12 * 9), (i) => (
            <Tile key={i} />
          ))}
        </div>

        <div className=" pointer-events-none py-14 absolute inset-0 ">
          <div className="flex justify-center items-center gap-3 font-Soria">
            {/* <Button variant="hero">Farm</Button>
            <Button variant="hero">Bid</Button>
            <Button variant="hero">Secure</Button> */}
          </div>
          <div className="hero-text mt-7">
            <p className="hero-text items-center flex justify-center text-8xl font-light font-Soria">
              <TextAnimation
                text="Welcome To"
                viewProp={isInView ? false : true}
              />
              <p className=" text-cyan-500"> <TextAnimation
                text=" Educonnect"
                viewProp={isInView ? false : true}
              /></p>
              
            </p>
            <p className="hero-text items-center flex justify-center text-6xl font-light text-center font-Soria">
              <TextAnimation
                text="Learn Everything with Educonnect"
                viewProp={isInView ? false : true}
              />
            </p>
            <p className="hero-text text-lg my-2 font-light max-w-3xl mx-auto text-center">
            A Collaborative Platform for Online Learning, Drawing, and Note-Taking
            </p>
          </div>
          <div className="hero1-img my-3">
            <motion.img
              src={Landing}
              alt=""
              className="w-2/3 mx-auto border-2 border-gray-400"
              initial={{ rotateX: 60 }}
              animate={scroll ? { rotateX: 0 } : {}}
              transition={{ duration: 2 }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero1;
