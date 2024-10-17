import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Lottie from 'lottie-react';
import animationData from '../assets/animations/Animation - 404.json';
import '../styles/404.css';

const NotFoundPage = () => {
    return (
        <div className="404" style={{ textAlign: 'center', marginTop: '50px' }}>
            <Header />
            <main>
            <div className="lottie-container">
            <Lottie animationData={animationData} loop={true} />
            </div>
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <Link to="/">Go to Homepage</Link>
            </main>
            <Footer />
        </div>
    );
};

export default NotFoundPage;