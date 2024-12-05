
// src/app/Pages/homepage/CalculatorPage.js

import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import Link from "next/link"; 
import ImgSip from "../../assets/sip-1.svg";
import ImgSip2 from "../../assets/sip-2.svg";
import ImgSip3 from "../../assets/sip-3.svg";
import styles from "../../styles/homepage.module.css";
import "../../globals.css";

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
    icon: ImgSip3,
    gradiantClass: "gradient-blue",
  },
  {
    type: "MF",
    title: "MF",
    description: "Calculate the returns on your mutual fund investment",
    icon: ImgSip,
    gradiantClass: "gradient-green",
  },
  {
    type: "PPF",
    title: "PPF",
    description: "Calculate your returns on Public Provident Fund (PPF)",
    icon: ImgSip2,
    gradiantClass: "gradient-yellow",
  },

  {
    type: "EPF",
    title: "EPF",
    description: "Calculate returns for your Employee's Provident Fund (EPF)",
    icon: ImgSip2,
    gradiantClass: "gradient-blue",
  },

  {
    type: "FD",
    title: "FD",
    description: "Check returns on your fixed. deposits (FDs) without any hassle",
    icon: ImgSip2,
    gradiantClass: "gradient-green",
  },

  {
    type: "SSY",
    title: "SSY",
    description: "Calculate returns for Sukanya Smariddhi Yojana (SSY) as per your investment",
    icon: ImgSip2,
    gradiantClass: "gradient-red",
  },

  {
    type: "RD",
    title: "RD",
    description: "Check returns on your Recurring Deposit (RD) in just a few clicks",
    icon: ImgSip2,
    gradiantClass: "gradient-red",
  },

  {
    type: "HRA",
    title: "HRA",
    description: "Calculate your House Rent Allowance (HRA)",
    icon: ImgSip2,
    gradiantClass: "gradient-blue",
  },

  {
    type: "NPS",
    title: "NPS",
    description: "Calculate returns for your National Pension Scheme (NPS)",
    icon: ImgSip2,
    gradiantClass: "gradient-yellow",
  },

  {
    type: "Retirement",
    title: "Retirement",
    description: "Calculate how much you need for a relaxed retirement",
    icon: ImgSip2,
    gradiantClass: "gradient-green",
  },

  {
    type: "SimpleInterest",
    title: "Simple Interest",
    description: "Calculate simple interest on your loans and saving schemes investments",
    icon: ImgSip2,
    gradiantClass: "gradient-green",
  },

  {
    type: "EMI",
    title: "EMI",
    description: "Calculate EMI on your loans - home loan, car loan or personal loan",
    icon: ImgSip2,
    gradiantClass: "gradient-red",
  },

  {
    type: "CarLoanEMI",
    title: "Car Loan EMI",
    description: "Calculate your car loan EMI",
    icon: ImgSip2,
    gradiantClass: "gradient-yellow",
  },

  {
    type: "HomeLoanEMI",
    title: "Home Loan EMI",
    description: "Calculate your Home loan EMI",
    icon: ImgSip2,
    gradiantClass: "gradient-blue",
  },
  {
    type: "CompoundInterest",
    title: "Compound Interest",
    description: "Calculate Compound Interest with ease",
    icon: ImgSip2,
    gradiantClass: "gradient-red",
  },

  {
    type: "NCS",
    title: "NCS",
    description: "Calculate your returns under National Savings Certificate scheme",
    icon: ImgSip2,
    gradiantClass: "gradient-yellow",
  },

  {
    type: "StepUpSIP",
    title: "Step Up SIP",
    description: "Calculate SIP Returns with an Yearly Raise",
    icon: ImgSip2,
    gradiantClass: "gradient-blue",
  },
   
  {
    type: "APY",
    title: "APY",
    description: "Calculate your monthly investments under Atal Pension Yojana",
    icon: ImgSip2,
    gradiantClass: "gradient-yellow",
  },

  {
    type: "CAGR",
    title: "CAGR",
    description: "The simplest compound annual growth rate calculator",
    icon: ImgSip2,
    gradiantClass: "gradient-blue",
  },

  {
    type: "GST",
    title: "GST",
    description: "Calculate your payable GST amount with a few clicks",
    icon: ImgSip2,
    gradiantClass: "gradient-green",
  },

  {
    type: "Gratutity",
    title: "Gratutity",
    description: "Calculate how much gratuity you will get when you retire",
    icon: ImgSip2,
    gradiantClass: "gradient-red",
  },
  {
    type: "FlatvsReducingrate",
    title: "Flat vs Reducing rate",
    description: "Compare monthly EMI in Flat and Reducing balance interest rate schemes",
    icon: ImgSip2,
    gradiantClass: "gradient-red",
  },

  {
    type: "Brokerage",
    title: "Brokerage",
    description: "Calculate brokerage and other charges for your stock orders",
    icon: ImgSip2,
    gradiantClass: "gradient-yellow",
  },

  {
    type: "Margin",
    title: "Margin",
    description: "Calculate margin for delivery and intraday based on your order details",
    icon: ImgSip2,
    gradiantClass: "gradient-blue",
  },

  {
    type: "TDS",
    title: "TDS",
    description: "Calculate your TDS deductions",
    icon: ImgSip2,
    gradiantClass: "gradient-green",
  },

  {
    type: "Inflation",
    title: "Inflation",
    description: "Calculate inflation adjusted prices",
    icon: ImgSip2,
    gradiantClass: "gradient-yello",
  },

  {
    type: "SCSSCalculator",
    title: "SCSS Calculator",
    description: "Calculate senior citizens savings scheme returns",
    icon: ImgSip2,
    gradiantClass: "gradient-green",
  },

  {
    type: "Salary",
    title: "Salary",
    description: "Calculate your net take home salary",
    icon: ImgSip2,
    gradiantClass: "gradient-red",
  },

  {
    type: "PostOfficeMIS",
    title: "Post Office MIS",
    description: "Calculate post office monthly Income scheme returns",
    icon: ImgSip2,
    gradiantClass: "gradient-blue",
  },

  {
    type: "StockAverageCalculator",
    title: "Stock Average Calculator",
    description: "Calculate average price of your stock investments",
    icon: ImgSip2,
    gradiantClass: "gradient-red",
  },




];

const CalculatorPage = () => {
  return (
    <div className={styles.solutionSection}>
      <div className="container">
        <div className={`${styles.calculatorheading} text-center`}>
          <h1>Calculator</h1>
          <p className="text-center">
            Start planning your future today! Estimate your SIP returns with our{" "}
            <br /> easy-to-use calculator.
          </p>
        </div>
        <div className="row pt-5">
          {calculators.map((calc, index) => (
            <div key={index} className="col-12 col-sm-6 col-lg-3 p-3">
              <Link
                href={`/Pages/homepage/${calc.type}`}
                passHref
                className="text-decoration-none"
              >
                <div
                  className={`${styles.customSolutionCard} ${
                    styles[calc.gradiantClass]
                  } text-center p-4`}
                >
                  <p className={`${styles.cardPrefix} m-0`}> For</p>
                  <h6 className={styles.cardTitle}>{calc.title}</h6>
                  <p className={styles.cardDescription}>{calc.description}</p>

                  <div className={styles.cardIcon}>
                    <Image
                      src={calc.icon}
                      alt={`${calc.title} Icon`}
                      width={50}
                      height={50}
                    />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalculatorPage;
