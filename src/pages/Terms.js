// src/pages/Terms.js
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import '../styles/Terms.css';
import Lottie from 'lottie-react';
import loadingAnimation from '../assets/animations/Animation - Loading.json';

const TermsAndConditions = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000); // Simulate loading time

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="loading-container">
                <Lottie animationData={loadingAnimation} loop={true} />
                <p>Loading Terms and Conditions...</p>
            </div>
        );
    }

    return (
        <div className="terms-and-conditions-page">
            <Header />
            <main>
                <h1>Terms and Conditions</h1>
                <p>Last updated: October 16, 2024</p>
                <p>Please read these terms and conditions carefully before using Our Service.</p>

                <h2>Interpretation and Definitions</h2>
                <h3>Interpretation</h3>
                <p>
                    The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or plural.
                </p>

                <h3>Definitions</h3>
                <p>For the purposes of these Terms and Conditions:</p>
                <ul>
                    <li><strong>Application</strong> means the software program provided by the Company downloaded by You on any electronic device, named AlgoQuiz.</li>
                    <li><strong>Application Store</strong> means the digital distribution service operated by Apple Inc. or Google Inc. in which the Application has been downloaded.</li>
                    <li><strong>Affiliate</strong> means an entity that controls, is controlled by or is under common control with a party.</li>
                    <li><strong>Country</strong> refers to: Morocco.</li>
                    <li><strong>Company</strong> refers to AlgoQuiz.</li>
                    <li><strong>Device</strong> means any device that can access the Service such as a computer, cellphone, or digital tablet.</li>
                    <li><strong>Service</strong> refers to the Application.</li>
                    <li><strong>Terms and Conditions</strong> (also referred to as "Terms") mean these Terms and Conditions that form the entire agreement between You and the Company regarding the use of the Service.</li>
                    <li><strong>Third-party Social Media Service</strong> means any services or content provided by a third-party that may be displayed, included or made available by the Service.</li>
                    <li><strong>You</strong> means the individual accessing or using the Service.</li>
                </ul>

                <h2>Acknowledgment</h2>
                <p>
                    These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions.
                </p>
                <p>
                    By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions then You may not access the Service.
                </p>
                <p>You represent that you are over the age of 18. The Company does not permit those under 18 to use the Service.</p>
                <p>Your access to and use of the Service is also conditioned on Your acceptance of and compliance with the Privacy Policy of the Company.</p>

                <h2>Links to Other Websites</h2>
                <p>
                    Our Service may contain links to third-party websites or services that are not owned or controlled by the Company.
                </p>
                <p>
                    The Company has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
                </p>

                <h2>Termination</h2>
                <p>
                    We may terminate or suspend Your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions.
                </p>

                <h2>Limitation of Liability</h2>
                <p>
                    Notwithstanding any damages that You might incur, the entire liability of the Company and any of its suppliers under any provision of this Terms and Your exclusive remedy shall be limited to the amount actually paid by You through the Service or 100 USD if You haven't purchased anything through the Service.
                </p>

                <h2>&quot;AS IS&quot; and &quot;AS AVAILABLE&quot; Disclaimer</h2>
                <p>
                    The Service is provided to You &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; and with all faults and defects without warranty of any kind.
                </p>

                <h2>Governing Law</h2>
                <p>
                    The laws of the Country, excluding its conflicts of law rules, shall govern this Terms and Your use of the Service.
                </p>

                <h2>Disputes Resolution</h2>
                <p>If You have any concern or dispute about the Service, You agree to first try to resolve the dispute informally by contacting the Company.</p>

                <h2>For European Union (EU) Users</h2>
                <p>If You are a European Union consumer, you will benefit from any mandatory provisions of the law of the country in which You are resident.</p>

                <h2>United States Legal Compliance</h2>
                <p>You represent and warrant that (i) You are not located in a country that is subject to the United States government embargo.</p>

                <h2>Severability and Waiver</h2>
                <h3>Severability</h3>
                <p>If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision.</p>

                <h3>Waiver</h3>
                <p>Except as provided herein, the failure to exercise a right or to require performance of an obligation under these Terms shall not affect a party's ability to exercise such right.</p>

                <h2>Translation Interpretation</h2>
                <p>
                    These Terms and Conditions may have been translated if We have made them available to You on our Service. You agree that the original English text shall prevail in the case of a dispute.
                </p>

                <h2>Changes to These Terms and Conditions</h2>
                <p>
                    We reserve the right, at Our sole discretion, to modify or replace these Terms at any time.
                </p>

                <h2>Contact Us</h2>
                <p>If you have any questions about these Terms and Conditions, You can contact us:</p>
                <ul>
                    <li>
                        By email: <a href="mailto:omarelyaz@gmail.com">omarelyaz@gmail.com</a>
                    </li>
                    <li>
                        By email: <a href="mailto:maryembenhaida9@gmail.com">maryembenhaida9@gmail.com</a>
                    </li>
                    <li>
                        By visiting this page on our website: <a href="https://github.com/OMARTK1/algoquiz" target="_blank" rel="noopener noreferrer">https://github.com/OMARTK1/algoquiz</a>
                    </li>
                </ul>
            </main>
            <Footer />
        </div>
    );
};

export default TermsAndConditions;
