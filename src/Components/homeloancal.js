"use client";

import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Col,
  Container,
  Row,
  ToggleButton,
  ToggleButtonGroup,
  Card,
  Form,
  Button,
  InputGroup,
  
} from "react-bootstrap";
import LumpCalImg from "../app/assets/lumpsumcal.svg";
import InvestImg from "../app/assets/invest-circle.svg";
import Image from "next/image";
import Accordion from "react-bootstrap/Accordion";
import homeloanStyle from "@/styles/homeloancal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { PieChart, Pie, Legend, Cell,Tooltip, ResponsiveContainer } from "recharts";

const HomeloanCal = () => {
  const [investmentType, setInvestmentType] = useState("Lumpsum");
  const [amount, setAmount] = useState(5000);
  const [durationYear, setDurationYear] = useState(15);
  const [expectedReturn, setExpectedReturn] = useState("8%");
  const [showAccordion, setShowaccordion] = useState(true);
  const [emiData, setEmiData] = useState([]);

  const handleInvestmentTypeChange = (value) => {
    setInvestmentType(value);
  };

  const handleExpectedReturnChange = (e) => {
    let value = e.target.value.replace("%", "");
    value = Math.min(Math.max(Number(value), 8), 30);
    setExpectedReturn(`${value}%`);
  };

  const handleWheel = (e) => e.target.blur();

  const calculateTotalValue = (amount, years, rate) => {
    console.log(
      `Calculating Total Value: Amount=${amount}, Years=${years}, Rate=${rate}`
    );

    const annualRate = rate / 100;
    return Math.round(amount * Math.pow(1 + annualRate, years));
  };

  const calculateEstReturn = (totalvalue, amount) => totalvalue - amount;

  const calculateEMI = (principal, annualRate, years) => {
    const monthlyRate = annualRate / 12 / 100;
    const months = years * 12;
    return (
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1)
    );
  };

  const generateEMIData = (loanAmount, annualRate, loanTenur) => {
    const monthlyRate = annualRate / 12 / 100;
    const totalMonths = loanTenur * 12;
    const emi = calculateEMI(loanAmount, annualRate, loanTenur);

    let balance = loanAmount;
    const emiData = [];

    for (let month = 1; month <= totalMonths; month++) {
      const interest = balance * monthlyRate;
      const principal = emi - interest;
      balance -= principal;

      emiData.push({
        month,
        principal: Math.max(principal, 0),
        interest: Math.max(interest, 0),
        totalPayment: emi,
        balance: Math.max(balance, 0),
      });

      if (balance <= 0) break;
    }

    return emiData;
  };

  useEffect(() => {
    const annualRate = parseFloat(expectedReturn.replace("%", "")) || 0;
    const data = generateEMIData(amount, annualRate, durationYear);
    setEmiData(data);
  }, [amount, durationYear, expectedReturn]);

  const getYearlyEMIData = (emiData) => {
    const yearlyData = {};
    emiData.forEach((item) => {
      const year = Math.floor((item.month - 1) / 12) + 1;
      if (!yearlyData[year]) yearlyData[year] = [];
      yearlyData[year].push(item);
    });
    return yearlyData;
  };

  const colorStyles = {
    investedAmount: "#93C9FC",
    estReturns: "#D3EAFE",
  };

  const data02 = [
    {
      name: "Invested AMount",
      value: parseFloat(amount) || 0,
      color: colorStyles.investedAmount,
    },
    {
      name: "Est. Returns",
      value:
        calculateEstReturn(
          calculateTotalValue(
            parseFloat(amount) || 0,
            durationYear,
            parseFloat(expectedReturn) || 0
          ),
          parseFloat(amount) || 0
        ) || 0,
      color: colorStyles.estReturns,
    },
  ];

  return (
    <>
      <div className={` ${homeloanStyle.lumpsumContainer}`}>
        <div className={`container py-5  ${homeloanStyle.homeloanbgcontainer}`}>
          <div className={homeloanStyle.preHeading}>
            <h1 className="text-align-left pt-3">Home Loan EMI Calculator</h1>
            <p className="pt-2 pb-4">
              {" "}
              The primary responsibility of a potential borrower is to have an
              exact estimate of the EMI amount they are liable to pay. One can
              take advantage of a home loan EMI calculator to arrive at the
              precise number.
            </p>
          </div>

          <div>
            <Card className="p-lg-5 p-md-4  border-0 shadow">
              <Row>
                <div className="pt-4 pt-md-0">
                  <ToggleButtonGroup
                    type="radio"
                    name="investmentType"
                    value={investmentType}
                    onChange={handleInvestmentTypeChange}
                    className={homeloanStyle.togglbgrp}
                  >
                    <ToggleButton
                      id="sip-toggle"
                      value="SIP"
                      variant="outline-primary"
                      active={investmentType === "SIP"}
                    >
                      Monthly SIP
                    </ToggleButton>
                    <ToggleButton
                      id="lumpsum-toggle"
                      value="Lumpsum"
                      variant="outline-primary"
                      active={investmentType === "Lumpsum"}
                    >
                      Lumpsum
                    </ToggleButton>
                  </ToggleButtonGroup>
                </div>

                <Col xs={12} md={12} lg={6} className="mb-4">
                  <div className={homeloanStyle.lumpsumCard}>
                    <div className="mt-5">
                      <div className="calc-img d-flex mb-4">
                        <Image src={LumpCalImg} alt="cal-img" />
                        <div className={homeloanStyle.returnEstimation}>
                          <h6 className="ps-2 mb-1">Return Estimator</h6>
                          <p className="ps-2">
                            Estimation is based on the past performance
                          </p>
                        </div>
                      </div>
                    </div>

                    <Form>
                      <div className={`${homeloanStyle.customformgroup} `}>
                        <div className={homeloanStyle.custominputwrapper}>
                          <label className={homeloanStyle.customlabel}>
                            Enter Amount
                          </label>
                          <input
                            type="number"
                            value={amount}
                            className={homeloanStyle.custominput}
                            placeholder="₹ 5,000"
                            onWheel={handleWheel}
                            onChange={(e) => setAmount(Number(e.target.value))}
                          />
                        </div>
                      </div>

                      <Form.Group className="pt-5">
                        <div
                          className={`d-flex justify-content-between ${homeloanStyle.rangefield}`}
                        >
                          <Form.Label>Select Duration</Form.Label>
                          <div className={homeloanStyle.rangecustominput}>
                            <input
                              type="number"
                              value={durationYear}
                              onChange={(e) =>
                                setDurationYear(Number(e.target.value))
                              }
                              className="border-0 w-100"
                              onWheel={handleWheel}
                            />
                            <span>Yrs</span>
                          </div>
                        </div>

                        {/* <Form.Range min={1} max={40} defaultValue={10} /> */}
                        <Form.Range
                          min={1}
                          max={100}
                          value={durationYear}
                          onChange={(e) =>
                            setDurationYear(Number(e.target.value))
                          }
                        />
                        <div
                          className={`d-flex justify-content-between ${homeloanStyle.belowrangefield}`}
                        >
                          <span>1 Yr</span>
                          <span>100 Yr</span>
                        </div>
                      </Form.Group>

                      <Form.Group className="pt-5">
                        <div
                          className={`d-flex justify-content-between ${homeloanStyle.rangefield}`}
                        >
                          <Form.Label>Expected Rate of Interest</Form.Label>
                          <div className={homeloanStyle.rangecustominput}>
                            <input
                              type="text"
                              value={expectedReturn}
                              onChange={handleExpectedReturnChange}
                              className="border-0 w-100"
                              onWheel={(e) => e.target.blur()}
                            />
                          </div>
                          {/* <span> 12%</span> */}
                        </div>
                        {/* <Form.Range min={1} max={40} defaultValue={10} /> */}
                        <Form.Range
                          min={0}
                          max={100}
                          // defaultValue={10}
                          value={parseInt(expectedReturn)}
                          onChange={(e) =>
                            setExpectedReturn(`${e.target.value}%`)
                          }
                        />
                        <div
                          className={`d-flex justify-content-between ${homeloanStyle.belowrangefield}`}
                        >
                          <span>0%</span>
                          <span>100 %</span>
                        </div>
                      </Form.Group>
                    </Form>
                  </div>
                </Col>

                <Col
                  xs={12}
                  md={12}
                  lg={6}
                  className={`d-flex align-items-center`}
                >
                  <div className={homeloanStyle.lumpsumCard}>
                    <div className={`d-flex  flex-column ${homeloanStyle.verticalLine} `}>
                      <div className={`${homeloanStyle.totalInvest} ps-5 mt-2`}>
                        <p>The total amount will be</p>
                        <h2>
                          ₹{" "}
                          {calculateTotalValue(
                            parseFloat(amount) || 0,
                            durationYear,
                            parseFloat(expectedReturn) || 0
                          ).toLocaleString()}
                        </h2>
                      </div>
                      <div className={` d-lg-flex d-md-flex pt-4 ${homeloanStyle.pie_chart_d_block} `}>
                        <div className="d-flex flex-column">
                          {/* <Image src={InvestImg} alt="investImg" /> */}

                          <div className={homeloanStyle.piechart_div}>
                            <ResponsiveContainer>
                              <PieChart>
                                <Pie
                                  dataKey="value"
                                  data={data02}
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={40}
                                  outerRadius={80}
                                  className={homeloanStyle.chart_no_outline}
                                >
                                  {data02.map((entry, index) => (
                                    <Cell
                                      key={`cell-${index}`}
                                      fill={entry.color}
                                    />
                                  ))}
                                </Pie>
                              <Tooltip />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>

                          <div
                            className={`${homeloanStyle.Investbtn} text-center`}
                          >
                            <button className="mt-4" type="button">
                              Invest Now
                            </button>
                          </div>
                        </div>

                        <div className="ps-lg-5 ps-sm-0 mt-3">
                          <div
                            className={`ps-2 pb-2 ${homeloanStyle.investedAmount}`}
                          >
                            <p>Monthly EMI</p>
                            {/* <h6>₹ 19,566</h6> */}
                            <h6>
                              ₹{" "}
                              {amount > 0 && durationYear > 0
                                ? calculateEMI(
                                    amount,
                                    parseFloat(expectedReturn),
                                    durationYear
                                  ).toLocaleString(undefined, {
                                    maximumFractionDigits: 2,
                                  })
                                : "0"}
                            </h6>
                          </div>
                          <div
                            className={`ps-2 ${homeloanStyle.investedAmount}`}
                            style={{
                              borderLeft: `6px solid ${colorStyles.investedAmount}`,
                            }}
                          >
                            <p>Invested Amount</p>
                            <h6>₹ {parseFloat(amount).toLocaleString()}</h6>
                          </div>

                          <div
                            className={`ps-2 ${homeloanStyle.investedAmount}`}
                            style={{
                              borderLeft: `6px solid ${colorStyles.estReturns}`,
                            }}
                          >
                            <p>Est. Returns</p>
                            <h6>
                              ₹{" "}
                              {calculateEstReturn(
                                calculateTotalValue(
                                  parseFloat(amount) || 0,
                                  durationYear,
                                  parseFloat(expectedReturn) || 0
                                ),
                                parseFloat(amount) || 0
                              ).toLocaleString()}
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>

                <div className="text-center my-3">
                  <button
                    className="btn btn-primary"
                    onClick={() => setShowaccordion(!showAccordion)}
                  >
                    {showAccordion
                      ? "Amortization Details(Yearly/Monthly)"
                      : "Amortization Details(Yearly/Monthly)"}
                    {/* <FontAwesomeIcon icon=" fa-angle-down"  /> */}
                  </button>
                </div>

                {showAccordion && (
                  <Accordion
                    defaultActiveKey="0"
                    className={homeloanStyle.accordionMain}
                  >
                    {Object.entries(getYearlyEMIData(emiData)).map(
                      ([year, months], index) => (
                        <Accordion.Item eventKey={index.toString()} key={index}>
                          <Accordion.Header>
                            {2024 + parseInt(year) - 1}
                          </Accordion.Header>
                          <Accordion.Body className={homeloanStyle.accordion_bdy} >
                            <div style={{overflowX:"auto", maxWidth:"100%"}}>
                            <table
                              className={`table table-striped ${homeloanStyle.customTable}`}
                            >
                              <thead>
                                <tr>
                                  <th>Month</th>
                                  <th>Principal Paid</th>
                                  <th>Interest Charged</th>
                                  <th>Total Payment</th>
                                  <th>Remaining Balance</th>
                                </tr>
                              </thead>
                              <tbody>
                                {months.map((data, monthIndex) => (
                                  <tr key={monthIndex}>
                                    <td>
                                      {
                                        [
                                          "Jan",
                                          "Feb",
                                          "Mar",
                                          "Apr",
                                          "May",
                                          "Jun",
                                          "Jul",
                                          "Aug",
                                          "Sep",
                                          "Oct",
                                          "Nov",
                                          "Dec",
                                        ][(data.month - 1) % 12]
                                      }
                                    </td>
                                    <td>₹ {data.principal.toFixed(2)}</td>
                                    <td>₹ {data.interest.toFixed(2)}</td>
                                    <td>₹ {data.totalPayment.toFixed(2)}</td>
                                    <td>₹ {data.balance.toFixed(2)}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                      )
                    )}
                  </Accordion>
                )}
              </Row>
            </Card>
          </div>
        </div>
      </div>
      <div className={`${homeloanStyle.qaContent} container`}>
        <section>
          <div className={homeloanStyle.subHeading}>
            <h1 className="text-center">
              {" "}
              Home Loan EMI Calculator – Calculate Your Housing Loan EMI Online
            </h1>
          </div>
          <Row>
            <Col xs={12} md={4} lg={3}>
              <div className={homeloanStyle.sidebar}>
                <ul className="list-unstyled">
                  <li className={homeloanStyle.sidebarItem}>
                    What is a SIP Calculator?
                  </li>
                  <li className={homeloanStyle.sidebarItem}>
                    How can a SIP Calculator Help You?
                  </li>
                  <li className={homeloanStyle.sidebarItem}>
                    Advantages of SIP Calculator
                  </li>
                  <li className={homeloanStyle.sidebarItem}>
                    How to use ET Money's SIP Calculator?
                  </li>
                  <li className={homeloanStyle.sidebarItem}>
                    Related Mutual Fund SIP Calculators ?
                  </li>
                  <li className={homeloanStyle.sidebarItem}>
                    Advantages of SIP Calculator
                  </li>
                  <li className={homeloanStyle.sidebarItem}>
                    Related Mutual Fund SIP Calculators ?
                  </li>
                </ul>
              </div>
            </Col>

            <Col xs={12} md={8} lg={9} className={homeloanStyle.qandA}>
              <div className={homeloanStyle.quesAnsSection}>
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
              <div className={homeloanStyle.quesAnsSection}>
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
              <div className={homeloanStyle.quesAnsSection}>
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
              <div className={homeloanStyle.quesAnsSection}>
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
              <div className={homeloanStyle.quesAnsSection}>
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
          <div className={`${homeloanStyle.preHeading} py-5`}>
            <h1 className="text-align-left pt-5">
              FAQs (Frequently Asked Questions)
            </h1>
          </div>
          <div>
            <Accordion defaultActiveKey={["1"]} alwaysOpen>
              <Accordion.Item eventKey="0">
                <Accordion.Header className={homeloanStyle.accordionHeader}>
                  How can a SIP Calculator Help You?
                </Accordion.Header>
                <Accordion.Body className={homeloanStyle.accordionbody}>
                  There is no maximum tenure of a SIP. You can invest as long as
                  you can. The minimum tenure you can go for is 3 years.
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1">
                <Accordion.Header className={homeloanStyle.accordionHeader}>
                  Can I modify my SIP amount?
                </Accordion.Header>
                <Accordion.Body className={homeloanStyle.accordionbody}>
                  There is no maximum tenure of a SIP. You can invest as long as
                  you can. The minimum tenure you can go for is 3 years.
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="2">
                <Accordion.Header className={homeloanStyle.accordionHeader}>
                  Can I modify my SIP amount?
                </Accordion.Header>
                <Accordion.Body className={homeloanStyle.accordionbody}>
                  There is no maximum tenure of a SIP. You can invest as long as
                  you can. The minimum tenure you can go for is 3 years.
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="3">
                <Accordion.Header className={homeloanStyle.accordionHeader}>
                  Can I modify my SIP amount?
                </Accordion.Header>
                <Accordion.Body className={homeloanStyle.accordionbody}>
                  There is no maximum tenure of a SIP. You can invest as long as
                  you can. The minimum tenure you can go for is 3 years.
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="4">
                <Accordion.Header className={homeloanStyle.accordionHeader}>
                  Can I modify my SIP amount?
                </Accordion.Header>
                <Accordion.Body className={homeloanStyle.accordionbody}>
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

export default HomeloanCal;


// <Col
// xs={12}
// md={12}
// lg={6}
// className={`d-flex align-items-center `}
// >
// <div className={homeloanStyle.lumpsumCard}>
//   <div
//     className={`d-flex  flex-column ${homeloanStyle.verticalLine} `}
//   >
//     <div className={`${homeloanStyle.totalInvest} ps-5 mt-2`}>
//       <p>The total amount will be</p>
//       <h2>
//         ₹{" "}
//         {calculateTotalValue(
//           parseFloat(amount) || 0,
//           durationYear,
//           parseFloat(expectedReturn) || 0
//         ).toLocaleString()}
//       </h2>
//     </div>
//     <div className={` d-lg-flex d-md-flex pt-4 ${homeloanStyle.pie_chart_d_block} `}>
//       <div className="d-flex flex-column">

//         <div className={homeloanStyle.piechart_div}>
//           <ResponsiveContainer>
//             <PieChart>
//               <Pie
//                 dataKey="value"
//                 data={data02}
//                 cx="50%"
//                 cy="50%"
//                 innerRadius={40}
//                 outerRadius={80}
//                 className={homeloanStyle.chart_no_outline}
//               >
//                 {data02.map((entry, index) => (
//                   <Cell
//                     key={`cell-${index}`}
//                     fill={entry.color}
//                   />
//                 ))}
//               </Pie>
//             <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//         <div
//           className={`${homeloanStyle.Investbtn} text-center`}
//         >
//           <button className="mt-4" type="button">
//             Invest Now
//           </button>
//         </div>
//       </div>

//       <div className="ps-lg-5 ps-sm-0 mt-3">
//         <div
//           className={`ps-2 pb-2 ${homeloanStyle.investedAmount}`}
//         >
//           <p>Monthly EMI</p>
//           <h6>
//             ₹{" "}
//             {amount > 0 && durationYear > 0
//               ? calculateEMI(
//                   amount,
//                   parseFloat(expectedReturn),
//                   durationYear
//                 ).toLocaleString(undefined, {
//                   maximumFractionDigits: 2,
//                 })
//               : "0"}
//           </h6>
//         </div>
//         <div
//           className={`ps-2 ${homeloanStyle.investedAmount}`}
//           style={{
//             borderLeft: `6px solid ${colorStyles.investedAmount}`,
//           }}
//         >
//           <p>Invested Amount</p>
//           <h6>₹ {parseFloat(amount).toLocaleString()}</h6>
//         </div>

//         <div
//           className={`ps-2 ${homeloanStyle.investedAmount}`}
//           style={{
//             borderLeft: `6px solid ${colorStyles.estReturns}`,
//           }}
//         >
//           <p>Est. Returns</p>
//           <h6>
//             ₹{" "}
//             {calculateEstReturn(
//               calculateTotalValue(
//                 parseFloat(amount) || 0,
//                 durationYear,
//                 parseFloat(expectedReturn) || 0
//               ),
//               parseFloat(amount) || 0
//             ).toLocaleString()}
//           </h6>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
// </Col>