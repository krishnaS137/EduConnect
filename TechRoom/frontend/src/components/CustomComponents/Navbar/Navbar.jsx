import { Button, buttonVariants } from "../../ui/button";
import React, { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { SignInButton } from '@clerk/clerk-react';
import { ExternalLink } from "lucide-react";

const Navbar = () => {
  const [isHidden, setisHidden] = useState(false);
  const { scrollY } = useScroll();
  const lastYRef = useRef(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    const diff = y - lastYRef.current;
    if (Math.abs(diff) > 50) {
      setisHidden(diff > 0);
      lastYRef.current = y;
    }
  });

  return (
    <motion.nav
      className="navbar-container flex justify-around items-center w-full h-24 bg-transparent"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ ease: "easeOut", duration: 0.8 }}
    >
      <motion.div
        animate={isHidden ? "hidden" : "visible"}
        onFocusCapture={() => setIsHidden(false)}
        whileHover="visible"
        variants={{
          hidden: {
            y: "-100%",
          },
          visible: {
            y: "0%",
          },
        }}
        transition={{ duration: 0.3 }}
        className="nav-list w-fit h-16 z-20 px-8 list-none flex flex-row justify-center items-center fixed rounded-full border border-neutral-700 bg-gray-900 text-white dark:border-slate-200 dark:bg-slate-100 dark:text-black"
      >
        <p className=" font-bold font-Soria text-3xl underline px-2">Educonnect</p>
        <a href="#home">
          <Button variant="ghost">Home</Button>
        </a>
        {/* <a href="https://agrico-community.vercel.app">
          <Button variant="ghost" className="gap-1">
            Community <ExternalLink size={18} />
          </Button>
        </a>

        <a href="https://co-sketch.vercel.app/">
          <Button variant="ghost" className=" gap-1">
            Coskecth <ExternalLink size={18} />
          </Button>
        </a> */}

        {/* <a href="http://localhost:3001">
          <Button variant="ghost" className=" gap-1">
            Crop Suggestor <ExternalLink size={18} />
          </Button>
        </a>

        <a href="http://localhost:3001">
          <Button variant="ghost" className=" gap-1">
            Gold & Silver Signal Tracker <ExternalLink size={18} />
          </Button>
        </a> */}
       
        <a href="#course">
          <Button variant="ghost">Course</Button>
        </a>
        <a href="#about">
          <Button variant="ghost">Feature</Button>
        </a>
       
        <a href="#footer">
          <Button variant="ghost">Contact</Button>
        </a>
        <Button variant="ghost"><SignInButton id='signinbutton'/></Button>

      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
