import React, { useRef } from "react";
import { useInView } from "framer-motion";
import { useTheme } from "../../theme-provider";
import TableData from "./TableData";
import Coaching from "../../../assets/Lottie.gif"
import Slack from "../../../assets/Slack.png";
import Zoom from "../../../assets/Zoom.png";
import Viber from "../../../assets/Viber.png";
import Telegram from "../../../assets/Telegram.png";
import Paypal from "../../../assets/Paypal.png";
import Linkedin from "../../../assets/LinkedIn.png";
import Barchart from "../Charts/Barchart"
import { IconCircle } from "./IconCircle";
import Community from '../../../assets/Community.png'
import dsa from '../../../assets/dsa.png'
import skecthbook from '../../../assets/skecthbook.png'


function Features() {
  const { theme } = useTheme();
  const chartRef = useRef(null);
  const isInView = useInView(chartRef, { amount: 0.5 });

  const chartData = [
    { month: "January", crop: 186 },
    { month: "February", crop: 305 },
    { month: "March", crop: 237 },
    { month: "April", crop: 73 },
    { month: "May", crop: 209 },
    { month: "June", crop: 214 },
    { month: "July", crop: 186 },
    { month: "August", crop: 305 },
    { month: "September", crop: 237 },
    { month: "October", crop: 73 },
    { month: "November", crop: 209 },
    { month: "December", crop: 214 },
  ];

  const chartConfig = {
    crop: {
      label: "crop",
      color: "rgb(var(--primary-main))",
    },
  };

  return (
    <div className=" w-full mt-20 bg-neutral-50 p-1" id="about">
      <div className=" w-fit mx-auto mt-16">
        <h1 className=" text-5xl font-bold font-Soria">
          Some of our Top Features
        </h1>
        <p className=" w-fit mx-auto">
          We Provide these features in different packages
        </p>
      </div>
      <div className="feature-container w-10/12 mx-auto my-6">
        <div className="grid grid-cols-12 grid-rows-40 gap-4">
          <div
            className="col-span-6 row-span-26 flex flex-col items-center rounded-xl hover:shadow-xl bg-gray-100"
            ref={chartRef}
          >
            {/* <div className=" pt-4">
              {isInView && (
                <Barchart chartData={chartData} chartConfig={chartConfig}/>
              )}
            </div> */}
            <img src={skecthbook} alt="" className="px-2"/>

            <p className=" font-bold pt-4">Coskectch</p>
            <p className=" pb-4 w-2/3 text-center">
             Collabrative Drawing and Note taking Platform 
            </p>
          </div>
          <div className="col-span-6 row-span-26 bg-gray-100 rounded-lg flex flex-col justify-center items-center  hover:shadow-xl">
            <div className=" border rounded-lg mx-auto pt-5 ">
              {/* {isInView && <TableData classname={"w-fit mx-auto border-2 bg-white  "} />} */}
              {isInView &&  <IconCircle/>}
            </div>
            <h1 className=" font-bold pt-4">AI Tools</h1>
            <div>AI tools for Learning in Better Way</div>
          </div>

          <div className="col-span-4 row-span-26 hover:shadow-lg flex flex-col justify-start items-center rounded-2xl">
            <div className=" row-span-9 bg-gray-100">
              <img src={Community} alt="" className="px-2"/>
            </div>
            <div className=" row-span-3">
              <p className=" font-bold p-2"> Community Platoform for Student</p>
              <p className=" px-2">Get announcement of upcoming educational sessions </p>
            </div>
          </div>

          <div className="col-span-4 row-span-26 grid grid-rows-12 gap-2">
            <div className="row-span-8 rounded-xl flex justify-center ">
              <img
                src={dsa}
                alt=""
                className=" rounded-xl"
              />
            </div>
            <div className="row-span-4 ">
              <p className=" font-bold">DSA Chllenge 1 vs 1</p>
              <p>
                Full 1 vs 1 challenge to grind Data Structures and Algorithm
              </p>
            </div>
          </div>
          <div className="col-span-4 row-span-26 grid grid-cols-3 grid-rows-12 gap-3">
            <div className="col-span-1 rounded-lg row-span-4 ">
              <img src={Paypal} alt="" className="  rounded-2xl w-32 bg-blue-700" />
            </div>
            <div className="col-span-3 row-span-4 flex flex-row justify-center gap-2 border rounded-2xl bg-gray-100">
              <img src={Zoom} alt="" className="  rounded-2xl w-32 " />
              <img src={Viber} alt="" className="  rounded-2xl w-32" />
            </div>
            <div className="col-span-4 bg-gray-100 row-span-4 flex flex-row gap-2 rounded-2xl">
              <img src={Telegram} alt="" className="  rounded-2xl w-32" />
              <img src={Linkedin} alt="" className="  rounded-2xl w-32" />
              <img src={Slack} alt="" className="  rounded-2xl   w-32" />
            </div>
            <div className="col-span-4  row-span-4">
              <p className=" font-bold ">Authentication Integration</p>
              <p className="">
          User can login with differnet Platform like Github, Mail, AppleID
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;
