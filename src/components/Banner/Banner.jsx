import React from "react";

import styled from "../../styles/Home.module.css";

import BannerImg from '../../images/banner.png'

const Banner = () => {
    return (
        <section className={styled.banner}>
            <div className={styled.left}>
                <p className={styled.content}>
                    NEW YEAR
                    <span>SALE</span>
                </p>
                <button className={styled.more}>See more</button>
            </div>
            <div 
                className={styled.right}
                style={{backgroundImage: `url(${BannerImg})`}}
            >
                <p className={styled.discount}>
                    save up to <span>50%</span> off
                </p>
            </div>
        </section>
    )
}

export default Banner