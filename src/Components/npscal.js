"use client";

import React, { useMemo, useState } from "react";
import NpsStyle from "@/styles/nps.module.css";
import { Accordion, Card, Col, Form, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const NpsCal = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [age, setAge] = useState(25);
  const [expectedReturnRate, setExpectedReturnRate] = useState(9);

//   const handleWheel = (e) => e.target.blur();

//   // Derived Values
//   const retirementAge = 60;
//   const tenure = retirementAge - age;
//   const monthlyReturnRate = expectedReturnRate / 100 / 12;


//   // Calculations
//   const totalInvestment = monthlyInvestment * 12 * tenure;

//   const maturityAmount =
//     monthlyInvestment *
//     ((Math.pow(1 + monthlyReturnRate, tenure * 12) - 1) / monthlyReturnRate) *
//     (1 + monthlyReturnRate);

//   const interestEarned = maturityAmount - totalInvestment;

//   console.log("interst earned:", interestEarned);

 // Helper function to round to 2 decimal places
 const roundToTwo = (num) => Math.round(num * 100) / 100;

 // Derived Values using useMemo for optimization
 const retirementAge = 60;
 const tenure = useMemo(() => retirementAge - age, [age]);
 const monthlyReturnRate = useMemo(() => expectedReturnRate / 100 / 12, [expectedReturnRate]);

 // Calculations with rounding applied
 const totalInvestment = useMemo(() => roundToTwo(monthlyInvestment * 12 * tenure), [monthlyInvestment, tenure]);
 
 const maturityAmount = useMemo(() => {
   if (monthlyReturnRate === 0) {
     return totalInvestment; // If return rate is 0, maturity will be equal to total investment
   }
   return roundToTwo(
     monthlyInvestment *
     ((Math.pow(1 + monthlyReturnRate, tenure * 12) - 1) / monthlyReturnRate) *
     (1 + monthlyReturnRate)
   );
 }, [monthlyInvestment, monthlyReturnRate, tenure, totalInvestment]);

 const interestEarned = useMemo(() => roundToTwo(maturityAmount - totalInvestment), [maturityAmount, totalInvestment]);

//  const handleWheel = (e) => e.preventDefault();
 const handleWheel = (e) => e.target.blur();


  // Input validation function
  const validateInput = (value, min, max) => {
    if (isNaN(value) || value < min || value > max) {
      return false;  // Invalid value
    }
    return true;  // Valid value
  }

  // Handle input change with validation
  const handleMonthlyInvestmentChange = (e) => {
    const value = Number(e.target.value);
    if (validateInput(value, 500, 150000)) {
      setMonthlyInvestment(value);
    }
  };

  const handleAgeChange = (e) => {
    const value = Number(e.target.value);
    if (validateInput(value, 18, 59)) {
      setAge(value);
    }
  };

  const handleReturnRateChange = (e) => {
    const value = Number(e.target.value);
    if (validateInput(value, 1, 50)) {
      setExpectedReturnRate(value);
    }
  };

  return (
    <>
      <div className={NpsStyle.swpBackground}>
        <div>
          <div className={`${NpsStyle.swppreHeading} container pt-5`}>
            <h1 className="text-left pt-3">NPS Calculator</h1>
            <p className="pt-2 pb-4">
              The National Pension System or NPS is a measure to introduce a
              degree of financial stability for Indian citizens after they have
              retired. It was previously known as the National Pension Scheme.
              Anyone over the age of 60 is eligible to use the amount gathered
              in the pension corpus. You will need an NPS calculator to
              determine how much the total accumulation amounts to.
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
                      className={`d-flex justify-content-between ${NpsStyle.rangefield}`}
                    >
                      {" "}
                      <Form.Label>Investment Per Month</Form.Label>
                      <div className={NpsStyle.rangefield}>
                        <span className="texr-end">₹</span>
                        <input
                          type="number"
                          className={`border-0 text-end ${NpsStyle.custominput}`}
                          onWheel={handleWheel}
                          min={500}
                          max={150000}
                          value={monthlyInvestment}
                        //   onChange={(e) =>
                        //     setMonthlyInvestment(Number(e.target.value))
                        //   }
                        onChange={handleMonthlyInvestmentChange}
                        />
                      </div>
                    </div>

                    <Form.Range
                      min={500}
                      max={150000}
                      value={monthlyInvestment}
                      onChange={(e) =>
                        setMonthlyInvestment(Number(e.target.value))
                      }
                    />
                  </Form.Group>

                  <Form.Group className="m-3 pt-4">
                    <div
                      className={`d-flex justify-content-between ${NpsStyle.rangefield}`}
                    >
                      <Form.Label>Your Age</Form.Label>
                      <div>
                        <input
                          type="number"
                          className={`border-0 text-end ${NpsStyle.custominput}`}
                          onWheel={handleWheel}
                          min={18}
                          max={59}
                          value={age}
                          onChange={(e) => setAge(Number(e.target.value))}
                        />
                        <span>Yr</span>
                      </div>
                    </div>
                    <Form.Range
                      min={18}
                      max={59}
                      value={age}
                      onChange={(e) => setAge(Number(e.target.value))}
                    />
                  </Form.Group>

                  <Form.Group className="m-3 pt-4">
                    <div
                      className={`d-flex justify-content-between ${NpsStyle.rangefield}`}
                    >
                      <Form.Label>Expected Return Rate (p.a)</Form.Label>
                      <div>
                        <input
                          type="number"
                          className={`border-0 text-end ${NpsStyle.custominput}`}
                          onWheel={handleWheel}
                          min={1}
                          max={50}
                          value={expectedReturnRate}
                          onChange={(e) =>
                            setExpectedReturnRate(Number(e.target.value))
                          }
                        />
                        <span>%</span>
                      </div>
                    </div>
                    <Form.Range
                      min={1}
                      max={50}
                      step={0.1}
                      value={expectedReturnRate}
                      onChange={(e) =>
                        setExpectedReturnRate(Number(e.target.value))
                      }
                    />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
            <div className={NpsStyle.rangefield}>
              <div
                className={`d-flex justify-content-between px-3 ${NpsStyle.rangefield}`}
              >
                <p>Total investment</p>
                {/* <span>₹ 15,000 </span> */}
                <span>₹ {totalInvestment.toLocaleString()}</span>
              </div>
              <div className="d-flex justify-content-between  px-3">
                <p>Interest Earned</p>
                {/* <span>₹ 3,90,230</span> */}
                <span>₹ {interestEarned.toLocaleString()}</span>
              </div>
              <div className="d-flex justify-content-between  px-3">
                <p>Final Maturity amount</p>
                {/* <span>₹ 10,10,43,700</span> */}
                <span>₹ {(maturityAmount).toLocaleString()}</span>
              </div>
              <div className="d-flex justify-content-between  px-3">
                <p>Min Annuity Investment</p>
                {/* <span>₹ 8,43,700</span> */}
                <span>₹ {(maturityAmount * 0.4).toLocaleString()}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className={`${NpsStyle.qaContent} container`}>
        <section>
          <div className={NpsStyle.subHeading}>
            <h1 className="text-center">
              {" "}
              National Pension Scheme Calculator{" "}
            </h1>
          </div>
          <Row>
            <Col xs={12} md={4} lg={3}>
              <div className={NpsStyle.sidebar}>
                <ul className="list-unstyled">
                  <li className={NpsStyle.sidebarItem}>
                    What is a SWP Calculator?
                  </li>
                  <li className={NpsStyle.sidebarItem}>
                    How can a SWP Calculator Help You?
                  </li>
                  <li className={NpsStyle.sidebarItem}>
                    Advantages of SWP Calculator
                  </li>
                  <li className={NpsStyle.sidebarItem}>
                    How to use ET Money's SWP Calculator?
                  </li>
                  <li className={NpsStyle.sidebarItem}>
                    Related Mutual Fund SWP Calculators ?
                  </li>
                  <li className={NpsStyle.sidebarItem}>
                    Advantages of SWP Calculator
                  </li>
                  <li className={NpsStyle.sidebarItem}>
                    Related Mutual Fund SWP Calculators ?
                  </li>
                </ul>
              </div>
            </Col>

            <Col xs={12} md={8} lg={9} className={NpsStyle.qandA}>
              <div className={NpsStyle.quesAnsSection}>
                <h3>What is a SWP Calculator?</h3>
                <p>
                  A SWP (Systematic Withdrawal Plan) Calculator is an online or
                  software tool used to calculate the potential returns from
                  investing in mutual funds through SIP. It helps investors
                  estimate how much their regular monthly investments can grow
                  over time, considering factors like the investment amount,
                  duration, and expected rate of return.
                </p>
              </div>
              <div className={NpsStyle.quesAnsSection}>
                <h3>How can a SWP Calculator Help You?</h3>
                <p>
                  The Systematic Withdrawal Plan Plan calculator essentially
                  gives investors a bifurcation of the future value of the SIP
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
              <div className={NpsStyle.quesAnsSection}>
                <h3>Advantages of SWP Calculator</h3>
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
              <div className={NpsStyle.quesAnsSection}>
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
              <div className={NpsStyle.quesAnsSection}>
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
          <div className={`${NpsStyle.preHeading} py-5`}>
            <h1 className="text-align-left pt-5">
              FAQs (Frequently Asked Questions)
            </h1>
          </div>
          <div>
            <Accordion defaultActiveKey={["1"]} alwaysOpen>
              <Accordion.Item eventKey="0">
                <Accordion.Header className={NpsStyle.accordionHeader}>
                  How can a SIP Calculator Help You?
                </Accordion.Header>
                <Accordion.Body className={NpsStyle.accordionbody}>
                  There is no maximum tenure of a SIP. You can invest as long as
                  you can. The minimum tenure you can go for is 3 years.
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1">
                <Accordion.Header className={NpsStyle.accordionHeader}>
                  Can I modify my SIP amount?
                </Accordion.Header>
                <Accordion.Body className={NpsStyle.accordionbody}>
                  There is no maximum tenure of a SIP. You can invest as long as
                  you can. The minimum tenure you can go for is 3 years.
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="2">
                <Accordion.Header className={NpsStyle.accordionHeader}>
                  Can I modify my SIP amount?
                </Accordion.Header>
                <Accordion.Body className={NpsStyle.accordionbody}>
                  There is no maximum tenure of a SIP. You can invest as long as
                  you can. The minimum tenure you can go for is 3 years.
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="3">
                <Accordion.Header className={NpsStyle.accordionHeader}>
                  Can I modify my SIP amount?
                </Accordion.Header>
                <Accordion.Body className={NpsStyle.accordionbody}>
                  There is no maximum tenure of a SIP. You can invest as long as
                  you can. The minimum tenure you can go for is 3 years.
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="4">
                <Accordion.Header className={NpsStyle.accordionHeader}>
                  Can I modify my SIP amount?
                </Accordion.Header>
                <Accordion.Body className={NpsStyle.accordionbody}>
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

export default NpsCal;

// <Form.Group className="m-3 pt-4">
// <div
//   className={`d-flex justify-content-between ${NpsStyle.rangefield}`}
// >
//   <Form.Label>Withdrawal Per Month</Form.Label>
//   <div className={NpsStyle.rangefield}>
//     <span className="texr-end">₹</span>
//     <input
//       type="number"
//       className={`border-0 text-end ${NpsStyle.custominput}`}
//       onWheel={handleWheel}
//       min={500}
//       max={1000000}
//     />
//   </div>
// </div>
// <Form.Range min={500} max={1000000} />
// </Form.Group>
