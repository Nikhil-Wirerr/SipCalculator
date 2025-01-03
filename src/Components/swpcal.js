"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import SwpStyle from "@/styles/swp.module.css";
import { Accordion, Card, Col, Form, Row } from "react-bootstrap";

const SwpCal = () => {
  const [totalAmount, setTotalAmount] = useState(50000);
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState(1000);
  const [returnRate, setReturnRate] = useState(10);
  const [timePeriod, setTimePeriod] = useState(5);

  const handleWheel = (e) => e.target.blur();

  const calculateFinalValue = (
    totalInvestment,
    monthlyWithdrawal,
    returnRate,
    timePeriod
  ) => {
    const monthlyRate = returnRate / 12 / 100; // Convert annual rate to monthly decimal
    const months = timePeriod * 12; // Convert years to months

    if (monthlyRate === 0) {
      // Handle the case where the rate is 0 (no growth)
      return totalInvestment - monthlyWithdrawal * months;
    }


  //   const finalInvestment = totalInvestment * Math.pow(1 + monthlyRate, months);
  //   const withdrawalImpact =
  //     monthlyWithdrawal *
  //     ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

  //   return Math.max(0, finalInvestment - withdrawalImpact); // Ensure final value is non-negative
  // };


  let currentAmount = totalInvestment;
  for (let month = 0; month < months; month++) {
    currentAmount += currentAmount * monthlyRate; // Apply return to the current amount
    currentAmount -= monthlyWithdrawal; // Deduct the monthly withdrawal
  }

  return currentAmount; // This may be negative or close to zero
};


  const handleInputChange = (value, min, max, setter) => {
    // Allow empty input for manual editing
    if (value === "") {
      setter("");
      return;
    }

    value = Number(value);

    // Validation logic
    if (value > max) {
      setter(max);
    } else {
      setter(value);
    }
  };

  return (
    <>
      <div className={SwpStyle.swpBackground}>
        <div>
          <div className={`${SwpStyle.swppreHeading} container pt-5`}>
            <h1 className="text-left pt-3">
              SWP Calculator
            </h1>
            <p className="pt-2 pb-4">
              SWP stands for systematic withdrawal plan. Under SWP, if you
              invest lump sum in a mutual fund, you can set an amount you’ll
              withdraw regularly and the frequency at which you’ll withdraw.
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
                      className={`d-flex justify-content-between ${SwpStyle.rangefield}`}
                    >
                      <Form.Label>Total Investment</Form.Label>
                      <div className={SwpStyle.rangefield}>
                        {totalAmount !== "" && totalAmount < 10000 && (
                          <small className="text-danger me-3">
                            Minimum value allowed is 10000
                          </small>
                        )}
                        <span className="texr-end">₹</span>
                        <input
                          type="number"
                          value={totalAmount}
                          // onChange={(e) =>
                          //   setTotalAmount(Number(e.target.value))
                          // }

                          onChange={(e) =>
                            handleInputChange(
                              Number(e.target.value),
                              10000,
                              10000000,
                              setTotalAmount
                            )
                          }
                          className={`border-0 text-end ${SwpStyle.custominput}`}
                          onWheel={handleWheel}
                          min={10000}
                          max={10000000}
                        />
                      </div>
                    </div>

                    <Form.Range
                      min={10000}
                      max={10000000}
                      value={totalAmount || 0}
                      // onChange={(e) => setTotalAmount(Number(e.target.value))}
                      onChange={(e) =>
                        handleInputChange(
                          Number(e.target.value),
                          10000,
                          10000000,
                          setTotalAmount
                        )
                      }
                    />
                  </Form.Group>

                  <Form.Group className="m-3 pt-4">
                    <div
                      className={`d-flex justify-content-between ${SwpStyle.rangefield}`}
                    >
                      <Form.Label>Withdrawal Per Month</Form.Label>
                      <div className={SwpStyle.rangefield}>
                        {monthlyWithdrawal !== "" &&
                          monthlyWithdrawal < 500 && (
                            <small className="text-danger me-3">
                              Minimum value allowed is 500
                            </small>
                          )}

                        <span className="texr-end">₹</span>
                        <input
                          type="number"
                          value={monthlyWithdrawal}
                          // onChange={(e) =>
                          //   setMonthlyWithdrawal(Number(e.target.value))
                          // }
                          onChange={(e) =>
                            handleInputChange(
                              e.target.value,
                              500,
                              1000000,
                              setMonthlyWithdrawal
                            )
                          }
                          className={`border-0 text-end ${SwpStyle.custominput}`}
                          onWheel={handleWheel}
                          min={500}
                          max={1000000}
                        />
                      </div>
                    </div>
                    <Form.Range
                      min={500}
                      max={1000000}
                      value={monthlyWithdrawal || 0}
                      // onChange={(e) =>
                      //   setMonthlyWithdrawal(Number(e.target.value))
                      // }
                      onChange={(e) =>
                        handleInputChange(
                          e.target.value,
                          500,
                          1000000,
                          setMonthlyWithdrawal
                        )
                      }
                    />
                  </Form.Group>
                  <Form.Group className="m-3 pt-4">
                    <div
                      className={`d-flex justify-content-between ${SwpStyle.rangefield}`}
                    >
                      <Form.Label>Expected Return Rate (p.a)</Form.Label>
                      <div>
                        {returnRate < 1  &&(
                          <small className="text-danger">
                            Minimum value allowed is 1%
                          </small>
                        )}

                        <input
                          type="number"
                          value={returnRate}
                          // onChange={(e) =>
                          //   setReturnRate(Number(e.target.value))
                          // }
                          onChange={(e) =>
                            handleInputChange(
                              e.target.value,
                              1,
                              30,
                              setReturnRate
                            )
                          }
                          className={`border-0 text-end ${SwpStyle.custominput}`}
                          onWheel={handleWheel}
                          min={1}
                          max={30}
                        />
                        <span>%</span>
                      </div>
                    </div>
                    <Form.Range
                      min={1}
                      max={30}
                      value={returnRate || 1}
                      // onChange={(e) => setReturnRate(Number(e.target.value))}
                      onChange={(e) =>
                        handleInputChange(e.target.value, 1, 30, setReturnRate)
                      }
                    />
                  </Form.Group>

                  <Form.Group className="m-3 pt-4">
                    <div
                      className={`d-flex justify-content-between ${SwpStyle.rangefield}`}
                    >
                      <Form.Label>Time Period</Form.Label>
                      <div>
                        {timePeriod < 1 && (
                          <small className="text-danger">
                            Minimum value allowed is 1 year
                          </small>
                        )}
                        <input
                          type="number"
                          value={timePeriod}
                          // onChange={(e) =>
                          //   setTimePeriod(Number(e.target.value))
                          // }
                          onChange={(e) =>
                            handleInputChange(e.target.value, 1, 30, setTimePeriod)
                          }
                          className={`border-0 text-end ${SwpStyle.custominput}`}
                          onWheel={handleWheel}
                          min={1}
                          max={30}
                        />
                        <span>Yr</span>
                      </div>
                    </div>
                    <Form.Range
                      min={1}
                      max={30}
                      value={timePeriod || 1}
                      // onChange={(e) => setTimePeriod(Number(e.target.value))}
                      onChange={(e) =>
                        handleInputChange(e.target.value, 1, 30, setTimePeriod)
                      }
                    />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
            <div className={SwpStyle.rangefield}>
              <div
                className={`d-flex justify-content-between px-3 ${SwpStyle.rangefield}`}
              >
                <p>Total investment</p>
                {/* <span>₹ 152 </span> */}
                <span>₹ {totalAmount}</span>
              </div>
              <div className="d-flex justify-content-between  px-3">
                <p>Total Withdrawal</p>
                {/* <span>32 years</span> */}
                <span>₹ {monthlyWithdrawal * timePeriod * 12}</span>
              </div>
              <div className="d-flex justify-content-between  px-3">
                <p>Final Value</p>
                {/* <span>₹ 43,000</span> */}
                <span>
                  ₹{" "}
                  {calculateFinalValue(
                    totalAmount,
                    monthlyWithdrawal,
                    returnRate,
                    timePeriod
                  ).toFixed(2)}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className={`${SwpStyle.qaContent} container`}>
        <section>
          <div className={SwpStyle.subHeading}>
            <h1 className="text-center">
              {" "}
              SWP (Systematic Withdrawal Plan) Calculator{" "}
            </h1>
          </div>
          <Row>
            <Col xs={12} md={4} lg={3}>
              <div className={SwpStyle.sidebar}>
                <ul className="list-unstyled">
                  <li className={SwpStyle.sidebarItem}>
                    What is a SWP Calculator?
                  </li>
                  <li className={SwpStyle.sidebarItem}>
                    How can a SWP Calculator Help You?
                  </li>
                  <li className={SwpStyle.sidebarItem}>
                    Advantages of SWP Calculator
                  </li>
                  <li className={SwpStyle.sidebarItem}>
                    How to use ET Money's SWP Calculator?
                  </li>
                  <li className={SwpStyle.sidebarItem}>
                    Related Mutual Fund SWP Calculators ?
                  </li>
                  <li className={SwpStyle.sidebarItem}>
                    Advantages of SWP Calculator
                  </li>
                  <li className={SwpStyle.sidebarItem}>
                    Related Mutual Fund SWP Calculators ?
                  </li>
                </ul>
              </div>
            </Col>

            <Col xs={12} md={8} lg={9} className={SwpStyle.qandA}>
              <div className={SwpStyle.quesAnsSection}>
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
              <div className={SwpStyle.quesAnsSection}>
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
              <div className={SwpStyle.quesAnsSection}>
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
              <div className={SwpStyle.quesAnsSection}>
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
              <div className={SwpStyle.quesAnsSection}>
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
          <div className={`${SwpStyle.faq_Heading} py-5`}>
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
                    className={`${SwpStyle.accbtn} px-0 accordion-button collapsed `}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseOne"
                    aria-expanded="false"
                    aria-controls="flush-collapseOne"
                  >
                    How can a SWP Calculator Help You?{" "}
                  </button>
                </h2>
                <div
                  id="flush-collapseOne"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className={`accordion-body px-0 ${SwpStyle.acco_body}`}>
                  There is no maximum tenure of a SIP. You can invest as long
                  as you can. The minimum tenure you can go for is 3 years.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className={`${SwpStyle.accbtn} px-0 accordion-button collapsed `}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseTwo"
                    aria-expanded="false"
                    aria-controls="flush-collapseTwo"
                  >
                    Can I modify my SWP amount?
                  </button>
                </h2>
                <div
                  id="flush-collapseTwo"
                  className="accordion-collapse collapse show"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className={`accordion-body px-0 ${SwpStyle.acco_body}`}>
                    There is no maximum tenure of a SIP. You can invest as long
                    as you can. The minimum tenure you can go for is 3 years.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className={`${SwpStyle.accbtn} px-0 accordion-button collapsed `}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseThree"
                    aria-expanded="false"
                    aria-controls="flush-collapseThree"
                  >
                    How can a SWP Calculator Help You?{" "}
                  </button>
                </h2>
                <div
                  id="flush-collapseThree"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className={`accordion-body px-0 ${SwpStyle.acco_body}`}>
                  There is no maximum tenure of a SIP. You can invest as long
                  as you can. The minimum tenure you can go for is 3 years.
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className={`${SwpStyle.accbtn} px-0 accordion-button collapsed `}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseFour"
                    aria-expanded="false"
                    aria-controls="flush-collapseFour"
                  >
                    How can a SWP Calculator Help You ?{" "}
                  </button>
                </h2>
                <div
                  id="flush-collapseFour"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className={`accordion-body px-0 ${SwpStyle.acco_body}`}>
                  There is no maximum tenure of a SIP. You can invest as long
                  as you can. The minimum tenure you can go for is 3 years.
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className={`${SwpStyle.accbtn} px-0 accordion-button collapsed `}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseFive"
                    aria-expanded="false"
                    aria-controls="flush-collapseFive"
                  >
                    How can a SWP Calculator Help You  ?{" "}
                  </button>
                </h2>
                <div
                  id="flush-collapseFive"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className={`accordion-body px-0 ${SwpStyle.acco_body}`}>
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

export default SwpCal;
