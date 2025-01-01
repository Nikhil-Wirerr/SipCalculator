"use client";

import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import apyCalStyle from "@/styles/apycal.module.css";
import {
  Accordion,
  Card,
  Col,
  Form,
  Image,
  Row,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";

const ApyCal = () => {
  const [joiningAge, setJoiningAge] = useState(25);
  const [totalAmount, setTotalAmount] = useState(2000); // Desired monthly pension
  const [investmentDuration, setInvestmentDuration] = useState(35); // Default duration in years
  const [monthlyContribution, setMonthlyContribution] = useState(0); // Monthly contribution
  const [totalInvestment, setTotalInvestment] = useState(0); // Total amount calculated

  const handleWheel = (e) => e.target.blur();

  const availableAmounts = [1000, 2000, 3000, 4000, 5000];

  // Contribution table as per Atal Pension Yojana rules
  const contributionTable = {
    1000: { 18: 42, 25: 76, 30: 116, 40: 291 },
    2000: { 18: 84, 25: 151, 30: 231, 40: 582 },
    3000: { 18: 126, 25: 228, 30: 347, 40: 873 },
    4000: { 18: 168, 25: 302, 30: 462, 40: 1164 },
    5000: { 18: 210, 25: 376, 30: 577, 40: 1454 },
  };

  // Function to calculate monthly contribution
  const getMonthlyContribution = (age, desiredPension) => {
    const pensionData = contributionTable[desiredPension];
    if (!pensionData) return 0; // Return 0 if desired pension is invalid

    const ages = Object.keys(pensionData)
      .map(Number)
      .sort((a, b) => a - b);

    // Find the nearest lower and higher ages
    let lowerAge = ages[0];
    let higherAge = ages[ages.length - 1];

    for (let i = 0; i < ages.length; i++) {
      if (ages[i] <= age) lowerAge = ages[i];
      if (ages[i] >= age) {
        higherAge = ages[i];
        break;
      }
    }

    // If the age matches exactly
    if (lowerAge === higherAge) return pensionData[lowerAge];

    // Linear interpolation
    const lowerValue = pensionData[lowerAge];
    const higherValue = pensionData[higherAge];
    const interpolatedValue =
      lowerValue +
      ((age - lowerAge) / (higherAge - lowerAge)) * (higherValue - lowerValue);

    return Math.round(interpolatedValue); // Return rounded value
  };
  

  // Update investment duration, monthly contribution, and total investment whenever joiningAge or totalAmount changes
  useEffect(() => {
    const newInvestmentDuration = 60 - joiningAge; // Age 60 is the maximum joining age for APY
    setInvestmentDuration(
      newInvestmentDuration > 0 ? newInvestmentDuration : 0
    );

    const contribution = getMonthlyContribution(joiningAge, totalAmount);
    setMonthlyContribution(contribution);

    const total = contribution * 12 * newInvestmentDuration; // Total amount = monthly contribution * 12 * duration
    setTotalInvestment(total);
  }, [joiningAge, totalAmount]);

  return (
    <>
      <div className={apyCalStyle.apyBackground}>
        <div className={`${apyCalStyle.apypreHeading} container pt-5`}>
          <h1 className="text-left pt-3">APY Calculator</h1>
          <p className="pt-2 pb-4">
            The APY calculator helps estimate the potential growth of your
            Systematic Investment Plan (SIP) investment over your chosen time
            frame. APY is a convenient method to save for your long-term
            financial goals.
          </p>
        </div>
      </div>

      <div className="container">
        <Card className="px-3 py-3 mb-4 border-0 shadow">
          <Row>
            <Col className="mb-4">
              <Form>
                <Form.Group className="m-3 pt-4">
                  <div
                    className={`d-flex justify-content-between ${apyCalStyle.rangefield}`}
                  >
                    <Form.Label>Your Joining Age</Form.Label>
                    <div className={apyCalStyle.rangefield}>
                      <input
                        type="number"
                        value={joiningAge}
                        readOnly
                        className={`border-0 text-end ${apyCalStyle.custominput}`}
                      />
                      <span>Yrs</span>
                    </div>
                  </div>
                  <Form.Range
                    min={18}
                    max={40}
                    value={joiningAge}
                    onChange={(e) => setJoiningAge(Number(e.target.value))}
                  />
                </Form.Group>

                <Form.Group className="m-3 pt-4">
                  <div
                    className={`d-flex justify-content-between ${apyCalStyle.rangefield}`}
                  >
                    <Form.Label>Desired Monthly Pension</Form.Label>
                    <div>
                      <span className="me-2">₹</span>
                      <input
                        type="number"
                        value={totalAmount}
                        readOnly
                        className={`border-0 text-end ${apyCalStyle.custominput}`}
                        style={{ width: "70px", textAlign: "right" }}
                      />
                    </div>
                  </div>
                  <Form.Range
                    min={1000}
                    max={5000}
                    step={1000}
                    value={totalAmount}
                    onChange={(e) => setTotalAmount(Number(e.target.value))}
                  />
                </Form.Group>
              </Form>
            </Col>
          </Row>
          <div className={apyCalStyle.rangefield}>
            <div
              className={`d-flex justify-content-between px-3 ${apyCalStyle.rangefield}`}
            >
              <p>Monthly investment</p>
              <span>₹ {monthlyContribution}</span>
            </div>
            <div className="d-flex justify-content-between  px-3">
              <p>Investment duration</p>
              <span>{investmentDuration} years</span>
            </div>
            <div className="d-flex justify-content-between  px-3">
              <p>Total Amount</p>
              <span>₹ {totalInvestment}</span>
            </div>
          </div>
        </Card>
      </div>

      <div className={`${apyCalStyle.qaContent} container`}>
        <section>
          <div className={apyCalStyle.subHeading}>
            <h1 className="text-center">
              {" "}
              Atal Pension Yojana Calculator - APY Calculator
            </h1>
          </div>
          <Row>
            <Col xs={12} md={4} lg={3}>
              <div className={apyCalStyle.sidebar}>
                <ul className="list-unstyled">
                  <li className={apyCalStyle.sidebarItem}>
                    What is a SIP Calculator?
                  </li>
                  <li className={apyCalStyle.sidebarItem}>
                    How can a SIP Calculator Help You?
                  </li>
                  <li className={apyCalStyle.sidebarItem}>
                    Advantages of SIP Calculator
                  </li>
                  <li className={apyCalStyle.sidebarItem}>
                    How to use ET Money's SIP Calculator?
                  </li>
                  <li className={apyCalStyle.sidebarItem}>
                    Related Mutual Fund SIP Calculators ?
                  </li>
                  <li className={apyCalStyle.sidebarItem}>
                    Advantages of SIP Calculator
                  </li>
                  <li className={apyCalStyle.sidebarItem}>
                    Related Mutual Fund SIP Calculators ?
                  </li>
                </ul>
              </div>
            </Col>

            <Col xs={12} md={8} lg={9} className={apyCalStyle.qandA}>
              <div className={apyCalStyle.quesAnsSection}>
                <h3>What is a SIP Calculator?</h3>
                <p>
                  A SIP (Systematic Investment Plan) Calculator is an online or
                  software tool used to calculate the potential returns from
                  investing in mutual funds through SIP. It helps investors
                  estimate how much their regular monthly investments can grow
                  over time, considering factors like the investment amount,
                  duration, and expected rate of return.
                </p>
              </div>
              <div className={apyCalStyle.quesAnsSection}>
                <h3>How can a SIP Calculator Help You?</h3>
                <p>
                  The Systematic investment Plan calculator essentially gives
                  investors a bifurcation of the future value of the SIP
                  investment with two figures: the estimated return they can
                  expect to make on the investment and the principal. Therefore,
                  you can use the SiP return calculator to get an overview of
                  how your investment will grow over a certain holding period,
                  assuming a certain rate of return and SIP contribution. You
                  can also factor in the effect of inflation when using the SIP
                  calculator online, though not explicitly, You could do this by
                  manually figuring out the nominal rate of return you'd expect
                  to earn from your investment, based on your target real rate
                  of return and the prevalling rate of Inflation. Then, you just
                  need to use the manually computed rate as your rate of return
                  and enter it into the calculator to start investing in mutual
                  funds.. Let us look at some examples to figure out how this
                  calculator can help you.
                </p>
              </div>
              <div className={apyCalStyle.quesAnsSection}>
                <h3>Advantages of SIP Calculator</h3>
                <p>
                  Investments made into market-linked instruments such as Mutual
                  Funds do not provide guaranteed returns. So investors might
                  find it difficult to figure out how much their money will grow
                  in the future or how much they need to invest to reach
                  financial goals.
                  <br />
                  The ET Money SIP Investment Calculator helps overcome these
                  problems and provides the following key advantages to
                  investors:
                  <br />
                  Instantly Calculate Investment Future Value: ET Money SIP
                  Calculator delivers immediate and precise results, sparing you
                  from number-crunching.
                  <br />
                  User-Friendly SIP Calculator: Easily estimate your investment
                  needs with our user-friendly SIP Calculator, suitable for
                  anyone, and it's completely free and unlimited. Empower
                  Informed Investment Choices: Plan your investments effectively
                  with the SIP Calculator, ensuring you meet your financial
                  goals effortlessly. Discover Top Investment Opportunities:
                  Unlike others, our calculator not only predicts future values
                  and investments but also recommends funds to align with your
                  goals. Inflation-Adjusted Results at Your Fingertips: Combat
                  rising costs by effortlessly obtaining inflation-adjusted
                  investment results with a simple button click, a feature
                  lacking in most SIP calculators
                </p>
              </div>
              <div className={apyCalStyle.quesAnsSection}>
                <h3>How to use ET Money's SIP Calculator?</h3>
                <p>
                  If you know how much you want to invest in Mutual Funds every
                  month, you can use the ET Money SIP Calculator to estimate the
                  potential future value of your investments.
                  <br />
                  To use this functionality, you need to provide 3 key inputs:
                  <br />
                  Option 1. If You Know Your Investment Amount If you know how
                  much you want to invest in Mutual Funds every month, you can
                  use the ET Money SIP Calculator to estimate the potential
                  future value of your investments. To use this functionality,
                  you need to enter the following inputs: Investment Amount -
                  This is the SIP amount you plan to invest at regular intervals
                  on specific SIP date. Investment Duration - This is the period
                  in years for which you plan to continue your SIP. After
                  entering the above details in the Mutual Fund SIP calculator,
                  just click on calculate to view the future value of your
                  investments along with a short list of Mutual Funds that might
                  be suitable to help you achieve your investment goal.
                  <br /> Option 2. If You Know Your Investment Goal Amount If
                  you are planning to invest in order to achieve a specific goal
                  such as buying a new car or arranging for the downpayment of a
                  new house, you would already know how much money you will
                  need. In this case, you can use the sip amount calculator to
                  figure out the SIP you need to reach your investment goal. To
                  use this feature of the monthly SIP calculator, you need to
                  provide the following inputs:
                  <br />
                  Savings Goal - This is the amount that you have to save to
                  reach your investment goal. Time Period - This is the time
                  period in years within which you plan to reach the investment
                  goal. Once you have entered the above details, the SIP
                  calculator will provide the SIP amount you need to reach your
                  investment goal within the specified investment tenure.
                </p>
              </div>
              <div className={apyCalStyle.quesAnsSection}>
                <h3>Related Mutual Fund SIP Calculators ?</h3>
                <p>
                  The Systematic investment Plan calculator essentially gives
                  investors a bifurcation of the future value of the SIP
                  investment with two figures: the estimated return they can
                  expect to make on the investment and the principal. Therefore,
                  you can use the SiP return calculator to get an overview of
                  how your investment will grow over a certain holding period,
                  assuming a certain rate of return and SIP contribution. You
                  can also factor in the effect of inflation when using the SIP
                  calculator online, though not explicitly, You could do this by
                  manually figuring out the nominal rate of return you'd expect
                  to earn from your investment, based on your target real rate
                  of return and the prevalling rate of Inflation. Then, you just
                  need to use the manually computed rate as your rate of return
                  and enter it into the calculator to start investing in mutual
                  funds.. Let us look at some examples to figure out how this
                  calculator can help you.
                </p>
              </div>
            </Col>
          </Row>
        </section>
        <section className="pb-5 mt-5">
          <div className={`${apyCalStyle.preHeading} py-5`}>
            <h1 className="text-align-left pt-5">
              FAQs (Frequently Asked Questions)
            </h1>
          </div>
          <div>
            <Accordion defaultActiveKey={["1"]} alwaysOpen>
              <Accordion.Item eventKey="0">
                <Accordion.Header className={apyCalStyle.accordionHeader}>
                  How can a SIP Calculator Help You?
                </Accordion.Header>
                <Accordion.Body className={apyCalStyle.accordionbody}>
                  There is no maximum tenure of a SIP. You can invest as long as
                  you can. The minimum tenure you can go for is 3 years.
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1">
                <Accordion.Header className={apyCalStyle.accordionHeader}>
                  Can I modify my SIP amount?
                </Accordion.Header>
                <Accordion.Body className={apyCalStyle.accordionbody}>
                  There is no maximum tenure of a SIP. You can invest as long as
                  you can. The minimum tenure you can go for is 3 years.
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="2">
                <Accordion.Header className={apyCalStyle.accordionHeader}>
                  Can I modify my SIP amount?
                </Accordion.Header>
                <Accordion.Body className={apyCalStyle.accordionbody}>
                  There is no maximum tenure of a SIP. You can invest as long as
                  you can. The minimum tenure you can go for is 3 years.
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="3">
                <Accordion.Header className={apyCalStyle.accordionHeader}>
                  Can I modify my SIP amount?
                </Accordion.Header>
                <Accordion.Body className={apyCalStyle.accordionbody}>
                  There is no maximum tenure of a SIP. You can invest as long as
                  you can. The minimum tenure you can go for is 3 years.
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="4">
                <Accordion.Header className={apyCalStyle.accordionHeader}>
                  Can I modify my SIP amount?
                </Accordion.Header>
                <Accordion.Body className={apyCalStyle.accordionbody}>
                  There is no maximum tenure of a SIP. You can invest as long as
                  you can. The minimum tenure you can go for is 3 years.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </section>
      </div>
    </>
  );
};

export default ApyCal;




      {/* <Form>
                <Form.Group className="m-3 pt-4">
                  <div
                    className={`d-flex justify-content-between ${apyCalStyle.rangefield}`}
                  >
                    <Form.Label>Your joining age</Form.Label>
                    <div className={apyCalStyle.rangefield}>
                      <input
                        type="number"
                        value={joiningAge}
                        onChange={(e) => setJoiningAge(Number(e.target.value))}
                        className={`border-0 text-end ${apyCalStyle.custominput}`}
                        onWheel={handleWheel}
                        min={1}
                        max={60}
                        disabled // Disable manual entry for age
                      />
                      <span>Yrs</span>
                    </div>
                  </div>
                  <Form.Range
                    min={1}
                    max={60}
                    value={joiningAge}
                    onChange={(e) => setJoiningAge(Number(e.target.value))}
                  />
                </Form.Group>

                <Form.Group className="m-3 pt-4">
                  <div
                    className={`d-flex justify-content-between ${apyCalStyle.rangefield}`}
                  >
                    <Form.Label>Desired Monthly Amount</Form.Label>
                    <div>
                      <span className="me-2">₹</span>
                      <input
                        type="number"
                        value={totalAmount}
                        // onChange={(e) => setTotalAmount(Number(e.target.value))}

                        onChange={(e) => {
                          // Ensure that the value is one of the available amounts
                          const amount = Number(e.target.value);
                          if (availableAmounts.includes(amount)) {
                            setTotalAmount(amount);
                          }
                        }}

                        className={`border-0 text-end ${apyCalStyle.custominput}`}
                        onWheel={handleWheel}
                        min={1000}
                        max={5000}
                        
                        style={{ width: "70px", textAlign: "right" }}
                        disabled // Disable manual entry for age

                      />
                    </div>
                  </div>
                  <Form.Range
                    min={1000}
                    max={5000}
                    value={totalAmount}
                    step={1000} 
                    // onChange={(e) => setTotalAmount(Number(e.target.value))}
                    onChange={(e) => {
                      const amount = Number(e.target.value);
                      if (availableAmounts.includes(amount)) {
                        setTotalAmount(amount);
                      }
                    }}
                  />
                </Form.Group>
              </Form> */}


              
// const contributionTable = {
//   1000: { 18: 42, 30: 74, 40: 145 },
//   2000: { 18: 84, 30: 145, 40: 289 },
//   3000: { 18: 126, 30: 217, 40: 434 },
//   4000: { 18: 168, 30: 290, 40: 577 },
//   5000: { 18: 210, 30: 362, 40: 722 },
// };

// const interpolate = (age, table) => {
//   const ages = Object.keys(table).map(Number).sort((a, b) => a - b);

//   if (age <= ages[0]) return table[ages[0]]; // Below minimum age, use minimum
//   if (age >= ages[ages.length - 1]) return table[ages[ages.length - 1]]; // Above maximum age, use maximum

//   for (let i = 0; i < ages.length - 1; i++) {
//     const age1 = ages[i];
//     const age2 = ages[i + 1];

//     if (age >= age1 && age <= age2) {
//       // Linear interpolation
//       const value1 = table[age1];
//       const value2 = table[age2];
//       return value1 + ((value2 - value1) * (age - age1)) / (age2 - age1);
//     }
//   }
//   return 0; // Fallback, though this shouldn't be reached
// };

// const calculateAPY = () => {
//   const durationYears = Math.max(60 - joiningAge, 0);

//   const monthly = interpolate(joiningAge, contributionTable[desiredPension]) || 0;
//   const total = monthly * 12 * durationYears;

//   setMonthlyInvestment(monthly.toFixed(2)); // Format to 2 decimal places if needed
//   setInvestmentDuration(durationYears);
//   setTotalAmount(total.toFixed(2)); // Format to 2 decimal places if needed
// };

// useEffect(() => {
//   calculateAPY();
// }, [joiningAge, desiredPension]);
