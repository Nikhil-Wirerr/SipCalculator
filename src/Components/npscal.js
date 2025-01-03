"use client";

import React, { useMemo, useState } from "react";
import NpsStyle from "@/styles/nps.module.css";
import { Accordion, Card, Col, Form, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const NpsCal = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [age, setAge] = useState(25);
  const [expectedReturnRate, setExpectedReturnRate] = useState(9);

  const handleWheel = (e) => e.target.blur();

  // Derived values
  const retirementAge = 60;
  const tenure = retirementAge - age;
  const annualRate = expectedReturnRate / 100;
  const monthlyRate = annualRate / 12;
  const totalMonths = tenure * 12;

  // Calculations using Groww's formula
  const totalInvestment = monthlyInvestment * 12 * tenure;

  const maturityAmount = useMemo(() => {
    return (
      (monthlyInvestment * (Math.pow(1 + monthlyRate, totalMonths) - 1)) /
      monthlyRate
    );
  }, [monthlyInvestment, monthlyRate, totalMonths]);

  const interestEarned = maturityAmount - totalInvestment;
  const minAnnuityInvestment = maturityAmount * 0.4;

  return (
    <>
      <div className={NpsStyle.swpBackground}>
        <div>
          <div className={`${NpsStyle.swppreHeading} container pt-5`}>
            <h1 className="text-left">NPS Calculator</h1>
            <p className="pt-2 ">
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
          <Card className="px-3 py-3 mb-4 border border-0 shadow-sm">
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
                          onChange={(e) =>
                            setMonthlyInvestment(Number(e.target.value))
                          }
                          //   onChange={handleMonthlyInvestmentChange}
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
                <span>₹ {totalInvestment.toLocaleString()}</span>
              </div>
              <div className="d-flex justify-content-between  px-3">
                <p>Interest Earned</p>
                <span>₹ {interestEarned.toLocaleString()}</span>
              </div>
              <div className="d-flex justify-content-between  px-3">
                <p>Final Maturity amount</p>
                <span>₹ {maturityAmount.toLocaleString()}</span>
              </div>
              <div className="d-flex justify-content-between  px-3">
                <p>Min Annuity Investment</p>
                <span>₹ {minAnnuityInvestment.toLocaleString()}</span>
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
                  <li id="nps-q1" className={NpsStyle.sidebarItem}>
                    <a href="#what-is-nps1"> What is a NPS Calculator?</a>
                  </li>
                  <li id="nps-q2" className={NpsStyle.sidebarItem}>
                    <a href="#how-can-nps2">How can a NPS Calculator Help You?</a>
                  </li>
                  <li id="nps-q3" className={NpsStyle.sidebarItem}>
                  <a href="#adv-of-nps3">Advantages of NPS Calculator</a>
                  </li>
                  <li id="nps-q4" className={NpsStyle.sidebarItem}>
                  <a href="#how-to-nps4"> How to use Sernet NPS Calculator?</a>
                  </li>
                  <li id="nps-q5" className={NpsStyle.sidebarItem}>
                  <a href="nps-related5"> Related Mutual Fund NPS Calculators ?</a>
                  </li>
                  <li id="nps-q6" className={NpsStyle.sidebarItem}>
                  <a href="nps-adv6"> Advantages of NPS Calculator</a>
                  </li>
                  <li id="nps-q7" className={NpsStyle.sidebarItem}>
                  <a href="nps-related7"> Related Mutual Fund NPS Calculators ?</a>
                  </li>
                </ul>
              </div>
            </Col>

            <Col xs={12} md={8} lg={9} className={NpsStyle.qandA}>
            <section id="what-is-nps1">
              <div className={NpsStyle.quesAnsSection} >
                <h3>What is a NPS Calculator?</h3>
                <p>
                  A SWP (Systematic Withdrawal Plan) Calculator is an online or
                  software tool used to calculate the potential returns from
                  investing in mutual funds through SIP. It helps investors
                  estimate how much their regular monthly investments can grow
                  over time, considering factors like the investment amount,
                  duration, and expected rate of return.
                </p>
              </div>
              </section>
              <div className={NpsStyle.quesAnsSection} id="#how-can-nps2">
                <h3>How can a NPS Calculator Help You?</h3>
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
              <div className={NpsStyle.quesAnsSection} id="adv-of-nps3">
                <h3>Advantages of NPS Calculator</h3>
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
              <div className={NpsStyle.quesAnsSection} id="#how-to-nps4">
                <h3>How to use Sernet's NPS Calculator?</h3>
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
              <div className={NpsStyle.quesAnsSection} id="nps-related5">
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
          <div className={`${NpsStyle.faq_Heading} py-5`}>
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
                    className={`${NpsStyle.accbtn} px-0 accordion-button collapsed `}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseOne"
                    aria-expanded="false"
                    aria-controls="flush-collapseOne"
                  >
                    How can a NPS Calculator Help You?{" "}
                  </button>
                </h2>
                <div
                  id="flush-collapseOne"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className={`accordion-body px-0 ${NpsStyle.acco_body}`}>
                  There is no maximum tenure of a SIP. You can invest as long
                  as you can. The minimum tenure you can go for is 3 years.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className={`${NpsStyle.accbtn} px-0 accordion-button collapsed `}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseTwo"
                    aria-expanded="false"
                    aria-controls="flush-collapseTwo"
                  >
                    Can I modify my NPS amount?
                  </button>
                </h2>
                <div
                  id="flush-collapseTwo"
                  className="accordion-collapse collapse show"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className={`accordion-body px-0 ${NpsStyle.acco_body}`}>
                    There is no maximum tenure of a SIP. You can invest as long
                    as you can. The minimum tenure you can go for is 3 years.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className={`${NpsStyle.accbtn} px-0 accordion-button collapsed `}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseThree"
                    aria-expanded="false"
                    aria-controls="flush-collapseThree"
                  >
                    How can a NPS Calculator Help You?{" "}
                  </button>
                </h2>
                <div
                  id="flush-collapseThree"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className={`accordion-body px-0 ${NpsStyle.acco_body}`}>
                  There is no maximum tenure of a SIP. You can invest as long
                  as you can. The minimum tenure you can go for is 3 years.
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className={`${NpsStyle.accbtn} px-0 accordion-button collapsed `}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseFour"
                    aria-expanded="false"
                    aria-controls="flush-collapseFour"
                  >
                    How can a NPS Calculator Help You ?{" "}
                  </button>
                </h2>
                <div
                  id="flush-collapseFour"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className={`accordion-body px-0 ${NpsStyle.acco_body}`}>
                  There is no maximum tenure of a SIP. You can invest as long
                  as you can. The minimum tenure you can go for is 3 years.
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className={`${NpsStyle.accbtn} px-0 accordion-button collapsed `}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseFive"
                    aria-expanded="false"
                    aria-controls="flush-collapseFive"
                  >
                    How can a NPS Calculator Help You  ?{" "}
                  </button>
                </h2>
                <div
                  id="flush-collapseFive"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className={`accordion-body px-0 ${NpsStyle.acco_body}`}>
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

export default NpsCal;
