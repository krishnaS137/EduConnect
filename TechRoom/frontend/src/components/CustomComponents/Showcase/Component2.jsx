import React, { useRef, useState } from "react";
import Vid2 from "../../../assets/C2.mp4";
import { motion } from "framer-motion";

function Component2() {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    videoRef.current.pause();
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    videoRef.current.play();
    videoRef.current.currentTime = 0;
    setIsHovered(false);
  };

  return (
    <div className=" flex flex-col ">
      <motion.div
        className="relative w-[49rem] h-[40rem] overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <motion.video
          ref={videoRef}
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{ filter: isHovered ? "brightness(0.5)" : "none" }}
        >
          <source src={Vid2} type="video/mp4" />
          Your browser does not support the video tag.
        </motion.video>
        <div className="relative z-7 flex flex-col justify-end h-full pb-4 pl-3">
          <h1 className={` text-5xl font-bold mt-4 transition-all duration-300 transform ${
              isHovered
                ? "text-white"
                : "text-black"
            }`}>
            Advanced Java Concepts
          </h1>
          <motion.p
            className={`text-white text-lg md:text-xl mt-4 transition-all duration-300 transform ${
              isHovered
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
           lorem.
          </motion.p>
          <motion.p
            className={`text-white transition-all duration-300 transform ${
              isHovered
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, 
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}

export default Component2;
