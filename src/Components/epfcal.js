"use client";

import React, { useEffect, useState } from "react";
import EpfStyle from "@/styles/epf.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Accordion, Card, Col, Form, Row } from "react-bootstrap";

const EpfCal = () => {
  const [monthlySalary, setMonthlysalary] = useState(1000);
  const [joiningAge, setJoiningAge] = useState(18);
  const [epfContribution, setEpfContribution] = useState(12);
  const [annualIncrease, setAnnualIncrease] = useState(5);
  //   const [interestRate, setInterestRate] = useState(8.1);
  const [accumulatedAmount, setAccumulatedAmount] = useState(0);

  const retirementAge = 58;
  const interestRate = 8.1;
  const monthlyInterestRate = interestRate / 12 / 100; // Monthly interest rate

  const handleInputChange = (value, min, max, setter) => {
    if (value >= min && value <= max) {
      setter(value);
    }
  };

  const calculateEPF = () => {
    let totalAmount = 0;
    let currentSalary = monthlySalary;
    const years = retirementAge - joiningAge;
    // Calculate for each year
    for (let year = 1; year <= years; year++) {
        const monthlyEmployeeContribution = (currentSalary * epfContribution) / 100;
        const monthlyEmployerContribution = (currentSalary * 3.67) / 100;
        const monthlyTotalContribution = monthlyEmployeeContribution + monthlyEmployerContribution;
        
        // Compound monthly interest on total amount after contribution
        for (let month = 1; month <= 12; month++) {
          totalAmount += monthlyTotalContribution;
          totalAmount *= (1 + monthlyInterestRate); // Monthly compounding
        }
  
        // Apply salary increase annually
        currentSalary *= 1 + annualIncrease / 100;
      }
  
      setAccumulatedAmount(totalAmount.toFixed(2));
    };
  
    useEffect(() => {
      calculateEPF();
    }, [monthlySalary, joiningAge, epfContribution, annualIncrease]);

  const handleWheel = (e) => e.target.blur();

  return (
    <>
      <div className={EpfStyle.swpBackground}>
        <div>
          <div className={`${EpfStyle.swppreHeading} container pt-5`}>
            <h1 className="text-left pt-3">EPF Calculator</h1>
            <p className="pt-2 pb-4">
              EPF stands for Employee Provident Fund. Under EPF, if you invest
              lump sum in a mutual fund, you can set an amount you’ll withdraw
              regularly and the frequency at which you’ll withdraw.
            </p>
          </div>
        </div>

        <div className="container">
          <Card className="px-3 py-3 border border-0 shadow-sm">
            <Row>
              <Col className="mb-4">
                <Form>
                  <Form.Group className="m-3 pt-4">
                    <div
                      className={`d-flex justify-content-between ${EpfStyle.rangefield}`}
                    >
                      <Form.Label>Monthly Salary (Basic + DA)</Form.Label>
                      <div className={EpfStyle.rangefield}>
                        <span className="texr-end">₹</span>
                        <input
                          type="number"
                          value={monthlySalary}
                          onChange={(e) =>
                            handleInputChange(
                              Number(e.target.value),
                              1000,
                              500000,
                              setMonthlysalary
                            )
                          }
                          className={`border-0 text-end ${EpfStyle.custominput}`}
                          onWheel={handleWheel}
                          min={1000}
                          max={500000}
                        />
                      </div>
                    </div>

                    <Form.Range
                      min={1000}
                      max={500000}
                      value={monthlySalary}
                      // onChange={(e) => setTotalAmount(Number(e.target.value))}
                      onChange={(e) =>
                        handleInputChange(
                          Number(e.target.value),
                          1000,
                          500000,
                          setMonthlysalary
                        )
                      }
                    />
                  </Form.Group>

                  <Form.Group className="m-3 pt-4">
                    <div
                      className={`d-flex justify-content-between ${EpfStyle.rangefield}`}
                    >
                      <Form.Label>Joining Age</Form.Label>
                      <div className={EpfStyle.rangefield}>
                        <input
                          type="number"
                          value={joiningAge}
                          className={`border-0 text-end ${EpfStyle.custominput}`}
                          onWheel={handleWheel}
                          min={15}
                          max={58}
                          onChange={(e) =>
                            handleInputChange(
                              Number(e.target.value),
                              15,
                              58,
                              setJoiningAge
                            )
                          }
                        />
                      </div>
                    </div>
                    <Form.Range
                      min={15}
                      max={58}
                      value={joiningAge}
                      onChange={(e) =>
                        handleInputChange(
                          Number(e.target.value),
                          15,
                          58,
                          setJoiningAge
                        )
                      }
                    />
                  </Form.Group>
                  <Form.Group className="m-3 pt-4">
                    <div
                      className={`d-flex justify-content-between ${EpfStyle.rangefield}`}
                    >
                      <Form.Label>Your Contribution to EPF</Form.Label>
                      <div>
                        <input
                          type="number"
                          value={epfContribution}
                          onChange={(e) =>
                            handleInputChange(
                              Number(e.target.value),
                              12,
                              20,
                              setEpfContribution
                            )
                          }
                          className={`border-0 text-end ${EpfStyle.custominput}`}
                          onWheel={handleWheel}
                          min={12}
                          max={20}
                        />
                        <span>%</span>
                      </div>
                    </div>
                    <Form.Range
                      min={12}
                      max={20}
                      value={epfContribution}
                      onChange={(e) =>
                        handleInputChange(
                          Number(e.target.value),
                          12,
                          20,
                          setEpfContribution
                        )
                      }
                    />
                  </Form.Group>

                  <Form.Group className="m-3 pt-4">
                    <div
                      className={`d-flex justify-content-between ${EpfStyle.rangefield}`}
                    >
                      <Form.Label>Annual Increase in Salary</Form.Label>
                      <div>
                        <input
                          type="number"
                          value={annualIncrease}
                          onChange={(e) =>
                            handleInputChange(
                              Number(e.target.value),
                              1,
                              15,
                              setAnnualIncrease
                            )
                          }
                          className={`border-0 text-end ${EpfStyle.custominput}`}
                          onWheel={handleWheel}
                          min={1}
                          max={15}
                        />
                        <span>%</span>
                      </div>
                    </div>
                    <Form.Range
                      min={1}
                      max={15}
                      value={annualIncrease}
                      onChange={(e) =>
                        handleInputChange(
                          Number(e.target.value),
                          1,
                          15,
                          setAnnualIncrease
                        )
                      }
                    />
                  </Form.Group>

                  <Form.Group className="px-3 pt-2">
                    <div
                      className={`d-flex justify-content-between ${EpfStyle.rangefield}`}
                    >
                      <Form.Label>Rate of Interest </Form.Label>
                      <div className={EpfStyle.rangecustominput}>
                        {/* <span>7.1%</span> */}
                        <p>{interestRate}%</p>
                      </div>
                    </div>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Card>
          <div className={EpfStyle.cardbottom}>
            <p className="text-center py-5">
              You Will have accumulated <br />
              {/* ₹ 2,53,46,997 */}₹ {accumulatedAmount.toLocaleString()}
              <br />
              by the time you retire
            </p>
          </div>
        </div>
      </div>

      <div className={`${EpfStyle.qaContent} container`}>
        <section>
          <div className={EpfStyle.subHeading}>
            <h1 className="text-center"> Employee Provident Fund Calculator</h1>
          </div>
          <Row>
            <Col xs={12} md={4} lg={3}>
              <div className={EpfStyle.sidebar}>
                <ul className="list-unstyled">
                  <li className={EpfStyle.sidebarItem}>
                    What is a EPF Calculator?
                  </li>
                  <li className={EpfStyle.sidebarItem}>
                    How can a EPF Calculator Help You?
                  </li>
                  <li className={EpfStyle.sidebarItem}>
                    Advantages of EPF Calculator
                  </li>
                  <li className={EpfStyle.sidebarItem}>
                    How to use Sernet's EPF Calculator?
                  </li>
                  <li className={EpfStyle.sidebarItem}>
                    Related EPF Calculators ?
                  </li>
                  <li className={EpfStyle.sidebarItem}>
                    Advantages of EPF Calculator
                  </li>
                  <li className={EpfStyle.sidebarItem}>
                    Related EPF Calculators ?
                  </li>
                </ul>
              </div>
            </Col>

            <Col xs={12} md={8} lg={9} className={EpfStyle.qandA}>
              <div className={EpfStyle.quesAnsSection}>
                <h3>What is a EPF Calculator?</h3>
                <p>
                  A SWP (Systematic Withdrawal Plan) Calculator is an online or
                  software tool used to calculate the potential returns from
                  investing in mutual funds through SIP. It helps investors
                  estimate how much their regular monthly investments can grow
                  over time, considering factors like the investment amount,
                  duration, and expected rate of return.
                </p>
              </div>
              <div className={EpfStyle.quesAnsSection}>
                <h3>How can a EPF Calculator Help You?</h3>
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
              <div className={EpfStyle.quesAnsSection}>
                <h3>Advantages of EPF Calculator</h3>
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
              <div className={EpfStyle.quesAnsSection}>
                <h3>How to use Sernet's EPF Calculator?</h3>
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
              <div className={EpfStyle.quesAnsSection}>
                <h3>Related EPF Calculators ?</h3>
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
          <div className={`${EpfStyle.faq_Heading} py-5`}>
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
                    className={`${EpfStyle.accbtn} px-0 accordion-button collapsed `}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseOne"
                    aria-expanded="false"
                    aria-controls="flush-collapseOne"
                  >
                    How can a EPF Calculator Help You?{" "}
                  </button>
                </h2>
                <div
                  id="flush-collapseOne"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className={`accordion-body px-0 ${EpfStyle.acco_body}`}>
                  There is no maximum tenure of a SIP. You can invest as long
                  as you can. The minimum tenure you can go for is 3 years.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className={`${EpfStyle.accbtn} px-0 accordion-button collapsed `}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseTwo"
                    aria-expanded="false"
                    aria-controls="flush-collapseTwo"
                  >
                    Can I modify my EPF amount?
                  </button>
                </h2>
                <div
                  id="flush-collapseTwo"
                  className="accordion-collapse collapse show"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className={`accordion-body px-0 ${EpfStyle.acco_body}`}>
                    There is no maximum tenure of a SIP. You can invest as long
                    as you can. The minimum tenure you can go for is 3 years.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className={`${EpfStyle.accbtn} px-0 accordion-button collapsed `}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseThree"
                    aria-expanded="false"
                    aria-controls="flush-collapseThree"
                  >
                    How can a EPF Calculator Help You?{" "}
                  </button>
                </h2>
                <div
                  id="flush-collapseThree"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className={`accordion-body px-0 ${EpfStyle.acco_body}`}>
                  There is no maximum tenure of a SIP. You can invest as long
                  as you can. The minimum tenure you can go for is 3 years.
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className={`${EpfStyle.accbtn} px-0 accordion-button collapsed `}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseFour"
                    aria-expanded="false"
                    aria-controls="flush-collapseFour"
                  >
                    How can a EPF Calculator Help You ?{" "}
                  </button>
                </h2>
                <div
                  id="flush-collapseFour"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className={`accordion-body px-0 ${EpfStyle.acco_body}`}>
                  There is no maximum tenure of a SIP. You can invest as long
                  as you can. The minimum tenure you can go for is 3 years.
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className={`${EpfStyle.accbtn} px-0 accordion-button collapsed `}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseFive"
                    aria-expanded="false"
                    aria-controls="flush-collapseFive"
                  >
                    How can a EPF  Calculator Help You  ?{" "}
                  </button>
                </h2>
                <div
                  id="flush-collapseFive"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className={`accordion-body px-0 ${EpfStyle.acco_body}`}>
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

export default EpfCal;
