"use client";

import React, { useState } from "react";
import SiStyle from "@/styles/si.module.css";
import { Card, Col, Form, Row } from "react-bootstrap";
import LumpCalImg from "../app/assets/lumpsumcal.svg";
import InvestImg from "../app/assets/invest-circle.svg";
import Image from "next/image";
import Link from "next/link";
import Accordion from "react-bootstrap/Accordion";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  PieChart,
  Pie,
  Legend,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";

const SimpleInterestCal = () => {
  const [amount, setAmount] = useState(5000);
  const [durationYear, setDurationYear] = useState(20);
  const [expectedReturn, setExpectedReturn] = useState("8.0");

  const handleExpectedReturnChange = (e) => {
    let value = e.target.value.replace("%", "");
    value = Math.min(Math.max(Number(value), 0), 100);
    setExpectedReturn(`${value}%`);
  };

  const handleWheel = (e) => e.target.blur();

  // Calculate total value 
  const calculateLumpsumValue = (principal, years, rate) => {
    const simpleInterest = (principal * rate * years) / 100;
    return Math.round(principal + simpleInterest); // Total = Principal + Interest
  };

  //total value
  const calculateTotalValue = () => {
    const rate = parseFloat(expectedReturn) || 0;

    return calculateLumpsumValue(parseFloat(amount) || 0, durationYear, rate);
  };


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
      <div className={` ${SiStyle.lumpsumContainer}`}>
        <div className="container py-5">
          <div className={SiStyle.preHeading}>
            <h1 className="text-align-left">SI Calculator</h1>
            <p className="pt-2 pb-4">
              {" "}
              Our simple interest calculator helps you calculate the interest on
              a principal amount without considering compounding. So, if you
              have taken a loan, you can evaluate the payable fee at a simple
              interest rate. You can also evaluate the interest you are earning
              from deposits or investments.
            </p>
          </div>

          <div>
            <Card className="p-lg-5 p-md-4 border border-0 shadow-sm">
              <Row>
                <Col xs={12} md={12} lg={6} className="mb-4">
                  <div className={SiStyle.lumpsumCard}>
                    <div>
                      <div className="calc-img d-flex mb-4">
                        <Image src={LumpCalImg} alt="cal-img" />
                        <div className={SiStyle.returnEstimation}>
                          <h6 className="ps-2 mb-1">Return Estimator</h6>
                          <p className="ps-2">
                            Estimation is based on the past performance
                          </p>
                        </div>
                      </div>
                    </div>

                    <Form>
                      <div className={`${SiStyle.customformgroup} `}>
                        <div className={SiStyle.custominputwrapper}>
                          <label className={SiStyle.customlabel}>
                            Principal Amount
                          </label>
                          <input
                            type="number"
                            value={amount === 0 ? "" : amount}
                            className={SiStyle.custominput}
                            placeholder=""
                            onWheel={handleWheel}
                            onChange={handleAmountChange}
                          />
                        </div>
                      </div>

                      <Form.Group className="pt-5">
                        <div
                          className={`d-flex justify-content-between ${SiStyle.rangefield}`}
                        >
                          <Form.Label>Select Duration</Form.Label>
                          <div className={SiStyle.rangecustominput}>
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
                          className={`d-flex justify-content-between ${SiStyle.belowrangefield}`}
                        >
                          <span>1 Yr</span>
                          <span>100 Yr</span>
                        </div>
                      </Form.Group>

                      <Form.Group className="pt-4">
                        <div
                          className={`d-flex justify-content-between ${SiStyle.rangefield}`}
                        >
                          <Form.Label>Expected Return Rate (p.a)</Form.Label>
                          <div className={SiStyle.rangecustominput}>
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
                          min={0}
                          max={50}
                          step={0.1}
                          value={parseInt(expectedReturn)}
                          onChange={(e) =>
                            setExpectedReturn(
                              parseFloat(e.target.value).toFixed(1)
                            )
                          }
                        />
                        <div
                          className={`d-flex justify-content-between ${SiStyle.belowrangefield}`}
                        >
                          <span>0%</span>
                          <span>50 %</span>
                        </div>
                      </Form.Group>
                    </Form>
                  </div>
                </Col>

                <Col
                  xs={12}
                  md={12}
                  lg={6}
                  className={`d-flex pt-md-5 pt-lg-0 ${SiStyle.verticalLine}`}
                >
                  <div className={SiStyle.lumpsumCard}>
                    <div
                      className={`d-flex align-items-center flex-column `}
                    >
                      <div
                        className={`${SiStyle.totalInvest} ps-lg-5 ps-md-4`}
                      >
                        <p>
                          The total value of your investment after{" "}
                          <strong>{durationYear} Years</strong> will be
                        </p>
                        <h2>₹ {calculateTotalValue().toLocaleString()}</h2>
                      </div>
                      <div
                        className={` d-lg-flex d-md-flex pt-4 ${SiStyle.pie_chart_d_block}`}
                      >
                        <div className="d-flex flex-column">
                          <div className={SiStyle.piechart_div}>
                            <ResponsiveContainer>
                              <PieChart>
                                <Pie
                                  dataKey="value"
                                  data={data02}
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={40}
                                  outerRadius={80}
                                  className={SiStyle.chart_no_outline}
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
                          <div className={`${SiStyle.Investbtn} text-center`}>
                            <button className="mt-4" type="button">
                              Invest Now
                            </button>
                          </div>
                        </div>
                        <div className="ps-lg-5  mt-3 ps-sm-0">
                          <div
                            className={`ps-2 ${SiStyle.investedAmount} `}
                            style={{
                              borderLeft: `6px solid ${colorStyles.investedAmount}`,
                            }}
                          >
                            <p>Invested Amount</p>
                            <h6>₹{parseFloat(amount).toLocaleString()}</h6>
                          </div>
                          <div
                            className={`ps-2 mt-4 ${SiStyle.investedAmount} `}
                            style={{
                              borderLeft: `6px solid ${colorStyles.estReturns}`,
                            }}
                          >
                            <p>Est. Returns</p>
                            <h6>
                              ₹{" "}
                              {calculateEstReturn(
                                calculateTotalValue()
                              ).toLocaleString()}
                            </h6>
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

      <div className={`${SiStyle.qaContent} container`}>
        <section>
          <div className={SiStyle.subHeading}>
            <h1 className="text-center"> Simple Interest Calculator</h1>
          </div>
          <Row>
            <Col xs={12} md={4} lg={3}>
              <div className={SiStyle.sidebar}>
                <ul className="list-unstyled">
                  <li className={SiStyle.sidebarItem}>
                    What is a SI Calculator?
                  </li>
                  <li className={SiStyle.sidebarItem}>
                    How can a SI Calculator Help You?
                  </li>
                  <li className={SiStyle.sidebarItem}>
                    Advantages of SI Calculator
                  </li>
                  <li className={SiStyle.sidebarItem}>
                    How to use Sernet's SI Calculator?
                  </li>
                  <li className={SiStyle.sidebarItem}>
                    Related SI Calculators ?
                  </li>
                  <li className={SiStyle.sidebarItem}>
                    Advantages of SI Calculator
                  </li>
                  <li className={SiStyle.sidebarItem}>
                    Related SI Calculators ?
                  </li>
                </ul>
              </div>
            </Col>

            <Col xs={12} md={8} lg={9}>
              <div className={SiStyle.qandA}>
                <div className={SiStyle.quesAnsSection}>
                  <h3>What is a SI Calculator?</h3>
                  <p>
                    A SI (Simple Interest) Calculator is an online
                    or software tool used to calculate the potential returns
                    from investing in mutual funds through SIP. It helps
                    investors estimate how much their regular monthly
                    investments can grow over time, considering factors like the
                    investment amount, duration, and expected rate of return.
                  </p>
                </div>
                <div className={SiStyle.quesAnsSection}>
                  <h3>How can a SI Calculator Help You?</h3>
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
                <div className={SiStyle.quesAnsSection}>
                  <h3>Advantages of SI Calculator</h3>
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
                <div className={SiStyle.quesAnsSection}>
                  <h3>How to use Sernet's SI Calculator?</h3>
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
                <div className={SiStyle.quesAnsSection}>
                  <h3>Related SI Calculators ?</h3>
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
          <div className={`${SiStyle.faq_Heading} py-5`}>
            <h1 className="text-align-left">
              FAQs (Frequently Asked Questions)
            </h1>
          </div>
            <div
              className="accordion accordion-flush"
              id="accordionFlushExample"
            >
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className={`${SiStyle.accbtn} px-0 accordion-button collapsed `}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseOne"
                    aria-expanded="false"
                    aria-controls="flush-collapseOne"
                  >
                    How can a SI Calculator Help You?{" "}
                  </button>
                </h2>
                <div
                  id="flush-collapseOne"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className={`accordion-body px-0 ${SiStyle.acco_body}`}>
                  There is no maximum tenure of a SIP. You can invest as long
                  as you can. The minimum tenure you can go for is 3 years.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className={`${SiStyle.accbtn} px-0 accordion-button collapsed `}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseTwo"
                    aria-expanded="false"
                    aria-controls="flush-collapseTwo"
                  >
                    Can I modify my SI amount?
                  </button>
                </h2>
                <div
                  id="flush-collapseTwo"
                  className="accordion-collapse collapse show"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className={`accordion-body px-0 ${SiStyle.acco_body}`}>
                    There is no maximum tenure of a SIP. You can invest as long
                    as you can. The minimum tenure you can go for is 3 years.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className={`${SiStyle.accbtn} px-0 accordion-button collapsed `}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseThree"
                    aria-expanded="false"
                    aria-controls="flush-collapseThree"
                  >
                    How can a SI Calculator Help You?{" "}
                  </button>
                </h2>
                <div
                  id="flush-collapseThree"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className={`accordion-body px-0 ${SiStyle.acco_body}`}>
                  There is no maximum tenure of a SIP. You can invest as long
                  as you can. The minimum tenure you can go for is 3 years.
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className={`${SiStyle.accbtn} px-0 accordion-button collapsed `}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseFour"
                    aria-expanded="false"
                    aria-controls="flush-collapseFour"
                  >
                    How can a SI Calculator Help You ?{" "}
                  </button>
                </h2>
                <div
                  id="flush-collapseFour"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className={`accordion-body px-0 ${SiStyle.acco_body}`}>
                  There is no maximum tenure of a SIP. You can invest as long
                  as you can. The minimum tenure you can go for is 3 years.
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className={`${SiStyle.accbtn} px-0 accordion-button collapsed `}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseFive"
                    aria-expanded="false"
                    aria-controls="flush-collapseFive"
                  >
                    How can a SI Calculator Help You  ?{" "}
                  </button>
                </h2>
                <div
                  id="flush-collapseFive"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className={`accordion-body px-0 ${SiStyle.acco_body}`}>
                  There is no maximum tenure of a SIP. You can invest as long
                  as you can. The minimum tenure you can go for is 3 years.
                  </div>
                </div>
              </div>
            </div>
        </section>
      </div>
    </>
  );
};

export default SimpleInterestCal;
