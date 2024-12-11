// import ImgSip from "../../assets/sip-1.svg";
// import ImgSip2 from "../../assets/sip-2.svg";
// import ImgSip3 from "../../assets/sip-3.svg";

import ImgSip from '@/app/assets/sip-1.svg';
import ImgSip2 from '@/app/assets/sip-2.svg';
import ImgSip3 from '@/app/assets/sip-3.svg';
import swpimg from '../app/assets/swpimg.svg';
import Mfimg from '../app/assets/MF.svg';
import ppfimg from '../app/assets/ppf.svg';
import epfimg from '../app/assets/epf.svg';
import fdimg from '../app/assets/FD.svg';
import ssyimg from '../app/assets/ssy.svg';
import rdimg from '../app/assets/RD.svg';
import HRAImg from '../app/assets/HRA.svg';
import npsImg from '../app/assets/NPS.svg';
import retirementImg from '../app/assets/retirement.svg';
import SIimg from '../app/assets/simpleInterest.svg';
import EmiImg from '../app/assets/EMI.svg';
import CarLoanimg from '../app/assets/carEMI.svg';
import HomeLoanImg from '../app/assets/HomeEMI.svg';
import CIimg from '../app/assets/CI.svg';
import NCSimg from '../app/assets/NCS.svg';
import stepUpImg from '../app/assets/stepUpsip.svg';
import IncomeTaximg from '../app/assets/Incometax.svg';
import APYimg from '../app/assets/APY.svg';
import cagrImg from '../app/assets/CAGR.svg';
import GSTImg from '../app/assets/GST.svg';
import gratutityImg from  '../app/assets/gratituty.svg';
import flatreduceImg from '../app/assets/flat vs reduce rat.svg';
import brokerImg from '../app/assets/brokeragre.svg';
import marginImg from '../app/assets/margin.svg';
import tdsImg from '../app/assets/TDS 2ND.svg';
import InflationImg from '../app/assets/Inflation.svg';
import scssImg from '../app/assets/scss.svg';
import salaryImg from '../app/assets/salary.svg';
import postOfficeImg from '../app/assets/post office emi.svg';
import stockAvgImg from '../app/assets/stock avg cal.svg'
import Image from "next/image";
import Link from "next/link"; 

const calculators = [
    {
      type: "sip",
      title: "SIP",
      description:
        "Curious about your SIP returns? Use our SIP calculator to see how small investments grow over time.",
      icon: ImgSip,
      gradiantClass: "gradient-red",
    },

    {
      type: "Lumpsum",
      title: "Lumpsum",
      description:
        "Wondering how your lump sum will grow? Use our calculator to estimate potential returns",
      icon: ImgSip2,
      gradiantClass: "gradient-yellow",
    },
    {
      type: "SWP",
      title: "SWP",
      description:
        "SWP helps you to withdraw a fixed amount from your investment without having to sell off your entire Portfolio",
      icon: swpimg,
      gradiantClass: "gradient-blue",
    },
    {
      type: "MF",
      title: "MF",
      description: "Calculate the returns on your mutual fund investment",
      icon: Mfimg,
      gradiantClass: "gradient-green",
    },
    {
      type: "PPF",
      title: "PPF",
      description: "Calculate your returns on Public Provident Fund (PPF)",
      icon: ppfimg,
      gradiantClass: "gradient-yellow",
    },
  
    {
      type: "EPF",
      title: "EPF",
      description: "Calculate returns for your Employee's Provident Fund (EPF)",
      icon: epfimg,
      gradiantClass: "gradient-blue",
    },
  
    {
      type: "FD",
      title: "FD",
      description: "Check returns on your fixed. deposits (FDs) without any hassle",
      icon: fdimg,
      gradiantClass: "gradient-green",
    },
  
    {
      type: "SSY",
      title: "SSY",
      description: "Calculate returns for Sukanya Smariddhi Yojana (SSY) as per your investment",
      icon: ssyimg,
      gradiantClass: "gradient-red",
    },
  
    {
      type: "RD",
      title: "RD",
      description: "Check returns on your Recurring Deposit (RD) in just a few clicks",
      icon: rdimg,
      gradiantClass: "gradient-red",
    },
  
    {
      type: "HRA",
      title: "HRA",
      description: "Calculate your House Rent Allowance (HRA)",
      icon: HRAImg,
      gradiantClass: "gradient-blue",
    },
  
    {
      type: "NPS",
      title: "NPS",
      description: "Calculate returns for your National Pension Scheme (NPS)",
      icon: npsImg,
      gradiantClass: "gradient-yellow",
    },
  
    {
      type: "Retirement",
      title: "Retirement",
      description: "Calculate how much you need for a relaxed retirement",
      icon: retirementImg,
      gradiantClass: "gradient-green",
    },
  
    {
      type: "SimpleInterest",
      title: "Simple Interest",
      description: "Calculate simple interest on your loans and saving schemes investments",
      icon: SIimg,
      gradiantClass: "gradient-green",
    },
  
    {
      type: "EMI",
      title: "EMI",
      description: "Calculate EMI on your loans - home loan, car loan or personal loan",
      icon: EmiImg,
      gradiantClass: "gradient-red",
    },
  
    {
      type: "CarLoanEMI",
      title: "Car Loan EMI",
      description: "Calculate your car loan EMI",
      icon: CarLoanimg,
      gradiantClass: "gradient-yellow",
    },
  
    {
      type: "HomeLoanEMI",
      title: "Home Loan EMI",
      description: "Calculate your Home loan EMI",
      icon: HomeLoanImg,
      gradiantClass: "gradient-blue",
    },
    {
      type: "CompoundInterest",
      title: "Compound Interest",
      description: "Calculate Compound Interest with ease",
      icon: CIimg,
      gradiantClass: "gradient-red",
    },
  
    {
      type: "NCS",
      title: "NCS",
      description: "Calculate your returns under National Savings Certificate scheme",
      icon: NCSimg,
      gradiantClass: "gradient-yellow",
    },
  
    {
      type: "StepUpSIP",
      title: "Step Up SIP",
      description: "Calculate SIP Returns with an Yearly Raise",
      icon: stepUpImg,
      gradiantClass: "gradient-blue",
    },
     
    {
      type: "APY",
      title: "APY",
      description: "Calculate your monthly investments under Atal Pension Yojana",
      icon: APYimg,
      gradiantClass: "gradient-yellow",
    },
  
    {
      type: "CAGR",
      title: "CAGR",
      description: "The simplest compound annual growth rate calculator",
      icon: cagrImg,
      gradiantClass: "gradient-blue",
    },
  
    {
      type: "GST",
      title: "GST",
      description: "Calculate your payable GST amount with a few clicks",
      icon: GSTImg,
      gradiantClass: "gradient-green",
    },
  
    {
      type: "Gratutity",
      title: "Gratutity",
      description: "Calculate how much gratuity you will get when you retire",
      icon: gratutityImg,
      gradiantClass: "gradient-red",
    },
    {
      type: "FlatvsReducingrate",
      title: "Flat vs Reducing rate",
      description: "Compare monthly EMI in Flat and Reducing balance interest rate schemes",
      icon: flatreduceImg,
      gradiantClass: "gradient-red",
    },
  
    {
      type: "Brokerage",
      title: "Brokerage",
      description: "Calculate brokerage and other charges for your stock orders",
      icon: brokerImg,
      gradiantClass: "gradient-yellow",
    },
  
    {
      type: "Margin",
      title: "Margin",
      description: "Calculate margin for delivery and intraday based on your order details",
      icon: marginImg,
      gradiantClass: "gradient-blue",
    },
  
    {
      type: "TDS",
      title: "TDS",
      description: "Calculate your TDS deductions",
      icon: tdsImg,
      gradiantClass: "gradient-green",
    },
  
    {
      type: "Inflation",
      title: "Inflation",
      description: "Calculate inflation adjusted prices",
      icon: InflationImg,
      gradiantClass: "gradient-yello",
    },
  
    {
      type: "SCSSCalculator",
      title: "SCSS Calculator",
      description: "Calculate senior citizens savings scheme returns",
      icon: scssImg,
      gradiantClass: "gradient-green",
    },
  
    {
      type: "Salary",
      title: "Salary",
      description: "Calculate your net take home salary",
      icon: salaryImg,
      gradiantClass: "gradient-red",
    },
  
    {
      type: "PostOfficeMIS",
      title: "Post Office MIS",
      description: "Calculate post office monthly Income scheme returns",
      icon: postOfficeImg,
      gradiantClass: "gradient-blue",
    },
  
    {
      type: "StockAverageCalculator",
      title: "Stock Average Calculator",
      description: "Calculate average price of your stock investments",
      icon: stockAvgImg,
      gradiantClass: "gradient-red",
    },
  ];

  export default calculators