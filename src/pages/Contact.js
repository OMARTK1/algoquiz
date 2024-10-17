// src/pages/Contact.js
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import '../styles/Contact.css';
import Lottie from 'lottie-react';
import contactUsImage from '../assets/contact-us-page.jpg';
import loadingAnimation from '../assets/animations/Animation - Loading.json';

const Contact = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {        
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="loading-container">
                <Lottie animationData={loadingAnimation} loop={true} />
                <p>Loading Contact Us...</p>
            </div>
        );
    }

    return (
        <div className="contact-page">
            <Header />
            <main>
                <h2>Contact Us</h2>
                <img src={contactUsImage} alt="Contact Us" style={{ width: '100%', height: 'auto' }} />
                <div className="table-is-responsive">
                    <table>
                        <tbody>
                            <tr>
                                <th style={{ padding: "10px" }}><i className="fa-solid fa-building"></i></th>
                                <td><b><span id="C_name">AlgoQuiz</span></b></td>
                            </tr>
                            <tr>
                                <th style={{ padding: "10px" }}><i className="fa-solid fa-phone-volume"></i></th>
                                <td><span id="C_number"><a href="tel:+2126xxxxxxxx">+2126xxxxxxxx</a></span></td>
                            </tr>
                            <tr>
                                <th style={{ padding: "10px" }}><i className="fa-solid fa-envelope-open-text"></i></th>
                                <td>
                                    <span id="C_email"><a href="mailto:omarelyaz21@gmail.com">omarelyaz21@gmail.com</a></span>
                                    <span id="C_email"><a href="mailto:maryembenhaida9@gmail.com">maryembenhaida9@gmail.com</a></span>
                                </td>
                            </tr>
                            <tr>
                                <th style={{ padding: "10px" }}><i className="fa-solid fa-location-dot"></i></th>
                                <td><span id="C_address">Morocco</span></td>
                            </tr>
                            <tr>
                                <th style={{ padding: "10px", color: "#25D366" }}><i className="fa-brands fa-whatsapp"></i></th>
                                <td><span id="C_whatsapp"><a href="https://wa.me/+2126xxxxxxxx">+2126xxxxxxxx</a></span></td>
                            </tr>
                            <tr>
                                <th style={{ padding: "10px" }}><i className="fa-brands fa-facebook"></i></th>
                                <td><span id="C_facebook"><a href="https://facebook.com">Official Facebook Page</a></span></td>
                            </tr>
                            <tr>
                                <th style={{ padding: "10px", color: "#1DA1F2" }}><i className="fa-brands fa-x-twitter"></i></th>
                                <td><span id="C_twitter"><a href="https://x.com">Official Twitter Handle</a></span></td>
                            </tr>
                            <tr>
                                <th style={{ padding: "10px" }}><i className="fa-brands fa-youtube"></i></th>
                                <td><span id="C_youtube"><a href="https://youtube.com">Official YouTube Channel</a></span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h3 style={{ color: "#3e005d", textAlign: "center" }}>We will revert you as soon as possible…!</h3>
                <p style={{ color: "#3e005d", textAlign: "center" }}>Thank you for contacting us! <br /><b>Have a great day</b></p>
                <span style={{ fontSize: "1px", opacity: 0 }}>
                    This page is generated with the help of <a href="https://www.blogearns.com/2021/06/free-contact-us-page-generator.html" style={{ color: "inherit" }}>Contact Us Page Generator</a>
                </span>
            </main>
            <Footer />
        </div>
    );
};

export default Contact;
