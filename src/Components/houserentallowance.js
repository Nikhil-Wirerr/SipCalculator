"use client";

import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import HouseRentStyle from "@/styles/houserentallownce.module.css";
import {
  Accordion,
  Card,
  Col,
  Form,
  Row,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";

const HouseRentAllowanceaCal = () => {
  const [totalAmount, setTotalAmount] = useState(100);
  const [selectedOption, setSelectedOption] = useState("");

  const [basicSalary, setBasicSalary] = useState(0);
  const [dearnessAllowance, setDearnessAllowance] = useState(0);
  const [hraReceived, setHraReceived] = useState(0);
  const [ rentpaid , setRentPaid] = useState(0);
  const [isMetro, setIsMetro] = useState(false);
  const [exemptedHRA, setExemptedHRA] = useState(0);

  const calculateHRA = ()=>{
    const salaryComponent = basicSalary + dearnessAllowance;
    const rentExcess = rentpaid - 0.1 * salaryComponent; //rent minus 10% of salary
    const metroLimit = isMetro ? 0.5 : 0.4; // 50% for metro, 40% for non-metro
    const maxExemption = metroLimit * salaryComponent;

    const exempted = Math.min(hraReceived, rentExcess, maxExemption);

    // console.log({
    //   salaryComponent,
    //   rentExcess,
    //   maxExemption,
    //   exempted,
    // });
    
    setExemptedHRA(Math.max(exempted , 0));
  }

  //recalculate hra when input change
  useEffect(() => {
    calculateHRA();
  }, [basicSalary, dearnessAllowance, hraReceived, rentpaid, isMetro])

  const handleWheel = (e) => e.target.blur();


  // const handleOptionChange = (e) => {
  //   setSelectedOption(e.target.value);
  // };

  return (
    <>
      <div className={HouseRentStyle.hraBackground}>
        <div className={`${HouseRentStyle.gstpreHeading} container pt-5`}>
          <h1 className="text-left pt-3">HRA Calculator</h1>
          <p className="pt-2 pb-4">
            The HRA calculator helps estimate the potential growth of your House
            rent allowance investment over your chosen time frame. GST is a
            convenient method to save for your long-term financial goals.
          </p>
        </div>
      </div>

      <div className="container">
        <Card className="p-4 border-0 shadow">
          <Row>
            <Col className="mb-4">
              <Form>
                <Form.Group className="m-3">
                  <div
                    className={`d-flex justify-content-between ${HouseRentStyle.rangefield}`}
                  >
                    <Form.Label>Basic salary  (p.a)</Form.Label>
                    <div className={HouseRentStyle.rangefield}>
                      <span className="pe-2  text-end">₹</span>
                      <input
                        type="number"
                        value={basicSalary}
                        onChange={(e) => setBasicSalary(Number(e.target.value))}
                        className={ `border-0 text-end ${HouseRentStyle.custominput}`}
                        onWheel={handleWheel}
                      />
                    </div>
                  </div>
                </Form.Group>

                <Form.Group className="m-3">
                  <div
                    className={`d-flex justify-content-between ${HouseRentStyle.rangefield}`}
                  >
                    <Form.Label>Dearness allowance (p.a)</Form.Label>
                    <div className={HouseRentStyle.rangefield}>
                      <span className="pe-2 text-end">₹</span>
                      <input
                        type="number"
                        value={dearnessAllowance}
                        onChange={(e) => setDearnessAllowance(Number(e.target.value))}
                        className={ `border-0 text-end ${HouseRentStyle.custominput}`}
                        onWheel={handleWheel}
                      />
                    </div>
                  </div>
                </Form.Group>

                <Form.Group className="m-3">
                  <div
                    className={`d-flex justify-content-between ${HouseRentStyle.rangefield}`}
                  >
                    <Form.Label>HRA received (p.a)</Form.Label>
                    <div className={HouseRentStyle.rangefield}>
                      <span className="pe-2 text-end">₹</span>
                      <input
                        type="number"
                        value={hraReceived}
                        onChange={(e) => setHraReceived(Number(e.target.value))}
                        className={ `border-0 text-end ${HouseRentStyle.custominput}`}
                        onWheel={handleWheel}
                      />
                    </div>
                  </div>
                </Form.Group>

                <Form.Group className="m-3">
                  <div
                    className={`d-flex justify-content-between ${HouseRentStyle.rangefield}`}
                  >
                    <Form.Label>Total rent paid (p.a)</Form.Label>
                    <div className={HouseRentStyle.rangefield}>
                      <span className="pe-2 text-end">₹</span>
                      <input
                        type="number"
                        value={rentpaid}
                        onChange={(e) => setRentPaid(Number(e.target.value))}
                        className={ `border-0 text-end ${HouseRentStyle.custominput}`}
                        onWheel={handleWheel}
                      />
                    </div>
                  </div>
                </Form.Group>

                <Form.Group className="m-3 pt-4">
                  <div
                    className={`${HouseRentStyle.hra_radio_button} d-flex justify-content-between align-items-center`}
                  >
                    <Form.Label>Are you working in a metro city?</Form.Label>
                    <div className="d-flex justify-content-center align-items-center">
                      <Form.Check
                        inline
                        type="radio"
                        id="metroCityYes"
                        name="metroCity"
                        label="Yes"
                        value="yes"
                        checked={isMetro === true}
                        onChange={ () => setIsMetro(true)}
                      />
                      <Form.Check
                        inline
                        type="radio"
                        id="metroCityNo"
                        name="metrocity"
                        label="No"
                        value="no"
                        checked={isMetro === false}
                        onChange={() => setIsMetro(false)}
                      />
                    </div>
                  </div>
                </Form.Group> 
              </Form>
            </Col>
          </Row>
        </Card>

        <div
          className={`d-flex justify-content-around pt-5 ${HouseRentStyle.cardbottom} `}
        >
          <div className={HouseRentStyle.cardbottom}>
            <h6>Exempted HRA</h6>
            {/* <p> ₹ 3,09,174</p> */}
            <p> ₹ {exemptedHRA.toLocaleString()}</p>

          </div>
          <div>
            <h6> Taxable HRA</h6>
            {/* <p>₹ 0</p> */}
            <p> ₹ {(hraReceived - exemptedHRA).toLocaleString()}</p>
          </div>
        </div>
        <div className={HouseRentStyle.cardbottom}>
          <p className="text-center py-5">
            Invest in ELSS Mutual funds and save tax Under 80c as per old regime
          </p>
        </div>
      </div>

      <div className={`${HouseRentStyle.qaContent} container`}>
        <section>
          <div className={HouseRentStyle.subHeading}>
            <h1 className="text-center">
              {" "}
              House rent allowance- HRA Calculator
            </h1>
          </div>
          <Row>
            <Col xs={12} md={4} lg={3}>
              <div className={HouseRentStyle.sidebar}>
                <ul className="list-unstyled">
                  <li className={HouseRentStyle.sidebarItem}>
                    What is a SIP Calculator?
                  </li>
                  <li className={HouseRentStyle.sidebarItem}>
                    How can a SIP Calculator Help You?
                  </li>
                  <li className={HouseRentStyle.sidebarItem}>
                    Advantages of SIP Calculator
                  </li>
                  <li className={HouseRentStyle.sidebarItem}>
                    How to use ET Money's SIP Calculator?
                  </li>
                  <li className={HouseRentStyle.sidebarItem}>
                    Related Mutual Fund SIP Calculators ?
                  </li>
                  <li className={HouseRentStyle.sidebarItem}>
                    Advantages of SIP Calculator
                  </li>
                  <li className={HouseRentStyle.sidebarItem}>
                    Related Mutual Fund SIP Calculators ?
                  </li>
                </ul>
              </div>
            </Col>

            <Col xs={12} md={8} lg={9} className={HouseRentStyle.qandA}>
              <div className={HouseRentStyle.quesAnsSection}>
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
              <div className={HouseRentStyle.quesAnsSection}>
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
              <div className={HouseRentStyle.quesAnsSection}>
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
              <div className={HouseRentStyle.quesAnsSection}>
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
              <div className={HouseRentStyle.quesAnsSection}>
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
          <div className={`${HouseRentStyle.preHeading} py-5`}>
            <h1 className="text-align-left pt-5">
              FAQs (Frequently Asked Questions)
            </h1>
          </div>
          <div>
            <Accordion defaultActiveKey={["1"]} alwaysOpen>
              <Accordion.Item eventKey="0">
                <Accordion.Header className={HouseRentStyle.accordionHeader}>
                  How can a SIP Calculator Help You?
                </Accordion.Header>
                <Accordion.Body className={HouseRentStyle.accordionbody}>
                  There is no maximum tenure of a SIP. You can invest as long as
                  you can. The minimum tenure you can go for is 3 years.
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1">
                <Accordion.Header className={HouseRentStyle.accordionHeader}>
                  Can I modify my SIP amount?
                </Accordion.Header>
                <Accordion.Body className={HouseRentStyle.accordionbody}>
                  There is no maximum tenure of a SIP. You can invest as long as
                  you can. The minimum tenure you can go for is 3 years.
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="2">
                <Accordion.Header className={HouseRentStyle.accordionHeader}>
                  Can I modify my SIP amount?
                </Accordion.Header>
                <Accordion.Body className={HouseRentStyle.accordionbody}>
                  There is no maximum tenure of a SIP. You can invest as long as
                  you can. The minimum tenure you can go for is 3 years.
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="3">
                <Accordion.Header className={HouseRentStyle.accordionHeader}>
                  Can I modify my SIP amount?
                </Accordion.Header>
                <Accordion.Body className={HouseRentStyle.accordionbody}>
                  There is no maximum tenure of a SIP. You can invest as long as
                  you can. The minimum tenure you can go for is 3 years.
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="4">
                <Accordion.Header className={HouseRentStyle.accordionHeader}>
                  Can I modify my SIP amount?
                </Accordion.Header>
                <Accordion.Body className={HouseRentStyle.accordionbody}>
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

export default HouseRentAllowanceaCal;


 {/* <Form.Group className="m-3 pt-4">
                  <div
                    className={`${HouseRentStyle.rangefield} d-flex justify-content-between`}
                  >
                    <Form.Label>Basic salary (p.a)</Form.Label>
                    <span>₹{" "}69,174</span>
                  </div>
                </Form.Group>

                <Form.Group className="m-3 pt-4">
                  <div
                    className={`${HouseRentStyle.rangefield} d-flex justify-content-between`}
                  >
                    <Form.Label>Dearness allowance (p.a)</Form.Label>
                    <span>₹ 0</span>
                  </div>
                </Form.Group>

                <Form.Group className="m-3 pt-4">
                  <div
                    className={`${HouseRentStyle.rangefield} d-flex justify-content-between`}
                  >
                    <Form.Label>HRA received (p.a)</Form.Label>
                    <span>₹ 10,174</span>
                  </div>
                </Form.Group>

                <Form.Group className="m-3 pt-4">
                  <div
                    className={`${HouseRentStyle.rangefield} d-flex justify-content-between`}
                  >
                    <Form.Label>Total rent paid (p.a)</Form.Label>
                    <span>₹ 19,174</span>
                  </div>
                </Form.Group>

                <Form.Group className="m-3 pt-4">
                  <div
                    className={`${HouseRentStyle.rangefield} d-flex justify-content-between align-items-center`}
                  >
                    <Form.Label>Are you working in a metro city?</Form.Label>
                    <div className="d-flex justify-content-center align-items-center">
                      <Form.Check
                        inline
                        type="radio"
                        id="metroCityYes"
                        name="metroCity"
                        label="Yes"
                        value="yes"
                        checked={selectedOption === "yes"}
                        onChange={handleOptionChange}
                      />
                      <Form.Check
                        inline
                        type="radio"
                        id="metroCityNo"
                        name="metrocity"
                        label="No"
                        value="no"
                        checked={selectedOption === "no"}
                        onChange={handleOptionChange}
                      />
                    </div>
                  </div>
                </Form.Group> */}