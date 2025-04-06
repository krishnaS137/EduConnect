import React, { useState } from "react";
import { easeIn, easeInOut, motion } from "framer-motion";

function TextAnimation({ text, className, viewProp }) {
  const defaultAnimation = {
    hidden: {
      opacity: 0,
      y:50,
    },
    visible: {
      opacity: 1,
      y:0,

      transition: {
        duration: 0.1,
        
      },
    },
  };

  return (
    <div className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        initial="hidden"
        animate={viewProp ? "visible" : "hidden"}
        transition={{ staggerChildren: 0.07 , ease:'easeInOut'}}
        className="aria-hidden flex flex-wrap"
      >
        {text.split("").map((char, index) => (
          <motion.span
            className=" inline-block"
            key={index}
            variants={defaultAnimation}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.span>
    </div>
  );
}

export default TextAnimation;
