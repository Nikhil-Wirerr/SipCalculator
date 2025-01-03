"use client";

import React, { useState } from "react";
import FdStyle from "@/styles/fd.module.css";
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

const FdCal = () => {
  const [amount, setAmount] = useState(5000); // Principal amount
  const [durationYear, setDurationYear] = useState(10); // Default duration
  const [durationType, setDurationType] = useState("Years"); // Dropdown selection
  const [expectedReturn, setExpectedReturn] = useState(8); // Default interest rate

  const handleWheel = (e) => e.target.blur();

  const maxAmountLimit = 10000000;

  // Calculate Total Value (Maturity Amount)
  const calculateTotalValue = () => {
    let convertedDuration = durationYear;

    // Convert duration based on the dropdown value
    if (durationType === "Months") {
      convertedDuration = durationYear / 12;
    } else if (durationType === "Days") {
      convertedDuration = durationYear / 365;
    } else if (durationType === "Quarterly") {
      convertedDuration = durationYear / 4;
    }

    const rate = expectedReturn / 100;
    const compoundingFrequency = 4; // Quarterly compounding
    return (
      amount *
      Math.pow(
        1 + rate / compoundingFrequency,
        compoundingFrequency * convertedDuration
      )
    );
  };

      // Calculate Estimated Returns
    const calculateEstReturn = (maturityAmount) => {
      return maturityAmount - amount; // Returns = Maturity Amount - Principal
    };

//   // Calculate Estimated Returns
//   const calculateEstReturn = (maturityAmount) => maturityAmount - amount;

  const handleAmountChange = (e) => {
    // let value = e.target.value;
    let value = e.target.value === "" ? 0 : Number(e.target.value);

    if (value > maxAmountLimit) {
      value = maxAmountLimit;
    }
    setAmount(value === "" ? 0 : Number(value));
  };

  const handleExpectedReturnChange = (e) => {
    setExpectedReturn(parseFloat(e.target.value) || 0);
  };

  const handleDurationTypeChange = (newType) => {
    setDurationType(newType);

    // Clamp durationYear to the valid range for the selected durationType
    const maxValue =
      newType === "Years"
        ? 100
        : newType === "Months"
        ? 11
        : newType === "Days"
        ? 31
        : newType === "Quarterly"
        ? 4
        : 100;

    if (durationYear > maxValue) {
      setDurationYear(maxValue);
    } else if (durationYear < 1) {
      setDurationYear(1);
    }
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

  return (
    <>
      <div className={` ${FdStyle.lumpsumContainer}`}>
        <div className="container py-5">
          <div className={FdStyle.preHeading}>
            <h1 className="text-align-left pt-3">FD Calculator</h1>
            <p className="pt-2 pb-4">
              {" "}
              A fixed deposit is a type of term investment offered by several
              banks and NBFCs. These deposits typically offer a higher rate of
              interest, subject to certain terms and conditions. The amount you
              deposit in these deposits is locked for a predetermined period
              which can vary between 7 days and 10 years.
            </p>
          </div>

          <div>
            <Card className="p-5 border border-0 shadow-sm">
              <Row>
                <Col xs={12} md={12} lg={6} className="mb-4 ">
                  <div className={FdStyle.lumpsumCard}>
                    <div>
                      <div className="calc-img d-flex mb-4">
                        <Image src={LumpCalImg} alt="cal-img" />
                        <div className={FdStyle.returnEstimation}>
                          <h6 className="ps-2 mb-1">Return Estimator</h6>
                          <p className="ps-2">
                            Estimation is based on the past performance
                          </p>
                        </div>
                      </div>
                    </div>

                    <Form>
                      <div className={`${FdStyle.customformgroup} `}>
                        <div className={FdStyle.custominputwrapper}>
                          <label className={FdStyle.customlabel}>
                            Enter Amount
                          </label>
                          <input
                            type="number"
                            value={amount === 0 ? "" : amount}
                            className={FdStyle.custominput}
                            placeholder=""
                            onWheel={handleWheel}
                            // onChange={(e) => setAmount(Number(e.target.value))}
                            onChange={handleAmountChange}
                          />
                        </div>
                      </div>

                      <Form.Group className="pt-5">
                        <div
                          className={`d-flex justify-content-between ${FdStyle.rangefield}`}
                        >
                          <div className="d-flex align-items-center">
                            <Form.Label>Select Duration</Form.Label>
                            <select
                              className="ms-2 mb-2 border border-sm"
                              value={durationType}
                              onChange={(e) =>
                                handleDurationTypeChange(e.target.value)
                              }
                            >
                              <option value="Years">Years</option>
                              <option value="Months">Months</option>
                              <option value="Days">Days</option>
                              <option value="Quarterly">Quarterly</option>
                            </select>
                          </div>
                          <div className={FdStyle.rangecustominput}>
                            <input
                              type="number"
                              value={durationYear}
                              onChange={(e) =>
                                setDurationYear(Number(e.target.value))
                              }
                              className="border-0 w-100"
                              onWheel={handleWheel}
                            />
                            {/* <span>Yrs</span> */}
                            <span>{durationType}</span>
                          </div>
                        </div>

                        <Form.Range
                          min={1}
                          max={
                            durationType === "Years"
                              ? 100
                              : durationType === "Months"
                              ? 11
                              : durationType === "Days"
                              ? 31
                              : durationType === "Quarterly"
                              ? 4
                              : 100
                          }
                          value={durationYear}
                          onChange={(e) =>
                            setDurationYear(Number(e.target.value))
                          }
                        />
                        <div
                          className={`d-flex justify-content-between ${FdStyle.belowrangefield}`}
                        >
                          <span>1 {durationType}</span>
                          {/* <span>100 {durationType}</span> */}
                          <span>
                            {durationType === "Years"
                              ? "100"
                              : durationType === "Months"
                              ? "11"
                              : durationType === "Days"
                              ? "31"
                              : durationType === "Quarterly"
                              ? "4"
                              : "100"}{" "}
                            {durationType}
                          </span>
                        </div>
                      </Form.Group>

                      <Form.Group className="pt-4">
                        <div
                          className={`d-flex justify-content-between ${FdStyle.rangefield}`}
                        >
                          <Form.Label>Expected Return Rate (p.a)</Form.Label>
                          <div className={FdStyle.rangecustominput}>
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
                          className={`d-flex justify-content-between ${FdStyle.belowrangefield}`}
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
                  className={`d-flex justify-content-around  ${FdStyle.verticalLine} `}
                >
                  <div className={FdStyle.lumpsumCard}>
                    <div
                      className={`d-flex align-items-center flex-column `}
                    >
                      <div className={`${FdStyle.totalInvest} ps-5`}>
                        <p>
                          The total value of your investment after{" "}
                          <strong>
                            {durationYear} {durationType} 
                          </strong>{" "}
                          will be
                        </p>
                        <h2>₹ {calculateTotalValue().toLocaleString()}</h2>
                      </div>
                      <div
                        className={` d-lg-flex d-md-flex pt-4 ${FdStyle.pie_chart_d_block}`}
                      >
                        <div className="d-flex flex-column">
                          {/* Responsive PieChart */}
                          <div className={FdStyle.piechart_div}>
                            <ResponsiveContainer>
                              <PieChart>
                                <Pie
                                  dataKey="value"
                                  data={data02}
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={40}
                                  outerRadius={80}
                                  className={FdStyle.chart_no_outline}
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
                          <div className={`${FdStyle.Investbtn} text-center`}>
                            <button className="mt-4" type="button">
                              Invest Now
                            </button>
                          </div>
                        </div>
                        <div className="ps-lg-5  mt-3 ps-sm-0">
                          {/* Invested Amount Section */}
                          <div
                            className={`ps-2 ${FdStyle.investedAmount} `}
                            style={{
                              borderLeft: `6px solid ${colorStyles.investedAmount}`,
                            }}
                          >
                            <p>Invested Amount</p>
                            <h6>₹{parseFloat(amount).toLocaleString()}</h6>
                          </div>

                          {/* Estimated Returns Section */}
                          <div
                            className={`ps-2 mt-4 ${FdStyle.investedAmount} `}
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

      <div className={`${FdStyle.qaContent} container`}>
        <section>
          <div className={FdStyle.subHeading}>
            <h1 className="text-center"> Fixed Deposit Calculator</h1>
          </div>
          <Row>
            <Col xs={12} md={4} lg={3}>
              <div className={FdStyle.sidebar}>
                <ul className="list-unstyled">
                  <li className={FdStyle.sidebarItem}>
                    What is a FD Calculator?
                  </li>
                  <li className={FdStyle.sidebarItem}>
                    How can a FD Calculator Help You?
                  </li>
                  <li className={FdStyle.sidebarItem}>
                    Advantages of FD Calculator
                  </li>
                  <li className={FdStyle.sidebarItem}>
                    How to use Sernet's FD Calculator?
                  </li>
                  <li className={FdStyle.sidebarItem}>
                    Related FD Calculators ?
                  </li>
                  <li className={FdStyle.sidebarItem}>
                    Advantages of FD Calculator
                  </li>
                  <li className={FdStyle.sidebarItem}>
                    Related FD Calculators ?
                  </li>
                </ul>
              </div>
            </Col>

            <Col xs={12} md={8} lg={9}>
              <div className={FdStyle.qandA}>
                <div className={FdStyle.quesAnsSection}>
                  <h3>What is a FD Calculator?</h3>
                  <p>
                    A SIP (Systematic Investment Plan) Calculator is an online
                    or software tool used to calculate the potential returns
                    from investing in mutual funds through SIP. It helps
                    investors estimate how much their regular monthly
                    investments can grow over time, considering factors like the
                    investment amount, duration, and expected rate of return.
                  </p>
                </div>
                <div className={FdStyle.quesAnsSection}>
                  <h3>How can a FD Calculator Help You?</h3>
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
                <div className={FdStyle.quesAnsSection}>
                  <h3>Advantages of FD Calculator</h3>
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
                <div className={FdStyle.quesAnsSection}>
                  <h3>How to use Sernet's FD Calculator?</h3>
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
                <div className={FdStyle.quesAnsSection}>
                  <h3>Related FD Calculators ?</h3>
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
          <div className={`${FdStyle.faq_Heading} py-5`}>
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
                    className={`${FdStyle.accbtn} px-0 accordion-button collapsed `}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseOne"
                    aria-expanded="false"
                    aria-controls="flush-collapseOne"
                  >
                    How can a FD Calculator Help You?{" "}
                  </button>
                </h2>
                <div
                  id="flush-collapseOne"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className={`accordion-body px-0 ${FdStyle.acco_body}`}>
                  There is no maximum tenure of a SIP. You can invest as long
                  as you can. The minimum tenure you can go for is 3 years.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className={`${FdStyle.accbtn} px-0 accordion-button collapsed `}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseTwo"
                    aria-expanded="false"
                    aria-controls="flush-collapseTwo"
                  >
                    Can I modify my FD amount?
                  </button>
                </h2>
                <div
                  id="flush-collapseTwo"
                  className="accordion-collapse collapse show"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className={`accordion-body px-0 ${FdStyle.acco_body}`}>
                    There is no maximum tenure of a SIP. You can invest as long
                    as you can. The minimum tenure you can go for is 3 years.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className={`${FdStyle.accbtn} px-0 accordion-button collapsed `}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseThree"
                    aria-expanded="false"
                    aria-controls="flush-collapseThree"
                  >
                    How can a FD Calculator Help You?{" "}
                  </button>
                </h2>
                <div
                  id="flush-collapseThree"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className={`accordion-body px-0 ${FdStyle.acco_body}`}>
                  There is no maximum tenure of a SIP. You can invest as long
                  as you can. The minimum tenure you can go for is 3 years.
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className={`${FdStyle.accbtn} px-0 accordion-button collapsed `}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseFour"
                    aria-expanded="false"
                    aria-controls="flush-collapseFour"
                  >
                    How can a FD Calculator Help You ?{" "}
                  </button>
                </h2>
                <div
                  id="flush-collapseFour"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className={`accordion-body px-0 ${FdStyle.acco_body}`}>
                  There is no maximum tenure of a SIP. You can invest as long
                  as you can. The minimum tenure you can go for is 3 years.
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className={`${FdStyle.accbtn} px-0 accordion-button collapsed `}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseFive"
                    aria-expanded="false"
                    aria-controls="flush-collapseFive"
                  >
                    How can a FD Calculator Help You  ?{" "}
                  </button>
                </h2>
                <div
                  id="flush-collapseFive"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className={`accordion-body px-0 ${FdStyle.acco_body}`}>
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

export default FdCal;
