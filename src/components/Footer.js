import React, { useEffect } from 'react';

const Footer = () => {
  useEffect(() => {
    const footer = document.getElementById('footer');

    const handleScroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        footer.classList.add('visible'); // Show the footer
      } else {
        footer.classList.remove('visible'); // Hide the footer
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <footer id="footer">
      <p>© 2021 AlgoQuiz</p>
    </footer>
  );
};

export default Footer;
