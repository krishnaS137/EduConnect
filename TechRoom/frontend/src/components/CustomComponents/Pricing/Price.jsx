import { Button } from "../../ui/button";
import { buttonVariants } from "../../ui/button";
import { ArrowRight } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Label } from "../../ui/label";

function Price() {
  const [isYearly, setIsYearly] = useState(true);

  const PriceData = [
    {
      heading: "Starter",
      description: "For small savings",
      amount: isYearly ? "$150" : "$21",
      perks: [
        "1 user",
        "10 projects",
        "10,000 website views",
        "2 Integrations",
        "Email support",
      ],
    },
    {
      heading: "Pro",
      description: "For medium savings and stock alerts",
      amount: isYearly ? "$400" : "$50",
      perks: [
        "1 user",
        "10 projects",
        "10,000 website views",
        "2 Integrations",
        "Email support",
        "Personalized Session",
        "Course Access",
        "Dashboard Progress Track",
        "Anything to add",
      ],
    },
    {
      heading: "Champion",
      description: "For large savings",
      amount: isYearly ? "$500" : "$100",
      perks: [
        "1 user",
        "10 projects",
        "10,000 website views",
        "2 Integrations",
        "Email support",
        "Personalized Session",
        "Course Access",
        "Dashboard Progress Track",
        "Real Estate Guide",
        "Crypto Alert",
        "Anything to add",
      ],
    },
  ];

  return (
    <div className="font-Soria mt-28 mb-36">
      <div className="text-center mb-10">
        <p className="font-bold text-4xl mb-2">Our Pricing Will Surprise You</p>
        <p className="text-xl">
          With so many features at your disposal, you might have to take a loan
          to buy our monthly subscription.
        </p>
        <RadioGroup onValueChange={(value) => setIsYearly(value === "yearly")} defaultValue="yearly">
          <div className="flex items-center justify-center space-x-2">
            <RadioGroupItem value="monthly" id="month" className=' h-5 w-5'/>
            <Label htmlFor="month" className=" text-lg">Monthly</Label>
            <RadioGroupItem value="yearly" id="year" className=' h-5 w-5'/>
            <Label htmlFor="year" className=" text-lg">Yearly</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="flex flex-row justify-center gap-8 px-12">
        {PriceData.map((price, i) => (
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ ease: "backInOut", duration: 0.4 }}
            key={i}
            className={`flex flex-col items-start gap-3 p-6 border rounded-lg shadow-md w-full ${
              i === 1 ? "bg-teal-500 text-white" : "bg-white text-gray-900"
            }`}
          >
            <div>
              <h1 className="font-bold text-3xl">{price.heading}</h1>
              <p className="text-lg mb-4">{price.description}</p>
              <p className="text-5xl font-bold mb-6">
                {price.amount} <span className="font-thin text-2xl">/{isYearly ? "yr" : "mo"}</span>
              </p>
              {/* <Button size="md" >Get Started</Button> */}
              <a className={`${buttonVariants({ size:'md' })}`} href='https://buy.stripe.com/test_bIYeXi02FerX35ueUU'><span className=" text-lg">Click Here</span></a>
            </div>

            <ul className="mt-6 space-y-2 text-left">
              {price.perks.map((perk, j) => (
                <li key={j} className="flex items-center text-lg font-thin">
                  <span className="mr-2">
                    <ArrowRight size={16} />
                  </span>
                  {perk}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Price;
