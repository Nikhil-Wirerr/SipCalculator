"use client";

import React, { useState } from "react";
import RdStyle from "@/styles/rd.module.css";
import { Card, Col, Form, Row } from "react-bootstrap";
import LumpCalImg from "../app/assets/lumpsumcal.svg";
import InvestImg from "../app/assets/invest-circle.svg";
import Image from "next/image";
import Link from "next/link";
import Accordion from "react-bootstrap/Accordion";
import {
  PieChart,
  Pie,
  Legend,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";

const RdCal = () => {
  const [amount, setAmount] = useState(25000); // Principal amount for RD
  const [durationYear, setDurationYear] = useState(10); // Default duration in Years
  const [durationType, setDurationType] = useState("Years"); // Dropdown selection for Years/Months
  const [expectedReturn, setExpectedReturn] = useState(8); // Expected interest rate in %

  const handleWheel = (e) => e.target.blur();

  const maxAmountLimit = 1000000;

  // Calculate Total Value (Maturity Amount) for RD
  const calculateTotalValue = () => {
    let convertedDuration = durationYear;
    let monthlyInterestRate = expectedReturn / 100 / 12; // Monthly rate

    // Calculate compound interest for RD (assuming monthly contributions)
    const n = durationYear * (durationType === "Months" ? 1 : 12); // Total months for RD
    const totalAmount =
      amount *
      ((Math.pow(1 + monthlyInterestRate, n) - 1) / monthlyInterestRate);

    return totalAmount;
  };

  const calculateEstReturn = (maturityAmount) => {
    return (
      maturityAmount -
      amount * durationYear * (durationType === "Months" ? 1 : 12)
    );
  };

  const handleAmountChange = (e) => {
    let value = e.target.value === "" ? 0 : Number(e.target.value);
    if (value > maxAmountLimit) {
      value = maxAmountLimit;
    }
    setAmount(value === "" ? 0 : Number(value));
  };

  const handleDurationChange = (e) => {
    setDurationYear(Number(e.target.value));
  };

  const handleDurationTypeChange = (newType) => {
    setDurationType(newType);
  };

  const handleExpectedReturnChange = (e) => {
    setExpectedReturn(parseFloat(e.target.value) || 0);
  };

  const colorStyles = {
    investedAmount: "#93C9FC",
    estReturns: "#D3EAFE",
  };

  const data02 = [
    {
      name: "Invested Amount",
      value: amount * durationYear * (durationType === "Months" ? 1 : 12),
      color: colorStyles.investedAmount,
    },
    {
      name: "Est. Returns",
      value: calculateEstReturn(calculateTotalValue()),
      color: colorStyles.estReturns,
    },
  ];

  return (
    <>
      <div className={` ${RdStyle.lumpsumContainer}`}>
        <div className="container py-5">
          <div className={RdStyle.preHeading}>
            <h1 className="text-align-left pt-3">RD Calculator</h1>
            <p className="pt-2 pb-4">
              {" "}
              Recurring deposits (RDs) are an investment instrument almost
              similar to fixed deposits. However, you have to make fixed monthly
              deposits in RDs, unlike a lump sum amount in FDs. RDs create a
              habit of regular investment among earning individuals. These also
              instil discipline when it comes to savings. Recurring deposits are
              offered by the majority of banks and financial institutions.
            </p>
          </div>

          <div>
            <Card className="p-5 border-0 shadow">
              <Row>
                <Col xs={12} md={12} lg={6} className="mb-4">
                  <div className={RdStyle.lumpsumCard}>
                    <div className="mt-5">
                      <div className="calc-img d-flex mb-4">
                        <Image src={LumpCalImg} alt="cal-img" />
                        <div className={RdStyle.returnEstimation}>
                          <h6 className="ps-2 mb-1">Return Estimator</h6>
                          <p className="ps-2">
                            Estimation is based on the past performance
                          </p>
                        </div>
                      </div>
                    </div>

                    <Form>
                      <div className={`${RdStyle.customformgroup} `}>
                        <div className={RdStyle.custominputwrapper}>
                          <label className={RdStyle.customlabel}>
                            Enter Amount
                          </label>
                          <input
                            type="number"
                            value={amount === 0 ? "" : amount}
                            className={RdStyle.custominput}
                            placeholder=""
                            onWheel={handleWheel}
                            onChange={handleAmountChange}
                          />
                        </div>
                      </div>

                      <Form.Group className="pt-5">
                        <div
                          className={`d-flex justify-content-between ${RdStyle.rangefield}`}
                        >
                          <div className="d-flex align-items-center">
                            <Form.Label>Select Duration</Form.Label>
                            <select
                              className="ms-2"
                              value={durationType}
                              onChange={(e) =>
                                handleDurationTypeChange(e.target.value)
                              }
                            >
                              <option value="Years">Years</option>
                              <option value="Months">Months</option>
                            </select>
                          </div>
                          <div className={RdStyle.rangecustominput}>
                            <input
                              type="number"
                              value={durationYear}
                              onChange={handleDurationChange}
                              className="border-0 w-100"
                              onWheel={handleWheel}
                            />
                            {/* <span>12 Yrs</span> */}
                            <span>{durationType}</span>
                          </div>
                        </div>
                        <Form.Range
                          min={1}
                          max={durationType === "Years" ? 50 : 12}
                          value={durationYear}
                          onChange={handleDurationChange}
                        />
                        <div
                          className={`d-flex justify-content-between ${RdStyle.belowrangefield}`}
                        >
                          <span>1 {durationType}</span>
                          <span>
                            {durationType === "Years" ? "50" : "12"}{" "}
                            {durationType}
                          </span>
                        </div>
                      </Form.Group>

                      <Form.Group className="pt-5">
                        <div
                          className={`d-flex justify-content-between ${RdStyle.rangefield}`}
                        >
                          <Form.Label>Expected Return Rate (p.a)</Form.Label>
                          <div className={RdStyle.rangecustominput}>
                            <input
                              type="text"
                              value={expectedReturn}
                              onChange={handleExpectedReturnChange}
                              className="border-0 w-100"
                              onWheel={handleWheel}
                            />
                          </div>
                        </div>
                        <Form.Range
                          min={1}
                          max={20}
                          step={0.1}
                          value={expectedReturn}
                          onChange={(e) =>
                            setExpectedReturn(parseFloat(e.target.value))
                          }
                        />
                        <div
                          className={`d-flex justify-content-between ${RdStyle.belowrangefield}`}
                        >
                          <span>1%</span>
                          <span>20 %</span>
                        </div>
                      </Form.Group>
                    </Form>
                  </div>
                </Col>

                <Col
                  xs={12}
                  md={12}
                  lg={6}
                  className={`d-flex align-items-center `}
                >
                  <div className={RdStyle.lumpsumCard}>
                    <div
                      className={`d-flex align-items-center flex-column ${RdStyle.verticalLine} `}
                    >
                      <div className={`${RdStyle.totalInvest} ps-5 mt-2`}>
                        <p>
                          The total value of your investment after{" "}
                          <strong>
                            {durationYear} {durationType}{" "}
                          </strong>{" "}
                          will be
                        </p>
                        <h2>₹ {calculateTotalValue().toLocaleString()}</h2>
                      </div>
                      <div
                        className={` d-lg-flex d-md-flex pt-4 ${RdStyle.pie_chart_d_block}`}
                      >
                        <div className="d-flex flex-column">
                          {/* Responsive PieChart */}
                          <div className={RdStyle.piechart_div}>
                            <ResponsiveContainer>
                              <PieChart>
                                <Pie
                                  dataKey="value"
                                  data={data02}
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={40}
                                  outerRadius={80}
                                  className={RdStyle.chart_no_outline}
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
                          <div className={`${RdStyle.Investbtn} text-center`}>
                            <button className="mt-4" type="button">
                              Invest Now
                            </button>
                          </div>
                        </div>
                        <div className="ps-lg-5  mt-3 ps-sm-0">
                          {/* Invested Amount Section */}
                          <div
                            className={`ps-2 ${RdStyle.investedAmount} `}
                            style={{
                              borderLeft: `6px solid ${colorStyles.investedAmount}`,
                            }}
                          >
                            <p>Invested Amount</p>
                            {/* <h6>₹ 25000</h6> */}
                            <h6>₹ {amount * durationYear * (durationType === "Months" ? 1 : 12)}</h6>

                          </div>

                          {/* Estimated Returns Section */}
                          <div
                            className={`ps-2 mt-4 ${RdStyle.investedAmount} `}
                            style={{
                              borderLeft: `6px solid ${colorStyles.estReturns}`,
                            }}
                          >
                            <p>Est. Returns</p>
                            {/* <h6>₹ 4500</h6> */}
                            <h6>₹ {calculateEstReturn(calculateTotalValue()).toLocaleString()}</h6>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card>
          </div>
        </div>
      </div>

      <div className={`${RdStyle.qaContent} container`}>
        <section>
          <div className={RdStyle.subHeading}>
            <h1 className="text-center"> Recurring Deposit (RD) Calculator</h1>
          </div>
          <Row>
            <Col xs={12} md={4} lg={3}>
              <div className={RdStyle.sidebar}>
                <ul className="list-unstyled">
                  <li className={RdStyle.sidebarItem}>
                    What is a RD Calculator?
                  </li>
                  <li className={RdStyle.sidebarItem}>
                    How can a RD Calculator Help You?
                  </li>
                  <li className={RdStyle.sidebarItem}>
                    Advantages of RD Calculator
                  </li>
                  <li className={RdStyle.sidebarItem}>
                    How to use ET Money's RD Calculator?
                  </li>
                  <li className={RdStyle.sidebarItem}>
                    Related Mutual Fund RD Calculators ?
                  </li>
                  <li className={RdStyle.sidebarItem}>
                    Advantages of SIP Calculator
                  </li>
                  <li className={RdStyle.sidebarItem}>
                    Related Mutual Fund SIP Calculators ?
                  </li>
                </ul>
              </div>
            </Col>

            <Col xs={12} md={8} lg={9}>
              <div className={RdStyle.qandA}>
                <div className={RdStyle.quesAnsSection}>
                  <h3>What is a RD Calculator?</h3>
                  <p>
                    A SIP (Systematic Investment Plan) Calculator is an online
                    or software tool used to calculate the potential returns
                    from investing in mutual funds through SIP. It helps
                    investors estimate how much their regular monthly
                    investments can grow over time, considering factors like the
                    investment amount, duration, and expected rate of return.
                  </p>
                </div>
                <div className={RdStyle.quesAnsSection}>
                  <h3>How can a SIP Calculator Help You?</h3>
                  <p>
                    The Systematic investment Plan calculator essentially gives
                    investors a bifurcation of the future value of the SIP
                    investment with two figures: the estimated return they can
                    expect to make on the investment and the principal.
                    Therefore, you can use the SiP return calculator to get an
                    overview of how your investment will grow over a certain
                    holding period, assuming a certain rate of return and SIP
                    contribution. You can also factor in the effect of inflation
                    when using the SIP calculator online, though not explicitly,
                    You could do this by manually figuring out the nominal rate
                    of return you'd expect to earn from your investment, based
                    on your target real rate of return and the prevalling rate
                    of Inflation. Then, you just need to use the manually
                    computed rate as your rate of return and enter it into the
                    calculator to start investing in mutual funds.. Let us look
                    at some examples to figure out how this calculator can help
                    you.
                  </p>
                </div>
                <div className={RdStyle.quesAnsSection}>
                  <h3>Advantages of SIP Calculator</h3>
                  <p>
                    Investments made into market-linked instruments such as
                    Mutual Funds do not provide guaranteed returns. So investors
                    might find it difficult to figure out how much their money
                    will grow in the future or how much they need to invest to
                    reach financial goals.
                    <br />
                    The ET Money SIP Investment Calculator helps overcome these
                    problems and provides the following key advantages to
                    investors:
                    <br />
                    Instantly Calculate Investment Future Value: ET Money SIP
                    Calculator delivers immediate and precise results, sparing
                    you from number-crunching.
                    <br />
                    User-Friendly SIP Calculator: Easily estimate your
                    investment needs with our user-friendly SIP Calculator,
                    suitable for anyone, and it's completely free and unlimited.
                    Empower Informed Investment Choices: Plan your investments
                    effectively with the SIP Calculator, ensuring you meet your
                    financial goals effortlessly. Discover Top Investment
                    Opportunities: Unlike others, our calculator not only
                    predicts future values and investments but also recommends
                    funds to align with your goals. Inflation-Adjusted Results
                    at Your Fingertips: Combat rising costs by effortlessly
                    obtaining inflation-adjusted investment results with a
                    simple button click, a feature lacking in most SIP
                    calculators
                  </p>
                </div>
                <div className={RdStyle.quesAnsSection}>
                  <h3>How to use ET Money's SIP Calculator?</h3>
                  <p>
                    If you know how much you want to invest in Mutual Funds
                    every month, you can use the ET Money SIP Calculator to
                    estimate the potential future value of your investments.
                    <br />
                    To use this functionality, you need to provide 3 key inputs:
                    <br />
                    Option 1. If You Know Your Investment Amount If you know how
                    much you want to invest in Mutual Funds every month, you can
                    use the ET Money SIP Calculator to estimate the potential
                    future value of your investments. To use this functionality,
                    you need to enter the following inputs: Investment Amount -
                    This is the SIP amount you plan to invest at regular
                    intervals on specific SIP date. Investment Duration - This
                    is the period in years for which you plan to continue your
                    SIP. After entering the above details in the Mutual Fund SIP
                    calculator, just click on calculate to view the future value
                    of your investments along with a short list of Mutual Funds
                    that might be suitable to help you achieve your investment
                    goal.
                    <br /> Option 2. If You Know Your Investment Goal Amount If
                    you are planning to invest in order to achieve a specific
                    goal such as buying a new car or arranging for the
                    downpayment of a new house, you would already know how much
                    money you will need. In this case, you can use the sip
                    amount calculator to figure out the SIP you need to reach
                    your investment goal. To use this feature of the monthly SIP
                    calculator, you need to provide the following inputs:
                    <br />
                    Savings Goal - This is the amount that you have to save to
                    reach your investment goal. Time Period - This is the time
                    period in years within which you plan to reach the
                    investment goal. Once you have entered the above details,
                    the SIP calculator will provide the SIP amount you need to
                    reach your investment goal within the specified investment
                    tenure.
                  </p>
                </div>
                <div className={RdStyle.quesAnsSection}>
                  <h3>Related Mutual Fund SIP Calculators ?</h3>
                  <p>
                    The Systematic investment Plan calculator essentially gives
                    investors a bifurcation of the future value of the SIP
                    investment with two figures: the estimated return they can
                    expect to make on the investment and the principal.
                    Therefore, you can use the SiP return calculator to get an
                    overview of how your investment will grow over a certain
                    holding period, assuming a certain rate of return and SIP
                    contribution. You can also factor in the effect of inflation
                    when using the SIP calculator online, though not explicitly,
                    You could do this by manually figuring out the nominal rate
                    of return you'd expect to earn from your investment, based
                    on your target real rate of return and the prevalling rate
                    of Inflation. Then, you just need to use the manually
                    computed rate as your rate of return and enter it into the
                    calculator to start investing in mutual funds.. Let us look
                    at some examples to figure out how this calculator can help
                    you.
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </section>

        <section className="pb-5 mt-5">
          <div className={`${RdStyle.preHeading} py-5`}>
            <h1 className="text-align-left pt-5">
              FAQs (Frequently Asked Questions)
            </h1>
          </div>
          <div>
            <Accordion defaultActiveKey="0" alwaysOpen>
              <Accordion.Item eventKey="0">
                <Accordion.Header className={RdStyle.custom_acco_header}>
                  How can a SIP Calculator Help You?
                </Accordion.Header>
                <Accordion.Body>
                  There is no maximum tenure of a SIP. You can invest as long as
                  you can. The minimum tenure you can go for is 3 years.
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1">
                <Accordion.Header>Can I modify my SIP amount?</Accordion.Header>
                <Accordion.Body>
                  Yes, you can modify your SIP amount at any point during your
                  tenure by contacting your fund manager or using the online
                  portal.
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="2">
                <Accordion.Header>
                  What is the minimum tenure for SIP?
                </Accordion.Header>
                <Accordion.Body>
                  The minimum tenure for a SIP is usually 6 months, but it can
                  vary depending on the mutual fund you select.
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="3">
                <Accordion.Header>
                  What happens if I miss a SIP payment?
                </Accordion.Header>
                <Accordion.Body>
                  If you miss a SIP payment, your account will not be penalized.
                  However, consistent payments are encouraged for better
                  returns.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </section>
      </div>
    </>
  );
};

export default RdCal;
