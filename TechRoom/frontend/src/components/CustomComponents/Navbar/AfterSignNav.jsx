import { Button, buttonVariants } from "../../ui/button";
import React, { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useUserEmail } from "../../Context/UserEmail";
import { SignOutButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../ui/hover-card"


const AfterSignNav = () => {
  const { user } = useUser();
  const { setUserEmail } = useUserEmail();
  setUserEmail(user.primaryEmailAddress);

  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();
  const lastYRef = useRef(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    const diff = y - lastYRef.current;
    if (Math.abs(diff) > 50) {
      setIsHidden(diff > 0);
      lastYRef.current = y;
    }
  });

  const auth = localStorage.getItem("user");
  console.log(auth);
  if (auth) {
    console.log(auth);
  } else {
    console.log(auth);
  }

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
        <a href="https://agrico-community.vercel.app">
          <Button variant="ghost" className="gap-1">
            Community <ExternalLink size={18} />
          </Button>
        </a>

        <a href="https://co-sketch.vercel.app/">
          <Button variant="ghost" className=" gap-1">
            Coskecth <ExternalLink size={18} />
          </Button>
        </a> 

        <a href="https://cp-buddy-t80e.onrender.com/">
          <Button variant="ghost" className=" gap-1">
            DSA 1 Vs 1 <ExternalLink size={18} />
          </Button>
        </a>

        {/* <a href="http://localhost:8505/">
          <Button variant="ghost" className=" gap-1">
            Gold & Silver Alert <ExternalLink size={18} />
          </Button>
        </a> */}
        <Link
          to="/profile"
          style={{
            listStyle: "none",
            textDecoration: "none",
            color: "whitesmoke",
          }}
        ></Link>
        <Button className=" gap-1">
          <a href="/dashboard" className=" items-center flex flex-row gap-1">
            <img src={user.imageUrl} alt="" className="max-h-10 rounded-full" />
            {user.fullName}
          </a>
        </Button>

        <Button variant="ghost">
          <SignOutButton id="navbarbutton" />
        </Button>
        <a href="#footer">
          <Button variant="ghost">Contact</Button>
        </a>
      </motion.div>
    </motion.nav>
  );
};
export default AfterSignNav;