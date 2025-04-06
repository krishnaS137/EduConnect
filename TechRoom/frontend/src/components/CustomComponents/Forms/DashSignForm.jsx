// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function DashSignForm() {
//   const [name, setName] = useState("");
//   const [currentSaving, setCurrentSaving] = useState("");
//   const [annualSaving, setAnnualSaving] = useState("");
//   const [goal, setGoal] = useState("");

//   const navigate = useNavigate();

//   useEffect(() => {
//     const auth = localStorage.getItem("user");
//     if (auth) {
//       navigate("/dashboard");
//     }
//   }, [navigate]);

//   const collectData = async () => {
//     console.log("Submitting data:", { name, currentSaving, annualSaving, goal });

//     try {
//       let result = await fetch("http://localhost:5001/register", {
//         method: "POST",
//         body: JSON.stringify({ name, currentSaving, annualSaving, goal }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (!result.ok) {
//         throw new Error("Failed to register");
//       }

//       result = await result.json();

//       localStorage.setItem("user", JSON.stringify(result));
//       navigate("/dashboard");
//     } catch (error) {
//       console.error("Error:", error);

//     }
//   };

//   return (
//     <div className="register_form">
//       <h1 className="h1tag text-3xl mb-6">Registration Form</h1>
//       <div className="flex flex-col gap-4">
//         <input
//           className="input_box"
//           type="text"
//           placeholder="Enter your name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <input
//           className="input_box"
//           type="number"
//           placeholder="Enter Current Savings"
//           value={currentSaving}
//           onChange={(e) => setCurrentSaving(e.target.value)}
//         />
//         <input
//           className="input_box"
//           type="number"
//           placeholder="Enter Annual Contribution"
//           value={annualSaving}
//           onChange={(e) => setAnnualSaving(e.target.value)}
//         />

//         <input
//           className="input_box"
//           type="text"
//           placeholder="Enter Goal"
//           value={goal}
//           onChange={(e) => setGoal(e.target.value)}
//         />
//         <button onClick={collectData} className="signupbutt mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//           Signup
//         </button>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DashSignForm() {
  const [name, setName] = useState("");
  const [currentsaving, setcurrentsaving] = useState("");
  const [AnnualSaving, setAnnualSaving] = useState("");
  const [Goal, setGoal] = useState("");
  const [month, setmonth] = useState("");
  const [lastmonthsave, setlastmonthsave] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const collectData = async () => {
    console.log("Submitting data:", {
      name,
      currentsaving,
      AnnualSaving,
      Goal,
    });

    try {
      let result = await fetch("http://localhost:5001/register", {
        method: "POST",
        body: JSON.stringify({ name, currentsaving, AnnualSaving, Goal }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!result.ok) {
        throw new Error("Failed to register");
      }

      result = await result.json();

      localStorage.setItem("user", JSON.stringify(result));
      navigate("/dashboard");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="register_form">
      <h1 className="h1tag text-3xl mb-6">Registration Form</h1>
      <div className="flex flex-col gap-4">
        <input
          className="input_box"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="input_box"
          type="number"
          placeholder="Enter Current Savings"
          value={currentsaving}
          onChange={(e) => setcurrentsaving(e.target.value)}
        />
        <input
          className="input_box"
          type="number"
          placeholder="Enter Annual Contribution"
          value={AnnualSaving}
          onChange={(e) => setAnnualSaving(e.target.value)}
        />

        <input
          className="input_box"
          type="text"
          placeholder="Enter Goal"
          value={Goal}
          onChange={(e) => setGoal(e.target.value)}
        />

        <input
          className="input_box"
          type="text"
          placeholder="Enter Month"
          value={month}
          onChange={(e) => setmonth(e.target.value)}
        />

        <input
          className="input_box"
          type="number"
          placeholder="Enter Last month save"
          value={lastmonthsave}
          onChange={(e) => setlastmonthsave(e.target.value)}
        />
        <button
          onClick={collectData}
          className="signupbutt mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Signup
        </button>
      </div>
    </div>
  );
}
