"use client";

import React, { useState } from "react";
import MutualFundStyle from "@/styles/mf.module.css";
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

import "react-circular-progressbar/dist/styles.css";

function MutualFundcal() {
  const [amount, setAmount] = useState(5000);
  const [durationYear, setDurationYear] = useState(20);
  const [expectedReturn, setExpectedReturn] = useState("8.0");

  const handleExpectedReturnChange = (e) => {
    let value = e.target.value.replace("%", "");
    value = Math.min(Math.max(Number(value), 0), 100);
    setExpectedReturn(`${value}%`);
  };

  const handleWheel = (e) => e.target.blur();

  //calculate total value for lumpsum investment
  const calculateLumpsumValue = (amount, years, rate) => {
    const annualRate = rate / 100;
    return Math.round(amount * Math.pow(1 + annualRate, years));
  };

  //total value
  const calculateTotalValue = () => {
    const rate = parseFloat(expectedReturn) || 0;

    return calculateLumpsumValue(parseFloat(amount) || 0, durationYear, rate);
  };

  // const calculateEstReturn = (totalValue, amount) => totalValue - amount;

  const calculateEstReturn = (totalValue) => {
    return totalValue - parseFloat(amount);
  };

  const colorStyles = {
    investedAmount: "#93C9FC",
    estReturns: "#D3EAFE",
  };

  const data02 = [
    {
      name: "Invested Amount",
      value: parseFloat(amount) || 0,
      color: colorStyles.investedAmount,
    },
    {
      name: "Est. Returns",
      value: calculateEstReturn(calculateTotalValue()),
      color: colorStyles.estReturns,
    },
  ];

  const maxAmountLimit = 10000000;

  const handleAmountChange = (e) => {
    let value = e.target.value;

    //   value = value === "" ? 0 : Number(value);

    if (value > maxAmountLimit) {
      value = maxAmountLimit;
    }
    setAmount(value === "" ? 0 : Number(value));
  };

  return (
    <>
      <div className={` ${MutualFundStyle.lumpsumContainer}`}>
        <div className="container py-5">
          <div className={MutualFundStyle.preHeading}>
            <h1 className="text-align-left pt-3">
              Mutual Fund Returns Calculator
            </h1>
            <p className="pt-2 pb-4">
              {" "}
              Investments in Mutual Funds can be broadly classified into two
              types- lumpsum and SIP. A lumpsum investment is when the depositor
              invests a significant sum of money on a particular mutual fund
              scheme. SIP or Systematic Investment Plan, on the other hand,
              entails the investment of smaller amounts on a monthly basis.
            </p>
          </div>

          <div>
            <Card className="p-lg-5 p-md-4 border-0 shadow">
              <Row>
                <Col xs={12} md={12} lg={6} className="mb-4">
                  <div className={MutualFundStyle.lumpsumCard}>
                    <div className="mt-5">
                      <div className="calc-img d-flex mb-4">
                        <Image src={LumpCalImg} alt="cal-img" />
                        <div className={MutualFundStyle.returnEstimation}>
                          <h6 className="ps-2 mb-1">Return Estimator</h6>
                          <p className="ps-2">
                            Estimation is based on the past performance
                          </p>
                        </div>
                      </div>
                    </div>

                    <Form>
                      <div className={`${MutualFundStyle.customformgroup} `}>
                        <div className={MutualFundStyle.custominputwrapper}>
                          <label className={MutualFundStyle.customlabel}>
                            Enter Amount
                          </label>
                          <input
                            type="number"
                            value={amount === 0 ? "" : amount}
                            className={MutualFundStyle.custominput}
                            placeholder=""
                            onWheel={handleWheel}
                            // onChange={(e) => setAmount(Number(e.target.value))}
                            onChange={handleAmountChange}
                          />
                        </div>
                      </div>

                      <Form.Group className="pt-5">
                        <div
                          className={`d-flex justify-content-between ${MutualFundStyle.rangefield}`}
                        >
                          <Form.Label>Select Duration</Form.Label>
                          <div className={MutualFundStyle.rangecustominput}>
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
                        <Form.Range
                          min={5}
                          max={100}
                          value={durationYear}
                          onChange={(e) =>
                            setDurationYear(Number(e.target.value))
                          }
                        />
                        <div
                          className={`d-flex justify-content-between ${MutualFundStyle.belowrangefield}`}
                        >
                          <span>1 Yr</span>
                          <span>100 Yr</span>
                        </div>
                      </Form.Group>

                      <Form.Group className="pt-5">
                        <div
                          className={`d-flex justify-content-between ${MutualFundStyle.rangefield}`}
                        >
                          <Form.Label>Expected Return Rate (p.a)</Form.Label>
                          <div className={MutualFundStyle.rangecustominput}>
                            <input
                              type="text"
                              value={expectedReturn}
                              // onChange={(e) =>
                              //   setExpectedReturn(Number(e.target.value))
                              // }
                              onChange={handleExpectedReturnChange}
                              className="border-0 w-100"
                              onWheel={handleWheel}
                            />
                          </div>
                        </div>
                        <Form.Range
                          min={0}
                          max={100}
                          step={0.1}
                          value={parseInt(expectedReturn)}
                        //   onChange={(e) =>
                        //     setExpectedReturn(`${e.target.value}%`)
                        //   }
                        onChange={(e) => setExpectedReturn (parseFloat(e.target.value).toFixed(1))}
                        />
                        <div
                          className={`d-flex justify-content-between ${MutualFundStyle.belowrangefield}`}
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
                  className={`d-flex align-items-center `}
                >
                  <div className={MutualFundStyle.lumpsumCard}>
                    <div
                      className={`d-flex align-items-center flex-column ${MutualFundStyle.verticalLine} `}
                    >
                      <div
                        className={`${MutualFundStyle.totalInvest} ps-lg-5 ps-md-4  mt-2`}
                      >
                        <p>
                          The total value of your investment after {" "}
                          <strong>{durationYear} Years</strong> will be
                        </p>
                        <h2>₹ {calculateTotalValue().toLocaleString()}</h2>
                      </div>
                      <div
                        className={` d-lg-flex d-md-flex pt-4 ${MutualFundStyle.pie_chart_d_block}`}
                      >
                        <div className="d-flex flex-column">
                          {/* Responsive PieChart */}
                          <div className={MutualFundStyle.piechart_div}>
                            <ResponsiveContainer>
                              <PieChart>
                                <Pie
                                  dataKey="value"
                                  data={data02}
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={40}
                                  outerRadius={80}
                                  className={MutualFundStyle.chart_no_outline}
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
                            className={`${MutualFundStyle.Investbtn} text-center`}
                          >
                            <button className="mt-4" type="button">
                              Invest Now
                            </button>
                          </div>
                        </div>
                        <div className="ps-lg-5  mt-3 ps-sm-0">
                          {/* Invested Amount Section */}
                          <div
                            className={`ps-2 ${MutualFundStyle.investedAmount} `}
                            style={{
                              borderLeft: `6px solid ${colorStyles.investedAmount}`,
                            }}
                          >
                            <p>Invested Amount</p>
                            {/* <h6>₹ {parseFloat(amount).toLocaleString()}</h6> */}

                            <h6>₹{parseFloat(amount).toLocaleString()}</h6>
                          </div>

                          {/* Estimated Returns Section */}
                          <div
                            className={`ps-2 mt-4 ${MutualFundStyle.investedAmount} `}
                            style={{
                              borderLeft: `6px solid ${colorStyles.estReturns}`,
                            }}
                          >
                            <p>Est. Returns</p>
                            {/* <h6>
                              ₹{" "}
                              {calculateEstReturn(
                                calculateTotalValue()
                              ).toLocaleString()}
                            </h6> */}
                            <h6>
                              ₹{" "}
                              {calculateEstReturn(
                                calculateTotalValue()
                              ).toLocaleString()}
                            </h6>
                          </div>

                          {/* <div
                            className={`ps-3 mt-4 ${MutualFundStyle.totalValue}`}
                          >
                            <p>Total Value</p>
                            <h6>₹77,646</h6>
                            <h6>₹ {calculateTotalValue().toLocaleString()}</h6>
                          </div> */}
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

      <div className={`${MutualFundStyle.qaContent} container`}>
        <section>
          <div className={MutualFundStyle.subHeading}>
            <h1 className="text-center"> Mutual Fund Returns Calculator</h1>
          </div>
          <Row>
            <Col xs={12} md={4} lg={3}>
              <div className={MutualFundStyle.sidebar}>
                <ul className="list-unstyled">
                  <li className={MutualFundStyle.sidebarItem}>
                    What is a SIP Calculator?
                  </li>
                  <li className={MutualFundStyle.sidebarItem}>
                    How can a SIP Calculator Help You?
                  </li>
                  <li className={MutualFundStyle.sidebarItem}>
                    Advantages of SIP Calculator
                  </li>
                  <li className={MutualFundStyle.sidebarItem}>
                    How to use ET Money's SIP Calculator?
                  </li>
                  <li className={MutualFundStyle.sidebarItem}>
                    Related Mutual Fund SIP Calculators ?
                  </li>
                  <li className={MutualFundStyle.sidebarItem}>
                    Advantages of SIP Calculator
                  </li>
                  <li className={MutualFundStyle.sidebarItem}>
                    Related Mutual Fund SIP Calculators ?
                  </li>
                </ul>
              </div>
            </Col>

            <Col xs={12} md={8} lg={9}>
              <div className={MutualFundStyle.qandA}>
                <div className={MutualFundStyle.quesAnsSection}>
                  <h3>What is a SIP Calculator?</h3>
                  <p>
                    A SIP (Systematic Investment Plan) Calculator is an online
                    or software tool used to calculate the potential returns
                    from investing in mutual funds through SIP. It helps
                    investors estimate how much their regular monthly
                    investments can grow over time, considering factors like the
                    investment amount, duration, and expected rate of return.
                  </p>
                </div>
                <div className={MutualFundStyle.quesAnsSection}>
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
                <div className={MutualFundStyle.quesAnsSection}>
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
                <div className={MutualFundStyle.quesAnsSection}>
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
                <div className={MutualFundStyle.quesAnsSection}>
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
          <div className={`${MutualFundStyle.preHeading} py-5`}>
            <h1 className="text-align-left pt-5">
              FAQs (Frequently Asked Questions)
            </h1>
          </div>
          <div>
            <Accordion defaultActiveKey="0" alwaysOpen>
              <Accordion.Item eventKey="0">
                <Accordion.Header
                  className={MutualFundStyle.custom_acco_header}
                >
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
}

export default MutualFundcal;
