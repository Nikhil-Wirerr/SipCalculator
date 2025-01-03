"use client";

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import GstStyle from "@/styles/gstcal.module.css";

import {
  Accordion,
  Card,
  Col,
  Dropdown,
  Form,
  Image,
  Row,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";

const GstCal = () => {
  const [investmentType, setInvestmentType] = useState("Exgst");
  const [totalAmount, setTotalAmount] = useState(50000);
  const [gstRate, setGstRate] = useState(12);

  const handleInvestmentTypeChange = (value) => {
    setInvestmentType(value);
  };

  const handleWheel = (e) => e.target.blur();

  const calculateGST = () => {
    const gstValue = (totalAmount * gstRate) / 100;

    if (investmentType === "Exgst") {
      return {
        gst: gstValue,
        postGst: totalAmount + gstValue,
      };

    } else if (investmentType === "Ingst") {
      const amountWithoutGst = totalAmount / (1 + gstRate / 100);
      return {
        gst: totalAmount - amountWithoutGst,
        postGst: amountWithoutGst,
      };
    }
    return { gst: 0, postGst: totalAmount };
  };

  const { gst, postGst } = calculateGST();

  return (
    <>
      <div className={GstStyle.gstBackground}>
        <div className={`${GstStyle.gstpreHeading} container py-5`}>
          <h1 className="text-left ">GST Calculator</h1>
          <p className="pt-2 pb-4">
            The GST calculator helps estimate the potential growth of your Good
            and Services Tax Calculator (GST) investment over your chosen time
            frame. GST is a convenient method to save for your long-term
            financial goals.
          </p>

          <div>
            <Card className="p-4 border border-0 shadow-sm">
              <Row>
                <div>
                  <ToggleButtonGroup
                    type="radio"
                    name="investmentType"
                    value={investmentType}
                    onChange={handleInvestmentTypeChange}
                    className={`${GstStyle.togglebtngroup}`}
                  >
                    <ToggleButton
                      id="exgst-toggle"
                      value="Exgst"
                      variant="outline-primary"
                      className={`border border-0  ${GstStyle.togglebtn} `}
                    >
                      Excluding GST
                    </ToggleButton>
                    <ToggleButton
                      id="ingst-toggle"
                      value="Ingst"
                      variant="outline-primary"
                      className={`border border-0  ${GstStyle.togglebtn} `}
                    >
                      Including GST
                    </ToggleButton>
                  </ToggleButtonGroup>
                </div>
                <Col className="mb-4">
                  <Form>
                    <Form.Group className="m-3 pt-4">
                      <div
                        className={`d-flex justify-content-between ${GstStyle.rangefield}`}
                      >
                        <Form.Label>Total Amount</Form.Label>
                        <div className={GstStyle.rangefield}>
                          <span className="pe-2 text-end">₹</span>
                          <input
                            type="number"
                            value={totalAmount}
                            onChange={(e) =>
                              setTotalAmount(Number (e.target.value).toLocaleString)
                            }
                            className={`border-0 text-end ${GstStyle.custominput}`}
                            onWheel={handleWheel}
                          />
                        </div>
                      </div>
                      <Form.Range
                        min={1}
                        max={500000}
                        value={totalAmount}
                        onChange={(e) => setTotalAmount(Number(e.target.value))}
                      />
                    </Form.Group>

                    <Form.Group className="m-3 pt-4">
                      <div
                        className={`d-flex justify-content-between ${GstStyle.rangefield}`}
                      >
                        <p>Tax GST</p>
                        {/* <span>12%</span> */}
                        <Dropdown className={GstStyle.dropdown}>
                          <Dropdown.Toggle className="px-5">
                            {gstRate}%{" "}
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setGstRate(0.25)}>
                              0.25%
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => setGstRate(3)}>
                              3%
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => setGstRate(8)}>
                              8%
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => setGstRate(16)}>
                              16%
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => setGstRate(28)}>
                              28%
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </Form.Group>
                  </Form>

                  <div
                    className={`d-block d-md-flex pt-4 ${GstStyle.rangefield} `}
                  >
                    <div className={`ps-0 ps-md-3 ${GstStyle.totalGst}`}>
                      <p>Total GST</p>
                      <span>₹ {gst.toLocaleString()}</span>
                    </div>
                    <div className="px-0 px-md-5 mt-4 mt-md-0">
                      <p>
                        {investmentType === "Exgst"
                          ? "Post-Gst AMount"
                          : "Pre-Gst Amount"}
                      </p>
                      <span>₹ {postGst.toLocaleString()}</span>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card>
          </div>
        </div>
      </div>

      <div className={`${GstStyle.qaContent} container`}>
        <section>
          <div className={GstStyle.subHeading}>
            <h1 className="text-center">
              {" "}
              Good and Services Tax Calculator - GST Calculator
            </h1>
          </div>
          <Row>
            <Col xs={12} md={4} lg={3}>
              <div className={GstStyle.sidebar}>
                <ul className="list-unstyled">
                  <li className={GstStyle.sidebarItem}>
                    What is a GST Calculator?
                  </li>
                  <li className={GstStyle.sidebarItem}>
                    How can a GST Calculator Help You?
                  </li>
                  <li className={GstStyle.sidebarItem}>
                    Advantages of GST Calculator
                  </li>
                  <li className={GstStyle.sidebarItem}>
                    How to use Sernet's GST Calculator?
                  </li>
                  <li className={GstStyle.sidebarItem}>
                    Related  Calculators ?
                  </li>
                  <li className={GstStyle.sidebarItem}>
                    Advantages of GST Calculator
                  </li>
                  <li className={GstStyle.sidebarItem}>
                    Related  Calculators ?
                  </li>
                </ul>
              </div>
            </Col>

            <Col xs={12} md={8} lg={9} className={GstStyle.qandA}>
              <div className={GstStyle.quesAnsSection}>
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
              <div className={GstStyle.quesAnsSection}>
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
              <div className={GstStyle.quesAnsSection}>
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
              <div className={GstStyle.quesAnsSection}>
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
              <div className={GstStyle.quesAnsSection}>
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
          <div className={`${GstStyle.faq_Heading} py-5`}>
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
                    className={`${GstStyle.accbtn} px-0 accordion-button collapsed `}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseOne"
                    aria-expanded="false"
                    aria-controls="flush-collapseOne"
                  >
                    How can a GST Calculator Help You?{" "}
                  </button>
                </h2>
                <div
                  id="flush-collapseOne"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className={`accordion-body px-0 ${GstStyle.acco_body}`}>
                  There is no maximum tenure of a SIP. You can invest as long
                  as you can. The minimum tenure you can go for is 3 years.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className={`${GstStyle.accbtn} px-0 accordion-button collapsed `}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseTwo"
                    aria-expanded="false"
                    aria-controls="flush-collapseTwo"
                  >
                    Can I modify my GST amount?
                  </button>
                </h2>
                <div
                  id="flush-collapseTwo"
                  className="accordion-collapse collapse show"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className={`accordion-body px-0 ${GstStyle.acco_body}`}>
                    There is no maximum tenure of a SIP. You can invest as long
                    as you can. The minimum tenure you can go for is 3 years.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className={`${GstStyle.accbtn} px-0 accordion-button collapsed `}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseThree"
                    aria-expanded="false"
                    aria-controls="flush-collapseThree"
                  >
                    How can a GST Calculator Help You?{" "}
                  </button>
                </h2>
                <div
                  id="flush-collapseThree"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className={`accordion-body px-0 ${GstStyle.acco_body}`}>
                  There is no maximum tenure of a SIP. You can invest as long
                  as you can. The minimum tenure you can go for is 3 years.
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className={`${GstStyle.accbtn} px-0 accordion-button collapsed `}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseFour"
                    aria-expanded="false"
                    aria-controls="flush-collapseFour"
                  >
                    How can a GST Calculator Help You ?{" "}
                  </button>
                </h2>
                <div
                  id="flush-collapseFour"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className={`accordion-body px-0 ${GstStyle.acco_body}`}>
                  There is no maximum tenure of a SIP. You can invest as long
                  as you can. The minimum tenure you can go for is 3 years.
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className={`${GstStyle.accbtn} px-0 accordion-button collapsed `}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseFive"
                    aria-expanded="false"
                    aria-controls="flush-collapseFive"
                  >
                    How can a GST Calculator Help You  ?{" "}
                  </button>
                </h2>
                <div
                  id="flush-collapseFive"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className={`accordion-body px-0 ${GstStyle.acco_body}`}>
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

export default GstCal;
