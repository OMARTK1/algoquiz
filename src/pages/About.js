// src/pages/About.js
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import '../styles/About.css';
import Lottie from 'lottie-react';
import loadingAnimation from '../assets/animations/Animation - Loading.json';
import aboutAnimation from '../assets/animations/Animation - about.json';

const About = () => {
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
                <p>Loading About Us...</p>
            </div>
        );
    }

    return (
        <div className="about-page">
            <Header />
            <main>
                <div className="about-lottie-container">
                    <Lottie animationData={aboutAnimation} loop={true} />
                </div>
                <h2>About Us – <span id="Liv_Name">AlgoQuiz</span></h2>

                <h3>Our Founder</h3>
                <p id="Liv_Founder">
                    Omar Elyazidi is a passionate developer and educator with a background in computer science and software engineering. He strives to create engaging learning experiences for users through AlgoQuiz, a platform designed for testing and improving algorithm skills.
                </p>

                <h3>Company History</h3>
                <p id="Liv_History">
                    Founded in 2024, AlgoQuiz addresses the need for accessible educational tools in computer science, making algorithm learning engaging and effective through user feedback.
                </p>

                <h3>Our Mission</h3>
                <p id="Liv_Mission">
                    At AlgoQuiz, we empower learners to master algorithms and data structures, fostering a supportive community through interactive quizzes and resources.
                </p>

                <h3>Meet Our Team</h3>
                <ol>
                    <li><b><span id="Liv_Member1">Omar Elyazidi</span></b> – <span id="Liv_Member1Role">Front-End Developer</span></li>
                    <li><b><span id="Liv_Member2">Maryem Benhaida</span></b> – <span id="Liv_Member2Role">Front-End Developer</span></li>
                </ol>

                <h3>Contact Information</h3>
                <ul>
                    <li><b>Email:</b> <span id="Liv_Email"><a href="mailto:omarelyaz21@gmail.com">omarelyaz21@gmail.com</a></span></li>
                    <li><b>Email:</b> <span id="Liv_Email"><a href="mailto:maryembenhaida9@gmail.com">maryembenhaida9@gmail.com</a></span></li>
                    <li><b>Phone:</b> <span id="Liv_Phone"><a href="tel:+2126xxxxxxxx">+2126xxxxxxxx</a></span></li>
                    <li><b>Website:</b> <span id="Liv_URL"><a href="https://github.com/OMARTK1/algoquiz">Official Website</a></span></li>
                    <li><b>Website:</b> <span id="Liv_URL"><a href="https://github.com/Mery9yuka">Official Website</a></span></li>
                </ul>

                <h3>Connect With Us</h3>
                <div className="table-is-responsive">
                    <table>
                        <tbody>
                            <tr>
                                <th>Facebook</th>
                                <td id="Liv_Facebook"><a href="https://facebook.com">Official Facebook Page</a></td>
                            </tr>
                            <tr>
                                <th>Twitter</th>
                                <td id="Liv_Twitter"><a href="https://x.com">Official Twitter Handle</a></td>
                            </tr>
                            <tr>
                                <th>LinkedIn</th>
                                <td id="Liv_LinkedIn"><a href="https://linkedin.com">Official LinkedIn ID</a></td>
                            </tr>
                            <tr>
                                <th>Instagram</th>
                                <td id="Liv_Instagram"><a href="https://instagram.com">Official Instagram ID</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p style={{ display: "none" }}>
                    Our about us page has been created using blogearns’ <a href="https://blogearns.com/2021/05/free-about-us-page-generator.html" style={{ color: "inherit", textDecoration: "none" }}>About Us Page Generator</a>
                </p>
            </main>
            <Footer />
        </div>
    );
};

export default About;
