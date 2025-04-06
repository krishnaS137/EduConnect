import React, { useState, useEffect } from "react";
import Barchart from "../components/CustomComponents/Charts/Barchart";
import { Button, buttonVariants } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { DollarSign } from "lucide-react";


function Dashboard() {
  const [isUser, setIsUser] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      setUserData(JSON.parse(auth));
      setIsUser(true);
    }
  }, []);

  const initialChartData = [
    { month: "January", crop: 0 },
    { month: "February", crop: 0 },
    { month: "March", crop: 0 },
    { month: "April", crop: 0 },
    { month: "May", crop: 200},
    { month: "June", crop: 0 },
    { month: "July", crop: 0 },
    { month: "August", crop: 0 },
    { month: "September", crop: 0 },
    { month: "October", crop: 0 },
    { month: "November", crop: 0 },
    { month: "December", crop: 0 },
  ];

  const [chartData, setChartData] = useState(initialChartData);
 
  // const updateChartData = (month, crop) => {
  //   setChartData(chartData.map(data => data.month === month ? { ...data, crop } : { ...data, crop: 0 }));
  // };

 
  // useEffect(() => {
  
  //   const month = userData.month;
  //   const crop = userData.lastmonthsave;
  //   updateChartData(month, crop);
  // }, []);

  const chartConfig = {
    crop: {
      label: "crop",
      color: "rgb(var(--primary-main))",
    },
  };

  const [activeButton, setActiveButton] = useState("Overview");

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const clearData = () => {
    localStorage.clear();
  };

  return (
    <div className="p-4 h-screen m-4">
      <div className="flex flex-row justify-between items-center border-b h-[3rem]">
        <p className="font-bold text-4xl">Dashboard</p>
        <button onClick={clearData}></button>
      </div>
      <div className="flex flex-col gap-4 pt-4">
        {isUser && <h1 className="font-bold text-3xl">Hi, {userData.name}</h1>}
        <div className="h-fit w-fit px-2 py-2 rounded-xl bg-neutral-100 flex gap-2">
          <Button
            variant={activeButton === "Overview" ? "outline" : "link"}
            onClick={() => handleButtonClick("Overview")}
          >
            Overview
          </Button>
          <Button
            variant={activeButton === "Analytics" ? "outline" : "link"}
            onClick={() => handleButtonClick("Analytics")}
          >
            Analytics
          </Button>
          <Button
            variant={activeButton === "Notifications" ? "outline" : "link"}
            onClick={() => handleButtonClick("Notifications")}
          >
            Notifications
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isUser ? userData.AnnualSaving : "123"}
              </div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Savings</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isUser ? userData.currentsaving : "000"}
              </div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Any Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2103</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="w-full">
            <Barchart chartConfig={chartConfig} chartData={chartData} />
          </div>
          <div className="flex flex-col border rounded-xl shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
              <div className="flex flex-1 items-center justify-center rounded-lg border shadow-sm w-full h-[13rem] hover:shadow-lg">
                <div className="flex flex-col items-center gap-1 text-center">
                  <h3 className="text-2xl font-bold tracking-tight">Evaluation Model</h3>
                  <p className="text-sm text-muted-foreground px-2">
                    Give us your details and we will evaluate and review your crop investment.
                  </p>
                  <a href="/" className={`${buttonVariants("default")} mt-4`}>Evaluate</a>
                </div>
              </div>
              <div className="flex flex-1 items-center justify-center rounded-lg border shadow-sm w-full h-[13rem] hover:shadow-lg">
                <div className="flex flex-col items-center gap-1 text-center">
                  <h3 className="text-2xl font-bold tracking-tight">G&S Trade Signal</h3>
                  <p className="text-sm text-muted-foreground px-2">
                    Get alerted about Trade with the price and news on Gold and Silver Prices.
                  </p>
                  <a href="/" className={`${buttonVariants("default")} mt-4`}>Evaluate</a>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-2 p-3">
              <div className="flex flex-1 items-center justify-center rounded-lg border shadow-sm w-full h-[13rem] hover:shadow-lg">
                <div className="flex flex-col items-center gap-1 text-center">
                  <h3 className="text-2xl font-bold tracking-tight">Small Scale Business</h3>
                  <p className="text-sm text-muted-foreground px-2">
                    Get fundings from NFO, NGO and farmers especially for women empowerment.
                  </p>
                  <a href="/product" className={`${buttonVariants("default")} mt-4`}>View Pending Requests</a>
                  <a href="/request" className={`${buttonVariants("default")} mt-4`}>Make a Request</a>
                </div>
              </div>
              {/* Uncomment and update this section as needed */}
              {/* <div className="flex flex-1 items-center justify-center rounded-lg border shadow-sm w-full h-[13rem] hover:shadow-lg">
                <div className="flex flex-col items-center gap-1 text-center">
                  <h3 className="text-2xl font-bold tracking-tight">You have no products</h3>
                  <p className="text-sm text-muted-foreground">
                    You can start selling as soon as you add a product.
                  </p>
                  <Button className="mt-4">Add Product</Button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;