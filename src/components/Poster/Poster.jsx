import React from "react";

import styled from "../../styles/Home.module.css";

import BG from '../../images/computer.png'

const Poster = () => {
    return (
        <div style={{background: '#191919', width: '100%'}}>
            <div className={styled.home}>
                <div className={styled.title}>
                    BIG SALE 20%
                </div>
                <div className={styled.product}>
                    <div className={styled.text}>
                        <div className={styled.subtitle}>the bestseller of 2023 </div>
                        <h1 className={styled.head}>LENNON r2d2 with NVIDIA 5090 TI</h1>
                        <button className={styled.button}>Shop Now</button>
                    </div>

                    <div className={styled.image}>
                        <img src={BG} alt=""/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Poster