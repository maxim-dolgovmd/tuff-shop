import React from "react";

import Sneakers from '../../images/image.svg'

import styled from "../../styles/Products.module.css";
import { Link } from "react-router-dom";

const Products = (props) => {

    const {title, products, amount} = props
    
    const productsArray = products.filter((_, i) => i < amount)
    console.log(productsArray)
    return (
        <section className={styled.products}>
            {title && <h2>{title}</h2>}
            <div className={styled.list}>
                {
                    productsArray?.map(({id, title, category: {name: cat}, price}) => {
                        return (
                            <Link 
                                to={`/products/${id}`}
                                key={id}
                                className={styled.product}
                            >
                                <div 
                                    className={styled.image}
                                >
                                    <img src={Sneakers} alt="sneakers" />
                                </div>
                                <div className={styled.wrapper}>
                                    <h3 className={styled.title}>{title}</h3>
                                    <div className={styled.cat}>{cat}</div>
                                    <div className={styled.info}>
                                        <div className={styled.prices}>
                                            <div className={styled.price}>{price}$</div>
                                            <div className={styled.oldPrice}>{Math.floor(price * 0.8)}$</div>
                                        </div>
                                        <div className={styled.purchases}>
                                            {Math.floor(Math.random() * 20 + 1)}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
            {/* <div style={{display: 'flex', justifyContent: 'center'}}>
                <button className={styled.button}>See more</button>
            </div> */}
        </section>
    )
}

export default Products