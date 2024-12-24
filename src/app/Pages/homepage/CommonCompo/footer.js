"use client";

// import { Button } from 'bootstrap';
import { Button, Card, FormGroup } from "react-bootstrap";
import React from "react";
import { Col, Container, Form, ListGroup, Row } from "react-bootstrap";
import TranslateLogo from "@/app/assets/translate.svg";
import FooterBrandLogo from "@/app/assets/footer-brand-logo.png";
import FooterfbLogo from "@/app/assets/footer-facebook.svg";
import FooterYtubeLogo from '@/app/assets/footer-youtube.svg';
import FooterLinkdenLogo from '@/app/assets/footer-linkedin.svg';
import FooterGoogleLogo from '@/app/assets/footer-google-plus.svg';
import EnterNameLogo from '@/app/assets/enter-name-icon.svg';
import MailLogo from '@/app/assets/enter-msg-icon.svg';
import Contactphone from '@/app/assets/contact-call.svg';
import Contactmail from '@/app/assets/contact-mail.svg';
import Contactlocation from '@/app/assets/contact-locatn.svg';
import Image from "next/image";
import footerStyle from "@/app/Pages/homepage/CommonCompo/footer.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";

function Footer() {
  return (
    <footer>
      <Container className="mt-5">
        <div className={footerStyle.contact_top_margin}>
          <Row>
            <Col xs={12} lg={6}>
              <div className={footerStyle.contactDetails}>
                <h3>Contact Us</h3>
                <ListGroup className="mt-5">
                  <ListGroup.Item className="mb-4 border-0">
                    <div className="d-flex align-items-center">
                      <div
                        className={` ${footerStyle.contactBg}  d-flex justify-content-center align-items-center`}
                      >
                        <Image
                          src={Contactphone}
                          className={footerStyle.contactIcon}
                          alt="Phone Icon"
                        />
                      </div>
                      <div className="ms-3">
                        <h6>Phone Number</h6>
                        <p className="mb-0">+91 99988 11124</p>
                      </div>
                    </div>
                  </ListGroup.Item>

                  <ListGroup.Item className="mb-4 border-0">
                    <div className="d-flex align-items-center">
                      <div
                        className={`${footerStyle.contactBg}  d-flex justify-content-center align-items-center`}
                      >
                        <Image
                          src={Contactmail}
                          className={footerStyle.contactIcon}
                          alt="Mail Icon"
                        />
                      </div>
                      <div className="ms-3">
                        <h6>Email Address</h6>
                        <p className="mb-0">
                          <a
                            href="mailto:Provinceit@gmail.com"
                            className="text-decoration-none"
                          >
                            Provinceit@gmail.com
                          </a>
                        </p>
                      </div>
                    </div>
                  </ListGroup.Item>

                  <ListGroup.Item className="border-0">
                    <div className="d-flex align-items-center">
                      <div
                        className={`${footerStyle.contactBg}  d-flex justify-content-center align-items-center`}
                      >
                        <Image
                          src={Contactlocation}
                          className={footerStyle.contactIcon}
                          alt="Location Icon"
                        />
                      </div>
                      <div className="ms-3">
                        <h6>Address</h6>
                        <p className="mb-0">
                          B 201 Hemu Classic Premises CS Ltd <br />
                          Opp Newera Cinema, Malad West <br />
                          Mumbai 400064, Maharashtra, India
                        </p>
                      </div>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </div>
            </Col>

            <Col xs={12} lg={6}>
              <div
                className={`${footerStyle.mapContainer}  rounded overflow-hidden`}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.2629764877797!2d72.84448637551331!3d19.18371298204323!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b6fceac4ac33%3A0xe22243ec5a895685!2sSERNET%20Financial%20Services%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1733466623778!5m2!1sen!2sin"
                  width="100%"
                  height="418"
                  allowFullScreen
                  loading="lazy"
                  style={{ border: "none" }}
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </Col>
          </Row>
        </div>

        <Card className={footerStyle.card_border_radius}>
          <div className={footerStyle.signupOverlay}>
            {/* Newsletter Signup Section */}
            <div className={footerStyle.signupSection}>
              <Row className="py-5 align-items-center">
                <Col xs={12} lg={8}>
                  <div className={`${footerStyle.newsletterBox} px-4`}>
                    <h2 className="mb-5">Sign up for the Sernet newsletter</h2>
                    <Form>
                      {/* Input Fields */}
                      <Row className="mb-3">
                        <Col xs={12} sm={6} className="mb-3 mb-sm-0">
                          <div
                            className={`d-flex align-items-center ${footerStyle.signupInput}`}
                          >
                            <span className="me-2">
                              <Image
                                src={EnterNameLogo}
                                alt="Name Icon"
                                width={20}
                                height={20}
                              />
                            </span>
                            <Form.Control
                              type="text"
                              placeholder="Enter your name"
                              className={`ps-2 ${footerStyle.customInput}`}
                            />
                          </div>
                        </Col>
                        <Col xs={12} sm={6}>
                          <div
                            className={`d-flex align-items-center ${footerStyle.signupInput}`}
                          >
                            <span className="me-2">
                              <Image
                                src={MailLogo}
                                alt="Message Icon"
                                width={20}
                                height={20}
                              />
                            </span>
                            <Form.Control
                              type="email"
                              placeholder="Valid email ID"
                              className={`ps-2 ${footerStyle.customInput}`}                            />
                          </div>
                        </Col>
                      </Row>

                      {/* Checkboxes */}
                      <div className={`d-flex flex-wrap gap-3 my-4 ${footerStyle.formCheck} `}>
                        <Form.Check
                          type="checkbox"
                          id="freeEbooks"
                          label="Free e-Book(s)"
                          className={footerStyle.checkBox}
                        />
                        <Form.Check
                          type="checkbox"
                          id="usefulArticles"
                          label="Useful Articles"
                        />
                        <Form.Check
                          type="checkbox"
                          id="productIdeas"
                          label="Product Ideas"
                        />
                      </div>

                      {/* Submit Button */}
                      <Button
                        type="button"
                        className={` ${footerStyle.signup_Submit_Btn} mt-2`}
                      >
                        Submit
                      </Button>
                    </Form>
                    <p className="mt-4">
                      It's safe. But read{" "}
                      <a
                        href="#"
                        className="fw-bold text-decoration-none text-primary"
                      >
                        PRIVACY
                      </a>{" "}
                      if you want to before subscribing.
                    </p>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Card>
      </Container>
      <div className={footerStyle.footerLinks}>
        <Container>
          <Row className={` ${footerStyle.footer_nav_links}`}>
            {/* Logo and Social Media */}
            <Col xs={12} md={6} lg={3} className="mb-4">
              <div className="pb-4">
                <Image 
                  src={FooterBrandLogo}
                  alt="Footer Logo"
                  width={200}
                  height={40}
                />
              </div>
              <div className={footerStyle.footer_left_info}>
                <p className="mb-0">CIN: U67190MH2004PTC144955</p>
                <p className="mb-0">SEBI – Broker: INZ000189331 </p>
                <p className="mb-0">SEBI – DP: IN DP 401 2019 </p>
                <p className="mb-0">BSE: 6298 | NSE: 90073 | ARN: 35275</p>
                <p className="mb-0">CDSL DP: 1208 8200 | CCRL RP: 1234 1234</p>
              </div>
              <div className={` ${footerStyle.footer_socialIcons} d-flex gap-3 mt-3`}>
                <Image
                  src={FooterfbLogo}
                  alt="Facebook"
                  width={24}
                  height={24}
                />
                <Image
                  src={FooterYtubeLogo}
                  alt="Twitter"
                  width={24}
                  height={24}
                />
                <Image
                  src={FooterYtubeLogo}
                  alt="YouTube"
                  width={24}
                  height={24}
                />
                <Image
                  src={FooterLinkdenLogo}
                  alt="LinkedIn"
                  width={24}
                  height={24}
                />
                <Image
                  src={FooterGoogleLogo}
                  alt="Google Plus"
                  width={30}
                  height={30}
                />
              </div>
            </Col>

            {/* Company Links */}
            <Col xs={12} md={6} lg={3} className= {`mb-4 ${footerStyle.links_heading}`}>
            <ul className="list-unstyled">
              <h6>Company</h6>
                <li>
                  <Link href="#" className="text-decoration-none">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-decoration-none">
                    Offerings
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-decoration-none">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-decoration-none">
                    Partners
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-decoration-none">
                    Career
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-decoration-none">
                    Media & Press
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-decoration-none">
                    CSR
                  </Link>
                </li>
              </ul>
            </Col>

            {/* Account Links */}
            <Col xs={12} md={6} lg={3} className= {`mb-4 ${footerStyle.links_heading}`}>
              <ul className="list-unstyled">
              <h6>Account</h6>
                <li>
                  <Link href="#" className="text-decoration-none">
                    Open an Account
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-decoration-none">
                    List of Charges
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-decoration-none">
                    Update
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-decoration-none">
                    Tools
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-decoration-none">
                    Research
                  </Link>
                </li>
              </ul>
            </Col>


            {/* Support Links */}
            <Col xs={12} md={6} lg={3} className= {`mb-4 ${footerStyle.links_heading}`}>
              <ul className="list-unstyled">
              <h6>Support</h6>
                <li>
                  <Link href="#" className="text-decoration-none">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-decoration-none">
                    Help
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-decoration-none">
                    Guide
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-decoration-none">
                    Resources
                  </Link>
                </li>
              </ul>
            </Col>
          </Row>

          {/* Disclaimer */}
          <div className="pt-3">
            <hr className={footerStyle.custom_hr} />
            <div className={` ${footerStyle.disclaimer} py-3`}>
            <p >
            Compliance Officer: Mr Gaurav V Shah | compliance@sernetindia.com For any complaints, please write to complaint@sernetindia.com or alternatively you can write to BSE and NSE respectively. Or else you can use SEBI SCORE to lodge your complaint. Filing complaints on SCORES. Please ensure you carefully read the Mandatory Documents as prescribed by SEBI.
            </p>
            </div> 
            <div className={` ${footerStyle.disclaimer} py-3`}>
            <p >
            “Prevent Unauthorized Transactions in your demat account. Update your Mobile Number with your Depository Participant. Receive alerts on your Registered Mobile for all debit and other important transactions in your Demat Account directly from CDSL on the same day. Issued in the interest of investors.” | “KYC is one time exercise while dealing in securities markets – once KYC is done through a SEBI registered intermediary (Broker, DP, Mutual Fund etc.), you need not undergo the same process again when you approach another intermediary.” | “No need to issue cheques by investors while subscribing to IPO. Just write the bank account number and sign in the application form to authorise your bank to make payment in case of allotment. No worries for refund as the money remains in investor’s account.” | “Research services offered by SERNET Financial Services Pvt. Ltd, is provided through tie ups with independent SEBI registered research analysts.” | “Mutual Fund Investments are subject to market risks. Please read all scheme related documents carefully before investing.” | “The Stock Exchange, Mumbai is not in any manner answerable, responsible or liable to any person or persons for any acts of omission or commission, errors, mistakes and/or violation, actual or perceived, by us or our partners, agents, associates etc., of any of the Rules, Regulations, Bye-laws of the Stock Exchange, Mumbai, SEBI Act or any other laws in force from time to time” | “The Stock Exchange, Mumbai is not answerable, responsible or liable for any information on this Website or for any services rendered by our employees, our servants, and us.”
            </p>
            </div>

            <div className={` ${footerStyle.disclaimer} py-3`}>
            <p >
              Web architect by <strong>Sernet India</strong>
            </p>
            </div>
          </div>

          {/* Copyright */}
          <div className={` ${footerStyle.copyrights} py-5`}>
          <hr className={footerStyle.custom_hr} />
          <Row className="align-items-center pt-3">
            <Col lg={3} md={6} sm={12}>
            <p className={`${footerStyle.reserve_rights} mb-0`}>© 2024, SERNET. All rights reserved.</p>
            </Col>
            <Col
              lg={9}
              md={6}
              sm={12}
              className={`d-flex justify-content-lg-end ${footerStyle.copyright_links}`}
            >
              <Link href="#" className="px-2 text-decoration-none">
                Terms & Conditions
              </Link>
              <Link href="#" className="px-2 text-decoration-none">
                Policies & Procedures
              </Link>
              <Link href="#" className="px-2 text-decoration-none">
                Privacy Policy
              </Link>
              <Link href="#" className="px-2 text-decoration-none">
                Disclosure
              </Link>
              <Link href="#" className="px-2 text-decoration-none">
                Sitemap
              </Link>
              <Link href="#" className="px-2 text-decoration-none">
                Important Links
              </Link>
            </Col>
          </Row>
          </div>
        </Container>
      </div>
    </footer>
  );
}
export default Footer;
