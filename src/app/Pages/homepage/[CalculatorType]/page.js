//--------------------------------------------------------------

// // src/app/Pages/homepage/[calculatorType]/page.js
// 'use client';

// import { useParams, useRouter } from 'next/navigation';
// // import styles from "../../../homepage.module.css";
// // import styles from '../../../styles/homepage.module.css'
// import style from '../../../styles/homepage.module.css'

// const calculatorDetails = {
//   sip: { title: "SIP Calculator", description: "Curious about your SIP returns? Use our SIP calculator to see how small investments grow over time." },
//   Lumpsum: { title: "Lumpsum Calculator", description: "Wondering how your lump sum will grow? Use our calculator to estimate potential returns" },
//   SWP: { title: "SWP Calculator", description: "SWP helps you to withdraw a fixed amount from your investment without having to sell off your entire Portfolio" },
//   MF: { title: "MF Calculator", description: "Calculate returns on your mutual fund investments." },
//   PPF: { title: "PPF Calculator", description: "Calculate your returns on Public Provident Fund (PPF)." },
//   EPF: {title: "EPF Calculator", description: "Calculate returns for your Employee's Provident Fund (EPF)"},
//   FD: {title: "FD Calculator", description: "Check returns on your fixed. deposits (FDs) without any hassle"},
//   SSY: {title: "SSY Calculator", description: "Calculate returns for Sukanya Smariddhi Yojana (SSY) as per your investment"},
//   RD: {title: "RD Calculator", description: "Check returns on your Recurring Deposit (RD) in just a few clicks"},
//   HRA: {title: "HRA Calculator", description: "Calculate your House Rent Allowance (HRA)"},
//   NPS: {title: "NPS Calculator", description: "Calculate returns for your National Pension Scheme (NPS)"},
//   Retirement: {title: "Retirement Calculator", description: "Calculate how much you need for a relaxed retirement"},
//   SimpleInterest: {title: "Simple Interest Calculator", description: "Calculate simple interest on your loans and saving schemes investments"},
//   EMI: {title: "EMI Calculator", description: "Calculate EMI on your loans - home loan, car loan or personal loan"},
//   CarLoanEMI: {title: "Car Loan EMI Calculator", description: "Calculate your car loan EMI"},
//   HomeLoanEMI: {title: "Home Loan EMI Calculator", description: "Calculate your Home loan EMI"},
//   CompoundInterest: {title: "CI Calculator", description: "Calculate Compound Interest with ease"},
//   NCS: {title: "NCS Calculator", description: "Calculate your returns under National Savings Certificate scheme"},
//   StepUpSIP: {title: "Step Up SIP Calculator", description: "Calculate SIP Returns with an Yearly Raise"},
//   APY: {title: "APY Calculator", description: "Calculate your monthly investments under Atal Pension Yojana"},
//   CAGR: {title: "CAGR Calculator", description: "The simplest compound annual growth rate calculator"},
//   GST: {title: "GST Calculator", description: "Calculate your payable GST amount with a few clicks"},
//   Gratutity: {title: "Gratutity Calculator", description: "Calculate how much gratuity you will get when you retire"},
//   FlatvsReducingrate: {title: "Flat vs Reducing rate Calculator", description: "Compare monthly EMI in Flat and Reducing balance interest rate schemes"},
//   Brokerage: {title: "Brokerage Calculator", description: "Calculate brokerage and other charges for your stock orders"},
//   Margin: {title: "Margin Calculator", description: "Calculate margin for delivery and intraday based on your order details"},
//   TDS: {title: "TDS Calculator", description: "Calculate your TDS deductions"},
//   Inflation: {title: "Inflation Calculator", description: "Calculate inflation adjusted prices"},
//   SCSSCalculator: {title: "SCSS Calculator", description: "Calculate senior citizens savings scheme returns"},
//   Salary: {title: "Salary Calculator", description: "Calculate your net take home salary"},
//   PostOfficeMIS: {title: "Post Office MIS Calculator", description: "Calculate post office monthly Income scheme returns"},
//   StockAverageCalculator: {title: "Stock Average Calculator Calculator", description: "CCalculate average price of your stock investments"},

// };

// const CalculatorDynamicPage = () => {
// //   const router = useRouter();
//   const { CalculatorType } = useParams();

//   console.log('calculatorType:', CalculatorType)

//   const calcDetail = calculatorDetails[CalculatorType] || {
//     title: "Unknown Calculator",
//     description: "The specified calculator could not be found.",
//   };

//   return (
//     <div className="container ">
//       <h1 className={`${style.calcdetailsheading} mt-4`}>{calcDetail.title}</h1>
//       <p className={`${style.calcsubheading} `}>{calcDetail.description}</p>
//     </div>
//   );
// };

// export default CalculatorDynamicPage;

//--------------------------------------------------------------------------------------------------------------------------

"use client";

// import SipCal from '@/app/Components/sipcal.js';
// import LumpsumCal from '@/app/Components/lumpsumcal.js';
// import Sipcal2 from '@/app/Pages/sipcal2';

import SipCal from "@/Components/sipcal";
import LumpsumCal from "@/Components/lumpsumcal";

import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

const calculators = {
  sip: dynamic(() => import("@/Components/sipcal")),
  lumpsum: dynamic(() => import("@/Components/lumpsumcal")),
  swp: dynamic(() => import("@/Components/swpcal")),
  gst: dynamic(() => import("@/Components/gstcal")),
  apy: dynamic(() => import("@/Components/apycal")),
  homeloanemi: dynamic(() => import("@/Components/homeloancal")),
  hra: dynamic(() => import("@/Components/houserentallowance"))
  // swp: (() => import ('@/Components/swpcal'))
};
console.log("Calculators Object:", calculators);

const CalculatorDynamicPage = () => {
  const params = useParams();
  console.log("Params:", params);

  const { CalculatorType } = params; 

  const calculatorType = CalculatorType?.toLowerCase(); 

  console.log("Calculator Type:", calculatorType); 

  const SelectedCalculator = calculators[calculatorType];
  // console.log("Selected Calculator:", calculators[calculatorType]); 

  return (
    <div >
      {SelectedCalculator ? (
        <SelectedCalculator /> 
      ) : (
        <div>Calculator Not Found</div>
      )}
    </div>
  );
};

export default CalculatorDynamicPage;
