"use client";

import React, { useState } from "react";
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
import Link from "next/link";
import Accordion from "react-bootstrap/Accordion";
import lumpsumStyle from "@/app/styles/lumpsumcal.module.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
// import "../../src/app/globals.css";


const LumpsumCal = () => {
  const [investmentType, setInvestmentType] = useState("Lumpsum");
  const handleInvestmentTypeChange = (value) => {
    setInvestmentType(value);
  };

  return (
    <>
      <div className={` ${lumpsumStyle.lumpsumContainer}`}>
        <div className="container py-5">
          <div className={lumpsumStyle.preHeading}>
            <h1 className="text-align-left pt-3">Lumpsum Calculator</h1>
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
            <Card className="p-5 border-0 shadow">
              <Row>
              <div>
              <ToggleButtonGroup
                    type="radio"
                    name="investmentType"
                    value={investmentType}
                    onChange={handleInvestmentTypeChange}
                    className={lumpsumStyle.togglbgrp}
                  >
                    <ToggleButton
                      id="sip-toggle"
                      value="SIP"
                      variant="outline-primary"
                    >
                      Monthly SIP
                    </ToggleButton>
                    <ToggleButton
                      id="lumpsum-toggle"
                      value="Lumpsum"
                      variant="outline-primary"
                    >
                      Lumpsum
                    </ToggleButton>
                  </ToggleButtonGroup>
                  </div>

                <Col xs={12} md={12} lg={6} className="mb-4">
                <div className={lumpsumStyle.lumpsumCard}>
                 
                  <div className="mt-5">
                    <div className="calc-img d-flex mb-4">
                      <Image src={LumpCalImg} alt="cal-img" />
                      <div className={lumpsumStyle.returnEstimation}>
                        <h6 className="ps-2 mb-1">Return Estimator</h6>
                        <p className="ps-2">
                          Estimation is based on the past performance
                        </p>
                      </div>
                    </div>
                  </div>

                  <Form>
                    <div className={`${lumpsumStyle.customformgroup} `}>
                      <div className={lumpsumStyle.custominputwrapper}>
                        <label className={lumpsumStyle.customlabel}>
                          Enter Amount
                        </label>
                        <input
                          type="number"
                          className={lumpsumStyle.custominput}
                          placeholder="₹ 5,000"
                        />
                      </div>
                    </div>

                    <Form.Group className="pt-5">
                      <div className={`d-flex justify-content-between ${lumpsumStyle.rangefield}`}>
                        <Form.Label>Select Duration</Form.Label>
                        <span>10 Yr</span>
                      </div>

                      <Form.Range min={1} max={40} defaultValue={10} />
                      <div className={`d-flex justify-content-between ${lumpsumStyle.belowrangefield}`}>
                        <span>1 Yr</span>
                        <span>30 Yr</span>
                      </div>
                    </Form.Group>

                    <Form.Group className="pt-5">
                      <div className={`d-flex justify-content-between ${lumpsumStyle.rangefield}`}>
                        <Form.Label>Expected Rate of Return</Form.Label>
                        <span> 12%</span>
                      </div>
                      <Form.Range min={1} max={40} defaultValue={10} />
                      <div className={`d-flex justify-content-between ${lumpsumStyle.belowrangefield}`}>
                        <span>8%</span>
                        <span>30 %</span>
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
                <div className={lumpsumStyle.lumpsumCard}>
                  <div
                    className={`d-flex align-items-center flex-column ${lumpsumStyle.verticalLine} `}
                  >
                    <div className={`${lumpsumStyle.totalInvest} ps-5 mt-2`}>
                      <p>
                        The total value of your investment after <strong>10 Years </strong>will
                        be
                      </p>
                      <h2>₹ 4,09,174</h2>
                    </div>
                    <div className="d-flex pt-4">
                      <div className="d-flex flex-column">
                        <Image src={InvestImg} alt="investImg" />
                        <div className={`${lumpsumStyle.Investbtn} text-center`}>
                        <button className="mt-4" type="button">Invest Now</button>
                        </div>
                      </div>

                      <div className={`ps-5 mt-3`}>
                        <div className={`ps-2 ${lumpsumStyle.investedAmount}`}>
                          <p>Invested Amount</p>
                          <h6>₹ 2,40,000</h6>
                        </div>
                        <div className={`mt-4 ps-2 ${lumpsumStyle.investedAmount}`}>
                          <p>Est. Returns</p>
                          <h6>₹ 69,174</h6>
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
      <div className={`${lumpsumStyle.qaContent} container`}>
        <section>
          <div className={lumpsumStyle.subHeading}>
            <h1 className="text-center"> Lumpsum Calculator</h1>
          </div>
          <Row>
            <Col xs={12} md={4} lg={3}>
              <div className={lumpsumStyle.sidebar}>
                <ul className="list-unstyled">
                  <li className={lumpsumStyle.sidebarItem}>
                    What is a SIP Calculator?
                  </li>
                  <li className={lumpsumStyle.sidebarItem}>
                    How can a SIP Calculator Help You?
                  </li>
                  <li className={lumpsumStyle.sidebarItem}>
                    Advantages of SIP Calculator
                  </li>
                  <li className={lumpsumStyle.sidebarItem}>
                    How to use ET Money's SIP Calculator?
                  </li>
                  <li className={lumpsumStyle.sidebarItem}>
                    Related Mutual Fund SIP Calculators ?
                  </li>
                  <li className={lumpsumStyle.sidebarItem}>
                    Advantages of SIP Calculator
                  </li>
                  <li className={lumpsumStyle.sidebarItem}>
                    Related Mutual Fund SIP Calculators ?
                  </li>
                </ul>
              </div>
            </Col>

            <Col xs={12} md={8} lg={9} className={lumpsumStyle.qandA}>
              <div className={lumpsumStyle.quesAnsSection}>
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
              <div className={lumpsumStyle.quesAnsSection}>
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
              <div className={lumpsumStyle.quesAnsSection}>
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
              <div className={lumpsumStyle.quesAnsSection}>
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
              <div className={lumpsumStyle.quesAnsSection}>
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
          <div className={`${lumpsumStyle.preHeading} py-5`}>
            <h1 className="text-align-left pt-5">
              FAQs (Frequently Asked Questions)
            </h1>
          </div>
          <div>
            <Accordion defaultActiveKey={["1"]} alwaysOpen>
              <Accordion.Item eventKey="0">
                <Accordion.Header className={lumpsumStyle.accordionHeader}>
                  How can a SIP Calculator Help You?
                </Accordion.Header>
                <Accordion.Body className={lumpsumStyle.accordionbody}>
                  There is no maximum tenure of a SIP. You can invest as long as
                  you can. The minimum tenure you can go for is 3 years.
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1">
                <Accordion.Header className={lumpsumStyle.accordionHeader}>
                  Can I modify my SIP amount?
                </Accordion.Header>
                <Accordion.Body className={lumpsumStyle.accordionbody}>
                  There is no maximum tenure of a SIP. You can invest as long as
                  you can. The minimum tenure you can go for is 3 years.
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="2">
                <Accordion.Header className={lumpsumStyle.accordionHeader}>
                  Can I modify my SIP amount?
                </Accordion.Header>
                <Accordion.Body className={lumpsumStyle.accordionbody}>
                  There is no maximum tenure of a SIP. You can invest as long as
                  you can. The minimum tenure you can go for is 3 years.
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="3">
                <Accordion.Header className={lumpsumStyle.accordionHeader}>
                  Can I modify my SIP amount?
                </Accordion.Header>
                <Accordion.Body className={lumpsumStyle.accordionbody}>
                  There is no maximum tenure of a SIP. You can invest as long as
                  you can. The minimum tenure you can go for is 3 years.
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="4">
                <Accordion.Header className={lumpsumStyle.accordionHeader}>
                  Can I modify my SIP amount?
                </Accordion.Header>
                <Accordion.Body className={lumpsumStyle.accordionbody}>
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

export default LumpsumCal;

