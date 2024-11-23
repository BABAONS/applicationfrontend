import React from 'react';
import '../App.css'; // Si Footer.js est dans src/components

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-content">
                <div className="contact-info">
                    <h4>Contact Us</h4>
                    <p>Email: <a href="mailto:contact@ecommdash.com">contact@ecommdash.com</a></p>
                    <p>Phone: <a href="tel:+1234567890">(123) 456-7890</a></p>
                </div>
                <div className="links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/services">Services</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </div>
                <div className="copyright">
                    <p>&copy; {new Date().getFullYear()} E-comm Dash. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;
