// src/pages/Privacy.js
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import '../styles/Privacy.css';
import Lottie from 'lottie-react';
import loadingAnimation from '../assets/animations/Animation - Loading.json';

const PrivacyPolicy = () => {
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
                <p>Loading Privacy Policy...</p>
            </div>
        );
    }

    return (
        <div className="privacy-policy-page">
            <Header />
            <main>
                <h1>Privacy Policy</h1>
                <p>Last updated: October 16, 2024</p>
                <p>
                    This Privacy Policy describes Our policies and procedures on the collection, use, and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
                </p>
                <p>
                    We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy. This Privacy Policy has been created with the help of the 
                    <a href="https://www.termsfeed.com/privacy-policy-generator/" target="_blank" rel="noopener noreferrer"> Privacy Policy Generator</a>.
                </p>

                <h2>Interpretation and Definitions</h2>
                <h3>Interpretation</h3>
                <p>
                    The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or plural.
                </p>
                <h3>Definitions</h3>
                <p>For the purposes of this Privacy Policy:</p>
                <ul>
                    <li><strong>Account</strong> means a unique account created for You to access our Service or parts of our Service.</li>
                    <li><strong>Affiliate</strong> means an entity that controls, is controlled by or is under common control with a party.</li>
                    <li><strong>Application</strong> refers to AlgoQuiz, the software program provided by the Company.</li>
                    <li><strong>Company</strong> refers to AlgoQuiz.</li>
                    <li><strong>Country</strong> refers to: Morocco.</li>
                    <li><strong>Device</strong> means any device that can access the Service.</li>
                    <li><strong>Personal Data</strong> is any information that relates to an identified or identifiable individual.</li>
                    <li><strong>Service</strong> refers to the Application.</li>
                    <li><strong>Service Provider</strong> means any natural or legal person who processes the data on behalf of the Company.</li>
                    <li><strong>Third-party Social Media Service</strong> refers to any website or social network website.</li>
                    <li><strong>Usage Data</strong> refers to data collected automatically.</li>
                    <li><strong>You</strong> means the individual accessing or using the Service.</li>
                </ul>

                <h2>Collecting and Using Your Personal Data</h2>
                <h3>Types of Data Collected</h3>
                <h4>Personal Data</h4>
                <p>
                    While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. This may include:
                </p>
                <ul>
                    <li>Email address</li>
                    <li>First name and last name</li>
                    <li>Usage Data</li>
                </ul>
                
                <h4>Usage Data</h4>
                <p>Usage Data is collected automatically when using the Service and may include information such as Your Device's Internet Protocol address, browser type, pages visited, and time spent on those pages.</p>
                
                <h4>Information from Third-Party Social Media Services</h4>
                <p>
                    The Company allows You to create an account and log in through Third-party Social Media Services like Google, Facebook, Instagram, etc.
                </p>

                <h4>Information Collected while Using the Application</h4>
                <p>
                    While using Our Application, we may collect information regarding your location with your permission.
                </p>

                <h3>Use of Your Personal Data</h3>
                <p>The Company may use Personal Data for the following purposes:</p>
                <ul>
                    <li><strong>To provide and maintain our Service</strong>.</li>
                    <li><strong>To manage Your Account</strong>.</li>
                    <li><strong>For the performance of a contract</strong>.</li>
                    <li><strong>To contact You</strong>.</li>
                    <li><strong>To provide You</strong> with news and special offers.</li>
                    <li><strong>To manage Your requests</strong>.</li>
                    <li><strong>For business transfers</strong>.</li>
                    <li><strong>For other purposes</strong>.</li>
                </ul>

                <h3>Retention of Your Personal Data</h3>
                <p>The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy.</p>

                <h3>Transfer of Your Personal Data</h3>
                <p>Your information is processed at the Company's operating offices and in any other places involved in the processing.</p>

                <h3>Delete Your Personal Data</h3>
                <p>You have the right to delete or request assistance in deleting the Personal Data that We have collected about You.</p>

                <h3>Disclosure of Your Personal Data</h3>
                <h4>Business Transactions</h4>
                <p>If the Company is involved in a merger, Your Personal Data may be transferred.</p>

                <h4>Law enforcement</h4>
                <p>Under certain circumstances, the Company may be required to disclose Your Personal Data.</p>

                <h3>Security of Your Personal Data</h3>
                <p>The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet is 100% secure.</p>

                <h2>Children's Privacy</h2>
                <p>Our Service does not address anyone under the age of 13.</p>

                <h2>Links to Other Websites</h2>
                <p>Our Service may contain links to other websites not operated by Us.</p>

                <h2>Changes to this Privacy Policy</h2>
                <p>We may update Our Privacy Policy from time to time. We will notify You of any changes.</p>

                <h2>Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, You can contact us:</p>
                <ul>
                    <li>By email: <a href="mailto:mrelyazidi.omar@gmail.com">mrelyazidi.omar@gmail.com</a></li>
                    <li>By email: <a href="mailto:maryembenhaida9@gmail.com">maryembenhaida9@gmail.com</a></li>
                    <li>By visiting our website: <a href="https://github.com/OMARTK1/algoquiz" target="_blank" rel="noopener noreferrer">AlgoQuiz</a></li>
                </ul>
            </main>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
