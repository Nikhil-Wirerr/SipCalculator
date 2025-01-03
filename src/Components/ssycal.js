"use client";

import React, { useEffect, useState } from "react";
import SsyStyle from "@/styles/ssycal.module.css";
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

const SsyCal = () => {
  const [yearlyInvestment, setYearlyInvestment] = useState(5000);
  const [maturityAmount, setMaturityAmount] = useState(0);
  const [totalInvested, setTotalInvested] = useState(0);
  const [estimatedReturns, setEstimatedReturns] = useState(0);
  const [girlAge, setGirlAge] = useState(0);
  const [investmentStartYear, setInvestmentStartYear] = useState(2021);


  const handleWheel = (e) => e.target.blur();

  const interestRate = 8.2;
  const investmentDuration = 21;
  const contributionPeriod = 15;

  // Calculate the total investment and estimated returns
  const calculateInvestment = () => {
    // const currentYear = new Date().getFullYear();

    const yearsToInvest = Math.min(contributionPeriod, investmentDuration - girlAge); // As maturity happens after 21 years

    // const yearsToMaturity = investmentDuration - yearsToInvest;
    // console.log("years to maturity:", yearsToMaturity);

    let totalInvest = 0;
    let totalReturns = 0;

    // Calculate total invested amount
    totalInvest = yearlyInvestment * yearsToInvest;

    // Calculate estimated returns using compound interest for each deposit
    for (let year = 0; year < yearsToInvest; year++) {
      const yearsRemaining = investmentDuration - year; // Each deposit grows for a different time
      totalReturns +=
        yearlyInvestment * Math.pow(1 + interestRate / 100, yearsRemaining);
    }

    setTotalInvested(totalInvest);
    console.log("total invested:", totalInvest);

    setEstimatedReturns(totalReturns - totalInvest); // Returns are total amount minus invested amount

    setMaturityAmount(totalReturns);
    console.log("maturity amount:", totalReturns);
  };

  const handleAmountChange = (e) => {
    let value = e.target.value;

    const maxAmountLimit = 150000;

    if (value > maxAmountLimit) {
      value = maxAmountLimit;
    }

    setYearlyInvestment(value === "" ? 0 : Number(value));
    console.log("yearly investment:", value);
  };

  const handleGirlAgeChange = (e) => {
    setGirlAge(Number(e.target.value));
  };

  useEffect(() => {
    calculateInvestment();
  }, [yearlyInvestment, girlAge]);

  const colorStyles = {
    investedAmount: "#93C9FC",
    estReturns: "#D3EAFE",
  };

  const data02 = [
    {
      name: "Invested Amount",
      value: totalInvested,
      color: colorStyles.investedAmount,
    },
    {
      name: "Est. Returns",
      value: estimatedReturns,
      color: colorStyles.estReturns,
    },
  ];

  return (
    <>
      <div className={` ${SsyStyle.ssyContainer}`}>
        <div className="container py-5">
          <div className={SsyStyle.preHeading}>
            <h1 className="text-align-left pt-3">SSY Calculator </h1>
            <p className="pt-2 pb-4">
              {" "}
              Sukanya Samriddhi Yojana (SSY) is a savings scheme launched back
              in 2015 as part of the Government initiative Beti Bachao, Beti
              Padhao campaign. This scheme enables guardians to open a savings
              account for their girl child with an authorised commercial bank or
              India Post branch.
            </p>
          </div>

          <div>
            <Card className="p-5 border border-0 shadow-sm">
              <Row>
                <Col xs={12} md={12} lg={6} className="mb-4">
                  <div className={SsyStyle.ssycard}>
                    <div className="mb-4">
                      <h5>Latest SSY Rate=8.2%</h5>
                    </div>
                    <Form>
                      <div className={`${SsyStyle.customformgroup} `}>
                        <div className={SsyStyle.custominputwrapper}>
                          <label className={SsyStyle.customlabel}>
                            Yearly Investment
                          </label>
                          <input
                            type="number"
                            className={SsyStyle.custominput}
                            placeholder=""
                            onWheel={handleWheel}
                            value={
                              yearlyInvestment === 0 ? "" : yearlyInvestment
                            }
                            onChange={handleAmountChange}
                          />
                        </div>
                      </div>

                      <Form.Group>
                        <div
                          className={`pt-5 d-flex justify-content-between ${SsyStyle.rangefield}`}
                        >
                          <Form.Label>Girl's Age</Form.Label>
                          <div className={SsyStyle.rangecustominput}>
                            <input
                              type="number"
                              className="border-0 w-100"
                              onWheel={handleWheel}
                              value={girlAge}
                              onChange={handleGirlAgeChange}
                            />
                            <span>Yrs</span>
                          </div>
                        </div>
                        <Form.Range
                          min={1}
                          max={10}
                          value={girlAge}
                          onChange={handleGirlAgeChange}
                        />
                        <div
                          className={`d-flex justify-content-between ${SsyStyle.belowrangefield}`}
                        >
                          <span>1 Yr</span>
                          <span>10 Yr</span>
                        </div>
                      </Form.Group>

                      <Form.Group className="pt-4">
                        <div
                          className={`d-flex justify-content-between ${SsyStyle.rangefield}`}
                        >
                          <Form.Label>Start Period</Form.Label>
                          <div className={SsyStyle.rangecustominput}>
                            <input
                              type="number"
                              className="border-0 w-100"
                              onWheel={handleWheel}
                              value={investmentStartYear}
                              onChange={(e) =>
                                setInvestmentStartYear(e.target.value)
                              } // Handle change
                            />
                          </div>
                        </div>
                        <Form.Range
                          min={2015}
                          max={2033}
                          value={investmentStartYear}
                          onChange={(e) =>
                            setInvestmentStartYear(e.target.value)
                          }
                        />
                        <div
                          className={`d-flex justify-content-between ${SsyStyle.belowrangefield}`}
                        >
                          <span>2015 Yr</span>
                          <span>2033 Yr</span>
                        </div>
                      </Form.Group>
                      
                    </Form>
                  </div>
                </Col>

                <Col
                  xs={12}
                  md={12}
                  lg={6}
                  className={`d-flex justify-content-around ${SsyStyle.verticalLine} `}
                >
                  <div className={SsyStyle.lumpsumCard}>
                    <div
                      className={`d-flex align-items-center flex-column  `}
                    >
                      <div className={`${SsyStyle.totalInvest} ps-5 `}>
                        <p>
                          The Maturity value of your investment after{" "}
                          <strong> 21 Years</strong> will be
                        </p>
                        <h2>₹ {maturityAmount.toFixed(2)}</h2>
                      </div>
                      <div
                        className={` d-lg-flex d-md-flex pt-4 ${SsyStyle.pie_chart_d_block}`}
                      >
                        <div className="d-flex flex-column">
                          {/* Responsive PieChart */}
                          <div className={SsyStyle.piechart_div}>
                            <ResponsiveContainer>
                              <PieChart>
                                <Pie
                                  dataKey="value"
                                  data={data02}
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={40}
                                  outerRadius={80}
                                  className={SsyStyle.chart_no_outline}
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
                          <div className={`${SsyStyle.Investbtn} text-center`}>
                            <button className="mt-4" type="button">
                              Invest Now
                            </button>
                          </div>
                        </div>
                        <div className="ps-lg-5  mt-3 ps-sm-0">
                          {/* Invested Amount Section */}
                          <div
                            className={`ps-2 ${SsyStyle.investedAmount} `}
                            style={{
                              borderLeft: `6px solid ${colorStyles.investedAmount}`,
                            }}
                          >
                            <p> Total Invested Amount</p>
                            <h6>₹ {totalInvested.toFixed(2)}</h6>
                          </div>

                          {/* Estimated Returns Section */}
                          <div
                            className={`ps-2 mt-4 ${SsyStyle.investedAmount} `}
                            style={{
                              borderLeft: `6px solid ${colorStyles.estReturns}`,
                            }}
                          >
                            <p>Total Returns</p>
                            <h6>₹ {estimatedReturns.toFixed(2)}</h6>
                          </div>
                          <div
                            className={`ps-2 mt-4 ${SsyStyle.maturity_year} `}
                          >
                            <p>Maturity year</p>
                            {/* <h6>{investmentStartYear + investmentDuration}</h6> */}
                            <h6>{Number(investmentStartYear) + investmentDuration}</h6>

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

      <div className={`${SsyStyle.qaContent} container`}>
        <section>
          <div className={SsyStyle.subHeading}>
            <h1 className="text-center">
              {" "}
              Sukanya Samriddhi Yojana (SSY) Calculator
            </h1>
          </div>
          <Row>
            <Col xs={12} md={4} lg={3}>
              <div className={SsyStyle.sidebar}>
                <ul className="list-unstyled">
                  <li className={SsyStyle.sidebarItem}>
                    What is a SSY Calculator?
                  </li>
                  <li className={SsyStyle.sidebarItem}>
                    How can a SSY Calculator Help You?
                  </li>
                  <li className={SsyStyle.sidebarItem}>
                    Advantages of SSY Calculator
                  </li>
                  <li className={SsyStyle.sidebarItem}>
                    How to use ET Money's SSY Calculator?
                  </li>
                  <li className={SsyStyle.sidebarItem}>
                    Related Mutual Fund SSY Calculators ?
                  </li>
                  <li className={SsyStyle.sidebarItem}>
                    Advantages of SSY Calculator
                  </li>
                  <li className={SsyStyle.sidebarItem}>
                    Related Mutual Fund SSY Calculators ?
                  </li>
                </ul>
              </div>
            </Col>

            <Col xs={12} md={8} lg={9}>
              <div className={SsyStyle.qandA}>
                <div className={SsyStyle.quesAnsSection}>
                  <h3>What is a SSY Calculator?</h3>
                  <p>
                    A SSY (Sukanya Samriddhi Yojana ) Calculator is an online
                    or software tool used to calculate the potential returns
                    from investing in mutual funds through SSY. It helps
                    investors estimate how much their regular monthly
                    investments can grow over time, considering factors like the
                    investment amount, duration, and expected rate of return.
                  </p>
                </div>
                <div className={SsyStyle.quesAnsSection}>
                  <h3>How can a SSY Calculator Help You?</h3>
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
                <div className={SsyStyle.quesAnsSection}>
                  <h3>Advantages of SSY Calculator</h3>
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
                <div className={SsyStyle.quesAnsSection}>
                  <h3>How to use Sernet's SSY Calculator?</h3>
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
                <div className={SsyStyle.quesAnsSection}>
                  <h3>Related Mutual Fund SSY Calculators ?</h3>
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
          <div className={`${SsyStyle.faq_Heading} py-5`}>
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
                    className={`${SsyStyle.accbtn} px-0 accordion-button collapsed `}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseOne"
                    aria-expanded="false"
                    aria-controls="flush-collapseOne"
                  >
                    How can a SSY Calculator Help You?{" "}
                  </button>
                </h2>
                <div
                  id="flush-collapseOne"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className={`accordion-body px-0 ${SsyStyle.acco_body}`}>
                  There is no maximum tenure of a SIP. You can invest as long
                  as you can. The minimum tenure you can go for is 3 years.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className={`${SsyStyle.accbtn} px-0 accordion-button collapsed `}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseTwo"
                    aria-expanded="false"
                    aria-controls="flush-collapseTwo"
                  >
                    Can I modify my SSY amount?
                  </button>
                </h2>
                <div
                  id="flush-collapseTwo"
                  className="accordion-collapse collapse show"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className={`accordion-body px-0 ${SsyStyle.acco_body}`}>
                    There is no maximum tenure of a SIP. You can invest as long
                    as you can. The minimum tenure you can go for is 3 years.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className={`${SsyStyle.accbtn} px-0 accordion-button collapsed `}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseThree"
                    aria-expanded="false"
                    aria-controls="flush-collapseThree"
                  >
                    How can a SSY Calculator Help You?{" "}
                  </button>
                </h2>
                <div
                  id="flush-collapseThree"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className={`accordion-body px-0 ${SsyStyle.acco_body}`}>
                  There is no maximum tenure of a SIP. You can invest as long
                  as you can. The minimum tenure you can go for is 3 years.
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className={`${SsyStyle.accbtn} px-0 accordion-button collapsed `}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseFour"
                    aria-expanded="false"
                    aria-controls="flush-collapseFour"
                  >
                    How can a SSY Calculator Help You ?{" "}
                  </button>
                </h2>
                <div
                  id="flush-collapseFour"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className={`accordion-body px-0 ${SsyStyle.acco_body}`}>
                  There is no maximum tenure of a SIP. You can invest as long
                  as you can. The minimum tenure you can go for is 3 years.
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className={`${SsyStyle.accbtn} px-0 accordion-button collapsed `}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseFive"
                    aria-expanded="false"
                    aria-controls="flush-collapseFive"
                  >
                    How can a SSY Calculator Help You  ?{" "}
                  </button>
                </h2>
                <div
                  id="flush-collapseFive"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className={`accordion-body px-0 ${SsyStyle.acco_body}`}>
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

export default SsyCal;
