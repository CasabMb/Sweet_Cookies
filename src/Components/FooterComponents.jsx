import React from 'react'
import logo2 from '../asset/Images/logo2.webp';
import paiement from '../asset/Images/paiement.png';
import facebook from '../asset/Images/Facebook.png';
import twitter from '../asset/Images/Twitter.png';
import instagram from '../asset/Images/Instagram.png';
import linkedin from '../asset/Images/LinkedIn.png';

function FooterComponents () {
    return <>
    <footer id="pattern">
        <div className="footerSvg">
            <svg width="1263" height="466" viewBox="0 0 1263 466" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="1263" height="466" fill="#FBF8F3"/>
                <g clipPath="url(#clip0_192_2050)">
                <rect width="1263" height="350" transform="translate(0 116)" fill="#BA9974"/>
                <rect y="116" width="1263" height="350" fill="url(#paint0_radial_192_2050)"/>
                </g>
                <path d="M1263 64.5909H956.089C730.905 64.5909 508.91 -7.62939e-06 315.75 -7.62939e-06C122.59 -7.62939e-06 0 64.5909 0 64.5909V116H1263V64.5909Z" fill="#F4EEE8"/>
                <defs>
                <radialGradient id="paint0_radial_192_2050" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(631.5 291) rotate(90) scale(175 631.5)">
                <stop stopColor="#F7F8F9" stopOpacity="0"/>
                <stop offset="1" stopColor="#F4EEE8"/>
                </radialGradient>
                <clipPath id="clip0_192_2050">
                <rect width="1263" height="350" fill="white" transform="translate(0 116)"/>
                </clipPath>
                </defs>
            </svg>  
        </div>


        <div id='footer_top'>

            <div id='logo2'>
                <img src={logo2} alt="logo de sweet cookie" loading="lazy"/>
            </div>

            <div id='paiement'>
                <img src={paiement} alt="paiement" loading="lazy"/>
            </div>

            <div>
                <ul>
                    <li>Mentions légales</li>
                    <li>Conditions générales de vente</li>
                    <li>Politique de confidentialité</li>
                    <li>Cookies</li>
                </ul>
            </div>
        </div>
        <div id='footer_line'></div>
        <div id='footer_bottom'>
        <div id='social'>
        <ul>
            <li>
                <a href="https://www.facebook.com/" target='blank'>
                    <img src={facebook} alt="logo facebook" loading="lazy"/>
                </a>
            </li>
            <li>
                <a href="https://twitter.com/" target='blank'>
                    <img src={twitter} alt="logo twitter" loading="lazy"/>
                </a>
            </li>
            <li>
                <a href="https://www.instagram.com/" target='blank'>
                    <img src={instagram} alt="logo instagram" loading="lazy"/>
                </a>
            </li>
            <li>
                <a href="https://www.linkedin.com/" target='blank'>
                    <img src={linkedin} alt="logo linkedin" loading="lazy"/>
                </a>
            </li>
        </ul>
    </div>
        </div>
        
    </footer>
    </>
}

export default FooterComponents