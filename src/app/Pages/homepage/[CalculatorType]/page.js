
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
  mf: dynamic(() => import('@/Components/mfcal')),
  ppf: dynamic(() => import('@/Components/ppfcal')),
  epf: dynamic(() => import('@/Components/epfcal')),
  fd: dynamic (() => import ("@/Components/fdcal")),
  ssy: dynamic(() => import ("@/Components/ssycal")),
  rd: dynamic(() => import ("@/Components/rdcal")),
  hra: dynamic(() => import("@/Components/hracal")),
  nps: dynamic(() => import('@/Components/npscal')),
  simpleinterest: dynamic(() => import('@/Components/sical')),
  homeloanemi: dynamic(() => import("@/Components/homeloancal")),
  apy: dynamic(() => import("@/Components/apycal")),
  gst: dynamic(() => import("@/Components/gstcal")),


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
