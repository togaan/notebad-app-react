import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faLinkedin, faSquareWhatsapp } from '@fortawesome/free-brands-svg-icons';
import gmail from './gmail.png'


function Footer() {

    // set gmail link
    const emailAddress = "alihameed7121996programmer@gmail.com";
    const subject = encodeURIComponent('Subject Here');
    const body = encodeURIComponent('Body of the email goes hrer.');
    // gamil link format
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}&su=${subject}&body=${body}`;

    // set linkedin url
    const linkedinUrl = "https://www.linkedin.com/in/ali-hameed-225706318";

    // set Whatsapp url
    const phoneNumber = "+964 781 172 9815";
    const message = 'Hello! I would like to know more about your services.';
    // remove white spaces from the number
    const formattedPhoneNumber = phoneNumber.replace(/[^0-9]/g, '');
    const whatsappLink = `https://wa.me/${formattedPhoneNumber}?text=${message}`;

    return (
        <div className="footer p-4 p-sm-5 ">
            <div className="container text-center text-white mt-2">
                <footer className="">@ 2024 Ali Hameed devolpment. All rights reserved</footer>

                <div className="contact mt-3">
                    <p className="mb-1">Contact me</p>

                    <div className="d-flex align-items-center justify-content-center gap-3">
                        <a href={gmailLink} target="_blank" rel="noopener noreferrer">
                            <img src={gmail} alt="gmail" className="gmail" />
                        </a>

                        <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faLinkedin} className="fs-4"/>
                        </a>

                        <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faSquareWhatsapp} className="whatsUp fs-4" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer