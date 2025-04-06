import React, { useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { MoveUpRight } from "lucide-react";
import Component1 from "./Component1";
import Component2 from "./Component2";

function Showcase() {
  const [cursorText, setCursorText] = useState("");
  const [cursorStyle, setCursorStyle] = useState({});
  const [showCursor, setShowCursor] = useState(false);

  const ref = useRef(null);

  const x = useMotionValue(200);
  const y = useMotionValue(200);
  const rotateX = useTransform(y, [0, 400], [45, -45]);
  const rotateY = useTransform(x, [0, 400], [-45, 45]);

  function handleMouse(event) {
    const rect = ref.current.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);

    setCursorStyle({
      top: event.clientY - 50,
      left: event.clientX - 50,
      position: "fixed",
    });
  }

  const projectEnter = () => {
    setCursorText("View More");
    setShowCursor(true);
  };

  const projectLeave = () => {
    setCursorText("");
    setShowCursor(false);
  };

  return (
    <div className=" py-28" id="course">
      <div className="text-center mb-8">
        <p className="text-6xl font-Soria ">Courses</p>
        <p className=" text-lg">
          Learn Based on Recorded Videos
        </p>
      </div>

      <div
        className="flex flex-row justify-center items-center gap-2 w-full"
        ref={ref}
        onMouseMove={handleMouse}
      >
        <div
          className=" h-[40rem] w-1/2 cursor-none flex items-center justify-center border"
          onMouseEnter={projectEnter}
          onMouseLeave={projectLeave}
        >
          <span className=" text-lg">
            <Component1 />
          </span>
        </div>

        <div
          className=" h-[40rem] w-1/2 cursor-none flex items-center justify-center border"
          onMouseEnter={projectEnter}
          onMouseLeave={projectLeave}
        >
          <span className="text-lg">{<Component2 />}</span>
        </div>
      </div>
      <motion.div
        className="flex items-center justify-center rounded-lg bg-white/5"
        style={{ perspective: "400px" }}
      >
        <motion.div
          style={{
            rotateX,
            rotateY,
          }}
          className="rounded-[30px] bg-white"
        />
      </motion.div>
      {showCursor && (
        <motion.div
          style={{
            ...cursorStyle,
          }}
          className="h-[100px] w-[100px] rounded-full flex flex-col justify-center items-center pointer-events-none fixed bg-cyan-300 -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.3 }}
        >
          <MoveUpRight
            size={30}
            style={{ marginLeft: "8px", color: "white" }}
          />
          <span style={{ color: "white" }}>{cursorText}</span>
        </motion.div>
      )}
    </div>
  );
}

export default Showcase;
