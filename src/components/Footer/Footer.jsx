import React from "react"

import styled from "../../styles/Footer.module.css";
import { Link } from "react-router-dom";

import Logo from "../../images/logo.svg";

const Footer = () => {
    return (
        <section className={styled.footer}>
            <div className={styled.logo}>
                <Link to="/">
                <img src={Logo} alt="STUF" />
                </Link>
            </div>

            <div className={styled.rights}>
                Developed by <a href="https://github.com/maxim-dolgovmd" target="_blank" rel="noreferrer">
                    Dolgov
                </a>
            </div>

            <div className={styled.socials}>
                <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noreferrer"
                >
                    <svg className='icon'>
                        <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#instagram`} />
                    </svg>
                </a>

                <a 
                    href="https://facebook.com" 
                    target="_blank" 
                    rel="noreferrer"
                >
                    <svg className='icon'>
                        <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#facebook`} />
                    </svg>
                </a>

                <a 
                    href="https://youtube.com" 
                    target="_blank" 
                    rel="noreferrer"
                >
                    <svg className='icon'>
                        <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#youtube`} />
                    </svg>
                </a>
            </div>
        </section>
    )
}

export default Footer