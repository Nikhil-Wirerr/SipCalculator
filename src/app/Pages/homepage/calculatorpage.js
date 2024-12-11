
// src/app/Pages/homepage/CalculatorPage.js

import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import Link from "next/link"; 
// import ImgSip from "../../assets/sip-1.svg";
// import ImgSip2 from "../../assets/sip-2.svg";
// import ImgSip3 from "../../assets/sip-3.svg";
import styles from "../../styles/homepage.module.css";
import "../../globals.css";
// import calculators from "@/app/Components/calculatorsDataJson";
import calculators from "@/Data/calculatorsData";


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
