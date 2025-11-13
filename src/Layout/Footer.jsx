import React from "react";
import "../assets/css/Footer.css";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="dev-footer text-light py-4 mt-auto">
            <div className="container text-center">
                <h5 className="fw-bold mb-2">User Management System</h5>
                <p className="mb-3 small">
                    Built with by developers, for developers.
                </p>

                <div className="social-icons mb-3">
                    <a
                        href="https://github.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="icon-link me-3"
                    >
                        <FaGithub size={22} />
                    </a>
                    <a
                        href="https://linkedin.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="icon-link me-3"
                    >
                        <FaLinkedin size={22} />
                    </a>
                    <a href="mailto:admin@example.com" className="icon-link">
                        <FaEnvelope size={22} />
                    </a>
                </div>

                <p className="small text-secondary mb-0">
                    © {new Date().getFullYear()} <strong>DevLabs</strong> | All Rights Reserved
                </p>
            </div>
        </footer>
    );
};

export default Footer;
